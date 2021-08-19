// JavaScript Document
function contactSubmit(){
	
}
function signIn(){
	
	var email=document.getElementById("email")
	var password=document.getElementById("password")
	
	
	firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
		colsole.log("Success")
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
		console.log(errorcode+" : "+errorMessage)
  });
	
}