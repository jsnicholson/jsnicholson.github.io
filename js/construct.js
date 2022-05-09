export { ConstructBackToTopButton, ConstructLocalScrollButton, ConstructProjectItems, ConstructHomeButton };

import { ScrollToSecondSection, ScrollToTop, BackToHome } from "/js/utils.js";
import { PROJECTS_LIST } from "/js/constants.js";

function ConstructBackToTopButton() {
    let element = document.createElement("img");
    element.setAttribute("src","/assets/icon/chevron_up.svg");
    element.setAttribute("class","local-scroll");
    element.addEventListener("click",ScrollToTop);
    return element;
}

function ConstructLocalScrollButton() {
    let container = document.createElement("div");
    container.setAttribute("class","local-scroll");

    let img = document.createElement("img");
    img.setAttribute("src","/assets/icon/chevron_down.svg");
    img.addEventListener("click",ScrollToSecondSection)
    img.setAttribute("data-aos","fade-down");
    img.setAttribute("data-aos-anchor-placement","bottom-bottom");

    container.append(img);
    return container;
}

async function ConstructProjectItems() {
    const container = document.getElementById("project-list");
    if(!container)
        return;
    const template = await GetProjectItemTemplate();

    for(const project of PROJECTS_LIST) {
        const projectItem = ConstructProjectItem(project, template);
        container.innerHTML+=projectItem;
    }
}

async function GetProjectItemTemplate() {
    let response = await fetch("/projects/project-item.html");
    let data = response.text();
    return data;
}

function ConstructProjectItem(data, template) {
    let copy = template;
    copy = copy.replace("{{title}}",data.title);
    copy = copy.replace("{{technologies}}",data.technologies);
    copy = copy.replace("{{url}}",data.url);
    copy = copy.replace("{{tags}}",data.tags);
    return copy;
}

function ConstructHomeButton() {
    let btn = document.createElement("img");
    btn.setAttribute("src","/assets/icon/home.svg");
    btn.setAttribute("data-aos","fade-left");
    btn.setAttribute("class","btn-back");
    btn.setAttribute("data-aos-delay","100");
    btn.addEventListener("click",BackToHome);
    return btn;
}