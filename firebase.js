const firebaseConfig = {
  apiKey: "AIzaSyA5a5WqaqPlW-gB6NrMnBYqJ3jUguY_hcU",
  authDomain: "clone-2-6d60d.firebaseapp.com",
  projectId: "clone-2-6d60d",
  storageBucket: "clone-2-6d60d.appspot.com",
  messagingSenderId: "266658128642",
  appId: "1:266658128642:web:c6a44f0d91206b0ae5581b",
  measurementId: "G-C98KHPQPKW"
};

firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()
console.log(db);