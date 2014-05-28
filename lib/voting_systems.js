VOTING = {
    from_1975_to_present: [12, 10, 8, 7, 6, 5, 4, 3, 2, 1],

    apply : function(ranking)
    {
        // I doubt I'll go back before 1975, but you never know!
        // If I ever do, then this needs updating, obviously...
        return VOTING.from_1975_to_present[ranking - 1] || 0;
    }
}
