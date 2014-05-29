VOTING = {
    apply : function(ranking)
    {
        return VOTING.scoring_system[ranking - 1] || 0;
    },

    scoring_system : function()
    {
        year = CONFIG.year
        // Switch statements in javascript suck
        switch(true)
        {
            case(year >= 1975):
                return VOTING.from_1975_to_present;
            case(year >= 1971 && year <= 1973):
                return VOTING.from_1971_to_1973;
            case(year == 1971 || year == 1974):
                return VOTING.in_1970_and_1974;
            case(year >= 1964 && year <= 1966):
                return VOTING.from_1964_to_1966;
            case(year == 1963):
                return VOTING.in_1963;
            case(year == 1962):
                return VOTING.in_1962;
            case((year >= 1957 && year <= 1961) || (year >= 1967 && year <= 1969)):
                return VOTING.from_1957_to_1961_and_from_1967_to_1969;
            case(year == 1946):
                return VOTING.in_1946;
        }
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
