// JavaScript Document
function contactSubmit(){
	
}
function signIn(){
	
	var f_email=document.getElementById("email");
	var f_password=document.getElementById("password");
	let email=f_email.value;
	let password=f_password.value;
	console.log(email+" " +password);
	firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
		colsole.log("Success");
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
		console.log(errorcode+" : "+errorMessage);
  });
	
}