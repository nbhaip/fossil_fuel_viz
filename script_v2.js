// Learned to load data asynchronously from: http://usabilityetc.com/2016/08/how-to-perform-multiple-asynchronous-tasks-with-d3/
var data;
d3.csv("all_years_data_v2.csv", function (d) {
    data = d;
    draw("1997", "United_States");
})


var stateList2 = [
    {
        "name": "Alabama",
        "alpha-2": "AL"
    },
    {
        "name": "Alaska",
        "alpha-2": "AK"
    },
    {
        "name": "Arizona",
        "alpha-2": "AZ"
    },
    {
        "name": "Arkansas",
        "alpha-2": "AR"
    },
    {
        "name": "California",
        "alpha-2": "CA"
    },
    {
        "name": "Colorado",
        "alpha-2": "CO"
    },
    {
        "name": "Connecticut",
        "alpha-2": "CT"
    },
    {
        "name": "Delaware",
        "alpha-2": "DE"
    },
    {
        "name": "District of Columbia",
        "alpha-2": "DC"
    },
    {
        "name": "Florida",
        "alpha-2": "FL"
    },
    {
        "name": "Georgia",
        "alpha-2": "GA"
    },
    {
        "name": "Hawaii",
        "alpha-2": "HI"
    },
    {
        "name": "Idaho",
        "alpha-2": "ID"
    },
    {
        "name": "Illinois",
        "alpha-2": "IL"
    },
    {
        "name": "Indiana",
        "alpha-2": "IN"
    },
    {
        "name": "Iowa",
        "alpha-2": "IA"
    },
    {
        "name": "Kansa",
        "alpha-2": "KS"
    },
    {
        "name": "Kentucky",
        "alpha-2": "KY"
    },
    {
        "name": "Louisiana",
        "alpha-2": "LA"
    },
    {
        "name": "Maine",
        "alpha-2": "ME"
    },
    {
        "name": "Maryland",
        "alpha-2": "MD"
    },
    {
        "name": "Massachusetts",
        "alpha-2": "MA"
    },
    {
        "name": "Michigan",
        "alpha-2": "MI"
    },
    {
        "name": "Minnesota",
        "alpha-2": "MN"
    },
    {
        "name": "Mississippi",
        "alpha-2": "MS"
    },
    {
        "name": "Missouri",
        "alpha-2": "MO"
    },
    {
        "name": "Montana",
        "alpha-2": "MT"
    },
    {
        "name": "Nebraska",
        "alpha-2": "NE"
    },
    {
        "name": "Nevada",
        "alpha-2": "NV"
    },
    {
        "name": "New Hampshire",
        "alpha-2": "NH"
    },
    {
        "name": "New Jersey",
        "alpha-2": "NJ"
    },
    {
        "name": "New Mexico",
        "alpha-2": "NM"
    },
    {
        "name": "New York",
        "alpha-2": "NY"
    },
    {
        "name": "North Carolina",
        "alpha-2": "NC"
    },
    {
        "name": "North Dakota",
        "alpha-2": "ND"
    },
    {
        "name": "Ohio",
        "alpha-2": "OH"
    },
    {
        "name": "Oklahoma",
        "alpha-2": "OK"
    },
    {
        "name": "Oregon",
        "alpha-2": "OR"
    },
    {
        "name": "Pennsylvania",
        "alpha-2": "PA"
    },
    {
        "name": "Rhode Island",
        "alpha-2": "RI"
    },
    {
        "name": "South Carolina",
        "alpha-2": "SC"
    },
    {
        "name": "South Dakota",
        "alpha-2": "SD"
    },
    {
        "name": "Tennessee",
        "alpha-2": "TN"
    },
    {
        "name": "Texas",
        "alpha-2": "TX"
    },
    {
        "name": "Utah",
        "alpha-2": "UT"
    },
    {
        "name": "Vermont",
        "alpha-2": "VT"
    },
    {
        "name": "Virginia",
        "alpha-2": "VA"
    },
    {
        "name": "Washington",
        "alpha-2": "WA"
    },
    {
        "name": "West Virginia",
        "alpha-2": "WV"
    },
    {
        "name": "Wisconsin",
        "alpha-2": "WI"
    },
    {
        "name": "Wyoming",
        "alpha-2": "WY"
    }
]

function selectOne() {
    var select = document.getElementById('ChooseState');
    for (var i = 0; i < stateList2.length; i++) {
        select.options[select.options.length] = new Option(stateList2[i]["name"], stateList2[i]["name"]);
    }
}
selectOne();
var x_copy;
var y_copy;
// pass in a year to draw function
function draw(year) {

    d3.selectAll("svg").remove();
    d3.selectAll(".tooltip").remove();
    d3.select(".tex").remove();
    d3.select(".nd").remove();
    d3.select(".ak").remove();

    if (document.getElementById("usCheck").checked) {
        document.getElementById("texCheck").checked = false;

        document.getElementById("ndCheck").checked = false;

        document.getElementById("akCheck").checked = false;

    }
    var selectIndex = document.getElementById('ChooseState').selectedIndex;
    // https://swizec.com/blog/quick-scatterplot-tutorial-for-d3-js/swizec/5337
    //https://bl.ocks.org/d3noob/6f082f0e3b820b6bf68b78f2f7786084
    var width = 1000,
        height = 400,
        pad = 20,
        left_pad = 120;

    //format currency
    var formatCurr = d3.format("$,.2f");

    var formatTwoPlaces = d3.format(".2f");


    var svg = d3.select("#scatterPlot")
        .append("svg")
        .attr("width", width + pad * 2)
        .attr("height", height + 2 * pad);

    if (document.getElementById('texCheck').checked) {
        var newData2 = data.filter(function (d) {
            return d["state"] === "Texas";
        });
        svg.append("path")
            .attr("d", lineFunction(newData2))
            .attr("stroke-width", 2)
            .attr("stroke", "yellow")
            .attr("fill", "none")
            .attr("class", "tex");
    } else {
        d3.select(".tex").remove();
    }

    if (document.getElementById('akCheck').checked) {
        var newData2 = data.filter(function (d) {
            return d["state"] === "Alaska";
        });
        svg.append("path")
            .attr("d", lineFunction(newData2))
            .attr("stroke-width", 2)
            .attr("stroke", "#00FFFF")
            .attr("fill", "none")
            .attr("class", "ak");
    } else {
        d3.select(".ak").remove();
    }

    if (document.getElementById('ndCheck').checked) {
        var newData2 = data.filter(function (d) {
            return d["state"] === "North Dakota";
        });
        svg.append("path")
            .attr("d", lineFunction(newData2))
            .attr("stroke-width", 2)
            .attr("stroke", "#00FF00")
            .attr("fill", "none")
            .attr("class", "nd");
    } else {
        d3.select(".nd").remove();
    }
    //var x = d3.scaleLinear().domain([0, 135]).range([left_pad, width - pad]), //co2 per cap
    //    y = d3.scaleLinear().domain([200000, 25000]).range([pad, height - pad]); //gdp per cap
    var max_payroll;
    if (document.getElementById("usCheck").checked) {
        max_payroll = 65000000; // max payroll fossil fuel industry made in one year
    } else {
        max_payroll = d3.max(data, function (d) {
            return +d["payroll_thousands"];
        });
    };
    var x = d3.scaleLinear().domain([0, 135]).range([left_pad, width - pad]), //co2 per cap
        y = d3.scaleLinear().domain([max_payroll, 0]).range([pad, height - pad]); //gdp per cap
    x_copy = x;
    y_copy = y;
    var xAxis = d3.axisBottom(x),
        yAxis = d3.axisLeft(y).tickFormat(formatCurr);

    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, " + (height - pad) + ")")
        .call(xAxis)

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (left_pad) + ", 0)")
        .call(yAxis);

    var stateData = data.filter(function (d) {
        return d["state"] === document.getElementById('ChooseState').value;
    });
    svg.append("path")
        .attr("d", lineFunction(stateData))
        .attr("stroke-width", 2)
        .attr("stroke", "#FF1493")
        .attr("fill", "none");


    svg.selectAll("circle")
        .data(data)
        .enter()
        .filter(function (d) {
            return d["year"] === year;
        }) //Use this to filter your data
        .append("circle")
        .attr("cx", function (d) {
            return x(+d["co2_per_cap"]);
        })
        .attr("cy", function (d) {
            return y(+d["payroll_thousands"]);
        })

    .attr("r", function (d) {
            return formatTwoPlaces((+d["employees"] / (+d["pop_size"]) * 200) + 2.5);
        })
        .style("fill", function (d) {
            switch (d["region"]) {
            case "Northeast":
                return "red";
            case "Midwest":
                return "blue";
            case "West":
                return "green";
            case "South":
                return "orange";
            }
        })
        .style("opacity", function (d) {
            var myRegion = document.getElementById("ChooseRegion").value;
            if (myRegion === d["region"] || myRegion === "All") {
                return 1;
            } else {
                return 0.1;
            }

        })

    //http://bl.ocks.org/weiglemc/6185069
    .on("mouseover", function (d) {
            var myState = d["state"];
            //HELLO
            var newData = data.filter(function (d) {
                return d["state"] === myState;
            });


            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(d["state"] + "<br/> (" + formatTwoPlaces(+d["co2_per_cap"]) + ", " +
                    formatCurr(+d["payroll_thousands"]) + ")")
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            svg.append("path")
                .attr("d", lineFunction(newData))
                .attr("stroke-width", 2)
                .attr("stroke", "darkgray")
                .attr("fill", "none")
                .attr("class", "traceLine");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
            svg.selectAll(".traceLine").remove();

        });


    svg.append("text")
        .attr("x", width - 5 * pad)
        .attr("font-size", "50px")
        .attr("y", 50)
        .style("font-family", "Helvetica Neue")
        .style("font-weight", "300")
        .text(year);

    svg.append("text")
        .attr("x", width - 25 * pad)
        .attr("font-size", "16px")
        .attr("y", 100)
        .style("align-content", "right")
        .style("font-family", "Helvetica Neue")
        .style("font-weight", "300")
        .text(function (d) {
            switch (year) {
            case "1997":
                return "EPA issues tough new air quality standards for smog and soot.";
            case "1999":
                return "New Emissions Standards for Cars: Tailpipes must be 77-95% cleaner.";
            case "2005":
                return "Energy Policy Act provides secured loans for tech that avoids" +
                    " greenhouse gases.";
            case "2008":
                return "Recession is associated with a significant drop in CO2 per capita for all states.";
            case "2009":
                return "Recession is associated with a significant drop in CO2 per capita for all states.";
            case "2014":
                return "Clean Power Plan would cut carbon pollution from existing power plants.";
            default:
                return "";
            }
        });

    svg.append("text")
        .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate(" + (pad / 1.5) + "," + (height / 2) + ")rotate(-90)") // text is drawn off the screen top left, move down and out and rotate
        .style("font-family", "Helvetica Neue")
        .style("font-weight", "300")

    .text("Fossil Fuel Industry Payroll \n (1000s of Dollars)");

    svg.append("text")
        .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
        .style("font-family", "Helvetica Neue")
        .style("font-weight", "300")

    .attr("transform", "translate(" + (width / 2) + "," + (height + 1 * pad) + ")") // centre below axis
        .text("Tons of CO2 generated / capita");

    // working on adding reference average co2/cap SVG line for Americans in that year
    var co2_mean = d3.mean(data.filter(function (d) {
        return d["year"] === year;
    }), function (d) {
        return +d["co2_per_cap"];
    });

    var payroll_sum = getSum("payroll_thousands", year);


    svg.append("line")
        .attr("x1", x(co2_mean))
        .attr("y1", 20)
        .attr("x2", x(co2_mean))
        .attr("y2", 390)
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5, 5")
        .attr("stroke", "purple");

    svg.append("svg:image")
        .attr('x', x(co2_mean) - 10)
        .attr('y', y(payroll_sum))
        .attr('width', 20)
        .attr('height', 20)
        .attr("xlink:href", "us_pic_v1.png")
        .attr("opacity", function (d) {
            if (document.getElementById("usCheck").checked) {
                return 1;
            } else {
                return 0;
            }
        })

    .on("mouseover", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("United States" + "<br/> Average CO2 per capita: " + formatTwoPlaces(co2_mean) + "<br/> Total Fossil Fuel Industry Payroll: " + formatCurr(payroll_sum))
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });


    var pie = new d3pie("pieChartState", {
        "header": {
            "title": {
                "text": stateList2[selectIndex]["alpha-2"],
                "fontSize": 20,
                "font": "Helvetica Neue"
            },
            "location": "pie-center"
                //            "subtitle": {
                //                "text": "A full pie chart to show off label collision detection and resolution.",
                //                "color": "#999999",
                //                "fontSize": 12,
                //                "font": "Helvetica Neue"
                //            },
        },

        "size": {
            "canvasWidth": 400,
            "canvasHeight": 200,
            "pieOuterRadius": "75%",
            "pieInnerRadius": "45%"
        },
        "data": {
            "sortOrder": "value-desc",
            "content": [
                {
                    "label": "Renewable",
                    "value": getStateSum("renewables", year),
                    "color": "#90EE90"
			},
                {
                    "label": "Petroleum",
                    "value": getStateSum("petroleum", year),
                    "color": "#8B7E66"
			},
                {
                    "label": "Coal",
                    "value": getStateSum("coal", year),
                    "color": "#808080"
			},
                {
                    "label": "Natural Gas",
                    "value": getStateSum("natural_gas", year),
                    "color": "#8B5742"
			}
		]
        },
        "labels": {
            "outer": {
                "pieDistance": 22
            },
            "inner": {
                "hideWhenLessThanPercentage": 3
            },
            "mainLabel": {
                "fontSize": 11
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 0
            },
            "value": {
                "color": "#adadad",
                "fontSize": 11
            },
            "lines": {
                "enabled": true
            },
            "truncation": {
                "enabled": true
            }
        },
        "misc": {
            "gradient": {
                "enabled": true,
                "percentage": 100
            }

        }
    });

    var pie = new d3pie("pieChartUSA", {
        "header": {
            "title": {
                "text": "US",
                "fontSize": 20,
                "font": "Helvetica Neue"
            },
            "location": "pie-center"
        },
        "size": {
            "canvasWidth": 400,
            "canvasHeight": 200,
            "pieOuterRadius": "75%",
            "pieInnerRadius": "45%"
        },
        "data": {
            "sortOrder": "value-desc",
            "content": [
                {
                    "label": "Renewable",
                    "value": getSum("renewables", year),
                    "color": "#90EE90"
			},
                {
                    "label": "Petroleum",
                    "value": getSum("petroleum", year),
                    "color": "#8B7E66"
			},
                {
                    "label": "Coal",
                    "value": getSum("coal", year),
                    "color": "#808080"
			},
                {
                    "label": "Natural Gas",
                    "value": getSum("natural_gas", year),
                    "color": "#8B5742"
			}
		]
        },
        "labels": {
            "outer": {
                "pieDistance": 22
            },
            "inner": {
                "hideWhenLessThanPercentage": 3
            },
            "mainLabel": {
                "fontSize": 11
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 0
            },
            "value": {
                "color": "#adadad",
                "fontSize": 11
            },
            "lines": {
                "enabled": true
            },
            "truncation": {
                "enabled": true
            }
        },
        "misc": {
            "gradient": {
                "enabled": true,
                "percentage": 100
            }
        }
    });
};

function getSum(category, year) {
    return d3.sum(data.filter(function (d) {
        return d["year"] === year;
    }), function (d) {
        return (+d[category]);
    })
};

var lineFunction = d3.line()
    .x(function (d) {
        return x_copy(+d["co2_per_cap"]);
    })
    .y(function (d) {
        return y_copy(+d["payroll_thousands"]);
    });
//.interpolate("linear");

function getStateSum(category, year) {
    return d3.sum(data.filter(function (d) {
        return d["year"] === year && d["state"] === document.getElementById('ChooseState').value;
    }), function (d) {
        return (+d[category]);
    });

};