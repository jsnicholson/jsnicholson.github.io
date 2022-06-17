let fs = require('fs');

const URL_BASE = MoveToParent(__dirname);

const PAGES_SIMPLE_HEAD = [
    "/404.html"
];

const PAGES_FULL_HEAD = [
    "/index.html",
    "/cv.html",
    "/projects/activity.html",
    "/projects/covid.html",
    "/projects/giants.html",
    "/projects/ginjen.html",
    "/projects/index.html",
    "/projects/notion.html",
    "/projects/peaks.html",
    "/projects/pilot.html",
    "/projects/portrait.html",
    "/projects/topography.html"
];

const SEARCH_HEAD_TAG_OPEN = "<head>";
const SEARCH_HEAD_TAG_CLOSE = "</head>";
const SEARCH_TITLE_TAG_CLOSE = "</title>";

Main();

function Main() {
    const dataHead = fs.readFileSync(__dirname + "/simple-head.html","utf8");
    for(pathPage of PAGES_FULL_HEAD) {
        const dataPage = fs.readFileSync(URL_BASE + pathPage, "utf8");
        const indexEndOfTitleTagClose = dataPage.indexOf(SEARCH_TITLE_TAG_CLOSE)+SEARCH_TITLE_TAG_CLOSE.length;
        const indexStartOfHeadTagClose = dataPage.indexOf(SEARCH_HEAD_TAG_CLOSE);
        const output = [dataPage.substring(0,indexEndOfTitleTagClose),dataHead,dataPage.substring(indexStartOfHeadTagClose)].join('');
        console.log(output);
    }
}

function MoveToParent(path) {
    const parentDirEndIndex = path.lastIndexOf("\\");
    return path.substring(0,parentDirEndIndex);
}