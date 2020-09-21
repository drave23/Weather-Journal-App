/* Global Variables */
const key = 'f2f31957edf139a466de990c3e23d3e8';
const webAPI = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// example = api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}

let d = new Date();

document.getElementById('generate').addEventListener('click', handleGenerateRequest);

function handleGenerateRequest(e) {
    const newZip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    getWeather(webAPI, newZip, key)
        .then(function (userData) {
            console.log({ date: d.getDate(), temp: userData.main.temp , content:content});
            postData('http://localhost:8000/add', { date: d.getDate(), temp: userData.main.temp,content })
        }).then(function (newData) {
            updateUI()
    })

}

const getWeather= async (baseURL, input, key)=>{
    const response = await fetch(baseURL + input + ',us&appid=' + key)
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}
// Async POST
const postData = async (url = '', data = {}) => {

    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        })    })
    try {
        const newData = await postRequest.json();

        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}

const updateUI = async () => {
    const request = await fetch('http://localhost:8000/all');
    try {
        const allData = await request.json()
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;

    }
    catch (error) {
        console.log("error", error);
    }
};