var screen = {width: 1200, height:600}
var margin = {top: 80, right: 80, bottom: 80, left: 80};



var EPromise = d3.csv("EduFilms.csv")

var success =function(both)
{
    var films=both[0]
    var participants=both[1]
    console.log(films)
    console.log(participants)
    
    console.log(FreeRecall8(films))
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
//FreeRecall8[0]=data[0].SchoolLessonandFilm
//FreeRecall8[1]=data[0].FilmRepetition



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
        .domain([0,100])
        .range([screen.height, 0])
    
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
    
    createBars(data, xScale, yScale);
}

var createBars=function(data,xScale, yScale)
{
//  svg.append("g")
//      .attr("class", "x axis")
//      .attr("transform", "translate(0," + height + ")")
//      .call(xAxis);
//  svg.append("g")
//	  .attr("class", "y axis axisLeft")
//	  .attr("transform", "translate(0,0)")
//	  .call(yAxisLeft)
//	.append("text")
//	  .attr("y", 6)
//	  .attr("dy", "-2em")
//	  .style("text-anchor", "end")
//	  .style("text-anchor", "end")
//	  .text("Average Percent Correct");
//	
//  svg.append("g")
//	  .attr("class", "y axis axisRight")
//	  .attr("transform", "translate(" + (width) + ",0)")
//	  .call(yAxisRight)
//	.append("text")
//	  .attr("y", 6)
//	  .attr("dy", "-2em")
//	  .attr("dx", "2em")
//	  .style("text-anchor", "end")
//	  .text("#");
  var bars = 
    d3.select("svg").selectAll("rect").data(FreeRecall8).enter().append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return xScale(d.SchoolLessonandFilm); })
      .attr("width", x.rangeBand()/2)
      .attr("y", function(d) { return y0(d.SchoolLessonandFilm); })
	  .attr("height", function(d,i,j) { return height - y0(d.SchoolLessonandFilm); }); 
    bars.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) 
            {
        return xScale(d["10yearold"]); // + xScale.rangeBand()/2); 
                             })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y1(d.SchoolLessonandFilm); })
	  .attr("height", function(d,i,j) { return height - y1(d.SchoolLessonandFilm); }); 

    }