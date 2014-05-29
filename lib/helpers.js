function country_entered(code)
{
    return jQuery.inArray(code.toUpperCase(), contestants_entered()) != -1
}

function country_voted_only(code)
{
    return jQuery.inArray(code.toUpperCase(), contestants_voted_only()) != -1
}

function country_has_ever_participated(code)
{
    return jQuery.inArray(code.toLowerCase(), MAP.all_countries_ever_participated) != -1
}

function rankings (code)
{
    from_country_rank = from_country_rankings()[code.toUpperCase()];
    switch( CONFIG.vote_type )
    {
        case "from_country":
            // Data is already supplied in this format, so do nothing!
            var rankings = from_country_rank
            break;
        case "to_country":
            //TODO
            var rankings = from_country_rank
            break;
        case "final_scores":
            //TODO
            break;
        case "spearman_ranked":
            //TODO
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