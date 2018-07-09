// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db('TodoApp');

//    db.collection("Todos").findOneAndUpdate({
//        _id: new ObjectID("5b40586f2aa3a71328ab54f5")
//    }, {
//     $set: {
//         completed: true
//     }
//    }, {
//        returnOriginal: false
//    }).then((res) => {
//        console.log(res);
//    });

    db.collection("Users").findOneAndUpdate({
        _id: new ObjectID("5b405a856f11dc34c0dd3361")
    }, {
        $set: {
            name: "Roman"
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    });


    //client.close();

});