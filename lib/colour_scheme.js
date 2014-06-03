function set_colour_scheme(new_colour_scheme)
{
    jQuery('#vmap').vectorMap('set', 'colors', new_colour_scheme);
}

function get_colour_scheme(rankings)
{
    var new_colour_scheme = {};
    jQuery.each(rankings, function(idx){ 
        new_colour_scheme[idx] = CONFIG.colour_scheme[this-1];
    })
    new_colour_scheme = maintain_selected_country(new_colour_scheme)
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

function maintain_selected_country(new_colour_scheme)
{
    if( CONFIG.vote_type == "to_country" || CONFIG.vote_type == "from_country" )
    {
        // Needed for when user clicks an invalid country
        new_colour_scheme[current_selected_country] = '#ffffb2'
    }
    return new_colour_scheme
}
