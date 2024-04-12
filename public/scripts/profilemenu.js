function openMenu(menu) {
    console.log(menu);
    const picture = document.getElementById("pictureChangeForm");
    const email = document.getElementById("emailChangeForm");
    const password = document.getElementById("passwordChangeForm");
    const username = document.getElementById("usernameChangeForm");

    if (!picture.classList.contains("hidden")) {
        picture.classList.add("hidden");
    }

    if (!email.classList.contains("hidden")) {
        email.classList.add("hidden");
    }

    if (!password.classList.contains("hidden")) {
        password.classList.add("hidden");
    }

    if (!username.classList.contains("hidden")) {
        username.classList.add("hidden");
    }

    if (menu == "picture") {
        picture.classList.remove("hidden");
    } else if (menu == "email") {
        email.classList.remove("hidden");
    } else if (menu == "password") {
        password.classList.remove("hidden");
    } else if (menu == "username") {
        username.classList.remove("hidden");
    }
}