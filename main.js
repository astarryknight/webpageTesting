let nav = document.getElementsByClassName("navEl")

for (el in nav) {
    el.addEventListener("click", function (e) {
        if ("select" in el.classList) {
            return false;
        }
        else {
            
        }
    });
}


