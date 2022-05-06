function LoadHtmlInto(filename, id) {
    console.log("load " + filename + " into " + id);
    fetch(filename)
    .then(response => response.text())
    .then(text => document.getElementById(id).innerHTML = text);
}

function ScrollTo(id){
    document.getElementById(id).scrollIntoView(true);
}

function ScrollToSecondSection() {
    document.querySelector('section:nth-of-type(2)').scrollIntoView(true);
}

function ScrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function BackToHome() {
    window.location.href = "/";
}

window.onload = function(){
    // add down arrow to first section and up arrow to last section
    let numSections = document.querySelectorAll('section').length;
    if(numSections > 1) {
        let firstSection = document.querySelector('section:first-of-type');
        firstSection.append(ConstructLocalScrollButton());
        let lastSection = document.querySelector('section:last-of-type');
        lastSection.append(ConstructBackToTopButton());
    }

    // remove animate.css class after animation end
    let projectList = document.querySelector('#project-list');
    if(projectList) {
        let list = projectList.querySelectorAll('a');
        list.forEach(item => {
            item.addEventListener('animationend', () => {
                item.classList.remove("animate__animated");
            });
        });
    }

    // hide loading screen after window fully loaded
    let loader = document.querySelector('aside');
    let main = document.querySelector('main');
    if(loader)loader.classList.add("d-none");
    main.classList.remove("d-none");

    AOS.init({
        duration:1000,
        once:true,
    });
}

function ConstructBackToTopButton() {
    let element = document.createElement("img");
    element.setAttribute("src","/assets/icon/chevron_up.svg");
    element.setAttribute("class","local-scroll");
    element.setAttribute("onclick","ScrollTop()");
    return element;
}

function ConstructLocalScrollButton() {
    let container = document.createElement("div");
    container.setAttribute("class","local-scroll");

    let img = document.createElement("img");
    img.setAttribute("src","/assets/icon/chevron_down.svg");
    img.setAttribute("onclick","ScrollToSecondSection()");
    img.setAttribute("data-aos","fade-down");
    img.setAttribute("data-aos-anchor-placement","bottom-bottom");

    container.append(img);
    return container;
}

async function ConstructProjectItems() {
    const container = document.getElementById("project-list");
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
}

const PROJECTS_LIST = [
    {
        "title":"NHS Scotland Covid Passport",
        "technologies":"c#, xamarin, azure, devops",
        "url":"/project/covid",
        "tags":"industry code highlighted"
    },
    {
        "title":"Notion Random Thought Integration",
        "technologies":"node.js, serverless function, REST",
        "url":"/projects/notion",
        "tags":"code hightlighted"
    },
    {
        "title":"Voxel Meshing",
        "technologies":"c++, opengl, sdl, glew, glm",
        "url":"/projects/voxel",
        "tags":"code highlighted"
    },
    {
        "title":"Rooty Tooty Pilot Shooty",
        "technologies":"c++, proprietary framework",
        "url":"/projects/plane",
        "tags":"code"
    },
    {
        "title":"Activity Tracker",
        "technologies":"java, android, xml",
        "url":"/projects/activity",
        "tags":"code"
    },
    {
        "title":"Imgurviewer",
        "technologies":"bootstrap, javascript, REST",
        "url":"/projects/imgur",
        "tags":"code"
    },
    {
        "title":"Personal Website",
        "technologies":"bootstrap, javascript",
        "url":"/projects/website",
        "tags":"code"
    },
    {
        "title":"Company of Heroes Mobile",
        "technologies":"c++ xcode, jira",
        "url":"/projects/coh",
        "tags":"industry code"
    },
    {
        "title":"XCOM2 Mobile",
        "technologies":"c++, unreal, visual studio, jira",
        "url":"/projects/xcom",
        "tags":"industry code"
    },
    {
        "title":"'Walking amongst Giants'",
        "technologies":"watercolour, ink",
        "url":"/projects/giants",
        "tags":"art"
    },
    {
        "title":"'Ginjen Bend'",
        "technologies":"watercolour, gouache",
        "url":"/projects/ginjen",
        "tags":"art"
    },
    {
        "title":"'Atop the Misty Peaks'",
        "technologies":"watercolour, gouache, fine-line",
        "url":"/projects/peaks",
        "tags":"art"
    },
    {
        "title":"'Restored Portrait of a Tao Historian'",
        "technologies":"watercolour, ink, gouache",
        "url":"/projects/portrait",
        "tags":"art"
    },
    {
        "title":"'Topography of Kaifen and it's surroudning area'",
        "technologies":"pencil, fine-line",
        "url":"/projects/topography",
        "tags":"art"
    },
];