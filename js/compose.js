export { ComposeSecondSectionScrollButton, ComposeBackToTopButton, ComposeHomeButton, ComposeProjectItems, ComposeProjectItemsForHomePage, ComposeFilterButtons };

import { BuildCentreRow, BuildLocalScrollButton, BuildBackToTopButton, BuildHomeButton, BuildProjectItems, BuildProjectItemsForHomePage, BuildAllFilterButton, BuildFilterButton } from "/js/build.js";
import { HOME_EXCLUDE_LIST, PROJECTS_LIST } from "/js/constants.js";
import { HideHR, GetUniqueProjectTags } from "/js/utils.js";

function ComposeSecondSectionScrollButton() {
    let numSections = document.querySelectorAll("section").length;
    if(numSections > 1)
        document.querySelector("section:first-of-type").append(BuildLocalScrollButton());
}

function ComposeBackToTopButton() {
    let numSections = document.querySelectorAll("section").length;
    if(numSections > 1) {
        let lastSection = document.querySelector("section:last-of-type > .container");
        let row = BuildCentreRow();
        row.append(BuildBackToTopButton());
        lastSection.append(row);
    }
}

function ComposeHomeButton() {
    if(!HOME_EXCLUDE_LIST.includes(window.location.pathname)) {
        let firstSection = document.querySelector('section:first-of-type');
        firstSection.append(BuildHomeButton());
    }
}

async function ComposeProjectItems() {
    const container = document.getElementById("project-list");
    if(!container)
        return;
    
    const items = await BuildProjectItems();
    items[items.length-1] = HideHR(items[items.length - 1]);

    for(const item of items) {
        container.innerHTML+=item;
    }
}

async function ComposeProjectItemsForHomePage() {
    const container = document.getElementById("project-list");
    if(!container)
        return;

    const existingContent = container.innerHTML;
    container.innerHTML = "";
    const items = await BuildProjectItemsForHomePage();
    items[items.length-1] = HideHR(items[items.length - 1]);
    for(const item of items) {
        container.innerHTML+=item;
    }
    container.innerHTML+=existingContent;
}

async function ComposeFilterButtons() {
    const container = document.getElementById("filters");
    if(!container)
        return;
    
    container.appendChild(await BuildAllFilterButton());
    let filterNames = GetUniqueProjectTags(PROJECTS_LIST);
    for(const filter of filterNames)
        container.appendChild(await BuildFilterButton(filter));
}