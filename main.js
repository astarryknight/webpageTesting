tg = 0; //dark/light mode toggle ctr, %2 to switch between states
rotInc = 90;//background rotation increment (degrees)

//check for dark mode - https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    tg = 1;
}

//dark/light mode toggle implementation
document.getElementById("thmToggle").addEventListener("click", function (e) {
    const root = document.querySelector(':root');
    var b = document.getElementsByClassName("blueBox");
    if (tg % 2 == 0) {
        root.setAttribute('color-scheme', "dark");
        for(i=0;i<b.length;i++) { b.color="white" } //selector box text color handling
    }
    else {
        root.setAttribute('color-scheme', 'light');
        for(i=0;i<b.length;i++) { b.color="black" }
    }
    tg++;
    updateMain();
});


//render navbar in correct DOM position
function navBarMoveTo(element){
    var nav = document.getElementById("navContainer");
    var parent = document.body;
    parent.insertBefore(nav, element);
}


//nav bar navigation handling
navPos = 0; //0 indexed var for page position

function getNavElement(navPos) {
    if (navPos == 0) {
        return "nav1";
    } else if (navPos == 1) {
        return "nav2";
    } else if (navPos == 2) {
        return "nav3";
    } else {
        return null; //error
    }
}

nav = document.getElementsByClassName("nav");
document.getElementById(getNavElement(navPos)).parentElement.style.background = "#2013BB";
document.getElementById("bg").setAttribute("transform", "rotate(10)");

for (i = 0; i < nav.length; i++) {
    el = nav[i];
    if (el.nodeName == "DIV") {
        el.addEventListener("click", function (e) {
            document.getElementById(getNavElement(navPos)).classList.remove("select");
            document.getElementById(getNavElement(navPos)).classList.add("noSelect");
            document.getElementById(getNavElement(navPos)).parentElement.style.background = "transparent";
            if(tg%2==0) {document.getElementById(getNavElement(navPos)).parentElement.style.color = "black";}
            if (e.target.id == "nav1") {
                navPos = 0;
                updateMain();
            } else if (e.target.id == "nav2") {
                navPos = 1;
                updateMain();
            } else if (e.target.id == "nav3") {
                navPos = 2;
                updateMain();
            } else {
                return null; //error
            }
        });
    }
}

//arrow navigation handling
document.getElementById("right").addEventListener("click", function (e) {
    document.getElementById(getNavElement(navPos)).classList.remove("select");
    document.getElementById(getNavElement(navPos)).classList.add("noSelect");
    document.getElementById(getNavElement(navPos)).parentElement.style.background = "transparent";
    navPos++;
    updateMain();
});
document.getElementById("left").addEventListener("click", function (e) {
    document.getElementById(getNavElement(navPos)).classList.remove("select");
    document.getElementById(getNavElement(navPos)).classList.add("noSelect");
    document.getElementById(getNavElement(navPos)).parentElement.style.background = "transparent";
    navPos--;
    updateMain();
});

function hasClass(element, className){
    for(i=0;i<element.classList.length;i++) { 
        if(element.classList[i]==className){
            return true;
        }
    }
    return false;
}

//position handling (todo - make sure button can't be clicked even when it's hidden using class "noClick")
function updateMain() {
	left = document.getElementById("lArrow");
	right = document.getElementById("rArrow");
    if (navPos == 0) {
        document.getElementById("bg").style.setProperty('--svg-rot-deg', 0 + "deg");
        left.style.opacity = 0;
        left.style.zIndex=-1;
        right.style.opacity = 1;
        right.style.zIndex=1;
    } else if (navPos == 1) {
        document.getElementById("bg").style.setProperty('--svg-rot-deg', rotInc + "deg");
        left.style.opacity = 1;
        left.style.zIndex=1;
        right.style.opacity = 1;
        right.style.zIndex=1;
    } else if (navPos == 2) {
        document.getElementById("bg").style.setProperty('--svg-rot-deg', (2 * rotInc) + "deg");
        left.style.opacity = 1;
        left.style.zIndex=1;
        right.style.opacity = 0;
        right.style.zIndex=-1;
    }
    moveNew();
    //update colors for navbar
    for(i=0;i<3;i++){
        if(i==navPos){
            document.getElementById(getNavElement(navPos)).classList.add("select");
            document.getElementById(getNavElement(navPos)).classList.remove("noSelect");
            document.getElementById(getNavElement(navPos)).parentElement.style.background = "#2013BB";
            document.getElementById(getNavElement(navPos)).parentElement.style.color = "white";
        } else{
            //ternary :)
            document.getElementById(getNavElement(i)).parentElement.style.color = (tg % 2 == 0) ? "black" : "white";
        }
    }
}

//temp func new
function moveNew() {
    main = document.getElementById("mainContainer");
    l1 = document.getElementsByClassName("page1");
    l2 = document.getElementsByClassName("page2");
    l3 = document.getElementsByClassName("page3");
    if (navPos == 0) {
        main.style.gridTemplateRows = ".7fr .2fr 0.2fr 1fr";
        main.style.gridTemplateColumns = "1fr 1fr .5fr .5fr";
        for(i=0;i<l1.length;i++){ l1[i].style.opacity=1 }
        for(i=0;i<l2.length;i++){ l2[i].style.opacity=0 }
        for(i=0;i<l3.length;i++){ l3[i].style.opacity=0 }
    } else if (navPos == 1) {
        main.style.gridTemplateRows = "1fr .2fr 0.2fr .7fr";
        main.style.gridTemplateColumns = "1fr 1fr .5fr .5fr";
        for(i=0;i<l1.length;i++){ l1[i].style.opacity=0}
        for(i=0;i<l2.length;i++){ l2[i].style.opacity=1}
        for(i=0;i<l3.length;i++){ l3[i].style.opacity=0}
    } else if (navPos == 2) {
        main.style.gridTemplateRows = "1fr .2fr 0.2fr .7fr";
        main.style.gridTemplateColumns = ".75fr 0.5fr 0.75fr 0.5fr";
        for(i=0;i<l1.length;i++){ l1[i].style.opacity=0 }
        for(i=0;i<l2.length;i++){ l2[i].style.opacity=0 }
        for(i=0;i<l3.length;i++){ l3[i].style.opacity=1 }
    }
}


//todo - separate by files for ease of access and readability

//todo - add page for qualifications/stuff i know how to do (icons - figma/notion/inventor/illustrator/etc)
//Inventor, Onshape, Figma, Photoshop, Illustrator, (lightroom), Davinci Resolve, Notion, VSCode?, Python, Java, Javscript, HTML5, Arduino

//update page on-load
updateMain();