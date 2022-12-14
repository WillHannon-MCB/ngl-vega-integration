/* 
This file contains the main JS code needed to embed the Vega plot
and NGL structure and connect them together so that signals emitted
from the Vega plot can be used to update the NGL structure object.
*/  

// Stand in constants - these will be selected or determined from the data
const color = "#1f77b4";
const chain = "A";

// Array to hold the selected sites
const selectedSites = [];

//  Create the stage
const stage = new NGL.Stage( "protein", {backgroundColor: "white"});

// Handle window resizing
window.addEventListener( "resize", function( event ){
    stage.handleResize();
}, false );

// Load the structure
stage.loadFile("rcsb://6XR8").then(o => {
    o.addRepresentation("cartoon", { color: "lightgrey" })
    o.autoView()
});

// Define the plot spec
const spec = "src/static/example.chart.json";
const heatmapSpec = "src/static/heatmap.chart.json";

// Embed the plot
vegaEmbed("#vega-viz", spec)        
    .then(result => result.view.addEventListener('click', (event, item) => {
        if (item !== null ) {
            if (item.datum.site !== undefined && item.datum.metric !== undefined) {
                console.log(item.datum)
                colorSiteOnProtein(item.datum.site, chain, color)
            }
        }
    }) )
    .catch(console.warn);


// Embed a heatmap
vegaEmbed("#vega-heatmap", heatmapSpec).catch(console.warn);
