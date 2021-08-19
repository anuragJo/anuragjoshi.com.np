// JavaScript Document
function contactSubmit(){
	
}

	  var loged=document.getElementById("showInfo");
		var form=document.getElementById("login");
		var info=document.getElementById("logedIn");


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User

		
		form.style.display="none";
		info.style.display="block";
		loged.innerHTML="User Logged in :: User Id: "+user.uid+" User Email: "+user.email;
    // ...
  } else {
	  form.style.display="block";
	  info.style.display="none";
  }
});
	
	
	
	function logOut(){
		
		firebase.auth().signOut().then(() => {
  		// Sign-out successful.
		}).catch((error) => {
			window.alert(error.code+" : "+ error.message)
  // An error happened.
});
		
	}

function signIn(){
	
	var f_email=document.getElementById("email");
	var f_password=document.getElementById("password");
	let email=f_email.value;
	let password=f_password.value;
	
	firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
		
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
		window.alert(errorCode + " : " + errorMessage);
  });
}