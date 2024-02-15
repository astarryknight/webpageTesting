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
});


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
        addClass(right, left);
        left.style.opacity = 0;
        right.style.opacity = 1;
    } else if (navPos == 1) {
        document.getElementById("bg").style.setProperty('--svg-rot-deg', rotInc + "deg");
        addClass(right, left);
        left.style.opacity = 1;
        right.style.opacity = 1;
    } else if (navPos == 2) {
        document.getElementById("bg").style.setProperty('--svg-rot-deg', (2 * rotInc) + "deg");
        addClass(right, left);
        left.style.opacity = 1;
        right.style.opacity = 0;
    }
    moveNew();
    document.getElementById(getNavElement(navPos)).classList.add("select");
    document.getElementById(getNavElement(navPos)).classList.remove("noSelect");
    document.getElementById(getNavElement(navPos)).parentElement.style.background = "#2013BB";
    document.getElementById(getNavElement(navPos)).parentElement.style.color = "white";
}

function addClass(right, left){
    if(hasClass(left, "noClick")){
        left.classList.add("noClick");
    }
    if(hasClass(right, "noClick")){
        right.classList.remove("noClick");
    }
}

//temp func new
function moveNew() {
    main = document.getElementById("mainContainer");
    if (navPos == 0) {
        main.style.gridTemplateRows = ".7fr .2fr 0.2fr 1fr";
        main.style.gridTemplateColumns = "1fr 1fr .5fr .5fr";
    } else if (navPos == 1) {
        main.style.gridTemplateRows = "1fr .2fr 0.2fr .7fr";
        main.style.gridTemplateColumns = "1fr 1fr .5fr .5fr";
    } else if (navPos == 2) {
        main.style.gridTemplateRows = "1fr .2fr 0.2fr .7fr";
        main.style.gridTemplateColumns = ".75fr 0.5fr 0.75fr 0.5fr";
    }
}


//todo - separate by files for ease of access and readability

console.log(hasClass(document.getElementById("rArrow"), "arrow"));

//update page on-load
updateMain();