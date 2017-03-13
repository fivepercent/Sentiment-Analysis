
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

function render(box) {
    var content = document.getElementById("content");
    for (var b in box) {
        var container = document.createElement("DIV");
        container.className="container";
        var title = document.createElement("P");
        title.innerHTML = b;
        var canvas = document.createElement("CANVAS");
        container.appendChild(title);
        container.appendChild(canvas);
        
        content.appendChild(container);
        //var ctx = document.getElementById("myChart");
        var chart = new Chart(canvas, {
            type: 'doughnut',
            data: box[b],
            options: {
                animation: {
                    animateScale: true
                }
            }
        });
    }
}

function setupData(){
    var box = {};
    var exampleData = {
        labels: [
            "Positive",
            "Neg",
            "Neutral"
        ],
        datasets: [
            {
                data: [],
                backgroundColor:[
                    "#327175",
                    "#E1BF8A",
                    "#FF5344"
                ],
                borderWidth:5,
                hoverBackgroundColor: [
                    "#1F6384",
                    "#16A2EB",
                    "#1FCE56"
                ],
                hoverBorderColor:[
                    "#1F6384",
                    "#16A2EB",
                    "#1FCE56"
                ]
            }]
    };
    readTextFile("data/result.json", function (text) {
        var result = JSON.parse(text);
        for (var i = 0; i < result.length; i++) {
            var labels = [];
            var data = [];
            for (var d in result[i].data) {
                labels.push(d);
                data.push(result[i].data[d]);
            }
            exampleData.labels = labels;
            exampleData.datasets[0].data = data;
            box[result[i].title] = JSON.parse(JSON.stringify(exampleData));
        }
        render(box);
    });
}

setupData();
