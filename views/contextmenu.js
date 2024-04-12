document.addEventListener("DOMContentLoaded", function () {
    const explorer = document.getElementById("explorer");
    const menuExplorer = document.getElementById("contextMenuExplorer");

    const folder = document.getElementById("folder");
    const menuFolder = document.getElementById("contextMenuFolder");

    explorer.addEventListener("contextmenu", function (event) {
        if (!event.target.closest("#folder")) {

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

    folder.addEventListener("contextmenu", function (event) {
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

    document.addEventListener("click", function (event) {
        if (!menuExplorer.contains(event.target)) {
            menuExplorer.classList.add("hidden");
        }

        if (!menuFolder.contains(event.target)) {
            menuFolder.classList.add("hidden");
        }
    });
});
