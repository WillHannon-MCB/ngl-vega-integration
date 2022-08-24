/* 
Define some utility functions to handle the data coming from the visualizations. 
*/

// Function to remove item from an array
function removeItemFromArray(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1) {
        arr.splice(index, 1);
        return arr;
    };
};

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

// Function to deselect a site on a protein
function deselectSiteOnProtein(siteString) {
    stage.getRepresentationsByName(siteString).dispose()
  }

// Function to link selection to protein representation
function colorSiteOnProtein(site, chain, color) {
    // Make the site into a string for NGL
    siteString = makeSiteString(site, chain);
    // If the site isn't selected select it
    if (!selectedSites.includes(site)) {
        selectSiteOnProtein(siteString, color);
        selectedSites.push(site);
    // Otherwise, de-select it
    } else {
        deselectSiteOnProtein(siteString);
        removeItemFromArray(selectedSites, site);
    };
}

