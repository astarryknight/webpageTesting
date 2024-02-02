tg = 0; //dark/light mode toggle ctr, %2 to switch between states
rotInc=90;//background rotation increment (degrees)

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
navPos=0; //0 indexed var for page position

function getNavElement(navPos){
	if(navPos==0){
		return "nav1";
	} else if(navPos==1){
		return "nav2";
	} else if(navPos==2){
		return "nav3";
	} else{
		return null; //error
	}
}

nav = document.getElementsByClassName("nav");
document.getElementById(getNavElement(navPos)).parentElement.style.background = "#2013BB";
document.getElementById("bg").setAttribute("transform", "rotate(10)");

for (i=0;i<nav.length;i++) {
	el=nav[i];
	if(el.nodeName=="DIV"){
		el.addEventListener("click", function (e) {
			document.getElementById(getNavElement(navPos)).classList.remove("select");
			document.getElementById(getNavElement(navPos)).classList.add("noSelect");
			document.getElementById(getNavElement(navPos)).parentElement.style.background = "transparent";
			console.log(e.target.id);
			if(e.target.id=="nav1"){
				navPos=0;
				document.getElementById("bg").style.setProperty('--svg-rot-deg',0+"deg");
			} else if (e.target.id=="nav2"){
				navPos=1;
				document.getElementById("bg").style.setProperty('--svg-rot-deg',rotInc+"deg");
			} else if (e.target.id=="nav3"){
				navPos=2;
				document.getElementById("bg").style.setProperty('--svg-rot-deg',(2*rotInc)+"deg");
			} else {
				return null; //error
			}
			document.getElementById(getNavElement(navPos)).classList.add("select");
			document.getElementById(getNavElement(navPos)).classList.remove("noSelect");
			document.getElementById(getNavElement(navPos)).parentElement.style.background = "#2013BB";
		});
	}	
}