$(function() {
    // Initialise pretty CSS and whatnot
    $( "#vote_type_set" ).buttonset();
    $( "#votes_from_set" ).buttonset();
    $( "#year_set" ).buttonset();
    $( "#colour_scheme_set" ).buttonset();

    // TODO: Something like this could make changing config pretty,
    // but it's useless unless I work out how to dynamically update
    // the map!!
    $( "input" ).click(function(){
        reload_map();
        // Something like this could potentially make it more pretty?
    //    $("#vmap").hide().fadeIn('fast');
    });
});

function reload_map()
{
    // TODO: This does not seem to do anything.
    regionClickEvent = $.Event('regionClick.jqvmap');
    jQuery('#vmap').trigger(regionClickEvent, [current_selected_country]);

    // TODO: Below is the "complete" code, which should also load in the
    // current country name. However, I can't get the name to load
    // And I can't be bothered to work it out, since I never actually USE it!

    //var code = current_selected_country;
    //var mapData = WorldMap.maps[params.map]; //WorldMap not defined???
    //jQuery(document).trigger(regionClickEvent, [code, mapData.pathes[code].name]);
}

function setVoteType(new_config)
{
    CONFIG.vote_type = new_config;
}

function setVotesFrom(new_config)
{
    CONFIG.voters = new_config;
}

function setYear(new_config)
{
    CONFIG.year = new_config;
}

function setColourScheme(new_config)
{
    CONFIG.colour_scheme = COLOUR_SCHEMES[new_config];
}
