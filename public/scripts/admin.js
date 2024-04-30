function openMenu(menu) {
    let tables = ["bookmarkTable", 
                  "commentTable", 
                  "fileTable", 
                  "fileshareTable", 
                  "folderTable", 
                  "foldershareTable", 
                  "ratingTable", 
                  "usersTable",
                  "logTable"
                ]
    let tableElements = []
    for(let i = 0; i < tables.length; i++) {
        tableElements[i] = document.getElementById(tables[i]);


    }
    console.log(tableElements);
    console.log(menu)
    for(let i = 0; i < tables.length; i++) {
        if(!tableElements[i].classList.contains("hidden")) {
            tableElements[i].classList.add("hidden");
        }

        if(menu == tables[i]) {
            tableElements[i].classList.remove("hidden");
        }
    }

}