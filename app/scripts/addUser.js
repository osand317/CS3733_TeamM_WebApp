const form = document.querySelector("#addUserForm");
var usersRef = firestore.collection("users");

form.addEventListener('submit', function(e){
    e.preventDefault();

    let data = {};
    for(let i = 0; i < form.elements.length; i++){
        let key = form.elements[i].id;
        let val = getValue(form.elements[i]);
        if (val != null && key != null && key) data[key] = val;
    }

    // let user = convertFormDataToUser(data);
    genUserID(data);
    // let id = user.userID;
    // console.log(user);

});

function convertFormDataToUser(data, id){
    let userType = getKeyByValue(data, true);
    let userID = id;
    let firstName = data.firstName;
    let lastName = data.lastName;
    let middleName = data.middleName;

    let user = {};
    user.firstName = firstName;
    user.lastName = lastName;
    user.middleName = middleName;
    user.userID = userID;
    user.userType = userType;
    user.language = "English";
    user.deleteTime = null;

    return user;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function genUserID(data){
    let maxId = -2;
    usersRef.orderBy('userID', 'desc').get()
        .then(function(snapshot){
            let id;
            snapshot.forEach(function(doc){
                id = parseInt(doc.data().userID);
                if(id > maxId) {maxId = id;}
            });
            let docID = maxId + 1;
            let user = convertFormDataToUser(data, docID);
            usersRef.doc(docID.toString()).set(user).then(function(){
                window.location = '../addUser.html';
            });


        });
}

function getValue(el){
    // console.log(el.type);
    if(el.type === 'checkbox' || el.type === 'radio'){
        return el.checked;
    }
    else {
        return el.value;
    }
}