//dark/light mode toggle
tg = 0;

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
let nav = document.getElementsByClassName("navEl")

for (el in nav) {
    el.addEventListener("click", function (e) {
        if ("select" in el.classList) {
            return false;
        }
        else {
            //todo: use e to find which element was clicked, maybe just have spans over all three and set it to have a color
            //maybe have a variable that stores the postion of the webpage for further use
        }
    });
}


