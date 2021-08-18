  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBY4sUaGnOTCLU_xV4J-8kPXtPyN_cagK0",
    authDomain: "clone-9d14f.firebaseapp.com",
    projectId: "clone-9d14f",
    storageBucket: "clone-9d14f.appspot.com",
    messagingSenderId: "12744503058",
    appId: "1:12744503058:web:0a8e6142a8f6e461dd8dcb",
    measurementId: "G-VCKX38G5LZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.firestore();