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

function rankings (code)
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
    return rankings;
}

function from_country_rankings ()
{
   return window["from_country_" + CONFIG.year + "_" + CONFIG.voters];
}

function contestants_entered ()
{
    //TODO: This information can be worked out without saving it to a new var.
    return window["contestants_entered_" + CONFIG.year];
}

function contestants_voted_only ()
{
    //TODO: This information can be worked out without saving it to a new var.
    return window["contestants_voted_only_" + CONFIG.year];
}

function convert_to_country_rank(from_country_rank, code)
{
    var rankings = {};
    jQuery.each(from_country_rank, function(contestant)
    {
        if( contestant != code )
        {
            rankings[contestant.toLowerCase()] = from_country_rank[contestant][code];
        }
    })
    return rankings;
}

function convert_to_final_score(from_country_rank)
{
//TODO
}

function convert_spearman_rank(from_country_rank)
{
//TODO
//This will rank how accurately the given rankings are,
//compared to the final score
}
