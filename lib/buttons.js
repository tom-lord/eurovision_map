$(function() {
    // Initialise pretty CSS and whatnot
    $( "#vote_type_set" ).buttonset();
    $( "#votes_from_set" ).buttonset();
    $( "#year_set" ).buttonset();
    $( "#colour_scheme_set" ).buttonset();

    // TODO: Something like this could make changing config pretty,
    // but it's useless unless I work out how to dynamically update
    // the map!!
    //$( "input" ).click(function(){
    //    $("#vmap").hide().fadeIn('fast');
    //});
});

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
