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
    