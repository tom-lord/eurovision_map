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
            var rankings = convert_to_final_score(from_country_rank);
            break;
        case "spearman_ranked":
            var rankings = convert_spearman_rank(from_country_rank, code);
            break;
    }
    return rankings;
}

function from_country_rankings()
{
   return window["from_country_" + CONFIG.year + "_" + CONFIG.voters];
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
    jQuery.each(contestants_entered(), function()
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
    return scores_to_positions(final_scores);
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

function convert_spearman_rank(from_country_rank, code)
{
    var final_rank = convert_to_final_score(from_country_rank);
    var spearman_rank = final_rank; // TODO: REMOVE THIS. It's just here for debugging.
    final_rank = average_out_joint_ranks(final_rank); // Needed in case of ties

    // TODO (Big scary spearman's rank formula)


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

    console.log(final_rank);
    return final_rank;
}
