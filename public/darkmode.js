let toggle = document.getElementById("dark-toggle");

toggle.onclick = () => {
    document.body.classList.toggle("light");

    if(toggle.classList.contains("fa-moon")) {
        toggle.classList.remove("fa-moon");
        toggle.classList.add("fa-sun");
    } else {
        toggle.classList.remove("fa-sun");
        toggle.classList.add("fa-moon");
    }
}

    