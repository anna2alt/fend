/* Global Variables */
const baseZipUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '3d70271305a4b9c6c98c7b1fbbb5ecbe';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    getWeather(baseZipUrl, zipCode, apiKey)
    .then( 
        function(data) {
            postData('/addData', {date: newDate, temp: data.main.temp, content: 'abc'});
            updateUI();
        }
    )
}

const getWeather = async (baseUrl, zipCode, key)=>{
 //   const res = await fetch('https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=3d70271305a4b9c6c98c7b1fbbb5ecbe');
    const url = `${baseUrl}${zipCode}&appid=${key}`;
    console.log(url);
    const res = await fetch(url);
    try {
        // Transform into JSON
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

const postData = async (url, data)=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });   
}

const updateUI = async ()=>{
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log('allData:');
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
    }
    catch(error) {
        console.log("error", error);
    }
}