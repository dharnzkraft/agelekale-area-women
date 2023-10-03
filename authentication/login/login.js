const firebaseConfig = {
  apiKey: "AIzaSyAS2r9wv2Op5CvO7YXcPBbI_k20cA0dai8",
  authDomain: "agbelekale-57a7a.firebaseapp.com",
  databaseURL: "https://agbelekale-57a7a-default-rtdb.firebaseio.com",
  projectId: "agbelekale-57a7a",
  storageBucket: "agbelekale-57a7a.appspot.com",
  messagingSenderId: "150291053708",
  appId: "1:150291053708:web:7f5e3d5361ac276b68cfa9",
  measurementId: "G-9VM5XY65TN"
};



setTimeout(function() {
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database = firebase.database();
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': function(response) {
          console.log("success", response);
      },
      'expired-callback': function() {
          console.log("expired-callback");
      }
  });

  recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
  });
},6000);


function login(){
  phone = document.getElementById('loginPhone').value.toString()
  
  if(validate_field(phone) == false ){
      alert('One or more extra fields is empty!!!')
      return
  }

  firebase.auth().signInWithPhoneNumber( phone, window.recaptchaVerifier)
  .then(function(confirmationResult){
    window.confirmationResult = confirmationResult;
    codeResult = confirmationResult;
    document.getElementById('myForm').style.display = 'none';
    document.getElementById('otpVerification').style.display = 'block';


    
      
  })
  .catch(function(error){
      var error_code = error.code
      var error_message = error.message

      alert(error_message);
      document.getElementById('myForm').style.display = 'block';
      document.getElementById('otpVerification').style.display = 'none';
  })
}

function verifyPhone(){
  var code = document.getElementById('otp').value;
  codeResult.confirm(code).then(function(result){
    console.log(result)
      if(result.user){
        alert('Sign in Successful!')
        window.location.href='http://localhost:5500/main/dashboard.html'
      }
  }).catch(function(error){
      alert('An error occured!')
      alert(error.message)
  })
}

function validate_password(password){
  if(password < 6){
      return false
  }else{
      return true
  }
}

function validate_field(field){
  if(field == null){
      return false
  }
  if(field.length <= 0){
      return false
  } else{
      return true
  }
}