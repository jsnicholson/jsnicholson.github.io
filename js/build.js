export { BuildCentreRow, BuildBackToTopButton, BuildLocalScrollButton, BuildProjectItems, BuildProjectItemsForHomePage, BuildHomeButton, BuildFilterButton, BuildAllFilterButton };

import { ScrollToSecondSection, ScrollToTop, BackToHome, CapitaliseFirstLetter, FilterClicked } from "/js/utils.js";
import { PROJECTS_LIST, CONSTRUCTION_PAGE } from "/js/constants.js";

function BuildCentreRow() {
    let row = document.createElement("div");
    row.setAttribute("class","row justify-content-center");
    return row;
}

function BuildBackToTopButton() {
    let container = document.createElement("div");
    container.setAttribute("class","bottom-scroll");
    container.addEventListener("click",ScrollToTop);

    let img = document.createElement("img");
    img.setAttribute("src","/assets/icon/chevron_up.svg");
    img.setAttribute("style","width:50px;height:50px");


    container.append(img);
    return container;
}

function BuildLocalScrollButton() {
    let container = document.createElement("div");
    container.setAttribute("class","top-scroll");
    container.addEventListener("click",ScrollToSecondSection)

    let img = document.createElement("img");
    img.setAttribute("src","/assets/icon/chevron_down.svg");
    img.setAttribute("class","anim-bounce");
    img.setAttribute("style","width:50px;height:50px;");

    container.append(img);
    return container;
}

async function BuildProjectItems() {
    const container = document.getElementById("project-list");
    if(!container)
        return;
    const template = await GetProjectItemTemplate();

    let items = [];
    for(const project of PROJECTS_LIST) {
        items.push(BuildProjectItem(project, template));
    }
    
    return items;
}

async function BuildProjectItemsForHomePage() {
    const template = await GetProjectItemTemplate();

    let projects = [];
    for(const project of PROJECTS_LIST) {
        if(project.tags.includes("highlighted"))
            projects.push(project);
    }

    let items = [];
    for(const project of projects) {
        items.push(BuildProjectItem(project, template));
    }
    return items;
}

async function GetProjectItemTemplate() {
    let response = await fetch("/projects/project-item.partial.html");
    let data = response.text();
    return data;
}

function BuildProjectItem(data, template) {
    let copy = template;
    copy = copy.replace("{{title}}",data.title);
    copy = copy.replace("{{technologies}}",data.technologies);

    if(data.url)
        copy = copy.replace("{{url}}",data.url);
    else
        copy = copy.replace("{{url}}",CONSTRUCTION_PAGE);

    copy = copy.replace("{{tags}}",data.tags);
    return copy;
}

function BuildHomeButton() {
    let btn = document.createElement("img");
    btn.setAttribute("src","/assets/icon/home.svg");
    btn.setAttribute("data-aos","fade-left");
    btn.setAttribute("class","btn-back");
    btn.setAttribute("data-aos-delay","100");
    btn.addEventListener("click",BackToHome);
    return btn;
}

function BuildFilterButton(name) {
    let button = document.createElement("a");
    button.setAttribute("data-filter","."+name.toLowerCase());
    button.textContent = CapitaliseFirstLetter(name);
    button.addEventListener("click",function() {FilterClicked(button)});
    return button;
}

function BuildAllFilterButton() {
    let button = document.createElement("a");
    button.setAttribute("data-filter","a");
    button.setAttribute("class","active");
    button.textContent = "All"
    button.addEventListener("click",function(){FilterClicked(button)});
    return button;
}