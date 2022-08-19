/* 
Define some utility functions to handle the data coming from the visualizations. 
*/

// Function to make a site string from a site.       
const makeSiteString = (site, chain) => `:${chain} and ${site}`;

// Function to select a site on a protein
function selectSiteOnProtein(siteString, color) {
    stage.eachComponent(protein => {
        protein.addRepresentation("spacefill", {
        color: color,
        name: siteString
    }).setSelection(siteString);
})};
