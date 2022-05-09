import * as utils from "/js/utils.js";
import * as constants from "/js/constants.js";
import * as construct from "/js/construct.js";

window.onload = function(){
    // add down arrow to first section and up arrow to last section
    let numSections = document.querySelectorAll('section').length;
    if(numSections > 1) {
        let firstSection = document.querySelector('section:first-of-type');
        firstSection.append(construct.ConstructLocalScrollButton());
        let lastSection = document.querySelector('section:last-of-type');
        lastSection.append(construct.ConstructBackToTopButton());
    }

    // add home button to first section
    if(!constants.HOME_EXCLUDE_LIST.includes(window.location.pathname)) {
        let firstSection = document.querySelector('section:first-of-type');
        firstSection.append(construct.ConstructHomeButton());
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

    utils.LoadHtmlInto("/footer.html", "footer");
    // attempt to add event listeners
    construct.ConstructProjectItems()
    document.querySelectorAll(".filters a")?.forEach(item => {
        item.addEventListener("click",function(){utils.FilterClicked(item)});
    });
}