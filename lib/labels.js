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

function country_score(to_country)
{
    var score = 0;
    for(var from_country in from_country_rankings())
    {
        if( from_country != to_country.toUpperCase())
        {
            score += VOTING.apply( from_country_rankings()[from_country][to_country] );
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
    jQuery.each(contestants_entered(), function(idx) 
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
    return contestants_entered().length;
}
