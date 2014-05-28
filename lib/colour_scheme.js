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
