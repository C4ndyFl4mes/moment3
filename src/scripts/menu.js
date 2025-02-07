const menuNAV = document.getElementById("menu");
const menuholderDIV = document.getElementById("menu-holder");

// Togglar menyn. Droppdown menyn har en animation som använder grid och height.
document.getElementById("menu-btn").addEventListener("click", () => {
    if (window.getComputedStyle(menuNAV).height === "0px") {
        menuNAV.style.height = "13rem";
        menuholderDIV.style.gridTemplateRows = "13rem 2.5rem";
    } else {
        menuholderDIV.style.gridTemplateRows = "0px 2.5rem";
        menuNAV.style.height = "0px";
    }
});