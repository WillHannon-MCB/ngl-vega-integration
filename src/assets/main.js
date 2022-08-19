/* 
This file contains the main JS code needed to embed the Vega plot
and NGL structure and connect them together so that signals emitted
from the Vega plot can be used to update the NGL structure object.
*/  

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
const spec = "src/static/protein.chart.json";

// Embed the plot
vegaEmbed("#vega-viz", spec)        
    .then(result => result.view.addEventListener('click', (event, item) => {
        if (item !== null ) {
            if (item.datum.site !== undefined) {
                console.log(makeSiteString(item.datum.site, "A"))
                selectSiteOnProtein(makeSiteString(item.datum.site, "A"), "cornflowerblue")
            }
        }
    }) )
    .catch(console.warn);


