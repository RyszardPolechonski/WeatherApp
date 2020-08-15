import getCity from '../components/search/search';
import getAPI from '../components/api';
import setDetails from '../components/weather_details.js';
import init from '../components/day_info';
import setBackground from "../components/background";


 var textInput = document.getElementById('search');
 var btn = document.getElementById("loop");
 var city;

 btn.style.cursor = "pointer";
 btn.addEventListener("click", getCity);
 textInput.addEventListener("keydown", enterPressed);
 
    function enterPressed(event) {
        if (event.key === "Enter") {
            city = getCity();
            makeWeather(city)
        }
    }   

btn.addEventListener("click", function(){
city =  getCity();
makeWeather(city)
});



const makeWeather = async(inputCity) =>
{
    try
    {
        const [currentWeather, forecastWheater] = await Promise.all([ getAPI(inputCity, "current"), getAPI(inputCity, "5 days") ]);
        setBackground(currentWeather);
        init(forecastWheater);
        setDetails(forecastWheater);
    }
    catch(error)
    {
        console(error);
        alert(`Nie można połączyć się z serwerem. Spróbuj ponownie.`);
    }
}

makeWeather("Santiago");
document.addEventListener("DOMContentLoaded", () =>
{
    //tutaj wszystko co będzie wywoływane na stronie

});

