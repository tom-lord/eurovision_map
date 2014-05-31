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
