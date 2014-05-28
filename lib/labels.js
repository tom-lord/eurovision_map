function verbose_label(label, code)
{
    var new_label = label[0].textContent + "<br />"; // Get country name
    if( country_entered(code) )
    {
        new_label += "Position: " + country_position(code) + "/" + number_of_countries_entered()
            + "<br />Total Score: " + country_score(code);
    }
    else if( country_voted_only(code) )
    {
        new_label += "(Voted but did<br />not compete)"
    }
    else
    {
        new_label += "(Did not compete)"
    }
    return new_label;
}

function country_entered(code)
{
    //TODO: One day, year will be configurable
    return jQuery.inArray(code.toUpperCase(), contestants_entered_2014) != -1
}

function country_voted_only(code)
{
    //TODO: One day, year will be configurable
    return jQuery.inArray(code.toUpperCase(), contestants_voted_only_2014) != -1
}

function country_score(to_country)
{
    var score = 0;
    for(var from_country in from_country_2014_rank) //TODO: One day, this will be configurable
    {
        if( from_country != to_country.toUpperCase())
        {
            score += (VOTING.from_1975_to_present[ from_country_2014_rank[from_country][to_country] - 1 ] || 0);
        }
    }
    return score;
}

function country_position(code)
{
    // This is really inefficient, but means I can be lazy in entering data
    var position = 1;
    var is_joint_position = false;
    my_score = country_score(code);
    //TODO: One day, year will be configurable
    jQuery.each(contestants_entered_2014, function(idx) 
    {
        contestant = this.toLowerCase();
        if( contestant != code )
        {
            var their_score = country_score(contestant);
            if( their_score > my_score )
            {
                position += 1;
            }
            else if( their_score == my_score )
            {
                is_joint_position = true;
            }
        }
    })
    if(is_joint_position)
    {
        position = "==" + position;
    }
    return position;
}

function number_of_countries_entered()
{
    //TODO: One day, year will be configurable
    return contestants_entered_2014.length;
}
