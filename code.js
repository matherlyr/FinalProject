var screen = {width: 600, height:600}
var margin = {top: 50, right: 80, bottom: 30, left: 80};



var EPromise = d3.csv("EduFilms.csv")

var success =function(both)
{
    var films=both[0]
    var participants=both[1]
    
    var parsing1 = function(d){d.FilmOnce = +d.FilmOnce}
    var parsing2 = function(d){d.FilmRepetition = +d.FilmRepetition}
    var parsing3 = function(d){d.SchoolLessonOnce = +d.SchoolLessonOnce}
    var parsing4 = function(d){d.SchoolLessonandFilm = +d.SchoolLessonandFilm}
    
    films.forEach(parsing1)
    films.forEach(parsing2)
    films.forEach(parsing3)
    films.forEach(parsing4)
    
    console.log(films)
    console.log(participants)
    console.log(FreeRecall8(films))
    console.log(FreeRecall10(films))
    console.log(OE8(films))
    setup(films)
}
var fail = function(err)
{
    console.log("fail",err)
}
var PPromise = d3.csv("Participants.csv")

Promise.all([EPromise, PPromise]).then(success,fail)

//var  getfilm = function(d)
//{
//    return d.FilmOnce;
//}
//
var FreeRecall8 = function(data){return [data[0].SchoolLessonandFilm , data[0].FilmRepetition, data[0].FilmOnce , data[0].SchoolLessonOnce]}
var FreeRecall10 = function(data){return [data[1].SchoolLessonandFilm , data[1].FilmRepetition, data[1].FilmOnce , data[1].SchoolLessonOnce]}
var OE8 = function(data){return [data[2].SchoolLessonandFilm , data[2].FilmRepetition, data[2].FilmOnce , data[2].SchoolLessonOnce]}

//This is where the real code starts


//var x = d3.scaleOrdinal().rangeRoundBands([0, width], .1);

var setup = function(data)
{
    d3.select("svg")
        .attr("width", screen.width)
        .attr("height", screen. height)
        .append("g")
        .attr("id", "graph")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        var width = screen.width - margin.left - margin.right;
        var height = screen.height - margin.top - margin.bottom;
    
    var xScale = d3.scaleBand()
        .domain(["School Lesson and Film" , "Film Repetition" , "Film Once" , "School Lesson Once"])
        .range([0, screen.width])
    var yScale = d3.scaleLinear()
        .domain([-15.3,100])
        .range([screen.height, 0])
    var numxScale= d3.scaleLinear()
        .domain([0,4])
        .range([0, screen.width])
    
    var cScale=d3.scaleOrdinal(d3.schemeTableau10)
    
    var xAxis = d3.axisBottom()
        .scale(xScale)
    var yAxis1 = d3.axisLeft(yScale)
    var yAxis2 = d3.axisRight(yScale)
    
    d3.select("svg")
        .append("g")
        .classed("axis", true);
    
    d3.select(".axis")
        .append("g")
        .attr("id", "xAxis")
        .attr("transform", "translate("+margin.left+","+(margin.top+height)+")")
        .call(xAxis)
    d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform", "translate(80,"+margin.top+")")
        .call(yAxis1)
    
    createBars(data, xScale, yScale, cScale, numxScale);
}

var createBars=function(data,xScale, yScale, cScale, numxScale)
{
    d3.select("#graph").selectAll("rect").data(FreeRecall8(data)).enter().append("rect")
        .attr("width", 100)
        .attr("height", function(d){return yScale(100 - d)})
        .attr ("x", function (d, index){
       return numxScale(index)} )
        .attr ("y", function (d){return yScale(d)})

}