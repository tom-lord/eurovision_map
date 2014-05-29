VOTING = {
    apply : function(ranking)
    {
        // I doubt I'll go back before 1975, but you never know!
        // If I ever do, then this needs updating, obviously...
        return VOTING.from_1975_to_present[ranking - 1] || 0;
    },

    from_1975_to_present: [12, 10, 8, 7, 6, 5, 4, 3, 2, 1],
    from_1971_to_1973: [10, 9, 8, 7, 6, 5, 4, 3, 2],
    in_1970_and_1974: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    from_1964_to_1966: [5, 3, 1],
    in_1963: [5, 4, 3, 2, 1],
    in_1962: [3, 2, 1],
    from_1957_to_1961_and_from_1967_to_1969: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    in_1946: [2]
}
