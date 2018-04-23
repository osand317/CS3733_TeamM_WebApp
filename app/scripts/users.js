function searchCallback() {
    let input = document.getElementById("searchFilter").value.toUpperCase();
    let userList = document.getElementById("userList").getElementsByTagName("li");
    console.log(input);

    for (let i = 0; i < userList.length; i++) {
        let name = userList[i].innerHTML.toUpperCase();

        if(name.indexOf(input) > -1){
            userList[i].style.display = "";
        }
        else{
            userList[i].style.display = "none";
        }
    }

}