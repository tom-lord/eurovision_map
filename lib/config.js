// Default config, which can be altered within the app
CONFIG = {
    colour_scheme: COLOUR_SCHEMES.gold_silver_bronze_green_to_red,
    // from_country, to_country, final_scores or spearman_ranked
    vote_type: "from_country",
    year: 2014,
    // combined, televote or jury
    voters: "combined",


// TODO: These should be marked as some sort of HELPERS, not CONFIGs!!
    rankings : function(code)
    {
        from_country_rank = CONFIG.from_country_rankings()[code.toUpperCase()];
        //TODO: Add case statements for vote_type and voters, when these things
        //are configurable.
        return from_country_rank;
    },

    from_country_rankings : function()
    {
       return window["from_country_" + CONFIG.year + "_rank"]; 
    },

    contestants_entered : function()
    {
        //TODO: This information can be worked out without saving it to a new var.
        return window["contestants_entered_" + CONFIG.year];
    },

    contestants_voted_only : function()
    {
        //TODO: This information can be worked out without saving it to a new var.
        return window["contestants_voted_only_" + CONFIG.year];
    }
}
