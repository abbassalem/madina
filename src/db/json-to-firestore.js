const admin = require('firebase-admin');
const serviceAccount = require("./serviceKey.json");

const json = require("./db-x.json");
const data =  JSON.parse(JSON.stringify(json));
console.dir(data);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://madina-cafe.firebaseio.com"
});

data && Object.keys(data).forEach(key => {
    const nestedContent = data[key];

    if (typeof nestedContent === "object") {
        Object.keys(nestedContent).forEach(docTitle => {
            admin.firestore()
                .collection(key)
                .doc(docTitle)
                .set(nestedContent[docTitle])
                .then((res) => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        });
    }
});