let navOpened = false;

function openNav() {
    document.getElementById("sidenav").style.width = "250px";
    // document.getElementsByClassName("container")[0].style.backgroundColor = "rgba(0, 0, 0, 0.57)";
    navOpened = true;
}

function closeNav() {
    document.getElementById("sidenav").style.width = "0";
    // document.getElementsByClassName("container")[0].style.backgroundColor = "rgb(255, 255, 255)";
    // document.getElementById("menuBar").classList.toggle("change");
    navOpened = false;
}

function menuChange() {
    document.getElementById("menuBar").classList.toggle("change");
    if (navOpened === false) {
        openNav();
    } else {
        closeNav();
    }
}