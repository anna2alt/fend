/* Global Variables */
const baseZipUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '3d70271305a4b9c6c98c7b1fbbb5ecbe';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Events */
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseZipUrl, zipCode, apiKey)
    .then( 
        // api call returned data
        function(data) {
            postData('/addData', {date: newDate, temp: data.main.temp, content: feelings});
            updateUI();
        },
        // api call returned error
        function(reason) {
            console.log(reason);
        }
    )
}

/* Async functions */
const getWeather = async (baseUrl, zipCode, key)=>{
    const url = `${baseUrl}${zipCode}&units=metric&appid=${key}`;
    console.log(url);
    const res = await fetch(url);
    try {
        // Transform into JSON
        const data = await res.json();
        console.log(data);
        // throw exception if api returned error
        if (data.cod != '200')
            throw data.message;
        return data;
    }
    catch(error) {
        throw(`Cannot get weather data: ${error}`);
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
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}°C`;
        document.getElementById('content').innerHTML = `Feelings: ${allData.content}`;
    }
    catch(error) {
        console.log("error", error);
    }
}