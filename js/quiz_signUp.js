//Phone Country Selector


	const phoneInputField = document.querySelector("#phone");
   	const phoneInput = window.intlTelInput(phoneInputField, {
	initialCountry: "np",
     utilsScript:
       "intlTelInfo/js/utils.js"
   });


const infor = document.getElementById("info");
const errorDiag = document.getElementById("error");
const errorModal = document.getElementById("errorModal");
const fullName=document.getElementById("fullName");
const password=document.getElementById("password");
const OTPholder=document.getElementById("OTP");
const ok=document.getElementById("ok");
var myModal = new bootstrap.Modal(document.getElementById('otpChallenge'));


function phoneSubmit(event) {
	
 event.preventDefault();
	
 const phoneNumber = phoneInput.getNumber();
	
firebase.auth().fetchSignInMethodsForEmail(phoneNumber.slice(1)+"@anuragjoshi.com.np")
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
		console.log(userRecord);
		
		if(userRecord=="password")
			{
		errorDiag.style.display = "block";
		errorDiag.innerHTML='User already exists. Please <a style="text-decoration: none;" href="quiz_signIn.html">Sign In.</a>';
			
				
			}else{
				
	
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  'size': 'normal',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    // ...
	  infor.style.display = "none";	  
	  errorDiag.style.display="none";
	  
	  const appVerifier = window.recaptchaVerifier;
	  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
		infor.style.display = "none";	  
	  errorDiag.style.display="none";
		  
      window.confirmationResult = confirmationResult;
		  
		  
		  var form = document.getElementById("loginPhone");
		  var elements = form.elements;
		  for (var i = 0, len = elements.length; i < len; ++i) {
			  elements[i].readOnly = true;
		  }
		  
		  
		
    	myModal.show();
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
		  errorDiag.style.display="Error: SMS not sent";
		  errorDiag.innerHTML=error;
    });
  },
  'expired-callback': () => {
    // Response expired. Ask user to solve reCAPTCHA again.
    // ...
	  		errorDiag.style.display="block";
		  errorDiag.innerHTML="Error: Response Expired";
  }
});
	
window.recaptchaVerifier.render();
infor.style.display = "block";
infor.innerHTML="Please verify the Captcha below."
	


				
			}
		
	
			
		}).catch((error) => {
  // User not found!!!)
  // ...
		errorDiag.style.display = "block";
		errorDiag.innerHTML='Error: Something unexpected happened.';
			

});
	
				
}


function verifyOTP(){

	const OTP = OTPholder.value;
	
	progress.style.width="20%";
	confirmationResult.confirm(OTP).then((result) => {
  // User signed in successfully.
  		errorModal.style.display="none";
		myModal.hide();
		
		errorDiag.style.display="none";
			infor.style.display = "block";
			infor.innerHTML="OTP Verified!";
		
		
		
		const user = result.user;
		
  // ...
		const newPassword = password.value;
		const phoneNumber = phoneInput.getNumber();
		const newName = fullName.value;
		const newEmail = phoneNumber.slice(1)+"@anuragjoshi.com.np";

		
		progress.style.width="40%";
		
		user.updatePassword(newPassword).then(() => {
  			// Update successful.
			errorDiag.style.display="none";
			infor.style.display = "block";
			infor.innerHTML="Password Created!";
			progress.style.width="60%";
			
			user.updateEmail(newEmail).then(() => {
  // Update successful
  // ...
				
				
				errorDiag.style.display="none";
			infor.style.display = "block";
			infor.innerHTML="Phone No. Updated!";
			progress.style.width="80%";
				
				user.updateProfile({
  					displayName: newName
				}).then(() => {
  				// Update successful
  				// ...
					
					errorDiag.style.display="none";
					infor.style.display = "block";
					infor.innerHTML="Username Updated!";
					progress.style.width="100%";
					
					window.location.href="user.html";
					
				}).catch((error) => {
  				// An error occurred
  				// ...
					errorDiag.style.display="block";
		  			errorDiag.innerHTML=error;
				});
				
				
			}).catch((error) => {
  // An error occurred
  // ...
			errorDiag.style.display="block";
		  errorDiag.innerHTML=error;
			});
			}).catch((error) => {
  // An error ocurred
			errorDiag.style.display="block";
		  errorDiag.innerHTML=error;
		});
		

		
}).catch((error) => {
  // User couldn't sign in (bad verification code?)
  // ...
		errorModal.style.display = "block";
		errorModal.innerHTML='OTP Wrong, please retry!';
		
		myModal._adjustDialog();
		
});
	
}


const progress = document.getElementById("progress");

function validate(phone)
{
	infor.style.display="none";
	errorDiag.style.display='none';
	
	
	const valid=document.getElementById("userValid");
	const invalid = document.getElementById("userInvalid");
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

function validateOTP(otp){
	if (otp.value.length > otp.maxLength) 
		otp.value = otp.value.slice(0, otp.maxLength);
	
	else if (otp.value.length==otp.maxLength){
		ok.disabled=false;
	}
	else{
		ok.disabled=true;
		
	}
}
