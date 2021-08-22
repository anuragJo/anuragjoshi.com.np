const phoneInputField = document.querySelector("#userName");
   	const phoneInput = window.intlTelInput(phoneInputField, {
	initialCountry: "np",
     utilsScript:
       "intlTelInfo/js/utils.js"
   });
	const valid=document.getElementById("userValid");
	const invalid = document.getElementById("userInvalid");
	const passInvalid = document.getElementById("passInvalid");
	const notFound = document.getElementById("userNotFound");

const progress = document.getElementById("progress");


function validate(phone)
{
	passInvalid.style.display="none";
	notFound.style.display="none";
	
	
	if(phone.value.length != 10 && !(phone.classList.contains("is-invalid"))){
		phone.classList.add("is-invalid");
		valid.style.display="none";
		invalid.style.display="block";
	}
else if(phone.value.length == 10){
	phone.classList.remove("is-invalid");
	phone.classList.add("is-valid");
	valid.style.display="block";
	invalid.style.display="none";
}
}



function signIn(event){
	event.preventDefault();
	
	passInvalid.style.display="none";
	notFound.style.display="none";
	
	var phone = phoneInput.getNumber();
	phone=phone.slice(1)+"@anuragjoshi.com.np";
	const password = document.getElementById("password").value;
	
	
	firebase.auth().signInWithEmailAndPassword(phone, password)
  .then((userCredential) => {
    // Signed in
    
		
		//window.location.href="user.html";
    // ...
		
			
		
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
		
		
		
		if (errorCode=="auth/wrong-password"){
			
			passInvalid.style.display="block";
		}
		else if (errorCode=="auth/user-not-found"){
			
			notFound.style.display="block";
			valid.style.display="none";
		}
		
	});
	
	
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
	  
	  
    window.location.href="user.html";
    // ...
  } else {
    // User is signed out
    // ...
  }
});

