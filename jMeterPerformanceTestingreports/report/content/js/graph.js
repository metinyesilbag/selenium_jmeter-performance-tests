/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-48", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-49", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-46", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "2n Tech Is Dunyasi-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-47", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "2n Tech Is Dunyasi-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-44", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-45", "isController": false}, {"data": [[12400.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil", "isController": false}, {"data": [[1600.0, 1.0]], "isOverall": false, "label": "2n Tech Yasam", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-42", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-43", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-40", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-41", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-39", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "2n Tech Search", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "2n Tech Neden-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-37", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-38", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-35", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "2n Tech Neden-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-36", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-33", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-34", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "2n Tech Yasam-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "2n Tech Yasam-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-31", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-75", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-32", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-73", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-30", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-74", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-71", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-72", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-70", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-28", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-29", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-26", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-27", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-24", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-68", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-25", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-69", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-22", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-66", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-23", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-67", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "2n Tech", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-9", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-0", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-20", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-64", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-21", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-65", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-62", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-63", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-60", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "2n Tech Neden", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-61", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-6", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-7", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-17", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-18", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-15", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-59", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-16", "isController": false}, {"data": [[2000.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-13", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-57", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-14", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-58", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-55", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "2n Tech Is Dunyasi", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-56", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-19", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-53", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-10", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-54", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-51", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-52", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "2n Tech Nasil-50", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 12400.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 4.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 79.0, "series": [{"data": [[0.0, 79.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 5.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 4.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.7326239E12, "maxY": 1.0, "series": [{"data": [[1.7326239E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7326239E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 55.0, "minX": 1.0, "maxY": 12421.0, "series": [{"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-48", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-48-Aggregated", "isController": false}, {"data": [[1.0, 604.0]], "isOverall": false, "label": "2n Tech Nasil-49", "isController": false}, {"data": [[1.0, 604.0]], "isOverall": false, "label": "2n Tech Nasil-49-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-46", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-46-Aggregated", "isController": false}, {"data": [[1.0, 203.0]], "isOverall": false, "label": "2n Tech Is Dunyasi-0", "isController": false}, {"data": [[1.0, 203.0]], "isOverall": false, "label": "2n Tech Is Dunyasi-0-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-47", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-47-Aggregated", "isController": false}, {"data": [[1.0, 337.0]], "isOverall": false, "label": "2n Tech Is Dunyasi-1", "isController": false}, {"data": [[1.0, 337.0]], "isOverall": false, "label": "2n Tech Is Dunyasi-1-Aggregated", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-44", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-44-Aggregated", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-45", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-45-Aggregated", "isController": false}, {"data": [[1.0, 12421.0]], "isOverall": false, "label": "2n Tech Nasil", "isController": false}, {"data": [[1.0, 12421.0]], "isOverall": false, "label": "2n Tech Nasil-Aggregated", "isController": false}, {"data": [[1.0, 1673.0]], "isOverall": false, "label": "2n Tech Yasam", "isController": false}, {"data": [[1.0, 1673.0]], "isOverall": false, "label": "2n Tech Yasam-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-42", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-42-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-43", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-43-Aggregated", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-40", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-40-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "2n Tech Nasil-41", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "2n Tech Nasil-41-Aggregated", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "2n Tech Nasil-39", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "2n Tech Nasil-39-Aggregated", "isController": false}, {"data": [[1.0, 1025.0]], "isOverall": false, "label": "2n Tech Search", "isController": false}, {"data": [[1.0, 1025.0]], "isOverall": false, "label": "2n Tech Search-Aggregated", "isController": false}, {"data": [[1.0, 214.0]], "isOverall": false, "label": "2n Tech Neden-1", "isController": false}, {"data": [[1.0, 214.0]], "isOverall": false, "label": "2n Tech Neden-1-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-37", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-37-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-38", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-38-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-35", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-35-Aggregated", "isController": false}, {"data": [[1.0, 133.0]], "isOverall": false, "label": "2n Tech Neden-0", "isController": false}, {"data": [[1.0, 133.0]], "isOverall": false, "label": "2n Tech Neden-0-Aggregated", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "2n Tech Nasil-36", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "2n Tech Nasil-36-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "2n Tech Nasil-33", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "2n Tech Nasil-33-Aggregated", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-34", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-34-Aggregated", "isController": false}, {"data": [[1.0, 1509.0]], "isOverall": false, "label": "2n Tech Yasam-1", "isController": false}, {"data": [[1.0, 1509.0]], "isOverall": false, "label": "2n Tech Yasam-1-Aggregated", "isController": false}, {"data": [[1.0, 163.0]], "isOverall": false, "label": "2n Tech Yasam-0", "isController": false}, {"data": [[1.0, 163.0]], "isOverall": false, "label": "2n Tech Yasam-0-Aggregated", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "2n Tech Nasil-31", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "2n Tech Nasil-31-Aggregated", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "2n Tech Nasil-75", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "2n Tech Nasil-75-Aggregated", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "2n Tech Nasil-32", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "2n Tech Nasil-32-Aggregated", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "2n Tech Nasil-73", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "2n Tech Nasil-73-Aggregated", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "2n Tech Nasil-30", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "2n Tech Nasil-30-Aggregated", "isController": false}, {"data": [[1.0, 69.0]], "isOverall": false, "label": "2n Tech Nasil-74", "isController": false}, {"data": [[1.0, 69.0]], "isOverall": false, "label": "2n Tech Nasil-74-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "2n Tech Nasil-71", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "2n Tech Nasil-71-Aggregated", "isController": false}, {"data": [[1.0, 115.0]], "isOverall": false, "label": "2n Tech Nasil-72", "isController": false}, {"data": [[1.0, 115.0]], "isOverall": false, "label": "2n Tech Nasil-72-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-70", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-70-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-28", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-28-Aggregated", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "2n Tech Nasil-29", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "2n Tech Nasil-29-Aggregated", "isController": false}, {"data": [[1.0, 571.0]], "isOverall": false, "label": "2n Tech Nasil-26", "isController": false}, {"data": [[1.0, 571.0]], "isOverall": false, "label": "2n Tech Nasil-26-Aggregated", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-27", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-27-Aggregated", "isController": false}, {"data": [[1.0, 132.0]], "isOverall": false, "label": "2n Tech Nasil-24", "isController": false}, {"data": [[1.0, 132.0]], "isOverall": false, "label": "2n Tech Nasil-24-Aggregated", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "2n Tech Nasil-68", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "2n Tech Nasil-68-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "2n Tech Nasil-25", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "2n Tech Nasil-25-Aggregated", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "2n Tech Nasil-69", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "2n Tech Nasil-69-Aggregated", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "2n Tech Nasil-22", "isController": false}, {"data": [[1.0, 293.0]], "isOverall": false, "label": "2n Tech Nasil-22-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "2n Tech Nasil-66", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "2n Tech Nasil-66-Aggregated", "isController": false}, {"data": [[1.0, 348.0]], "isOverall": false, "label": "2n Tech Nasil-23", "isController": false}, {"data": [[1.0, 348.0]], "isOverall": false, "label": "2n Tech Nasil-23-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "2n Tech Nasil-67", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "2n Tech Nasil-67-Aggregated", "isController": false}, {"data": [[1.0, 1166.0]], "isOverall": false, "label": "2n Tech", "isController": false}, {"data": [[1.0, 1166.0]], "isOverall": false, "label": "2n Tech-Aggregated", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "2n Tech Nasil-8", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "2n Tech Nasil-8-Aggregated", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "2n Tech Nasil-9", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "2n Tech Nasil-9-Aggregated", "isController": false}, {"data": [[1.0, 147.0]], "isOverall": false, "label": "2n Tech Nasil-0", "isController": false}, {"data": [[1.0, 147.0]], "isOverall": false, "label": "2n Tech Nasil-0-Aggregated", "isController": false}, {"data": [[1.0, 239.0]], "isOverall": false, "label": "2n Tech Nasil-20", "isController": false}, {"data": [[1.0, 239.0]], "isOverall": false, "label": "2n Tech Nasil-20-Aggregated", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "2n Tech Nasil-64", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "2n Tech Nasil-64-Aggregated", "isController": false}, {"data": [[1.0, 219.0]], "isOverall": false, "label": "2n Tech Nasil-1", "isController": false}, {"data": [[1.0, 219.0]], "isOverall": false, "label": "2n Tech Nasil-1-Aggregated", "isController": false}, {"data": [[1.0, 192.0]], "isOverall": false, "label": "2n Tech Nasil-21", "isController": false}, {"data": [[1.0, 192.0]], "isOverall": false, "label": "2n Tech Nasil-21-Aggregated", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "2n Tech Nasil-65", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "2n Tech Nasil-65-Aggregated", "isController": false}, {"data": [[1.0, 177.0]], "isOverall": false, "label": "2n Tech Nasil-2", "isController": false}, {"data": [[1.0, 177.0]], "isOverall": false, "label": "2n Tech Nasil-2-Aggregated", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "2n Tech Nasil-62", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "2n Tech Nasil-62-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-3", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-3-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "2n Tech Nasil-63", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "2n Tech Nasil-63-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-4", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-4-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "2n Tech Nasil-60", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "2n Tech Nasil-60-Aggregated", "isController": false}, {"data": [[1.0, 349.0]], "isOverall": false, "label": "2n Tech Neden", "isController": false}, {"data": [[1.0, 349.0]], "isOverall": false, "label": "2n Tech Neden-Aggregated", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "2n Tech Nasil-5", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "2n Tech Nasil-5-Aggregated", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "2n Tech Nasil-61", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "2n Tech Nasil-61-Aggregated", "isController": false}, {"data": [[1.0, 336.0]], "isOverall": false, "label": "2n Tech Nasil-6", "isController": false}, {"data": [[1.0, 336.0]], "isOverall": false, "label": "2n Tech Nasil-6-Aggregated", "isController": false}, {"data": [[1.0, 128.0]], "isOverall": false, "label": "2n Tech Nasil-7", "isController": false}, {"data": [[1.0, 128.0]], "isOverall": false, "label": "2n Tech Nasil-7-Aggregated", "isController": false}, {"data": [[1.0, 124.0]], "isOverall": false, "label": "2n Tech Nasil-17", "isController": false}, {"data": [[1.0, 124.0]], "isOverall": false, "label": "2n Tech Nasil-17-Aggregated", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "2n Tech Nasil-18", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "2n Tech Nasil-18-Aggregated", "isController": false}, {"data": [[1.0, 72.0]], "isOverall": false, "label": "2n Tech Nasil-15", "isController": false}, {"data": [[1.0, 72.0]], "isOverall": false, "label": "2n Tech Nasil-15-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "2n Tech Nasil-59", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "2n Tech Nasil-59-Aggregated", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "2n Tech Nasil-16", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "2n Tech Nasil-16-Aggregated", "isController": false}, {"data": [[1.0, 2008.0]], "isOverall": false, "label": "2n Tech Nasil-13", "isController": false}, {"data": [[1.0, 2008.0]], "isOverall": false, "label": "2n Tech Nasil-13-Aggregated", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-57", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-57-Aggregated", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "2n Tech Nasil-14", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "2n Tech Nasil-14-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-58", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-58-Aggregated", "isController": false}, {"data": [[1.0, 67.0]], "isOverall": false, "label": "2n Tech Nasil-11", "isController": false}, {"data": [[1.0, 67.0]], "isOverall": false, "label": "2n Tech Nasil-11-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-55", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-55-Aggregated", "isController": false}, {"data": [[1.0, 541.0]], "isOverall": false, "label": "2n Tech Is Dunyasi", "isController": false}, {"data": [[1.0, 541.0]], "isOverall": false, "label": "2n Tech Is Dunyasi-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "2n Tech Nasil-12", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "2n Tech Nasil-12-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "2n Tech Nasil-56", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "2n Tech Nasil-56-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-19", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-19-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "2n Tech Nasil-53", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "2n Tech Nasil-53-Aggregated", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "2n Tech Nasil-10", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "2n Tech Nasil-10-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-54", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-54-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-51", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "2n Tech Nasil-51-Aggregated", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-52", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "2n Tech Nasil-52-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-50", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "2n Tech Nasil-50-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 511.68333333333334, "minX": 1.7326239E12, "maxY": 209534.93333333332, "series": [{"data": [[1.7326239E12, 209534.93333333332]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.7326239E12, 511.68333333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7326239E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 55.0, "minX": 1.7326239E12, "maxY": 12421.0, "series": [{"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-48", "isController": false}, {"data": [[1.7326239E12, 604.0]], "isOverall": false, "label": "2n Tech Nasil-49", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-46", "isController": false}, {"data": [[1.7326239E12, 203.0]], "isOverall": false, "label": "2n Tech Is Dunyasi-0", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-47", "isController": false}, {"data": [[1.7326239E12, 337.0]], "isOverall": false, "label": "2n Tech Is Dunyasi-1", "isController": false}, {"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-44", "isController": false}, {"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-45", "isController": false}, {"data": [[1.7326239E12, 12421.0]], "isOverall": false, "label": "2n Tech Nasil", "isController": false}, {"data": [[1.7326239E12, 1673.0]], "isOverall": false, "label": "2n Tech Yasam", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-42", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-43", "isController": false}, {"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-40", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-41", "isController": false}, {"data": [[1.7326239E12, 61.0]], "isOverall": false, "label": "2n Tech Nasil-39", "isController": false}, {"data": [[1.7326239E12, 1025.0]], "isOverall": false, "label": "2n Tech Search", "isController": false}, {"data": [[1.7326239E12, 214.0]], "isOverall": false, "label": "2n Tech Neden-1", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-37", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-38", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-35", "isController": false}, {"data": [[1.7326239E12, 133.0]], "isOverall": false, "label": "2n Tech Neden-0", "isController": false}, {"data": [[1.7326239E12, 63.0]], "isOverall": false, "label": "2n Tech Nasil-36", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-33", "isController": false}, {"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-34", "isController": false}, {"data": [[1.7326239E12, 1509.0]], "isOverall": false, "label": "2n Tech Yasam-1", "isController": false}, {"data": [[1.7326239E12, 163.0]], "isOverall": false, "label": "2n Tech Yasam-0", "isController": false}, {"data": [[1.7326239E12, 63.0]], "isOverall": false, "label": "2n Tech Nasil-31", "isController": false}, {"data": [[1.7326239E12, 71.0]], "isOverall": false, "label": "2n Tech Nasil-75", "isController": false}, {"data": [[1.7326239E12, 61.0]], "isOverall": false, "label": "2n Tech Nasil-32", "isController": false}, {"data": [[1.7326239E12, 63.0]], "isOverall": false, "label": "2n Tech Nasil-73", "isController": false}, {"data": [[1.7326239E12, 62.0]], "isOverall": false, "label": "2n Tech Nasil-30", "isController": false}, {"data": [[1.7326239E12, 69.0]], "isOverall": false, "label": "2n Tech Nasil-74", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-71", "isController": false}, {"data": [[1.7326239E12, 115.0]], "isOverall": false, "label": "2n Tech Nasil-72", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-70", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-28", "isController": false}, {"data": [[1.7326239E12, 61.0]], "isOverall": false, "label": "2n Tech Nasil-29", "isController": false}, {"data": [[1.7326239E12, 571.0]], "isOverall": false, "label": "2n Tech Nasil-26", "isController": false}, {"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-27", "isController": false}, {"data": [[1.7326239E12, 132.0]], "isOverall": false, "label": "2n Tech Nasil-24", "isController": false}, {"data": [[1.7326239E12, 62.0]], "isOverall": false, "label": "2n Tech Nasil-68", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-25", "isController": false}, {"data": [[1.7326239E12, 63.0]], "isOverall": false, "label": "2n Tech Nasil-69", "isController": false}, {"data": [[1.7326239E12, 293.0]], "isOverall": false, "label": "2n Tech Nasil-22", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-66", "isController": false}, {"data": [[1.7326239E12, 348.0]], "isOverall": false, "label": "2n Tech Nasil-23", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-67", "isController": false}, {"data": [[1.7326239E12, 1166.0]], "isOverall": false, "label": "2n Tech", "isController": false}, {"data": [[1.7326239E12, 409.0]], "isOverall": false, "label": "2n Tech Nasil-8", "isController": false}, {"data": [[1.7326239E12, 64.0]], "isOverall": false, "label": "2n Tech Nasil-9", "isController": false}, {"data": [[1.7326239E12, 147.0]], "isOverall": false, "label": "2n Tech Nasil-0", "isController": false}, {"data": [[1.7326239E12, 239.0]], "isOverall": false, "label": "2n Tech Nasil-20", "isController": false}, {"data": [[1.7326239E12, 62.0]], "isOverall": false, "label": "2n Tech Nasil-64", "isController": false}, {"data": [[1.7326239E12, 219.0]], "isOverall": false, "label": "2n Tech Nasil-1", "isController": false}, {"data": [[1.7326239E12, 192.0]], "isOverall": false, "label": "2n Tech Nasil-21", "isController": false}, {"data": [[1.7326239E12, 113.0]], "isOverall": false, "label": "2n Tech Nasil-65", "isController": false}, {"data": [[1.7326239E12, 177.0]], "isOverall": false, "label": "2n Tech Nasil-2", "isController": false}, {"data": [[1.7326239E12, 62.0]], "isOverall": false, "label": "2n Tech Nasil-62", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-3", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-63", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-4", "isController": false}, {"data": [[1.7326239E12, 58.0]], "isOverall": false, "label": "2n Tech Nasil-60", "isController": false}, {"data": [[1.7326239E12, 349.0]], "isOverall": false, "label": "2n Tech Neden", "isController": false}, {"data": [[1.7326239E12, 64.0]], "isOverall": false, "label": "2n Tech Nasil-5", "isController": false}, {"data": [[1.7326239E12, 63.0]], "isOverall": false, "label": "2n Tech Nasil-61", "isController": false}, {"data": [[1.7326239E12, 336.0]], "isOverall": false, "label": "2n Tech Nasil-6", "isController": false}, {"data": [[1.7326239E12, 128.0]], "isOverall": false, "label": "2n Tech Nasil-7", "isController": false}, {"data": [[1.7326239E12, 124.0]], "isOverall": false, "label": "2n Tech Nasil-17", "isController": false}, {"data": [[1.7326239E12, 62.0]], "isOverall": false, "label": "2n Tech Nasil-18", "isController": false}, {"data": [[1.7326239E12, 72.0]], "isOverall": false, "label": "2n Tech Nasil-15", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-59", "isController": false}, {"data": [[1.7326239E12, 113.0]], "isOverall": false, "label": "2n Tech Nasil-16", "isController": false}, {"data": [[1.7326239E12, 2008.0]], "isOverall": false, "label": "2n Tech Nasil-13", "isController": false}, {"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-57", "isController": false}, {"data": [[1.7326239E12, 66.0]], "isOverall": false, "label": "2n Tech Nasil-14", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-58", "isController": false}, {"data": [[1.7326239E12, 67.0]], "isOverall": false, "label": "2n Tech Nasil-11", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-55", "isController": false}, {"data": [[1.7326239E12, 541.0]], "isOverall": false, "label": "2n Tech Is Dunyasi", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-12", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-56", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-19", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-53", "isController": false}, {"data": [[1.7326239E12, 61.0]], "isOverall": false, "label": "2n Tech Nasil-10", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-54", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-51", "isController": false}, {"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-52", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-50", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7326239E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 55.0, "minX": 1.7326239E12, "maxY": 1202.0, "series": [{"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-48", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-49", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-46", "isController": false}, {"data": [[1.7326239E12, 203.0]], "isOverall": false, "label": "2n Tech Is Dunyasi-0", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-47", "isController": false}, {"data": [[1.7326239E12, 93.0]], "isOverall": false, "label": "2n Tech Is Dunyasi-1", "isController": false}, {"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-44", "isController": false}, {"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-45", "isController": false}, {"data": [[1.7326239E12, 147.0]], "isOverall": false, "label": "2n Tech Nasil", "isController": false}, {"data": [[1.7326239E12, 163.0]], "isOverall": false, "label": "2n Tech Yasam", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-42", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-43", "isController": false}, {"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-40", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-41", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-39", "isController": false}, {"data": [[1.7326239E12, 779.0]], "isOverall": false, "label": "2n Tech Search", "isController": false}, {"data": [[1.7326239E12, 75.0]], "isOverall": false, "label": "2n Tech Neden-1", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-37", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-38", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-35", "isController": false}, {"data": [[1.7326239E12, 133.0]], "isOverall": false, "label": "2n Tech Neden-0", "isController": false}, {"data": [[1.7326239E12, 63.0]], "isOverall": false, "label": "2n Tech Nasil-36", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-33", "isController": false}, {"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-34", "isController": false}, {"data": [[1.7326239E12, 1202.0]], "isOverall": false, "label": "2n Tech Yasam-1", "isController": false}, {"data": [[1.7326239E12, 163.0]], "isOverall": false, "label": "2n Tech Yasam-0", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-31", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-75", "isController": false}, {"data": [[1.7326239E12, 61.0]], "isOverall": false, "label": "2n Tech Nasil-32", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-73", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-30", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-74", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-71", "isController": false}, {"data": [[1.7326239E12, 61.0]], "isOverall": false, "label": "2n Tech Nasil-72", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-70", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-28", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-29", "isController": false}, {"data": [[1.7326239E12, 323.0]], "isOverall": false, "label": "2n Tech Nasil-26", "isController": false}, {"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-27", "isController": false}, {"data": [[1.7326239E12, 62.0]], "isOverall": false, "label": "2n Tech Nasil-24", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-68", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-25", "isController": false}, {"data": [[1.7326239E12, 63.0]], "isOverall": false, "label": "2n Tech Nasil-69", "isController": false}, {"data": [[1.7326239E12, 61.0]], "isOverall": false, "label": "2n Tech Nasil-22", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-66", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-23", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-67", "isController": false}, {"data": [[1.7326239E12, 874.0]], "isOverall": false, "label": "2n Tech", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-8", "isController": false}, {"data": [[1.7326239E12, 61.0]], "isOverall": false, "label": "2n Tech Nasil-9", "isController": false}, {"data": [[1.7326239E12, 147.0]], "isOverall": false, "label": "2n Tech Nasil-0", "isController": false}, {"data": [[1.7326239E12, 236.0]], "isOverall": false, "label": "2n Tech Nasil-20", "isController": false}, {"data": [[1.7326239E12, 62.0]], "isOverall": false, "label": "2n Tech Nasil-64", "isController": false}, {"data": [[1.7326239E12, 79.0]], "isOverall": false, "label": "2n Tech Nasil-1", "isController": false}, {"data": [[1.7326239E12, 192.0]], "isOverall": false, "label": "2n Tech Nasil-21", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-65", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-2", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-62", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-3", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-63", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-4", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-60", "isController": false}, {"data": [[1.7326239E12, 133.0]], "isOverall": false, "label": "2n Tech Neden", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-5", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-61", "isController": false}, {"data": [[1.7326239E12, 66.0]], "isOverall": false, "label": "2n Tech Nasil-6", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-7", "isController": false}, {"data": [[1.7326239E12, 62.0]], "isOverall": false, "label": "2n Tech Nasil-17", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-18", "isController": false}, {"data": [[1.7326239E12, 72.0]], "isOverall": false, "label": "2n Tech Nasil-15", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-59", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-16", "isController": false}, {"data": [[1.7326239E12, 60.0]], "isOverall": false, "label": "2n Tech Nasil-13", "isController": false}, {"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-57", "isController": false}, {"data": [[1.7326239E12, 66.0]], "isOverall": false, "label": "2n Tech Nasil-14", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-58", "isController": false}, {"data": [[1.7326239E12, 61.0]], "isOverall": false, "label": "2n Tech Nasil-11", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-55", "isController": false}, {"data": [[1.7326239E12, 203.0]], "isOverall": false, "label": "2n Tech Is Dunyasi", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-12", "isController": false}, {"data": [[1.7326239E12, 58.0]], "isOverall": false, "label": "2n Tech Nasil-56", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-19", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-53", "isController": false}, {"data": [[1.7326239E12, 59.0]], "isOverall": false, "label": "2n Tech Nasil-10", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-54", "isController": false}, {"data": [[1.7326239E12, 57.0]], "isOverall": false, "label": "2n Tech Nasil-51", "isController": false}, {"data": [[1.7326239E12, 56.0]], "isOverall": false, "label": "2n Tech Nasil-52", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "2n Tech Nasil-50", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7326239E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.7326239E12, "maxY": 771.0, "series": [{"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-48", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-49", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-46", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Is Dunyasi-0", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-47", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Is Dunyasi-1", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-44", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-45", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Yasam", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-42", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-43", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-40", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-41", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-39", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Search", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Neden-1", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-37", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-38", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-35", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Neden-0", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-36", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-33", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-34", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Yasam-1", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Yasam-0", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-31", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-75", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-32", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-73", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-30", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-74", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-71", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-72", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-70", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-28", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-29", "isController": false}, {"data": [[1.7326239E12, 165.0]], "isOverall": false, "label": "2n Tech Nasil-26", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-27", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-24", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-68", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-25", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-69", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-22", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-66", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-23", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-67", "isController": false}, {"data": [[1.7326239E12, 771.0]], "isOverall": false, "label": "2n Tech", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-8", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-9", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-0", "isController": false}, {"data": [[1.7326239E12, 149.0]], "isOverall": false, "label": "2n Tech Nasil-20", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-64", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-1", "isController": false}, {"data": [[1.7326239E12, 133.0]], "isOverall": false, "label": "2n Tech Nasil-21", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-65", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-2", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-62", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-3", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-63", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-4", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-60", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Neden", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-5", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-61", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-6", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-7", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-17", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-18", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-15", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-59", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-16", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-13", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-57", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-14", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-58", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-11", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-55", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Is Dunyasi", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-12", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-56", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-19", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-53", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-10", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-54", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-51", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-52", "isController": false}, {"data": [[1.7326239E12, 0.0]], "isOverall": false, "label": "2n Tech Nasil-50", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7326239E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 55.0, "minX": 1.7326239E12, "maxY": 12421.0, "series": [{"data": [[1.7326239E12, 12421.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.7326239E12, 55.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.7326239E12, 544.0000000000002]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.7326239E12, 12421.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.7326239E12, 62.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.7326239E12, 1354.649999999999]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7326239E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 56.0, "minX": 1.0, "maxY": 1591.0, "series": [{"data": [[4.0, 203.0], [8.0, 159.0], [1.0, 1025.0], [16.0, 60.0], [2.0, 1591.0], [18.0, 56.0], [5.0, 64.0], [6.0, 69.0], [7.0, 58.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 56.0, "minX": 1.0, "maxY": 682.5, "series": [{"data": [[4.0, 70.5], [8.0, 77.0], [1.0, 163.0], [16.0, 59.0], [2.0, 682.5], [18.0, 56.0], [5.0, 60.0], [6.0, 61.0], [7.0, 58.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73262384E12, "maxY": 1.45, "series": [{"data": [[1.7326239E12, 1.45], [1.73262384E12, 0.016666666666666666]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7326239E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.06666666666666667, "minX": 1.7326239E12, "maxY": 1.4, "series": [{"data": [[1.7326239E12, 1.4]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.7326239E12, 0.06666666666666667]], "isOverall": false, "label": "301", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7326239E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.7326239E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-54-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-6-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-71-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-26-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Is Dunyasi-0-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-39-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-41-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-69-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-4-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-11-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-24-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-73-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-56-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Is Dunyasi-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-2-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-15-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-43-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-60-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Neden-1-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-28-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-45-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-58-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-75-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-13-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-30-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Yasam-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-32-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-48-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-17-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-63-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Neden-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-46-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-0-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-34-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-65-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Search-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Yasam-0-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-67-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-51-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-38-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-20-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-9-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-53-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-22-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-70-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-36-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-19-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-25-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-7-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-55-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Neden-0-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-57-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-23-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-40-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-42-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-72-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-10-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-5-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Is Dunyasi-1-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-74-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-44-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-14-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-1-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-3-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-12-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-29-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-27-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-61-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-59-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-18-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Yasam-1-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-62-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-31-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-49-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-47-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-50-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-64-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-16-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-33-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-37-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-21-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-68-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-66-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-35-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-52-success", "isController": false}, {"data": [[1.7326239E12, 0.016666666666666666]], "isOverall": false, "label": "2n Tech Nasil-8-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7326239E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 1.4666666666666666, "minX": 1.7326239E12, "maxY": 1.4666666666666666, "series": [{"data": [[1.7326239E12, 1.4666666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7326239E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
