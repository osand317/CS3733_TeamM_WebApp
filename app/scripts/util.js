function messageToFirestore(){
    let messageString = "{\"Type\":\"user\",\"Data\":[{\"firstName\":\"Andrew\",\"lastName\":\"Morrison\",\"middleName\":\"\",\"language\":\"English\",\"userType\":\"1\",\"userID\":\"1\"},{\"firstName\":\"Edward\",\"lastName\":\"Jang\",\"middleName\":\"\",\"language\":\"Korean\",\"userType\":\"2\",\"userID\":\"2\"},{\"firstName\":\"Christian\",\"lastName\":\"Cedrone\",\"middleName\":\"\",\"language\":\"Spanish\",\"userType\":\"3\",\"userID\":\"3\"},{\"firstName\":\"Oliver\",\"lastName\":\"Sanderson\",\"middleName\":\"\",\"language\":\"English\",\"userType\":\"4\",\"userID\":\"4\"},{\"firstName\":\"Peter\",\"lastName\":\"Christakos\",\"middleName\":\"\",\"language\":\"German\",\"userType\":\"5\",\"userID\":\"5\"},{\"firstName\":\"Joseph\",\"lastName\":\"Yuen\",\"middleName\":\"\",\"language\":\"Italian\",\"userType\":\"6\",\"userID\":\"6\"},{\"firstName\":\"Zachary\",\"lastName\":\"Emil\",\"middleName\":\"G\",\"language\":\"French\",\"userType\":\"7\",\"userID\":\"7\"},{\"firstName\":\"Jared\",\"lastName\":\"Grimm\",\"middleName\":\"\",\"language\":\"Chinese\",\"userType\":\"8\",\"userID\":\"8\"},{\"firstName\":\"Andre\",\"lastName\":\"Imperiali\",\"middleName\":\"\",\"language\":\"Russian\",\"userType\":\"9\",\"userID\":\"9\"},{\"firstName\":\"Rohit\",\"lastName\":\"Unnam\",\"middleName\":\"\",\"language\":\"Indian\",\"userType\":\"10\",\"userID\":\"10\"},{\"firstName\":\"Ebenezer\",\"lastName\":\"Ampiah\",\"middleName\":\"\",\"language\":\"Greek\",\"userType\":\"11\",\"userID\":\"11\"},{\"firstName\":\"Roger\",\"lastName\":\"Rolfes\",\"middleName\":\"\",\"language\":\"Swedish\",\"userType\":\"12\",\"userID\":\"12\"}],\"Operation\":\"retrieve\"}";
    let messageObject = JSON.parse(messageString);

    let type = messageObject.Type.toString();

    switch(type){
        case 'request':
            messageObject.Data.forEach(function (obj){
                let id = obj.requestID.toString();
                firestore.collection("requests").doc(id).set(obj);
            });
            break;
        case 'user':
            messageObject.Data.forEach(function (obj){
                let id = obj.userID.toString();
                firestore.collection("users").doc(id).set(obj);
            });
            break;
        case 'log':
            messageObject.Data.forEach(function (obj){
                let id = obj.logID.toString();
                firestore.collection("logs").doc(id).set(obj);
            });
            break;
    }

}