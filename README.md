eurovision_map
==============

A graphical analysis of Eurovision voting patterns
Using the JQVMap framework (http://jqvmap.com/) for the map, and jquery-ui (http://jqueryui.com/) for the buttons.

eurovision_map.html contains an interactive map of Europe.
Clicking on a country shows the results of their votes in the 2014 eurovision song contest;
the way that this data is displayed is highly configurable.

###Configuration options:
####Vote type:
    from_country    - Display votes awarded BY the selected country
    to_country      - Disaply votes awarded TO the selected country
    spearman_ranked - Display how "fairly" the country voted, given the final score
    final_scores    - Display final voting scores

####Votes from:
    combined        - The scores actually awarded to each country, in the competition
    televote        - The scores as given by the public vote ONLY
    jury            - The scores as given by the jury panel ONLY
    difference      - Display how closely the jury and televotes were in agreement

The above two options actually show a *lot* of information! For example, "Final Scores" + "Difference" modes show, in descending order, which entries were the most controvertial between the juries and public.

####Year:
    Select competition year

(Note: Different years have different amounts of data available. For most years, features like "televote" and "full spectrum" will unfortunately need to be disabled.)

####Colour Scheme:
    Full spectrum   - Display the full green-->red colours for all countries
    Point awards    - Only colour countries that were awarded any points. (This makes certain patterns easier to see.)

(Note: Since 1975, the top 10 countries have been awarded points. Before that, it gets a lot more complicated.)


###TODO:
+ Add data. Lots more data.
+ Add more funky GUI features, because why not.
+ Properly resolve a slight bodge that's currenly put in for televote/jury votes: A couple of coutries didnt HAVE a televote/jury!!! I've hidden that fact, currently.
+ Make statistical analysis tools better... Spearman's rank WORKS, but isn't very useful.
+ Possibly make the "verbose_label" display a lot more: It could show ALL OF the combined, jury and public votes/score, rather than just the cirrently seleced mode. In doing this, I could also significantly improve performance by only making each calculation of "to_votes" etc once per click rather than 30-odd times!!
