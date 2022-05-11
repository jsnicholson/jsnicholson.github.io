export { ComposeSecondSectionScrollButton, ComposeBackToTopButton, ComposeHomeButton };

import { BuildLocalScrollButton, BuildBackToTopButton, BuildHomeButton } from "/js/build.js";
import { HOME_EXCLUDE_LIST } from "/js/constants.js";

function ComposeSecondSectionScrollButton() {
    let numSection = document.querySelectorAll("section").length;
    if(numSection > 1) {
        let firstSection = document.querySelector("section:first-of-type");
        firstSection.append(BuildLocalScrollButton());
    }
}

function ComposeBackToTopButton() {
    let numSection = document.querySelectorAll("selection").length;
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