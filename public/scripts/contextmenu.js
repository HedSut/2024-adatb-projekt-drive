document.addEventListener("DOMContentLoaded", function () {
    const explorer = document.getElementById("explorer");
    const menuExplorer = document.getElementById("contextMenuExplorer");
    const downloadButton = document.getElementById("downloadButton");
    
    const file = document.querySelectorAll('.file');
    const folder = document.querySelectorAll('.folder');
    const menuFolder = document.getElementById("contextMenuFolder");

    function hideMenu() {
        if (!menuFolder.classList.contains("hidden")) {
            menuFolder.classList.add("hidden");
        }

        if (!menuExplorer.classList.contains("hidden")) {
            menuExplorer.classList.add("hidden");
        }

        if(!downloadButton.classList.contains("hidden")) {
            downloadButton.classList.add("hidden")
        }
    }

    explorer.addEventListener("contextmenu", function (event) {
        if (!event.target.closest(".folder") && !event.target.closest(".file")) {
            hideMenu();
            event.preventDefault(); // Prevent the default context menu
            const x = event.clientX;
            const y = event.clientY;
            menuExplorer.style.left = x + "px";
            menuExplorer.style.top = y + "px";
            menuExplorer.classList.remove("hidden");
        }

    });

    for (let i = 0; i < folder.length; i++) {
        folder[i].addEventListener("contextmenu", function (event) {
            hideMenu();
            let target = event.target
            if (!(event.target instanceof HTMLDivElement)) {
                target = target.parentNode;
            }
            document.getElementById("menuRenameId").innerHTML = target.id;  
            document.getElementById("id").value = target.id;
            document.getElementById("deletetype").value = "folder";

            event.preventDefault(); // Prevent the default context menu
            const x = event.clientX;
            const y = event.clientY;
            menuFolder.style.left = x + "px";
            menuFolder.style.top = y + "px";
            menuFolder.classList.remove("hidden");
        });
    }

    for (let i = 0; i < file.length; i++) {
        file[i].addEventListener("contextmenu", function (event) {
            hideMenu();
            let target = event.target
            if (!(event.target instanceof HTMLDivElement)) {
                target = target.parentNode;
            }
            
            document.getElementById("id").value = target.id;
            document.getElementById("deletetype").value = "file";
            event.preventDefault(); // Prevent the default context menu
            const x = event.clientX;
            const y = event.clientY;
            menuFolder.style.left = x + "px";
            menuFolder.style.top = y + "px";
            menuFolder.classList.remove("hidden");
            downloadButton.classList.remove("hidden");
            downloadButton.href="/download/" + target.id;
        });
    }

    document.addEventListener("click", function (event) {
        hideMenu();

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
