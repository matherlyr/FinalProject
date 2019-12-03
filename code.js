var screen = {width: 1010, height:600}
var margin = {top: 50, right: 80, bottom: 30, left: 80};


//This is my promise
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
    console.log(OE10(films))
    console.log(Recognition8(films))
    console.log(Recognition10(films))
    console.log(Important8(films))
    console.log(Important10(films))
    console.log(Unimportant8(films))
    console.log(Unimportant10(films))
    
    setup(films)
}
var fail = function(err)
{
    console.log("fail",err)
}
var PPromise = d3.csv("Participants.csv")

Promise.all([EPromise, PPromise]).then(success,fail)

//These are all my arrays
var FreeRecall8 = function(data){return [data[0].SchoolLessonandFilm , data[0].FilmRepetition, data[0].FilmOnce , data[0].SchoolLessonOnce]}
var FreeRecall10 = function(data){return [data[1].SchoolLessonandFilm , data[1].FilmRepetition, data[1].FilmOnce , data[1].SchoolLessonOnce]}
var OE8 = function(data){return [data[2].SchoolLessonandFilm , data[2].FilmRepetition, data[2].FilmOnce , data[2].SchoolLessonOnce]}
var OE10 = function(data){return [data[3].SchoolLessonandFilm , data[3].FilmRepetition, data[3].FilmOnce , data[3].SchoolLessonOnce]}
var Recognition8 = function(data){return [data[4].SchoolLessonandFilm , data[4].FilmRepetition, data[4].FilmOnce , data[4].SchoolLessonOnce]}
var Recognition10 = function(data){return [data[5].SchoolLessonandFilm , data[5].FilmRepetition, data[5].FilmOnce , data[5].SchoolLessonOnce]}
var Important8 = function(data){return [data[6].SchoolLessonandFilm , data[6].FilmRepetition, data[6].FilmOnce , data[6].SchoolLessonOnce]}
var Important10 = function(data){return [data[7].SchoolLessonandFilm , data[7].FilmRepetition, data[7].FilmOnce , data[7].SchoolLessonOnce]}
var Unimportant8 = function(data){return [data[8].SchoolLessonandFilm , data[8].FilmRepetition, data[8].FilmOnce , data[8].SchoolLessonOnce]}
var Unimportant10 = function(data){return [data[9].SchoolLessonandFilm , data[9].FilmRepetition, data[9].FilmOnce , data[9].SchoolLessonOnce]}

//This is where the real code starts

var setup = function(data)
{
    d3.select("svg")
        .attr("width", screen.width)
        .attr("height", screen. height)
        .append("g")
        .attr("id", "graph")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    d3.select("#graph2")
        .attr("width", screen.width)
        .attr("height", screen. height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("id", "transform2")
        
    
    var width = screen.width - margin.left - margin.right;
    var height = screen.height - margin.top - margin.bottom;
    
    var xScale = d3.scaleBand()
        .domain(["School Lesson and Film" , "Film Repetition" , "Film Once" , "School Lesson Once"])
        .range([0, screen.width])
        .paddingInner(.5)
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
    
    d3.select("#graph2")
        .append("g")
        .classed("axis", true);
    
    d3.select(".axis")
        .append("g")
        .attr("id", "xAxis")
        .attr("transform", "translate("+margin.left+","+(margin.top+height)+")")
        .call(xAxis)
    
    d3.select("#graph2").select(".axis")
        .append("g")
        .attr("id", "xAxis")
        .attr("transform", "translate("+margin.left+","+(margin.top+height)+")")
        .call(xAxis)
    
    d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform", "translate(80,"+margin.top+")")
        .call(yAxis1)
    
    d3.select("#graph2").select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform", "translate(80,"+margin.top+")")
        .call(yAxis1)
    
    FreeRecallBars(data, xScale, yScale, cScale, numxScale);
    
    d3.select("#FreeRecallButton").on("click", function()
        {
            console.log("Free Recall Clicked")
            remove()
            console.log("remove")
            FreeRecallBars(data, xScale, yScale, cScale, numxScale)
            console.log("done")
        })
    d3.select("#RecognitionButton").on("click", function()
        {
            console.log("Recognition Clicked")
            remove()
            console.log("remove")
            RecognitionBars(data, xScale, yScale, cScale, numxScale)
            console.log("done")
        })
    d3.select("#OEButton").on("click", function()
        {
            console.log("Open-Ended Clicked")
            remove()
            console.log("remove")
            OEBars(data, xScale, yScale, cScale, numxScale)
            console.log("done")
        })
    d3.select("#ImportantButton").on("click", function()
        {
            console.log("Important Clicked")
            remove()
            console.log("remove")
            ImportantBars(data, xScale, yScale, cScale, numxScale)
            console.log("done")
        })
    d3.select("#UnimportantButton").on("click", function()
        {
            console.log("Unimportant Clicked")
            remove()
            console.log("remove")
            UnimportantBars(data, xScale, yScale, cScale, numxScale)
            console.log("done")
        
        })
}



//Creating Bars

var FreeRecallBars=function(data,xScale, yScale, cScale, numxScale)
{
    d3.select("#graph").selectAll("rect").data(FreeRecall8(data)).enter().append("rect")
        .attr("width", xScale.bandwidth())
        .attr("height", function(d){return yScale(100 - d)})
        .attr ("x", function (d, index){return numxScale(index)} )
        .attr ("y", function (d){return yScale(d)})
        .attr("fill", "#0984e3")
        .on("mouseover", function(d) {
            var label = "(" + d + ")"
            d3.select("#tooltip")
            .style("left", (d3.event.pageX + "px"))
            .style("top", (d3.event.pageY - 20) + "px")
            .select("p")
            .text(label)
            d3.select("#tooltip")
           .classed("hidden", false)
         })
            
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        })
    
    d3.select("#transform2").selectAll("rect").data(FreeRecall10(data)).enter().append("rect")
        .attr("width", 100)
        .attr("height", function(d){return yScale(100 - d)})
        .attr ("x", function (d, index){return numxScale(index)} )
        .attr ("y", function (d){return yScale(d)})
        .attr("fill", "#d63031")
    .on("mouseover", function(d) {
            var label = "(" + d + ")"
            d3.select("#tooltip")
            .style("left", (d3.event.pageX + "px"))
            .style("top", (d3.event.pageY - 20) + "px")
            .select("p")
            .text(label)
            d3.select("#tooltip")
           .classed("hidden", false)
         })
            
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        })
    
//tooltip goes here on pg 213 of Murray    .on 

}

var RecognitionBars=function(data,xScale, yScale, cScale, numxScale)
{
    d3.select("#graph").selectAll("rect").data(Recognition8(data)).enter().append("rect")
        .attr("width", xScale.bandwidth())
        .attr("height", function(d){return yScale(100 - d)})
        .attr ("x", function (d, index){return numxScale(index)} )
        .attr ("y", function (d){return yScale(d)})
        .attr("fill", "#0984e3")
    .on("mouseover", function(d) {
            var label = "(" + d + ")"
            d3.select("#tooltip")
            .style("left", (d3.event.pageX + "px"))
            .style("top", (d3.event.pageY - 20) + "px")
            .select("p")
            .text(label)
            d3.select("#tooltip")
           .classed("hidden", false)
         })
            
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        })
    
    d3.select("#transform2").selectAll("rect").data(Recognition10(data)).enter().append("rect")
        .attr("width", 100)
        .attr("height", function(d){return yScale(100 - d)})
        .attr ("x", function (d, index){return numxScale(index)} )
        .attr ("y", function (d){return yScale(d)})
        .attr("fill", "#d63031")
    .on("mouseover", function(d) {
            var label = "(" + d + ")"
            d3.select("#tooltip")
            .style("left", (d3.event.pageX + "px"))
            .style("top", (d3.event.pageY - 20) + "px")
            .select("p")
            .text(label)
            d3.select("#tooltip")
           .classed("hidden", false)
         })
            
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        })

}

var OEBars=function(data,xScale, yScale, cScale, numxScale)
{
    d3.select("#graph").selectAll("rect").data(OE8(data)).enter().append("rect")
        .attr("width", xScale.bandwidth())
        .attr("height", function(d){return yScale(100 - d)})
        .attr ("x", function (d, index){return numxScale(index)} )
        .attr ("y", function (d){return yScale(d)})
        .attr("fill", "#0984e3")
    .on("mouseover", function(d) {
            var label = "(" + d + ")"
            d3.select("#tooltip")
            .style("left", (d3.event.pageX + "px"))
            .style("top", (d3.event.pageY - 20) + "px")
            .select("p")
            .text(label)
            d3.select("#tooltip")
           .classed("hidden", false)
         })
            
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        })
    
    d3.select("#transform2").selectAll("rect").data(OE10(data)).enter().append("rect")
        .attr("width", 100)
        .attr("height", function(d){return yScale(100 - d)})
        .attr ("x", function (d, index){return numxScale(index)} )
        .attr ("y", function (d){return yScale(d)})
        .attr("fill", "#d63031")
    .on("mouseover", function(d) {
            var label = "(" + d + ")"
            d3.select("#tooltip")
            .style("left", (d3.event.pageX + "px"))
            .style("top", (d3.event.pageY - 20) + "px")
            .select("p")
            .text(label)
            d3.select("#tooltip")
           .classed("hidden", false)
         })
            
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        })

}

var ImportantBars=function(data,xScale, yScale, cScale, numxScale)
{
    d3.select("#graph").selectAll("rect").data(Important8(data)).enter().append("rect")
        .attr("width", xScale.bandwidth())
        .attr("height", function(d){return yScale(100 - d)})
        .attr ("x", function (d, index){return numxScale(index)} )
        .attr ("y", function (d){return yScale(d)})
        .attr("fill", "#0984e3")
    .on("mouseover", function(d) {
            var label = "(" + d + ")"
            d3.select("#tooltip")
            .style("left", (d3.event.pageX + "px"))
            .style("top", (d3.event.pageY - 20) + "px")
            .select("p")
            .text(label)
            d3.select("#tooltip")
           .classed("hidden", false)
         })
            
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        })
    
    d3.select("#transform2").selectAll("rect").data(Important10(data)).enter().append("rect")
        .attr("width", 100)
        .attr("height", function(d){return yScale(100 - d)})
        .attr ("x", function (d, index){return numxScale(index)} )
        .attr ("y", function (d){return yScale(d)})
        .attr("fill", "#d63031")
    .on("mouseover", function(d) {
            var label = "(" + d + ")"
            d3.select("#tooltip")
            .style("left", (d3.event.pageX + "px"))
            .style("top", (d3.event.pageY - 20) + "px")
            .select("p")
            .text(label)
            d3.select("#tooltip")
           .classed("hidden", false)
         })
            
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        })

}

var UnimportantBars=function(data,xScale, yScale, cScale, numxScale)
{
    d3.select("#graph").selectAll("rect").data(Unimportant8(data)).enter().append("rect")
        .attr("width", xScale.bandwidth())
        .attr("height", function(d){return yScale(100 - d)})
        .attr ("x", function (d, index){return numxScale(index)} )
        .attr ("y", function (d){return yScale(d)})
        .attr("fill", "#0984e3")
    .on("mouseover", function(d) {
            var label = "(" + d + ")"
            d3.select("#tooltip")
            .style("left", (d3.event.pageX + "px"))
            .style("top", (d3.event.pageY - 20) + "px")
            .select("p")
            .text(label)
            d3.select("#tooltip")
           .classed("hidden", false)
         })
            
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        })
    
    d3.select("#transform2").selectAll("rect").data(Unimportant10(data)).enter().append("rect")
        .attr("width", 100)
        .attr("height", function(d){return yScale(100 - d)})
        .attr ("x", function (d, index){return numxScale(index)} )
        .attr ("y", function (d){return yScale(d)})
        .attr("fill", "#d63031")
    .on("mouseover", function(d) {
            var label = "(" + d + ")"
            d3.select("#tooltip")
            .style("left", (d3.event.pageX + "px"))
            .style("top", (d3.event.pageY - 20) + "px")
            .select("p")
            .text(label)
            d3.select("#tooltip")
           .classed("hidden", false)
         })
            
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        })

}

//Remove Function

var remove = function()
    {
        d3.selectAll("#graph *").remove()
        d3.selectAll("#transform2 *").remove()
    }