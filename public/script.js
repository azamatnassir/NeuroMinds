function openNav() {
    if (window.innerWidth < 768) {
        document.getElementById("sidenav").style.width = "250px";
        document.getElementById("sidenav").style.height = "250px";
    } else {
        document.getElementById("sidenav").style.width = "250px";
    }
}

function closeNav() {
    if (window.innerWidth < 768) {
        document.getElementById("sidenav").style.width = "0";
        document.getElementById("sidenav").style.height = "0";
    } else {
        document.getElementById("sidenav").style.width = "0";
    }
}

function menuChange() {
    document.getElementById("menuBar").classList.toggle("change");
    if (navOpened === false) {
        openNav();
    } else {
        closeNav();
    }
}