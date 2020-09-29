function init() {
    // Select the dropdown element
    var selector = d3.select("#selDataset");
    
    // Fill the dropdown from the list of Names
    d3.json("https://bnatha.github.io/plotly-challenge/samples.json").then((data) => {
    var subjectIds = data.names;
        subjectIds.forEach((id) => {selector.append("option").text(id).property("value", id);
        });
      
      const firstSample = subjectIds[0];
      updateCharts(firstSample);
      updateMetadata(firstSample);
    });
}
  
// Updating the metadata/demographics panel
function updateMetadata(sample) {
    d3.json("https://bnatha.github.io/plotly-challenge/samples.json").then((data) => {
        var metadata = data.metadata;
        var filterArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var result = filterArray[0];
        var metaPanel = d3.select("#sample-metadata");
        metaPanel.html("");
        Object.entries(result).forEach(([key, value]) => {
            metaPanel.append("h6").text(`${key.toUpperCase()}: ${value}`)
        })
    });
}
  
// Updating the charts
function updateCharts(sample) {    
    d3.json("https://bnatha.github.io/plotly-challenge/samples.json").then((data) => {

    // Defining plot variables
    var samples = data.samples;
    var filterArray = samples.filter(sampleObject => sampleObject.id == sample);
    var result = filterArray[0];
    var sample_values = result.sample_values;
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;   

    // Create the bubble chart
    var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
        size: sample_values,
        color: otu_ids,
        colorscale:"Electric"
        }
    };
    var data = [trace1];
    var layout = {
        title: 'Amount of Bacteria Cultures',
        showlegend: false,
        hovermode: 'closest',
        xaxis: {title:"OTU ID: " +sample},
        margin: {t:30}
    };
    Plotly.newPlot('bubble', data, layout); 

    // Create the bar chart
    var trace1 = {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        name: "Greek",
        type: "bar",
        orientation: "h"
    };
    var data = [trace1];
    var layout = {
        title: "Top 10 OTUs in an individual " +sample,
        margin: {l: 100, r: 100, t: 100, b: 100}
    };
    Plotly.newPlot("bar", data, layout);  
    });
}
  
// Fetch new data each time a new sample is selected from the dropdown
function optionChanged(nextSample) {

    updateCharts(nextSample);
    updateMetadata(nextSample);
}
  
// Initialize the dashboard
init();
