function rankings(code)
{
    var from_country_rank = from_country_rankings();
    switch( CONFIG.vote_type )
    {
        case "from_country":
            var rankings = from_country_rank[code.toUpperCase()]
            break;
        case "to_country":
            var rankings = convert_to_country_rank(from_country_rank, code);
            break;
        case "final_scores":
            var rankings = scores_to_positions(convert_to_final_score(from_country_rank));
            break;
        case "spearman_ranked":
            var rankings = scores_to_positions(convert_to_spearman_rank(from_country_rank));
            break;
    }
    return rankings;
}

function from_country_rankings(force_options)
{
    /////////////////////////////////////////////////////////////////////////
    // TEMPORARY BODGE before I improve labels.
    // Currently, because of how labels work, things grind to a halt when selecting "difference" mode
    // Need to implement a more static label, and use caching (memoize)
    var voters = CONFIG.voters;
    if( force_options )
    {
        voters = ( force_options['voters'] || CONFIG.voters );
    }
    /////////////////////////////////////////////////////////////////////////

    if( voters == "difference")
    {
        var from_jury = window["from_country_" + CONFIG.year + "_jury"]
        var from_televote = window["from_country_" + CONFIG.year + "_televote"]
        return calculate_jury_public_difference(from_jury, from_televote)
    }
    else
    {
        return window["from_country_" + CONFIG.year + "_" + voters];
    }
}

function convert_to_country_rank(from_country_rank, code)
{
    var rankings = {};
    jQuery.each(from_country_rank, function(voter)
    {
        if( voter.toLowerCase() != code )
        {
            rankings[voter.toLowerCase()] = from_country_rank[voter][code];
        }
    })
    return rankings;
}

function convert_to_final_score(from_country_rank)
{
    var final_scores = {};
    // Initialise
    jQuery.each(countries_entered(), function()
    {
        final_scores[this.toLowerCase()] = 0;
    });

    jQuery.each(from_country_rank, function(voter)
    {
        jQuery.each(final_scores, function(contestant)
        {
            if( contestant != voter.toLowerCase())
            {
                final_scores[contestant.toLowerCase()] += VOTING.apply(from_country_rank[voter][contestant]);
            }
        });
    });
    return final_scores;
}

function scores_to_positions(scores)
{
    var sortable = []
    for (var score in scores)
    {
        sortable.push([score, scores[score]])
    }
    sortable.sort(function(a, b) {return a[1] - b[1]}).reverse();
    // sortable = [[country1, score1], [country2, score2], ...]

    var positions = {};
    jQuery.each(sortable, function(idx)
    {
        if( idx>0 && sortable[idx][1] == sortable[idx-1][1] )
        {
            // JOINT SCORE (so are ranked equally)
            positions[ sortable[idx][0] ] = positions[ sortable[idx-1][0] ];
        }
        else
        {
            positions[ sortable[idx][0] ] = idx + 1;
        }
    });
    return positions;
}

function convert_to_spearman_rank(from_country_rank)
{
    var final_rank = convert_to_final_score(from_country_rank);
    var spearman_ranked = {};
    jQuery.each(countries_participated(), function()
    {
        spearman_ranked[this.toLowerCase()] = calculate_individual_spearman_rank(from_country_rank, final_rank, this.toLowerCase());
    });

    return spearman_ranked;
}

function calculate_individual_spearman_rank(from_country_rank, final_rank, code)
{
    var number_of_countries_to_rank = number_of_countries_entered();
    if( code in final_rank )
    {
        // For non-voting_only countries: Because countries don't rank themselves!...
        final_rank.code = undefined; //Don't use "delete", as that would do a PERMANANT deletion!
        number_of_countries_to_rank -= 1;
    }

    final_rank = average_out_joint_ranks(final_rank); // Needed in case of ties
    var country_rank = from_country_rank[code.toUpperCase()];

    var average_rank = (number_of_countries_to_rank + 1)/2

    var country_diffs = [];
    var final_diffs = [];
    for(country in country_rank) // Important trick!! This forces the same order of country ranks for comparison
    {
        country_diffs.push(country_rank[country] - average_rank);
        final_diffs.push(final_rank[country] - average_rank);
    }

    var spearman_numerator = 0;
    for(var i = 0; i < number_of_countries_to_rank; i++)
    {
        spearman_numerator += country_diffs[i] * final_diffs[i];
    }

    var sum_country_diffs_squared = 0;
    var sum_final_diffs_squared = 0;
    for(var i = 0; i < number_of_countries_to_rank; i++)
    {
        sum_country_diffs_squared += Math.pow(country_diffs[i], 2);
        sum_final_diffs_squared += Math.pow(final_diffs[i], 2);
    }
    var spearman_denominator = Math.sqrt(sum_country_diffs_squared * sum_final_diffs_squared);

    var spearman_rank = spearman_numerator / spearman_denominator;

    return spearman_rank;
}

function average_out_joint_ranks(final_rank)
{
    var consecutive_joint_countries = [];
    var previous_rank = 0 // Initialise

    for(var country in final_rank)
    {
        this_rank = final_rank[country];
        if( this_rank == previous_rank )
        {
            consecutive_joint_countries.push(country);
            previous_rank = this_rank;
            continue;
        }
        else if( consecutive_joint_countries.length > 1 )
        {
            // this_rank is not the same as previous, but
            // the preceding ranks are joint
            var adjustment = (consecutive_joint_countries.length - 1)/2;
            jQuery.each(consecutive_joint_countries, function()
            {
                final_rank[this] += adjustment;
            });
        }
        consecutive_joint_countries = [country]; // Reset
        previous_rank = this_rank;
    }

    return final_rank;
}

function calculate_jury_public_difference(from_jury, from_televote)
{
    var vote_difference = {};

    for(var voter in from_jury)
    {
        vote_difference[voter] = {};
        for(var country in from_jury[voter])
        {
            vote_difference[voter][country] = Math.abs
            (
                from_jury[voter][country] - from_televote[voter][country]
            ) + 1; // Add 1 so that a difference of 0 is treated like "rank 1"
        }
    }
    return vote_difference;
}
