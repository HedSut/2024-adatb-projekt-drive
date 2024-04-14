document.addEventListener("DOMContentLoaded", function () {
    const explorer = document.getElementById("explorer");
    const menuExplorer = document.getElementById("contextMenuExplorer");

    const folder = document.querySelectorAll('.folder');
    const menuFolder = document.getElementById("contextMenuFolder");

    explorer.addEventListener("contextmenu", function (event) {
        if (!event.target.closest(".folder")) {
            event.preventDefault(); // Prevent the default context menu
            const x = event.clientX;
            const y = event.clientY;
            menuExplorer.style.left = x + "px";
            menuExplorer.style.top = y + "px";
            menuExplorer.classList.remove("hidden");

            if (!menuFolder.contains(event.target)) {
                menuFolder.classList.add("hidden");
            }
        }

    });

    for (let i = 0; i < folder.length; i++) {
        folder[i].addEventListener("contextmenu", function (event) {

            let target = event.target
            if (!(event.target instanceof HTMLDivElement)) {
                target = target.parentNode;
            }
            document.getElementById("menuRenameId").innerHTML = target.id;


            event.preventDefault(); // Prevent the default context menu
            const x = event.clientX;
            const y = event.clientY;
            menuFolder.style.left = x + "px";
            menuFolder.style.top = y + "px";
            menuFolder.classList.remove("hidden");

            if (!menuExplorer.contains(event.target)) {
                menuExplorer.classList.add("hidden");
            }
        });
    }

    document.addEventListener("click", function (event) {
        if (!menuExplorer.contains(event.target)) {
            menuExplorer.classList.add("hidden");
        }

        if (!menuFolder.contains(event.target)) {
            menuFolder.classList.add("hidden");
        }

        if (event.target !== document.getElementById("renameButton")) {
            let id = document.getElementById("menuRenameId").innerHTML;
            let folder = document.getElementById(id);

            folder.children[1].classList.remove("hidden");
            folder.children[2].classList.add("hidden");
            //folder.children[2].children[0].value = folder.children[1].innerHTML;
        }
    });
});

function changeName() {
    const menuFolder = document.getElementById("contextMenuFolder");
    let id = document.getElementById("menuRenameId").innerHTML;
    let folder = document.getElementById(id);

    folder.children[1].classList.add("hidden");
    folder.children[2].classList.remove("hidden");


    folder.children[2].children[0].focus();
    menuFolder.classList.add("hidden");
}
