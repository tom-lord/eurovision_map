function set_colour_scheme(new_colour_scheme)
{
    jQuery('#vmap').vectorMap('set', 'colors', new_colour_scheme);
}

function get_colour_scheme(rankings)
{
    var new_colour_scheme = {};
    jQuery.each(rankings, function(idx){ 
        new_colour_scheme[idx] = CONFIG.colour_scheme[this];
    })
    return new_colour_scheme;
}

function non_contestants_colour_scheme()
{
    // Set colours for voting-only and non-competing countries
    var new_colour_scheme = {};
    jQuery.each(MAP.all_countries, function(idx) 
    {
        if( !country_entered(this) )
        {
            new_colour_scheme[this] = COLOUR_SCHEMES.never_participated;
            if( country_has_ever_participated(this) )
            {
                new_colour_scheme[this] = COLOUR_SCHEMES.not_participating;
            }
            if( country_voted_only(this) )
            {
                new_colour_scheme[this] = COLOUR_SCHEMES.voted_only;
            }
        }
    })
    return new_colour_scheme;
}
