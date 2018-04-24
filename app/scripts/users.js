var userList = document.querySelector("#userList");

var usersRef;
usersRef = firestore.collection("users");

usersRef.onSnapshot(function(querySnapshot){
    listCallback(querySnapshot);
});

function listCallback(querySnapshot){
    querySnapshot.forEach(function(doc){
        createUserListEntry(doc.data());
    })
}

function createUserListEntry(data){
    let name = data.firstName + " " + data.lastName;
    let li = document.createElement('li');
    li.classList.add("mdl-list__item");


    let sp = document.createElement('span');
    sp.classList.add("mdl-list__item-primary-content");

    // let icon = document.createElement('i');
    // icon.classList.add("material-icons");
    // icon.classList.add("mdl-list__item-icon");
    //
    // icon.innerText = "person";
    //
    // sp.appendChild(icon);

    // let cbsp = document.createElement('span');
    // cbsp.classList.add("mdl-list__item-secondary-action");
    //
    // let cblb = document.createElement('label');
    // cblb.htmlFor = "cb-" + name;
    // cblb.classList.add("mdl-checkbox");
    // cblb.classList.add("mdl-js-checkbox");
    // cblb.classList.add("mdl-js-ripple-effect");
    //
    // let cb = document.createElement('input');
    // cb.type = 'checkbox';
    // cb.classList.add("mdl-checkbox__input");
    // cb.id = "cb-" + name;
    // cblb.appendChild(cb);
    // cbsp.appendChild(cblb);




    let delBtn = document.createElement('button');
    delBtn.classList.add("mdl-button", "mdl-js-button", "mdl-button--icon");

    let delIcon = document.createElement('i');
    delIcon.classList.add("material-icons");
    delIcon.innerText = "delete";

    delBtn.onclick = function(){
        alert("remove");
    };
    delBtn.appendChild(delIcon);

    let editBtn = document.createElement('button');
    editBtn.classList.add("mdl-button", "mdl-js-button", "mdl-button--icon");

    let editIcon = document.createElement('i');
    editIcon.classList.add("material-icons");
    editIcon.innerText = "mode_edit";

    editBtn.onclick = function(){
        alert("edit");
    };
    editBtn.appendChild(editIcon);


    sp.appendChild(delBtn);
    sp.appendChild(editBtn);

    sp.innerHTML += name;
    li.appendChild(sp);
    // li.appendChild(cbsp);
    userList.appendChild(li);
}


// ---------------------- Search ------------------//
function searchCallback() {
    let input = document.getElementById("searchFilter").value.toUpperCase();
    let userList = document.getElementById("userList").getElementsByTagName("li");

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