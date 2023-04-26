let toggle = document.getElementById("dark-toggle");
let toggle2 = document.getElementById("dark-toggle-mobile");

toggle.onclick = () => toggleMode();
toggle2.onclick = () => toggleMode();

const toggleMode = () => {
    document.body.classList.add("smooth-bg");
    document.body.classList.toggle("light");

    if(toggle.classList.contains("fa-moon")) {
        toggle.classList.remove("fa-moon");
        toggle.classList.add("fa-sun");
    } else {
        toggle.classList.remove("fa-sun");
        toggle.classList.add("fa-moon");
    }
}

    