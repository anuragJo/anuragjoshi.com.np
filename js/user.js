// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBARGMaLEXgTkYW_WMtwBI4UXBhQi_p2xs",
  authDomain: "quizbull.firebaseapp.com",
  projectId: "quizbull",
  storageBucket: "quizbull.appspot.com",
  messagingSenderId: "839759877408",
  appId: "1:839759877408:web:985b6a7fb5db1f9c93b345",
  measurementId: "G-8KYYL93NLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

var db = firebase.firestore();

var QN=0;

var signIn = new bootstrap.Modal(document.getElementById('signIn'));
var card = new bootstrap.Modal(document.getElementById('card'));


var sn =document.getElementById("sn");
var subject=document.getElementById("subject");
var question = document.getElementById("question");
var option1 = document.getElementById("Option1");
var option2 = document.getElementById("Option2");
var option3 = document.getElementById("Option3");
var option4 = document.getElementById("Option4");
var info = document.getElementById("showInfo");



firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User

		signIn.hide();
	  	clearCard();
	  	
		info.innerHTML="Welcome: "+user.displayName;
	  
 // ...
	  
	 
  } else {
	  
	   	card.hide();
    	signIn.show();
	 
  }
});


function next(){
	
	clearCard();
	QN=QN+1;
	db.collection("Management").doc("BBA").collection("Economics").doc(String(QN)).get()
    .then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
		
		loadCard(QN,doc);
		MathJax.typeset();
		
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
	
}


function previous(){
	
	clearCard();
	QN--;
	
db.collection("Management").doc("BBA").collection("Economics").doc(String(QN)).get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
		
		loadCard(QN,doc);
		MathJax.typeset();
		
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
	
}


function logOut(){
		
		firebase.auth().signOut().then(() => {
		
			window.location.href="quiz_signIn.html";
			
		}).catch((error) => {
			
		window.alert(error.code+" : "+ error.message)
			
});
		
	}


function clearCard(){
	
		option1.disabled=true;
		option2.disabled=true;
		option3.disabled=true;
		option4.disabled=true;
	
		option1.classList.remove("bg-danger");
		option1.classList.remove("bg-success");
		option1.classList.remove("text-white");
	
		option2.classList.remove("bg-danger");
		option2.classList.remove("bg-success");
		option2.classList.remove("text-white");
	
		option3.classList.remove("bg-danger");
		option3.classList.remove("bg-success");
		option3.classList.remove("text-white");
	
		option4.classList.remove("bg-danger");
		option4.classList.remove("bg-success");
		option4.classList.remove("text-white");

	sn.innerHTML='<span class="placeholder col-7"></span>';
	subject.innerHTML='<span class="placeholder col-5">';
	question.innerHTML=' <span class="placeholder col-12"></span> <span class="placeholder col-12"></span> <span class="placeholder col-4"></span>';
	option1.innerHTML = '<span class="placeholder col-12 bg-primary">';
	option2.innerHTML = '<span class="placeholder col-12 bg-primary">';
	option3.innerHTML = '<span class="placeholder col-12 bg-primary">';
	option4.innerHTML = '<span class="placeholder col-12 bg-primary">';
	
		
	
}

function loadCard(id,doc){
	
		sn.innerHTML="Question "+id;
		subject.innerHTML="Structural Analysis";
		question.innerHTML=doc.data().Question;
		option1.innerHTML=doc.data().Option1;
		option2.innerHTML=doc.data().Option2;
		option3.innerHTML=doc.data().Option3;
		option4.innerHTML=doc.data().Option4;
		window.answer = doc.data().Answer;
		
		option1.disabled=false;
		option2.disabled=false;
		option3.disabled=false;
		option4.disabled=false;
	
	
	
}


function checkAns(ans){
	var element = document.getElementById(ans.id);
	if(element.id==window.answer){
		element.classList.add("bg-success");
		element.classList.add("text-white");
		
		option1.disabled=true;
		option2.disabled=true;
		option3.disabled=true;
		option4.disabled=true;
		
		element.disabled=false;
		
		
	}else{
		element.classList.add("bg-danger");
		element.classList.add("text-white");
	}
	
}



function start(){
	
	card.show();
	  	next();
}