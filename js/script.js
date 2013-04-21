//отчет
//постановка задачи
//описание метода эйлера
//описание работы программы со скриншотом
//заключение
//листинг


$(document).ready(function(){

    $("#button").click(function(e){
        var data = [];
        var z;

        y0=1;
        var h= 0;
        for (k=0; k<50; k++)
        {
            i=k*0.1;
            data.push({ x: i.toFixed(2), y: y0+h*(2*y0), z: Math.exp(2*i)});
            h = 0.1;
            y0=y0+0.1*(2*y0);

        }




        $("#grid").kendoGrid({
            dataSource: {
                data: data,
                pageSize:50
            },
            selectable: "multiple",
            groupable: true,
            sortable: true,
            pageable: {
                refresh: true,
                pageSizes: true
            },
            columns: [ {
                field: "x",
                width: 30,
                title: "Значение по X"
            } , {
                field: "y",
                width: 30,
                title: "Решение методом Эйлера"
            }, {
                field: "z",
                width: 30,
                title: "Точное решение"
            }
            ]
        });

        function getFilter(xMin, xMax) {
            return [{
                field: "x",
                operator: "gt",
                value: xMin
            }, {
                field: "x",
                operator: "lt",
                value: xMax
            }]
        }

        function createChart() {
            $("#chart").kendoChart({

                chartArea: {
                    background: "white",
                    border:{
                     color: "red"
                    }
                },

                dataSource: {
                    data: data,
                    filter: getFilter(-10, 10)
                },

                xAxis: {
                    name: "xAxis",
                    min: -10,
                    max: 10,
                    labels: {
                        format: "{0:N1}"
                    }
                },

                title:{
                    text: "Построение графика"},

                tooltip: {
                    visible: true

                },
                legend: {
                    position: "bottom"
                },

                series: [


                {
                    name:"Точное решение",
                    type: "scatterLine",
                    xField: "x",
                    yField: "z",
                    dashType: "dot", // вид ломаных прямых, точки или пунктиры
                    labels:{align: "column"},

                markers: {
                visible: true,
                    template: " #= category #  #= value # #= dataSource.data # #= value #"
                }},

                    {
                        name: "Метод Эйлера",
                    type: "scatterLine",
                    xField: "x",
                    yField: "y",

                    markers: {
                        visible: true,
                        template: " #= category #  #= value # #= dataSource.data # #= value #"
                    }
                }

                ],
                transitions: true,
                drag: setRange,
                zoom: setRange

            });

            function setRange(e) {
                var chart = e.sender;
                var ds = chart.dataSource;
                var options = chart.options;


                e.originalEvent.preventDefault();

                var xRange = e.axisRanges.xAxis;
                if (xRange) {

                    var xMin = xRange.min;
                    var xMax = xRange.max;


                    if (xMax - xMin < 2) {
                        return;
                    }


                    options.xAxis.min = xMin;
                    options.xAxis.max = xMax;


                    ds.filter(getFilter(xMin, xMax));
                }
            }
        }



        createChart();
        $("#example").bind("kendo:skinChange", createChart);
        e.preventDefault();
    });




    $('#btnStatus').click(function(){
        var isChecked = $('#chkSelect').attr('checked');
        alert(isChecked);
    });





});

