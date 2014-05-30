eurovision_map
==============

A graphical analysis of Eurovision voting patterns
Using the JQVMap framework (http://jqvmap.com/) for the map, and jquery-ui (http://jqueryui.com/) for the buttons.

eurovision_map.html contains an interactive map of Europe.
Clicking on a country shows the results of their votes in the 2014 eurovision song contest;
the way that this data is displayed is highly configurable.

#Configuration options:
##Vote type:
    +from_country    - Display votes awarded BY the selected country
    +to_country      - Disaply votes awarded TO the selected country
    +spearman_ranked - Display how "fairly" the country voted, given the final score (NOT YET IMPLEMENTED!)
    +final_scores    - Display final voting scores

##Votes from:
    +combined        - The scores actually awarded to each country, in the competition
    +televote        - The scores as given by the public vote ONLY
    +jury            - The scores as given by the jury panel ONLY

(Note: For most years, this "full breakdown" of split vote scores is unfortunately unavailable.)

##Year:
    +Select competition year (currenty only 2014 available)

##Colour Scheme:
    +Full spectrum   - Display the full green-->red colours for all countries
    +Point awards    - Only colour countries that were awarded any points. (This makes certain patterns easier to see.)

(Note: Since 1975, the top 10 countries have been awarded points. Before that, it gets a lot more complicated.)
