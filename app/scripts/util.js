function messageToFirestore(){
    let sMessage = "{\"Type\":\"request\",\"Data\":[{\"password\":\"help\",\"requestType\":\"help\",\"requestID\":\"1\",\"adminConfirm\":false,\"messageID\":\"1\",\"startTime\":\"2018-04-13 01:23:23:0\",\"endTime\":\"2018-04-15 02:15:23:0\",\"priority\":3,\"nodeID\":\"GHALL00201\",\"isComplete\":false},{\"password\":\"nurseReq\",\"requestType\":\"nurseReq\",\"requestID\":\"2\",\"adminConfirm\":true,\"messageID\":\"2\",\"startTime\":\"2018-04-05 02:10:23:0\",\"endTime\":\"2018-04-06 07:43:10:0\",\"priority\":5,\"nodeID\":\"WHALL00101\",\"isComplete\":false}],\"Operation\":\"retrieve\"}"
    let oMessage = JSON.parse(sMessage);

    let collection = oMessage.Type.toString();

    oMessage.Data.forEach(function (obj){
        firestore.collection(collection).add(obj);
    });

}