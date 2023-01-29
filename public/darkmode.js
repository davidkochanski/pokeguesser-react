let toggle = document.getElementById("dark-toggle");

toggle.onclick = () => {
    document.body.classList.toggle("dark");

    if(toggle.classList.contains("fa-sun")) {
        toggle.classList.remove("fa-sun");
        toggle.classList.add("fa-moon");
    } else {
        toggle.classList.remove("fa-moon");
        toggle.classList.add("fa-sun");
    }
}

    