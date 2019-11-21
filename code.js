var Promise = d3.csv("EduFilms.csv")
var success = function(data)
    {
        console.log(data)
        console.log(data.map(getfilm))
        
    }
var fail = function(data)
    {
        console.log("fail")
    }
Promise.then(success,fail)

var PPromise = d3.csv("Participants.csv")
var success = function(data)
    {
        console.log(data)
    }
var fail = function(data)
    {
        console.log("fail")
    }
PPromise.then(success,fail)


var  getfilm = function(d)
{
    return d.FilmOnce;
}

