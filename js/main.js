function LoadHtmlInto(filename, id) {
    console.log("load " + filename + " into " + id);
    fetch(filename)
    .then(response => response.text())
    .then(text => document.getElementById(id).innerHTML = text);
}

function ScrollTo(id){
    document.getElementById(id).scrollIntoView(true);
}

function ScrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function BackToHome() {
    window.location.href = "/";
}

window.onload = function(){
    AOS.init({
        duration:1000,
        once:true,
    });
}