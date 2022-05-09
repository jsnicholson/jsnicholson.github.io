export { LoadHtmlInto, ScrollTo, ScrollToSecondSection, ScrollToTop, BackToHome, FilterClicked, GetBaseUrl };

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

function ScrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function BackToHome() {
    window.location.href = "/";
}

function FilterClicked(filter) {
    console.log("filter clicked");
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

function GetBaseUrl() {
    let path = window.location.origin;
    if(path.includes(":port")) {
        let index = path.indexOf(":port");
        path = path.substring(0,index);
    }
    return path;
}