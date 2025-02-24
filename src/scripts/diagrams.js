import ApexCharts from 'apexcharts';

window.addEventListener("load", main);

/**
 * Allt utgår från main.
 */
async function main() {
    const admissionStatData = await getAdmissionStats();
    
    let typeData = selectType(admissionStatData, "Kurs");
    let orderedData = orderByTotalApplicants(typeData);
    let topData = selectUntilIndex(orderedData, 5);
    renderColumnChart(topData);

    typeData = selectType(admissionStatData, "Program");
    orderedData = orderByTotalApplicants(typeData);
    topData = selectUntilIndex(orderedData, 4);
    renderPieChart(topData);
}

/**
 * Renderar ett diagram efter en array.
 * @param {array} data - Antagningsdata
 */
function renderPieChart(data) {
    const series = [];
    const labels = [];

    data.forEach(d => {
        series.push(Number(d.applicantsTotal));
        labels.push(d.name);
    });
    console.log("Series:", series);
    const options = {
        chart: {
            type: 'donut'
        }, title: {
            text: 'Ansökningsstatistik program',
            align: 'center'
        },
        plotOptions: {
            pie: {
                expandOnClick: false,
                donut: {
                    size: '45%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: "Total",

                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                            }
                        }
                    }
                }
            }
        },
        series: series,
        labels: labels
    };

    const chart = new ApexCharts(document.getElementById("chart2"), options);
    chart.render();
}

/**
 * Renderar ut ett stapeldiagram.
 * @param {array} data - Antagningsdata
 */
function renderColumnChart(data) {
    const series = [];
    const categories = [];
    data.forEach(d => {
        series.push(d.applicantsTotal);
        categories.push(d.name);
    });
    const options = {
        chart: {
            type: 'bar'
        },
        plotOptions: {
            bar: {
                distributed: true
            }
        },
        title: {
            text: 'Ansökningsstatistik kurser',
            align: 'center'
        },
        legend: {
          show: true
        },
        series: [{
            data: series
        }],
        xaxis: {
            categories: categories,
            labels: {
                style: {
                  fontSize: '12px'
                }
              }
        }
    };

    const chart = new ApexCharts(document.getElementById("chart1"), options);
    chart.render();
}

/**
 * 
 * @param {array} data - Antagningsdata
 * @param {number} index - Sista indexvärdet
 * @returns {array} topData - En ny array av antagningsdata från 0 till index.
 */
function selectUntilIndex(data, index) {
    const topData = [];
    if (data.length - 1 >= index && 0 <= index) {
        for (let i = 0; i <= index; i++) {
            topData.push(data[i]);
        }
    }
    return topData;
}

/**
 * Ordnar en array i fallande orning.
 * @param {array} data - Ordnar antagningsdata i fallande ordning
 * @returns {array} sortedData - En array av antagningsdata i fallande ordning.
 */
function orderByTotalApplicants(data) {
    return data.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
}

/**
 * Väljer vilken antagningsdata som ska hämtas.
 * @param {array} rawData - Rå antagningsdata
 * @param {string} type - Vilken antagningsdata som ska hämtas
 * @returns {array} selectedData - vald antagningsdata
 */
function selectType(rawData, type) {
    return selectedData = rawData.filter(d => d.type === type);
}

/**
 * Hämtar antagningsdata från extern källa.
 * @returns {array} data - En array av antagningsdata.
 */
async function getAdmissionStats() {
    try {
        const resp = await fetch("https://studenter.miun.se/~mallar/dt211g/");
        return await resp.json();
    } catch (error) {
        console.error(error);
    }
}