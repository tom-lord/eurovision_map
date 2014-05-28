function set_colour_scheme(new_colour_scheme)
{
    jQuery('#vmap').vectorMap('set', 'colors', new_colour_scheme);
}

function get_colour_scheme(rankings)
{
    //TODO: One day, colour_scheme will be configurable
    // e.g. "Gold/Silver/Bronze only", or "Full green-->red"
    var new_colour_scheme = {};
    jQuery.each(rankings, function(idx){ 
        new_colour_scheme[idx] = colour_scheme[this];
    })
    return new_colour_scheme;
}
