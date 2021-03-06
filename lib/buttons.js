$(function() {
    // Initialise pretty CSS and whatnot
    $( "#vote_type_set" ).buttonset();
    $( "#votes_from_set" ).buttonset();
    $( "#year_set" ).buttonset();
    $( "#colour_scheme_set" ).buttonset();

    $( "input" ).click(function(){
        reload_map();
        // Something like this could potentially make it more pretty?
        //$("#vmap").hide().fadeIn('fast');
    });
});

function reload_map()
{
    var regionClickEvent = $.Event('regionClick.jqvmap');
    jQuery('#vmap').trigger(regionClickEvent, current_selected_country);
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
