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


function toggleTab(x, y){
    console.log(x,y)
    
    document.getElementById(x).style.display = 'none';
    document.getElementById('tabs').style.display = 'block';
    document.getElementById(y).style.display = 'block';

}

function goBack(){
    window.location.reload()
}

/*  */
    