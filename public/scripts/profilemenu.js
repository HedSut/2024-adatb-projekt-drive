function openMenu(menu) {
    const picture = document.getElementById("pictureChangeForm");
    const email = document.getElementById("emailChangeForm");
    const password = document.getElementById("passwordChangeForm");

    if (!picture.classList.contains("hidden")) {
        picture.classList.add("hidden");
    }

    if (!email.classList.contains("hidden")) {
        email.classList.add("hidden");
    }

    if (!password.classList.contains("hidden")) {
        password.classList.add("hidden");
    }


    if (menu == "picture") {
        picture.classList.remove("hidden");
    } else if (menu == "email") {
        email.classList.remove("hidden");
    } else if (menu == "password") {
        password.classList.remove("hidden");
    }
}