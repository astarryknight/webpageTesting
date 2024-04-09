tg = 0; //dark/light mode toggle ctr, %2 to switch between states
rotInc = 90;//background rotation increment (degrees)
mobile = false; //mobile device variable

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
        document.getElementById("ascii").style.color="white";
    }
    else {
        root.setAttribute('color-scheme', 'light');
        for(i=0;i<b.length;i++) { b.color="black" }
        document.getElementById("ascii").style.color="black";
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

function responsiveNav(){
    var nav = document.getElementById("navContainer");
    if(window.visualViewport.width<1002){
        navBarMoveTo(document.getElementById("wrapper"));
        mobile=true;
    } else{
        navBarMoveTo(document.getElementById("footerContainer"));
        mobile=false;
    }
}

visualViewport.onresize = () => {
    responsiveNav();
};


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
    moveRight();
});
document.getElementById("left").addEventListener("click", function (e) {
    moveLeft();
});


function moveRight(){
    if(navPos!=2){
        document.getElementById(getNavElement(navPos)).classList.remove("select");
        document.getElementById(getNavElement(navPos)).classList.add("noSelect");
        document.getElementById(getNavElement(navPos)).parentElement.style.background = "transparent";
        navPos++;
        updateMain();
    }
}

function moveLeft(){
    if(navPos!=0){
        document.getElementById(getNavElement(navPos)).classList.remove("select");
        document.getElementById(getNavElement(navPos)).classList.add("noSelect");
        document.getElementById(getNavElement(navPos)).parentElement.style.background = "transparent";
        navPos--;
        updateMain();
    }
}


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
    if(document.getElementById("gchess").style.display=="block"){
        document.getElementById("gchess").style.display="flex";
    }
}

//temp func new
function moveNew() {

    mobileRows = "1fr 0.5fr 1fr 1fr 0.5fr"
    mobileCols = "1fr 0.5fr 0.5fr 1fr"

    main = document.getElementById("mainContainer");
    l1 = document.getElementsByClassName("page1");
    l2 = document.getElementsByClassName("page2");
    l3 = document.getElementsByClassName("page3");
    if (navPos == 0) {
        if(!mobile){
            main.style.gridTemplateRows = ".7fr .2fr 0.2fr 1fr";
            main.style.gridTemplateColumns = "1fr 1fr .5fr .5fr";
        } else {
            main.style.gridTemplateRows = mobileRows;
            main.style.gridTemplateColumns = mobileCols;
        }

        for(i=0;i<l1.length;i++){ l1[i].style.display="block"; l1[i].style.width="100%"; l1[i].style.height="100%"; }
        for(i=0;i<l2.length;i++){ l2[i].style.display="none"; l2[i].style.width="0%"; l2[i].style.height="0%"; }
        for(i=0;i<l3.length;i++){ l3[i].style.display="none"; l3[i].style.width="0%"; l3[i].style.height="0%"; }
    } else if (navPos == 1) {
        if(!mobile){
            main.style.gridTemplateRows = "1fr .2fr 0.2fr .7fr";
            main.style.gridTemplateColumns = "1fr 1fr .5fr .5fr";
        } else {
            main.style.gridTemplateRows = mobileRows;
            main.style.gridTemplateColumns = mobileCols;
        } 

        for(i=0;i<l1.length;i++){ l1[i].style.display="none"; l1[i].style.width="0%"; l1[i].style.height="0%"; }
        for(i=0;i<l2.length;i++){ l2[i].style.display="block"; l2[i].style.width="100%"; l2[i].style.height="100%"; }
        for(i=0;i<l3.length;i++){ l3[i].style.display="none"; l3[i].style.width="0%"; l3[i].style.height="0%"; }
    } else if (navPos == 2) {
        if(!mobile){
            main.style.gridTemplateRows = "1fr .2fr 0.2fr .7fr";
            main.style.gridTemplateColumns = ".75fr 0.5fr 0.75fr 0.5fr";    
        } else {
            main.style.gridTemplateRows = mobileRows;
            main.style.gridTemplateColumns = mobileCols;
        } 
        
        for(i=0;i<l1.length;i++){ l1[i].style.display="none"; l1[i].style.width="0%"; l1[i].style.height="0%"; }
        for(i=0;i<l2.length;i++){ l2[i].style.display="none"; l2[i].style.width="0%"; l2[i].style.height="0%"; }
        for(i=0;i<l3.length;i++){ l3[i].style.display="block"; l3[i].style.width="100%"; l3[i].style.height="100%"; }
    }
}



// mobile swiping implementation
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches      // browser API
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            moveRight();
        } else {
            /* right swipe */
            moveLeft();
        }                       
    }                                                               
    /* reset values */
    xDown = null;
    yDown = null;                                             
};



//todo - separate by files for ease of access and readability

//todo - add page for qualifications/stuff i know how to do (icons - figma/notion/inventor/illustrator/etc)
//Inventor, Onshape, Figma, Photoshop, Illustrator, (lightroom), Davinci Resolve, Notion, VSCode?, Python, Java, Javscript, HTML5, Arduino

//update page on-load
updateMain();
responsiveNav();
moveNew();