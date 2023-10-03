//  async function getQuotes(){
//     const url = 'https://uncovered-treasure-v1.p.rapidapi.com/topics';
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'f89480910cmsh05bbe5d352983c5p147ee4jsnf96a2a74ea9f',
//             'X-RapidAPI-Host': 'uncovered-treasure-v1.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await fetch(url, options);
//         const result = await response.text();
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// }


var firebaseConfig = {
    apiKey: "AIzaSyAS2r9wv2Op5CvO7YXcPBbI_k20cA0dai8",
    authDomain: "agbelekale-57a7a.firebaseapp.com",
    databaseURL: "https://agbelekale-57a7a-default-rtdb.firebaseio.com",
    projectId: "agbelekale-57a7a",
    storageBucket: "agbelekale-57a7a.appspot.com",
    messagingSenderId: "150291053708",
    appId: "1:150291053708:web:7f5e3d5361ac276b68cfa9",
    measurementId: "G-9VM5XY65TN"
  };

  
const userPhone = localStorage.getItem('userNumber');
var userAssembly = ''
  setTimeout(()=>{
    firebase.initializeApp(firebaseConfig);
    var auth = firebase.auth();
    const database = firebase.database();
  
  function fetchMembers(){
    const dataContainer = document.querySelector("#memberTable")
    const database_ref = database.ref('users/').orderByChild("assembly").equalTo(userAssembly)
    database_ref.on('value', (snapshot) =>{
        var data = snapshot.val()
        var htmlData = ''
        console.log(data)
        for(var key in data){
            var value = data[key]
            console.log(value)
            htmlData +=`
            <tr>
                <td>${value.names}</td>
                <td>${value.assembly}</td>
                <td>${value.district}</td>
                <td>${value.phone}</td>
                <td>${value.role}</td>
                
            </tr>
            `;
        }
        dataContainer.innerHTML = htmlData
    })
  }

  fetchLoggedInUser()
  function fetchLoggedInUser(){
    const database_ref = database.ref(`users/${userPhone}`)
    database_ref.on('value', (snapshot) =>{
        var data = snapshot.val()
        console.log(data)
        userAssembly = data.assembly;
        if(data.role == 'leader'){
            document.getElementById("memberCard").style.display = 'block';
            fetchMembers();
            fetchAssemblyEvent();
            
        }
        document.querySelector("#userName").innerHTML = data.names
    })
  }
  }, 2000)

 

  function fetchAssemblyEvent(){
    const database_ref = firebase.database().ref(`events/${userAssembly}`)
    database_ref.on('value', (snapshot) =>{
        var htmlData = ''
        var data = snapshot.val()
        console.log(data)
        for(var event in data){
            var value = data[event]

            htmlData +=`
            <div class="rounded p-3 shadow my-3" >
                  <p class="fw-bold" >${value.event_name}</p>
                  <hr>
                  <span> ${value.event_description} </span>
                </div>
            `;
        }
        document.querySelector('.event-container').innerHTML = htmlData
        
    })
}

  


function toggleTab(x, y){
    console.log(x,y)
    
    document.getElementById(x).style.display = 'none';
    document.getElementById('tabs').style.display = 'block';
    document.getElementById(y).style.display = 'block';

}

function goBack(){
    window.location.reload()
}

// assembly leader creating event
function createaEvent(){
    console.log('here')
     eventName = document.getElementById('eventName').value
     eventDescription = document.getElementById('eventDescription').value

     var event_data = {
        event_name: eventName,
        event_description: eventDescription,
        tag: userAssembly
     }

     console.log(event_data)
     var database_ref = firebase.database().ref()

     database_ref.child('events/'+ userAssembly).push().set(event_data)
     alert('Event Created Successfully!')
     window.location.reload()

}

//super admin creating event
function SupercreateaEvent(){
    console.log('here')
     eventName = document.getElementById('eventName').value
     eventDescription = document.getElementById('eventDescription').value

     var event_data = {
        event_name: eventName,
        event_description: eventDescription,
        tag: "area"
     }

     console.log(event_data)
     var database_ref = firebase.database().ref()

     database_ref.child('events/area').push().set(event_data)
     alert('Event Created Successfully!')
     window.location.reload()

}

function readyForUpdate(uniqueId, elem){
    console.log(uniqueId)
    var siblingTd = elem.parentElement.parentElement.getElementByTagName('td ')
    for(var i = 0; i < siblingTd.length-1; i++){
        siblingTd[i].contentEditable = true
        siblingTd[i].classList.add('temp-update-class')
    }
    elem.setAttribute('onclick', `updateNow('${uniqueId}')` )
    elem.innerHTML = 'Send'
}

/*  */
    