export { LoadHtmlInto,
    ScrollTo,
    ScrollToSecondSection,
    ScrollToTop,
    BackToHome,
    FilterClicked,
    HideLoadingScreen,
    SetupProjectPage,
    SetupProjectsOnHomePage,
    EnableScroll,
    DisableScroll,
    HideHR,
    CapitaliseFirstLetter,
    GetUniqueProjectTags,
    GetProjectsList
};

import { ComposeProjectItems, ComposeProjectItemsForHomePage, ComposeFilterButtons } from "/js/compose.js"
import { PROJECTS_LIST_PATH } from "/js/constants.js"

function LoadHtmlInto(filename, id) {
    fetch(filename)
    .then(response => response.text())
    .then(text => document.getElementById(id).innerHTML = text)
    .catch((error) => {
        console.log("load html failed:",error);
    });
}

function ScrollTo(id){
    document.getElementById(id).scrollIntoView(true);
}

function ScrollToSecondSection() {
    document.querySelector('section:nth-of-type(2)').scrollIntoView(true);
}

function ScrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function BackToHome() {
    window.location.href = "/";
}

function FilterClicked(filter) {
    // remove active from all filters
    let filters = document.querySelectorAll(".filters a");
    filters.forEach(item => {
        item.classList.remove("active");
    });
    // add active only to the one we clicked
    filter.classList.add("active");
    let filterType = filter.getAttribute("data-filter");
    let list = document.getElementById("project-list");
    // hide all rows
    const allRows = list.querySelectorAll("a");
    allRows.forEach(item => {
        item.classList.add("d-none");
        item.classList.remove("animate__animated");
    });
    // show wanted rows
    const wantedRows = list.querySelectorAll(filterType);
    let num = 0;
    wantedRows.forEach(item => {
        item.removeAttribute("data-aos");
        item.style = "--animate-delay:"+(0.2*num)+"s";
        // add animate class after timeout to ensure its picked up
        setTimeout(function(){
            item.classList.remove("d-none"); 
            item.classList.add("animate__animated");
        }, 10);
        num++;
    });
    // show all horizontal rules
    const allHR = document.querySelectorAll(filterType + " hr");
    allHR.forEach(item => {
        item.classList.remove("d-none");
    });
    //hide final horizontal fule
    const finalHR = allHR[allHR.length -1];
    if(finalHR != undefined)
        finalHR.classList.add("d-none");
}

function HideLoadingScreen() {
    document.querySelector(".loader")?.classList.add("d-none");
    document.querySelector('main').classList.remove("d-none");
}

function SetupProjectPage() {
    ComposeFilterButtons();
    ComposeProjectItems();
    // document.querySelectorAll(".filters a")?.forEach(item => {
    //     item.addEventListener("click",function(){FilterClicked(item)});
    // });
}

function SetupProjectsOnHomePage() {
    ComposeProjectItemsForHomePage();
}

function HideHR(text) {
    const query = "<hr ";
    const indexOfHR = text.indexOf(query);
    const result = text.substring(0,indexOfHR+query.length) + "class='d-none' " + text.substring(indexOfHR+query.length);
    return result;
}

function EnableScroll() {
    document.body.classList.remove("remove-scrolling");
}

function DisableScroll() {
    let body = document.body;
    if(body)
        document.body.classList.add("remove-scrolling");
}

function CapitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function GetUniqueProjectTags() {
    let uniqueTags = [];
    const projectsList = await GetProjectsList();
    for(const project of projectsList) {
        let tags = project.tags.split(" ");
        for(const tag of tags) {
            if(!uniqueTags.includes(tag))
                uniqueTags.push(tag);
        }
    }
    return uniqueTags;
}

async function GetProjectsList() {
    let response = await fetch(PROJECTS_LIST_PATH)
    const json = await response.json();
    return json.list;
}