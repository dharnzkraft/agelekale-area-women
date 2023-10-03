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
  firebase.initializeApp(firebaseConfig);
  var auth = firebase.auth();
  const database = firebase.database();
  setTimeout(function() {
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
  },2000);

  fetchMembers()
  function fetchMembers(){
    const database_ref = database.ref('users')
    database_ref.orderByValue().on( (snapshot)=>{
        snapshot.forEach((data)=>{
            console.log(data)
        })
    })
  }

  function register(){
    addressed = document.getElementById('addressed').value
    names = document.getElementById('names').value
    phone = document.getElementById('phone').value.toString()
    assembly = document.getElementById('assembly').value
    role = document.getElementById('role').value
    district = document.getElementById('district').value

    if(validate_field(phone) == false || validate_field(assembly) == false || validate_field(addressed) == false || validate_field(role) == false || validate_field(names) == false || validate_field(district) == false){
        alert('One or more extra fields is empty!!!')
        return
    }
    auth.signInWithPhoneNumber( phone, window.recaptchaVerifier)
    .then(function(confirmationResult){
        console.log(confirmationResult)
        window.confirmationResult = confirmationResult;
        codeResult = confirmationResult;
        document.getElementById('myForm').style.display = 'none';
        document.getElementById('otpVerification').style.display = 'block';
        
        var user = auth.currentUser
        // add user to db
        var database_ref = database.ref()

        var user_data = {
            addressed: addressed,
            phone: phone,
            names: names,
            assembly: assembly,
            district: district,
            role: role
        }
        console.log(user)

        database_ref.child('users/'+ phone).set(user_data)

        alert('Registeration Successful!')
    })
    .catch(function(error){
        var error_code = error.code
        var error_message = error.message

        alert(error_message);
        document.getElementById('myForm').style.display = 'block';
        document.getElementById('otpVerification').style.display = 'none';
    })
  }

  function login(){
    phone = document.getElementById('loginPhone').value.toString()

    if(validate_field(phone) == false ){
        alert('One or more extra fields is empty!!!')
        return
    }

    auth.signInWithPhoneNumber( phone, window.recaptchaVerifier)
    .then(function(confirmationResult){
        console.log(confirmationResult)
        window.confirmationResult = confirmationResult;
        // codeResult = confirmationResult;
        // document.getElementById('myForm').style.display = 'none';
        // document.getElementById('otpVerification').style.display = 'block';
        
        


        alert('Login Successful!')
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
    codeResult.confirm(code).then(function(){
        alert('Account Verified!')
        window.location.href='http://localhost:5500/main/dashboard.html'
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