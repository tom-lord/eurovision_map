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
    return jQuery.inArray(code.toUpperCase(), ALL_EUROVISION_ENTRANTS) != -1
}

function rankings (code)
{
    from_country_rank = from_country_rankings()[code.toUpperCase()];
    //TODO: Add case statements for vote_type and voters, when these things
    //are configurable.
    return from_country_rank;
}

function from_country_rankings ()
{
   return window["from_country_" + CONFIG.year + "_rank"]; 
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
