let units='metric';

function createDayBox() {
    const kafelek = document.getElementById('weatherContainers5days');
    let innerHtmlKafelek = '';
    for(let i=1; i<6; i++){ 
        innerHtmlKafelek+=
            `<div id="weatherContainer${i}" class=weatherContainer>
            <h1 id="dateHeader${i}" class=dateHeader></h1>
            <div id="weatherMain${i}" class=weatherMain>
                <div><img id="weatherIcon${i}" class=weatherIcon></div>
                <div id="temperature${i}" class=temperature></div>
            </div>
            <div id="weatherDetails${i}" class=weatherDetails>
                <div id="rain${i}" class=weatherElement></div>
                <div id="snow${i}" class=weatherElement></div>
                <div id="humidity${i}" class=weatherElement></div>
                <div id="windSpeed${i}" class=weatherElement></div>
            </div>
        </div>`;
    };
    kafelek.innerHTML = innerHtmlKafelek;
}
createDayBox();

function init(resultFromServer){

 //zmienne do ikonek pogody
let clear = 'https://image.flaticon.com/icons/svg/1200/1200394.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com
let cloudy = 'https://image.flaticon.com/icons/svg/1200/1200427.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com
let snow = 'https://image.flaticon.com/icons/svg/1200/1200430.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com
let atmosphere = 'https://image.flaticon.com/icons/svg/1532/1532284.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com
let storm = 'https://image.flaticon.com/icons/svg/1714/1714817.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com
let rainy = 'https://image.flaticon.com/icons/svg/1200/1200413.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com
let clouds = 'https://image.flaticon.com/icons/svg/1200/1200405.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com
let rain = 'https://image.flaticon.com/icons/svg/1200/1200397.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com
let snowCloudy = 'https://image.flaticon.com/icons/svg/1200/1200428.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com 



function createDayInfo() {
    const kafelek = document.getElementById('weatherContainers5days');
    for(let i=0; i<5; i++){
        let dateHeader = document.getElementById("dateHeader"+(i+1));
        let weatherIcon = document.getElementById("weatherIcon"+(i+1));
        let temperaturElement = document.getElementById("temperature"+(i+1));
        let rainElement = document.getElementById("rain"+(i+1));
        let snowElement = document.getElementById("snow"+(i+1));
        let humidityElement = document.getElementById("humidity"+(i+1));
        let windSpeedElement = document.getElementById("windSpeed"+(i+1));
        let date = resultFromServer.list[i*8].dt_txt;
        let itemId = resultFromServer.list[i*8].weather[0].id;

        if(itemId>=200 && itemId<300) weatherIcon.src = storm;//-------------------------------------------------ustawienie ikonki pogody
        else if(itemId>=300 && itemId<400) weatherIcon.src = rain;
        else if(itemId>=500 && itemId<505) weatherIcon.src = rainy;
        else if(itemId>=511 && itemId<540) weatherIcon.src = rain;
        else if(itemId==600 || itemId==601) weatherIcon.src = snow;
        else if(itemId>=602 && itemId<700) weatherIcon.src = snowCloudy;
        else if(itemId>=700 && itemId<800) weatherIcon.src = atmosphere;
        else if(itemId==800) weatherIcon.src = clear;
        else if(itemId==801 || itemId==802) weatherIcon.src = cloudy;
        else if(itemId==803 || itemId==804) weatherIcon.src = clouds;

        dateHeader.innerText = new Date(date).getDay(); //<------------------------------------------------------zamiana daty na dzień tygodnia

        switch(new Date(date).getDay())
        {
        case 0:
        dateHeader.innerText = "Niedziela";
        break;

        case 1:
        dateHeader.innerText = "Poniedziałek";
        break;

        case 2:
        dateHeader.innerText = "Wtorek";
        break;

        case 3:
        dateHeader.innerText = "Środa";
        break;

        case 4:
        dateHeader.innerText = "Czwartek";
        break;

        case 5:
        dateHeader.innerText = "Piątek";
        break;

        case 6:
        dateHeader.innerText = "Sobota";
        break;
        }
        temperaturElement.innerHTML = Math.floor(resultFromServer.list[i*8].main.temp) + '&#176' + " C";
        
        if(resultFromServer.list[i*8].rain && resultFromServer.list[i*8].rain["3h"]){//<----------------------------------pobranie deszczu z API
            rainElement.innerHTML = "Deszcz: " + Math.floor(resultFromServer.list[i*8].rain["3h"]) + " mm";
        } else if(resultFromServer.list[i*8].rain){
            rainElement.innerHTML = "Deszcz: 0 mm";
        } else {
            rainElement.innerHTML = "Deszcz: 0 mm";
        };

        if(resultFromServer.list[i*8].snow && resultFromServer.list[i*8].snow["3h"]){//<----------------------------------pobranie śniegu z API
            snowElement.innerHTML = "Śnieg: " + Math.floor(resultFromServer.list[i*8].snow["3h"]) + " mm";
        } else if(resultFromServer.list[i*8].snow){
            snowElement.innerHTML = "Śnieg: 0 mm";
        } else {
            snowElement.innerHTML = "Śnieg: 0 mm";
        };
        
        humidityElement.innerHTML = "Wilgotność: " + resultFromServer.list[i*8].main.humidity + " %";
        windSpeedElement.innerHTML = "Wiatr: " + Math.floor(resultFromServer.list[i*8].wind.speed) + " m/s";
    };
}

createDayInfo();

}
export default init;