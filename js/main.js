import * as utils from "/js/utils.js";
import * as constants from "/js/constants.js";
import * as build from "/js/build.js";
import * as compose from "/js/compose.js";

utils.DisableScroll();

window.onload = function(){
    compose.ComposeSecondSectionScrollButton();
    compose.ComposeBackToTopButton();
    compose.ComposeHomeButton();

    utils.LoadHtmlInto("/footer.html", "footer");

    utils.HideLoadingScreen();

    utils.EnableScroll();

    // this has to be the last thing happening to the body otherwise it doesnt load correctly
    AOS.init({
        duration:1000,
        once:true,
    });
}

// setup functions for specific pages
window.SetupProjectsOnHomePage = function() {
    utils.SetupProjectsOnHomePage();
};

window.SetupProjectPage = function() {
    utils.SetupProjectPage();
};