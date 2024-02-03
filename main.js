tg = 0; //dark/light mode toggle ctr, %2 to switch between states
rotInc = 90;//background rotation increment (degrees)

//check for dark mode - https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    tg = 1;
}

//dark/light mode toggle implementation
document.getElementById("thmToggle").addEventListener("click", function (e) {
    const root = document.querySelector(':root');
    if (tg % 2 == 0) {
        root.setAttribute('color-scheme', "dark");
    }
    else {
        root.setAttribute('color-scheme', 'light');
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
            console.log(e.target.id);
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
            document.getElementById(getNavElement(navPos)).classList.add("select");
            document.getElementById(getNavElement(navPos)).classList.remove("noSelect");
            document.getElementById(getNavElement(navPos)).parentElement.style.background = "#2013BB";
        });
    }
}

//arrow navigation handling
document.getElementById("rArrow").addEventListener("click", function (e) {
    navPos++;
    updateMain();
});
document.getElementById("lArrow").addEventListener("click", function (e) {
    navPos--;
    updateMain();
});

//position handling (todo - implememnt pages layout)
function updateMain() {
    if (navPos == 0) {
        document.getElementById("bg").style.setProperty('--svg-rot-deg', 0 + "deg");
        document.getElementById("lArrow").style.opacity = 0;
        document.getElementById("rArrow").style.opacity = 1;
    } else if (navPos == 1) {
        document.getElementById("bg").style.setProperty('--svg-rot-deg', rotInc + "deg");
        document.getElementById("lArrow").style.opacity = 1;
        document.getElementById("rArrow").style.opacity = 1;
    } else if (navPos == 2) {
        document.getElementById("bg").style.setProperty('--svg-rot-deg', (2 * rotInc) + "deg");
        document.getElementById("lArrow").style.opacity = 1;
        document.getElementById("rArrow").style.opacity = 0;
    }
}

//update page on-load
updateMain();