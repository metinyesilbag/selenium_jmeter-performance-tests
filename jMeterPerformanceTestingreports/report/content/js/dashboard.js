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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9261363636363636, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "2n Tech Nasil-48"], "isController": false}, {"data": [0.5, 500, 1500, "2n Tech Nasil-49"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-46"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Is Dunyasi-0"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-47"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Is Dunyasi-1"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-44"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-45"], "isController": false}, {"data": [0.0, 500, 1500, "2n Tech Nasil"], "isController": false}, {"data": [0.0, 500, 1500, "2n Tech Yasam"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-42"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-43"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-40"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-41"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-39"], "isController": false}, {"data": [0.5, 500, 1500, "2n Tech Search"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Neden-1"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-37"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-38"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-35"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Neden-0"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-36"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-33"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-34"], "isController": false}, {"data": [0.0, 500, 1500, "2n Tech Yasam-1"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Yasam-0"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-31"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-75"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-32"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-73"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-30"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-74"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-71"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-72"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-70"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-28"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-29"], "isController": false}, {"data": [0.5, 500, 1500, "2n Tech Nasil-26"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-27"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-24"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-68"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-25"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-69"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-22"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-66"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-23"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-67"], "isController": false}, {"data": [0.5, 500, 1500, "2n Tech"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-8"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-9"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-0"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-20"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-64"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-1"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-21"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-65"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-2"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-62"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-3"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-63"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-4"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-60"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Neden"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-5"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-61"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-6"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-7"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-17"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-18"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-15"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-59"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-16"], "isController": false}, {"data": [0.0, 500, 1500, "2n Tech Nasil-13"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-57"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-14"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-58"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-11"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-55"], "isController": false}, {"data": [0.5, 500, 1500, "2n Tech Is Dunyasi"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-12"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-56"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-19"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-53"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-10"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-54"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-51"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-52"], "isController": false}, {"data": [1.0, 500, 1500, "2n Tech Nasil-50"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 88, 0, 0.0, 334.7045454545455, 55, 12421, 62.0, 544.0000000000002, 1354.649999999999, 12421.0, 5.117171599697621, 713.9290283188928, 1.7434113689887771], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["2n Tech Nasil-48", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 56.0, 17.857142857142858, 11.893136160714285, 2.9471261160714284], "isController": false}, {"data": ["2n Tech Nasil-49", 1, 0, 0.0, 604.0, 604, 604, 604.0, 604.0, 604.0, 604.0, 1.6556291390728477, 770.6694950331126, 0.244140625], "isController": false}, {"data": ["2n Tech Nasil-46", 1, 0, 0.0, 55.0, 55, 55, 55.0, 55.0, 55.0, 55.0, 18.18181818181818, 14.328835227272727, 3.7286931818181817], "isController": false}, {"data": ["2n Tech Is Dunyasi-0", 1, 0, 0.0, 203.0, 203, 203, 203.0, 203.0, 203.0, 203.0, 4.926108374384237, 1.2988762315270934, 0.5917102832512315], "isController": false}, {"data": ["2n Tech Nasil-47", 1, 0, 0.0, 55.0, 55, 55, 55.0, 55.0, 55.0, 55.0, 18.18181818181818, 15.518465909090908, 2.823153409090909], "isController": false}, {"data": ["2n Tech Is Dunyasi-1", 1, 0, 0.0, 337.0, 337, 337, 337.0, 337.0, 337.0, 337.0, 2.967359050445104, 758.4732010385757, 0.35932863501483675], "isController": false}, {"data": ["2n Tech Nasil-44", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 56.0, 17.857142857142858, 24.675641741071427, 3.0691964285714284], "isController": false}, {"data": ["2n Tech Nasil-45", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 56.0, 17.857142857142858, 15.590122767857142, 3.8016183035714284], "isController": false}, {"data": ["2n Tech Nasil", 1, 0, 0.0, 12421.0, 12421, 12421, 12421.0, 12421.0, 12421.0, 12421.0, 0.08050881571532083, 407.8236957571854, 1.1408822508252154], "isController": false}, {"data": ["2n Tech Yasam", 1, 0, 0.0, 1673.0, 1673, 1673, 1673.0, 1673.0, 1673.0, 1673.0, 0.5977286312014345, 149.16539804991032, 0.13834148983861327], "isController": false}, {"data": ["2n Tech Nasil-42", 1, 0, 0.0, 55.0, 55, 55, 55.0, 55.0, 55.0, 55.0, 18.18181818181818, 15.411931818181818, 3.977272727272727], "isController": false}, {"data": ["2n Tech Nasil-43", 1, 0, 0.0, 55.0, 55, 55, 55.0, 55.0, 55.0, 55.0, 18.18181818181818, 15.4296875, 4.296875], "isController": false}, {"data": ["2n Tech Nasil-40", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 56.0, 17.857142857142858, 12.869698660714285, 3.016880580357143], "isController": false}, {"data": ["2n Tech Nasil-41", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 125.14896716101696, 3.2110699152542375], "isController": false}, {"data": ["2n Tech Nasil-39", 1, 0, 0.0, 61.0, 61, 61, 61.0, 61.0, 61.0, 61.0, 16.393442622950822, 169.50563524590163, 3.8742315573770494], "isController": false}, {"data": ["2n Tech Search", 1, 0, 0.0, 1025.0, 1025, 1025, 1025.0, 1025.0, 1025.0, 1025.0, 0.975609756097561, 176.53868140243904, 0.11814024390243903], "isController": false}, {"data": ["2n Tech Neden-1", 1, 0, 0.0, 214.0, 214, 214, 214.0, 214.0, 214.0, 214.0, 4.672897196261682, 1182.1836667640187, 0.5430417640186916], "isController": false}, {"data": ["2n Tech Nasil-37", 1, 0, 0.0, 55.0, 55, 55, 55.0, 55.0, 55.0, 55.0, 18.18181818181818, 14.186789772727273, 4.705255681818182], "isController": false}, {"data": ["2n Tech Nasil-38", 1, 0, 0.0, 55.0, 55, 55, 55.0, 55.0, 55.0, 55.0, 18.18181818181818, 13.441051136363637, 3.1427556818181817], "isController": false}, {"data": ["2n Tech Nasil-35", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 14.854029605263158, 3.306606359649123], "isController": false}, {"data": ["2n Tech Neden-0", 1, 0, 0.0, 133.0, 133, 133, 133.0, 133.0, 133.0, 133.0, 7.518796992481203, 1.94578242481203, 0.866423872180451], "isController": false}, {"data": ["2n Tech Nasil-36", 1, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 63.0, 15.873015873015872, 158.234126984127, 3.5032242063492065], "isController": false}, {"data": ["2n Tech Nasil-33", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 212.7747616525424, 2.863479872881356], "isController": false}, {"data": ["2n Tech Nasil-34", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 56.0, 17.857142857142858, 15.084402901785714, 4.307338169642857], "isController": false}, {"data": ["2n Tech Yasam-1", 1, 0, 0.0, 1509.0, 1509, 1509, 1509.0, 1509.0, 1509.0, 1509.0, 0.6626905235255136, 165.20538228959578, 0.07701188701126574], "isController": false}, {"data": ["2n Tech Yasam-0", 1, 0, 0.0, 163.0, 163, 163, 163.0, 163.0, 163.0, 163.0, 6.134969325153374, 1.5876629601226993, 0.7069593558282208], "isController": false}, {"data": ["2n Tech Nasil-31", 1, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 63.0, 15.873015873015872, 282.8931051587302, 3.3172123015873014], "isController": false}, {"data": ["2n Tech Nasil-75", 1, 0, 0.0, 71.0, 71, 71, 71.0, 71.0, 71.0, 71.0, 14.084507042253522, 611.0667913732395, 2.4620378521126765], "isController": false}, {"data": ["2n Tech Nasil-32", 1, 0, 0.0, 61.0, 61, 61, 61.0, 61.0, 61.0, 61.0, 16.393442622950822, 75.17930327868852, 2.8176229508196724], "isController": false}, {"data": ["2n Tech Nasil-73", 1, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 63.0, 15.873015873015872, 337.36359126984127, 2.4801587301587302], "isController": false}, {"data": ["2n Tech Nasil-30", 1, 0, 0.0, 62.0, 62, 62, 62.0, 62.0, 62.0, 62.0, 16.129032258064516, 217.00163810483872, 2.567414314516129], "isController": false}, {"data": ["2n Tech Nasil-74", 1, 0, 0.0, 69.0, 69, 69, 69.0, 69.0, 69.0, 69.0, 14.492753623188406, 524.3432971014493, 2.3494112318840576], "isController": false}, {"data": ["2n Tech Nasil-71", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 102.24609375, 3.4016927083333335], "isController": false}, {"data": ["2n Tech Nasil-72", 1, 0, 0.0, 115.0, 115, 115, 115.0, 115.0, 115.0, 115.0, 8.695652173913043, 523.6667798913044, 1.6559103260869565], "isController": false}, {"data": ["2n Tech Nasil-70", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 93.66433662280701, 3.5121984649122804], "isController": false}, {"data": ["2n Tech Nasil-28", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 55.35567434210526, 2.895422149122807], "isController": false}, {"data": ["2n Tech Nasil-29", 1, 0, 0.0, 61.0, 61, 61, 61.0, 61.0, 61.0, 61.0, 16.393442622950822, 222.5281762295082, 2.609503073770492], "isController": false}, {"data": ["2n Tech Nasil-26", 1, 0, 0.0, 571.0, 571, 571, 571.0, 571.0, 571.0, 571.0, 1.7513134851138354, 566.3617830560421, 0.253119527145359], "isController": false}, {"data": ["2n Tech Nasil-27", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 56.0, 17.857142857142858, 32.92410714285714, 2.9471261160714284], "isController": false}, {"data": ["2n Tech Nasil-24", 1, 0, 0.0, 132.0, 132, 132, 132.0, 132.0, 132.0, 132.0, 7.575757575757576, 649.9615293560606, 1.1689157196969697], "isController": false}, {"data": ["2n Tech Nasil-68", 1, 0, 0.0, 62.0, 62, 62, 62.0, 62.0, 62.0, 62.0, 16.129032258064516, 280.13167842741933, 3.1186995967741935], "isController": false}, {"data": ["2n Tech Nasil-25", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 225.86263020833334, 2.701822916666667], "isController": false}, {"data": ["2n Tech Nasil-69", 1, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 63.0, 15.873015873015872, 181.29960317460316, 3.193204365079365], "isController": false}, {"data": ["2n Tech Nasil-22", 1, 0, 0.0, 293.0, 293, 293, 293.0, 293.0, 293.0, 293.0, 3.4129692832764507, 693.7793302047781, 0.5932700511945392], "isController": false}, {"data": ["2n Tech Nasil-66", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 172.77018229166669, 3.41796875], "isController": false}, {"data": ["2n Tech Nasil-23", 1, 0, 0.0, 348.0, 348, 348, 348.0, 348.0, 348.0, 348.0, 2.8735632183908044, 905.5428340517242, 0.47425017959770116], "isController": false}, {"data": ["2n Tech Nasil-67", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 198.1097722457627, 3.509004237288136], "isController": false}, {"data": ["2n Tech", 1, 0, 0.0, 1166.0, 1166, 1166, 1166.0, 1166.0, 1166.0, 1166.0, 0.8576329331046312, 384.21201624142367, 0.09464113421955404], "isController": false}, {"data": ["2n Tech Nasil-8", 1, 0, 0.0, 409.0, 409, 409, 409.0, 409.0, 409.0, 409.0, 2.444987775061125, 145.5388523838631, 0.4393337408312959], "isController": false}, {"data": ["2n Tech Nasil-9", 1, 0, 0.0, 64.0, 64, 64, 64.0, 64.0, 64.0, 64.0, 15.625, 255.79833984375, 2.9144287109375], "isController": false}, {"data": ["2n Tech Nasil-0", 1, 0, 0.0, 147.0, 147, 147, 147.0, 147.0, 147.0, 147.0, 6.802721088435374, 1.7604698129251701, 0.7839073129251701], "isController": false}, {"data": ["2n Tech Nasil-20", 1, 0, 0.0, 239.0, 239, 239, 239.0, 239.0, 239.0, 239.0, 4.184100418410042, 34.93151804393305, 2.1124803870292888], "isController": false}, {"data": ["2n Tech Nasil-64", 1, 0, 0.0, 62.0, 62, 62, 62.0, 62.0, 62.0, 62.0, 16.129032258064516, 87.43384576612904, 2.9296875], "isController": false}, {"data": ["2n Tech Nasil-1", 1, 0, 0.0, 219.0, 219, 219, 219.0, 219.0, 219.0, 219.0, 4.5662100456621, 1162.693528824201, 0.5306435502283106], "isController": false}, {"data": ["2n Tech Nasil-21", 1, 0, 0.0, 192.0, 192, 192, 192.0, 192.0, 192.0, 192.0, 5.208333333333333, 15.131632486979166, 1.007080078125], "isController": false}, {"data": ["2n Tech Nasil-65", 1, 0, 0.0, 113.0, 113, 113, 113.0, 113.0, 113.0, 113.0, 8.849557522123893, 476.389657079646, 1.6160813053097345], "isController": false}, {"data": ["2n Tech Nasil-2", 1, 0, 0.0, 177.0, 177, 177, 177.0, 177.0, 177.0, 177.0, 5.649717514124294, 926.3660840395481, 1.0924258474576272], "isController": false}, {"data": ["2n Tech Nasil-62", 1, 0, 0.0, 62.0, 62, 62, 62.0, 62.0, 62.0, 62.0, 16.129032258064516, 292.82699092741933, 3.4967237903225805], "isController": false}, {"data": ["2n Tech Nasil-3", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 71.08347039473684, 2.9296875], "isController": false}, {"data": ["2n Tech Nasil-63", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 126.47311970338984, 3.3434851694915255], "isController": false}, {"data": ["2n Tech Nasil-4", 1, 0, 0.0, 55.0, 55, 55, 55.0, 55.0, 55.0, 55.0, 18.18181818181818, 24.875710227272727, 2.8941761363636362], "isController": false}, {"data": ["2n Tech Nasil-60", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 58.0, 17.241379310344826, 97.97615840517241, 2.643453663793103], "isController": false}, {"data": ["2n Tech Neden", 1, 0, 0.0, 349.0, 349, 349, 349.0, 349.0, 349.0, 349.0, 2.865329512893983, 725.6335064469914, 0.6631670845272207], "isController": false}, {"data": ["2n Tech Nasil-5", 1, 0, 0.0, 64.0, 64, 64, 64.0, 64.0, 64.0, 64.0, 15.625, 309.967041015625, 3.021240234375], "isController": false}, {"data": ["2n Tech Nasil-61", 1, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 63.0, 15.873015873015872, 332.8062996031746, 2.7746775793650795], "isController": false}, {"data": ["2n Tech Nasil-6", 1, 0, 0.0, 336.0, 336, 336, 336.0, 336.0, 336.0, 336.0, 2.976190476190476, 988.8974144345237, 0.5405970982142857], "isController": false}, {"data": ["2n Tech Nasil-7", 1, 0, 0.0, 128.0, 128, 128, 128.0, 128.0, 128.0, 128.0, 7.8125, 654.5791625976562, 1.5106201171875], "isController": false}, {"data": ["2n Tech Nasil-17", 1, 0, 0.0, 124.0, 124, 124, 124.0, 124.0, 124.0, 124.0, 8.064516129032258, 530.5963331653226, 1.354586693548387], "isController": false}, {"data": ["2n Tech Nasil-18", 1, 0, 0.0, 62.0, 62, 62, 62.0, 62.0, 62.0, 62.0, 16.129032258064516, 273.39024697580646, 2.7249243951612905], "isController": false}, {"data": ["2n Tech Nasil-15", 1, 0, 0.0, 72.0, 72, 72, 72.0, 72.0, 72.0, 72.0, 13.888888888888888, 12.071397569444445, 2.5363498263888893], "isController": false}, {"data": ["2n Tech Nasil-59", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 133.28450520833334, 3.3528645833333335], "isController": false}, {"data": ["2n Tech Nasil-16", 1, 0, 0.0, 113.0, 113, 113, 113.0, 113.0, 113.0, 113.0, 8.849557522123893, 184.4666067477876, 1.512375553097345], "isController": false}, {"data": ["2n Tech Nasil-13", 1, 0, 0.0, 2008.0, 2008, 2008, 2008.0, 2008.0, 2008.0, 2008.0, 0.49800796812749004, 1031.7129917828686, 0.09483550174302789], "isController": false}, {"data": ["2n Tech Nasil-57", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 56.0, 17.857142857142858, 26.820591517857142, 3.016880580357143], "isController": false}, {"data": ["2n Tech Nasil-14", 1, 0, 0.0, 66.0, 66, 66, 66.0, 66.0, 66.0, 66.0, 15.151515151515152, 67.88589015151514, 2.766927083333333], "isController": false}, {"data": ["2n Tech Nasil-58", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 9.303042763157894, 3.1695449561403506], "isController": false}, {"data": ["2n Tech Nasil-11", 1, 0, 0.0, 67.0, 67, 67, 67.0, 67.0, 67.0, 67.0, 14.925373134328359, 436.9315531716418, 2.5069962686567164], "isController": false}, {"data": ["2n Tech Nasil-55", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 107.31907894736841, 2.9468201754385963], "isController": false}, {"data": ["2n Tech Is Dunyasi", 1, 0, 0.0, 541.0, 541, 541, 541.0, 541.0, 541.0, 541.0, 1.8484288354898337, 472.9558976432532, 0.445861252310536], "isController": false}, {"data": ["2n Tech Nasil-12", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 113.0329713983051, 3.5917637711864407], "isController": false}, {"data": ["2n Tech Nasil-56", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 76.30429025423729, 2.863479872881356], "isController": false}, {"data": ["2n Tech Nasil-19", 1, 0, 0.0, 55.0, 55, 55, 55.0, 55.0, 55.0, 55.0, 18.18181818181818, 8.59375, 3.018465909090909], "isController": false}, {"data": ["2n Tech Nasil-53", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 121.11030190677967, 3.111758474576271], "isController": false}, {"data": ["2n Tech Nasil-10", 1, 0, 0.0, 61.0, 61, 61, 61.0, 61.0, 61.0, 61.0, 16.393442622950822, 168.9453125, 3.1057889344262297], "isController": false}, {"data": ["2n Tech Nasil-54", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 104.33799342105263, 2.9468201754385963], "isController": false}, {"data": ["2n Tech Nasil-51", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 92.43078399122807, 2.963952850877193], "isController": false}, {"data": ["2n Tech Nasil-52", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 56.0, 17.857142857142858, 90.10532924107143, 3.3482142857142856], "isController": false}, {"data": ["2n Tech Nasil-50", 1, 0, 0.0, 55.0, 55, 55, 55.0, 55.0, 55.0, 55.0, 18.18181818181818, 8.771306818181818, 3.7109375], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 88, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
