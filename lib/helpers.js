function country_entered(code)
{
    return jQuery.inArray(code.toUpperCase(), contestants_entered()) != -1
}

function country_voted_only(code)
{
    return jQuery.inArray(code.toUpperCase(), contestants_voted_only()) != -1
}

function country_participated(code)
{
    return country_entered(code) || country_voted_only(code)
}

function country_has_ever_participated(code)
{
    return jQuery.inArray(code.toLowerCase(), MAP.all_countries_ever_participated) != -1
}

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
            var rankings = convert_to_final_score(from_country_rank, code);
            break;
        case "spearman_ranked":
            var rankings = convert_spearman_rank(from_country_rank, code);
            break;
    }
console.log("from_country_" + CONFIG.year + "_" + CONFIG.voters);
    return rankings;
}

function from_country_rankings()
{
   return window["from_country_" + CONFIG.year + "_" + CONFIG.voters];
}

function contestants_entered()
{
    //TODO: This information can be worked out without saving it to a new var.
    return window["contestants_entered_" + CONFIG.year];
}

function contestants_voted_only()
{
    //TODO: This information can be worked out without saving it to a new var.
    return window["contestants_voted_only_" + CONFIG.year];
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

function convert_spearman_rank(from_country_rank)
{
//TODO
    var final_rank = convert_to_final_score(from_country_rank);
    // TODO: (This is needed for proper spearman ranking)
    // final_rank = average_out_joint_scores(final_rank)
    window[alert("Not yet implemented!")];
}
