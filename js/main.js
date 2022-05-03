function LoadHtmlInto(filename, id) {
    console.log("load " + filename + " into " + id);
    fetch(filename)
    .then(response => response.text())
    .then(text => document.getElementById(id).innerHTML = text);
}

function ScrollTo(id){
    var element = document.getElementById(id);
    element.scrollIntoView(true);
    //$('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
}

function ScrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function BackToHome() {
    history.back();
}