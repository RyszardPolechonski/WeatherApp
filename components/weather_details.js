//dodanie struktury html
function addHtmlStructure() {
    const weatherDetailsDiv = document.querySelector('.weather_details');

    weatherDetailsDiv.innerHTML = `
    <div class='main_info'>
            <div class='day'></div>
            <div>
                <img class='main_weather_icon' alt='weather_icon'>
            </div>
            <div class='temp_list'></div>
        </div>
        <div class='other_info'></div>
        <div class='slider'>
            <img class='slider_arrow arrow_left' src='img/Strzałka _left.png' alt='slider arrow'>
            <div class='slider_container'>
                <div id='details_list' class='slide'></div>
            </div>
            <img class='slider_arrow arrow_right' src='img/Strzałka_right.png' alt='slider arrow'>
        </div>
    `
}

//dodanie nazwy dzisiejszego dnia
function setDayName(param){

    function getDayName(dateStr, locale)
    {
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
    }

    let apiYear = param.list[0].dt_txt.slice(0, 4);
    let apiMonth = param.list[0].dt_txt.slice(5, 7);
    let apiDay = param.list[0].dt_txt.slice(8, 10);
    let dateStr = `${apiMonth}/${apiDay}/${apiYear}`;
    
    let day = getDayName(dateStr, "pl-PL");
    day = day.charAt(0).toUpperCase() + day.slice(1,day.length);

    let dayNameCont = document.querySelector('.day');
    dayNameCont.innerHTML = day;
    dayNameCont.innerHTML = 'Dzisiaj';
}


//zmienne do ikonek pogody
let clear = 'https://img.icons8.com/office/160/000000/sun--v1.png';  //Sun icon by Icons8
let cloudy = 'https://image.flaticon.com/icons/svg/1200/1200427.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com
let snow = 'https://image.flaticon.com/icons/svg/1200/1200430.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com
let atmosphere = 'https://image.flaticon.com/icons/svg/1532/1532284.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com
let storm = 'https://image.flaticon.com/icons/svg/1714/1714817.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com
let rainy = 'https://image.flaticon.com/icons/svg/1200/1200413.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com
let clouds = 'https://image.flaticon.com/icons/svg/1200/1200405.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com
let rain = 'https://image.flaticon.com/icons/svg/1200/1200397.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com
let snowCloudy = 'https://image.flaticon.com/icons/svg/1200/1200428.svg';  //Icon made by https://www.freepik.com/ from www.flaticon.com


// ustawienie głównej ikonki pogody
function setMainIcon(param){
    let icon = document.querySelector('.main_weather_icon');
    let itemId = param.list[0].weather[0].id;

    if(itemId>=200 && itemId<300) icon.src = storm;
    else if(itemId>=300 && itemId<400) icon.src = rain;
    else if(itemId>=500 && itemId<505) icon.src = rainy;
    else if(itemId>=511 && itemId<540) icon.src = rain;
    else if(itemId==600 || itemId==601) icon.src = snow;
    else if(itemId>=602 && itemId<700) icon.src = snowCloudy;
    else if(itemId>=700 && itemId<800) icon.src = atmosphere;
    else if(itemId==800) icon.src = clear;
    else if(itemId==801 || itemId==802) icon.src = cloudy;
    else if(itemId==803 || itemId==804) icon.src = clouds;
}


// funkcja na tworzenie kafelków slidera
function createKafelek() {
    const kafelek = document.getElementById('details_list');
    let innerHtmlKafelek = '';
    for(let i=0; i<17; i++){ 
        innerHtmlKafelek+=
            `<div class='kafelek kafelek${i}'>
                <div class='detail_hour'></div>
                <div class='detail_icon detail_icon${i}'></div>
                <div class='detail_temp'></div>
            </div>`;
    };
    kafelek.innerHTML = innerHtmlKafelek;
}


//  funkcje na wypełnianie hour, icon, temp kafelków  
function kafelekHour(param) {
    const kafelek = document.getElementsByClassName('detail_hour');
        for(let i=0; i<17; i++){
        let hour = param.list[i].dt_txt.slice(11, 16);
        kafelek[i].innerHTML = hour;
    };
    kafelek[0].innerHTML = 'Teraz';
}

function kafelekTemp(param) {
    const kafelek = document.getElementsByClassName('detail_temp');
    for(let i=0; i<17; i++){
        let temp = Math.round(param.list[i].main.temp);
        kafelek[i].innerHTML = `${temp}&#8451`;
    }
}


//funkcja na dodawanie ikonek do slidera na podstawie API

function kafelekIcon(param) {
    const kafelekIcon = document.getElementsByClassName('detail_icon');
    for(let i=0; i<17; i++){

        let itemId = param.list[i].weather[0].id;
        let source;
        
        if(itemId>=200 && itemId<300) source = storm;
        else if(itemId>=300 && itemId<400) source = rain;
        else if(itemId>=500 && itemId<505) source = rainy;
        else if(itemId>=511 && itemId<540) source = rain;
        else if(itemId==600 || itemId==601) source = snow;
        else if(itemId>=602 && itemId<700) source = snowCloudy;
        else if(itemId>=700 && itemId<800) source = atmosphere;
        else if(itemId==800) source = clear;
        else if(itemId==801 || itemId==802) source = cloudy;
        else if(itemId==803 || itemId==804) source = clouds;
    
        kafelekIcon[i].innerHTML = `
        <img class='detail_weather_icon' src='${source}' alt='weather icon'>
        `;
    }
}



// przesuwanie slidera
function sliderDrag(){

    let draggedSlider,   // element kliknęty
        onDragStart,
        onDrag,         
        onDragEnd,
        grabPointX,
        moveLeftArrow,
        moveRightArrow;

    onDragStart = function (ev){
        let boundingClientRect;
        
        if(ev.currentTarget.className.indexOf('slide')===-1){
            return;
        };
        draggedSlider = this;

        boundingClientRect = draggedSlider.getBoundingClientRect();

        grabPointX = boundingClientRect.left - ev.clientX;  
    }

    onDrag = function(ev){
        if(!draggedSlider) {return;}

        let sliderOffset = document
        .querySelector('.slider_container')
        .getBoundingClientRect()
        .left;

        let posX = ev.clientX + grabPointX - sliderOffset;

        let sliderContainerWidth = document
        .querySelector('.slider_container')
        .getBoundingClientRect()
        .width;

        let sliderWidth = document
        .querySelector('.slide')
        .getBoundingClientRect()
        .width;
                
        let rightAllign = -sliderWidth+sliderContainerWidth;

        if(posX>0){posX = 0;}
        if(posX<rightAllign){posX = rightAllign};
        
        draggedSlider.style.transform = `translateX(${posX}px)`;
    };

    onDragEnd = function (){
        draggedSlider = null;
        grabPointX = null;
    };



    moveLeftArrow = function(){

        let slider = document.querySelector('.slide')
        let sliderContainer = document.querySelector('.slider_container')

        let sliderOffset = slider.getBoundingClientRect().left;
        let sliderContainerOffset = sliderContainer
        .getBoundingClientRect().left;

        let posX = sliderOffset - sliderContainerOffset;

        let sliderContainerWidth = document
        .querySelector('.slider_container')
        .getBoundingClientRect()
        .width;

        let sliderWidth = document
        .querySelector('.slide')
        .getBoundingClientRect()
        .width;
        let rightAllign = -sliderWidth+sliderContainerWidth;

        let moveValue = 100;

        if(posX<0)
            slider.style.transform = `translateX(${posX+moveValue}px)`;
    };



    // SORY ZA POWTÓRZENIE KODU :D
    
    moveRightArrow = function(){

        let slider = document.querySelector('.slide')
        let sliderContainer = document.querySelector('.slider_container')

        let sliderOffset = slider.getBoundingClientRect().left;
        let sliderContainerOffset = sliderContainer
        .getBoundingClientRect().left;

        let posX = sliderOffset - sliderContainerOffset;

        let sliderContainerWidth = document
        .querySelector('.slider_container')
        .getBoundingClientRect()
        .width;

        let sliderWidth = document
        .querySelector('.slide')
        .getBoundingClientRect()
        .width;
        let rightAllign = -sliderWidth+sliderContainerWidth;

        let moveValue = 100;

        if(posX>rightAllign-0.5*moveValue)
            slider.style.transform = `translateX(${posX-moveValue}px)`;
    };


    document.querySelector('.slide').addEventListener('mousedown', onDragStart, false);
    document.addEventListener('mousemove', onDrag, false);
    document.addEventListener('mouseup', onDragEnd, false);
    
    document.querySelector('.arrow_left').addEventListener('mousedown', moveLeftArrow, false);
    document.querySelector('.arrow_right').addEventListener('mousedown',moveRightArrow,false);
}


//podpięcie danych api
function setMainData(param) {

    let units='metric';  //ustawia jednostki na metryczne?

    //pobranie divów z listami informacji
    let mainTemp = document.querySelector('.temp_list');
    let mainInfo = document.querySelector('.other_info');

    //zmienne do otherInfo po prawej stronie
    let pressure = Math.round(param.list[0].main.pressure);
    let humidity = param.list[0].main.humidity;
    let cloudiness = param.list[0].clouds.all;
    let windSpeed = param.list[0].wind.speed;
    let windAngle = param.list[0].wind.deg;
    let windDirection;

    //ustawienie odpowiedniego stringa do kierunku wiatru
    if(0<=windAngle && windAngle<22.5) windDirection = 'północny';
    else if(22.5<=windAngle && windAngle<67.5) windDirection = 'północno-wschodni';
    else if(67.5<=windAngle && windAngle<112.5) windDirection = 'wschodni';
    else if(112.5<=windAngle && windAngle<157.5) windDirection = 'południowo-wschodni';
    else if(157.5<=windAngle && windAngle<202.5) windDirection = 'południowy';
    else if(202.5<=windAngle && windAngle<247.5) windDirection = 'południowo-zachodni';
    else if(247.5<=windAngle && windAngle<292.5) windDirection = 'zachodni';
    else if(292.5<=windAngle && windAngle<337.5) windDirection = 'północno-zachodni';
    else if(337.5<=windAngle && windAngle<=360) windDirection = 'północny';
    
    let description = param.list[0].weather[0].description;
    let minTemp = Math.round(param.list[0].main.temp_min);

    //dodanie day other info do diva
    mainInfo.innerHTML = `
    <ul>
        <li>Ciśnienie: ${pressure} hPa</li>
        <li>Wilgotność: ${humidity}%</li>
        <li>Zachmurzenie: ${cloudiness}% nieba</li>
        <li>Prędkość wiatru: ${windSpeed} m/s</li>
        <li>Kierunek wiatru: ${windDirection}</li>
        <li>Dzisiaj: ${description}, minimalna prognozowana temperatura to ${minTemp}&#8451</li>
    </ul>
    `;

    //zmienne do mainInfo po lewej stronie
    let temperatura = Math.round(param.list[0].main.temp);
    let odczuwalna;

    if(humidity>80)odczuwalna = temperatura+1;
    else odczuwalna = temperatura-1;
   
    //dodanie day temp info do diva
    mainTemp.innerHTML = `
    <ul>
        <li>Temperatura: ${temperatura}&#8451</li>
        <li>Odczuwalna: ${odczuwalna}&#8451</li>
    </ul>
    `;
    //weatherIcon.src = "https://openweathermap.org/img/w/" + param.list[0].weather[0].icon + ".png";
}


// wywołanie wszystkich funkcji w tym pliku

function setDetails(param) {
    addHtmlStructure();
    setDayName(param)
    setMainIcon(param);
    createKafelek();
    kafelekHour(param);
    kafelekIcon(param);
    kafelekTemp(param);
    sliderDrag();

    setMainData(param);
}

export default setDetails;
