const fireBtn = document.querySelector("#fireBtn");
const shooterBtn = document.querySelector("#shooterBtn");
const bombBtn = document.querySelector("#bombBtn");
const otherBtn = document.querySelector("#otherBtn");

const emRef = firestore.collection("emergencies");

fireBtn.addEventListener('click', function(){
    let data = {type: "fire"};
    emRef.doc("1").set(data);
});

shooterBtn.addEventListener('click', function(){
    let data = {type: "shooter"};
    emRef.doc("1").set(data);
});

bombBtn.addEventListener('click', function(){
    let data = {type: "bomb"};
    emRef.doc("1").set(data);
});

otherBtn.addEventListener('click', function(){
    let data = {type: "other"};
    emRef.doc("1").set(data);
});