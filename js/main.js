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
    var firstSection = document.querySelector('section:first-of-type');
    firstSection.append(ConstructLocalScrollButton());

    var lastSection = document.querySelector('section:last-of-type');
    lastSection.append(ConstructBackToTopButton());

    AOS.init({
        duration:1000,
        once:true,
    });
}

function ConstructBackToTopButton() {
    var element = document.createElement("img");
    element.setAttribute("src","assets/icon/chevron_up.svg");
    element.setAttribute("class","local-scroll");
    element.setAttribute("onclick","ScrollTop()");
    return element;
}

function ConstructLocalScrollButton() {
    var container = document.createElement("div");
    container.setAttribute("class","local-scroll");

    var img = document.createElement("img");
    img.setAttribute("src","assets/icon/chevron_down.svg");
    img.setAttribute("onclick","ScrollToSecondSection()");
    img.setAttribute("data-aos","fade-down");
    img.setAttribute("data-aos-anchor-placement","bottom-bottom");

    container.append(img);
    return container;
}