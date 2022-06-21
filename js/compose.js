export { ComposeSecondSectionScrollButton, ComposeBackToTopButton, ComposeHomeButton, ComposeProjectItems, ComposeProjectItemsForHomePage };

import { BuildLocalScrollButton, BuildBackToTopButton, BuildHomeButton, BuildProjectItems, BuildProjectItemsForHomePage } from "/js/build.js";
import { HOME_EXCLUDE_LIST } from "/js/constants.js";
import { HideHR } from "/js/utils.js";

function ComposeSecondSectionScrollButton() {
    let numSection = document.querySelectorAll("section").length;
    if(numSection > 1) {
        let firstSection = document.querySelector("section:first-of-type");
        firstSection.append(BuildLocalScrollButton());
    }
}

function ComposeBackToTopButton() {
    let numSection = document.querySelectorAll("section").length;
    if(numSection > 1) {
        let lastSection = document.querySelector("section:last-of-type");
        lastSection.append(BuildBackToTopButton());
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