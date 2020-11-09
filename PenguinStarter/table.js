var tabTitle = function (msg) {
    d3.select("h2")
    .text(msg);
}

var getImage = function(aStudent){
    console.log
    return "imgs/" + aStudent.picture;
};

var getGrade = function(item) {
    return item.grade;
}

var getQuizAverage = function(aStudent) { //remember to finish
    var QObj = aStudent.quizes.map(function(quiz) {return quiz.grade});
    var avg=d3.mean(QObj);
    console.log(avg)
    return avg.toFixed(2);
}
    
var getTestAverage=function(aStudent){
    var Tobj = aStudent.test;
    var Tscores = Tobj.map(getGrade);
    var avg =d3.mean(Tscores);

    return avg.toFixed(2);
}

var getHwkGrades = function(aStudent){
    var Hobj = aStudent.homework;
    var Hscores =Hobj.map(getGrade);
    var avg=d3.mean(Hscores);
    return avg.toFixed(2);
}

var getFinalGrade = function(aStudent) {
    return aStudent.final[0].grade;
}

var successFCN = function(students) { 
console.log("student data",students);
drawTable(students);
initHeaders(students)
};

var errFCN = function(errMSG) {
console.log(errMSG);
};

var drawTable = function(students) {
    var rows = d3.select("#fullTable tbody")
    .selectAll("tr")
    .data(students)
    .enter()
    .append("tr");
    rows.append("td")
    .append("img")
    .attr("class", "pict")
    .attr("src",getImage);
    rows.append("td")
    .attr("class","quiz")
    .text(getQuizAverage);
    rows.append("td")
    .attr("class","hwk")
    .text(getHwkGrades);
    rows.append("td")
    .attr("class","test")
    .text(getTestAverage);
    rows.append("td")
    .attr("class","final")
    .text(getFinalGrade);
    
};

var clearTable = function() {
    d3.selectAll("#fullTable tbody tr")
    .remove();
}
var initHeaders = function(students) {
    d3.select("#quiz")
    .on("click", function() {
        console.log("clicked quiz")
        students.sort(function(a,b) {
                      var av1=getQuizAverage(a);
        var av2=getQuizAverage(b);
        if(av1 <av2) {return -1;}
        else if (av1==av2) {return 0;}
        else {return 1;}
                      });
    
clearTable();
drawTable(students);
d3.selectAll(".quiz")
.attr("class","selected");
})};

d3.select("#hwk")
.on("click", function() {
    
})

var penguinPromise = d3.json("classData.json");
penguinPromise.then(successFCN,errFCN);
    