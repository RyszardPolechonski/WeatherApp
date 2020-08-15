import Loader from "./loader"

const BACKGROND_VOLUME = 0.05;

const toggleClick = (event) =>      // looader do kliknięcia na wyciszenie
{
    toggleSound(event.target);
}

const togglePress = (event) =>      // loodaer do spacji i litery m
{
    if(event.target === document.body && (event.key ==="m" || event.key === " "))
    {
        event.preventDefault();
        toggleSound(document.querySelector("#bg-muter"));
    }
}


const toggleSound = (target) =>     // realizacja loaderów do wyciszenia
{
    const background = document.querySelector("#bg");
    if (background.volume)
    {
        background.volume = 0;
        target.src = "../src/img/soundoff.svg";
        localStorage.setItem("isMuted", 1);     // zapis stanu wyciszenia w lokalnej pamięci
    } 
    else 
    {
        background.volume = BACKGROND_VOLUME;
        target.src = "../src/img/soundon.svg";
        localStorage.setItem("isMuted", 0);
    }
};

const chooseVideo = (id, sys) =>
{
    const now = Date.now();
    const sunset = sys.sunset*1000;
    const sunrise = sys.sunrise*1000;
    const isDay = (now > sunrise && now < sunset);

    if (id >= 200 && id <=232) 
    {
        document.querySelector(":root").style.setProperty("--text_color", isDay?"#fff":"#fff");
        document.querySelector(":root").style.setProperty("--container_background",isDay?"rgba(1,1,1,0.5)" :"rgba(100,100,128,0.4)");
        return `ThunderStorm${isDay?"":"Night"}.mp4`;
    }
    if (id >= 300 && id <=321) 
    {
        document.querySelector(":root").style.setProperty("--text_color", isDay?"#fff":"#fff");
        document.querySelector(":root").style.setProperty("--container_background",isDay?"rgba(1,1,1,0.6)" :"rgba(150,100,30,0.5)");
        return `Drizzle${isDay?"":"Night"}.mp4`;
    }
    if (id >= 500 && id <=501) 
    {
        document.querySelector(":root").style.setProperty("--text_color", isDay?"#fff":"#fff");
        document.querySelector(":root").style.setProperty("--container_background",isDay?"rgba(1,1,1,0.6)" :"rgba(150,100,30,0.5)");
        return `GentleRain${isDay?"":"Night"}.mp4`;
    }
    if (id >= 502 && id <=531) 
    {
        document.querySelector(":root").style.setProperty("--text_color", isDay?"#fff":"#fff");
        document.querySelector(":root").style.setProperty("--container_background",isDay?"rgba(1,1,1,0.6)" :"rgba(150,100,30,0.5)");
        return `Rain${isDay?"":"Night"}.mp4`;
    }
    if (id >= 600 && id <=622) 
    {
        document.querySelector(":root").style.setProperty("--text_color", isDay?"#fff":"#fff");
        document.querySelector(":root").style.setProperty("--container_background",isDay?"rgba(1,1,1,0.6)" :"rgba(1,1,25,0.6)");
        return `Snow${isDay?"":"Night"}.mp4`;
    }
    if (id >= 701 && id <=741) 
    {
        document.querySelector(":root").style.setProperty("--text_color", isDay?"#fff":"#fff");
        document.querySelector(":root").style.setProperty("--container_background",isDay?"rgba(1,1,1,0.6)" :"rgba(20,20,20,0.6)");
        return `Fog${isDay?"":"Night"}.mp4`;
    }
    if (id === 800) 
    {
        document.querySelector(":root").style.setProperty("--text_color", isDay?"#fff":"#fff");
        document.querySelector(":root").style.setProperty("--container_background",isDay?"rgba(1,1,1,0.6)" :"rgba(1,1,1,0.6)");
        return `Clear${isDay?"":"Night"}.mp4`;
    }
    if (id === 801 || id === 802) 
    {
        document.querySelector(":root").style.setProperty("--text_color", isDay?"#fff":"#fff");
        document.querySelector(":root").style.setProperty("--container_background",isDay?"rgba(1,1,1,0.6)" :"rgba(1,1,1,0.6)");
        return `LightClouds${isDay?"":"Night"}.mp4`;
    }
    if (id === 803 || id === 804) 
    {
        document.querySelector(":root").style.setProperty("--text_color", isDay?"#fff":"#fff");
        document.querySelector(":root").style.setProperty("--container_background",isDay?"rgba(1,1,1,0.6)" :"rgba(1,1,1,0.6)");
        return `HeavyClouds${isDay?"":"Night"}.mp4`;
    }
    return `UndefinedWeather.mp4`;
    
}

const createBackground = (currentWeather, loader, muter) =>    // funkcja tworząca nowe tło
{
    const id = currentWeather.weather[0].id;
    const background = document.createElement("video");

    background.addEventListener("loadeddata", (e) =>    // aktywuje się po załadowaniu
    {
        loader.stop();                                  // wyłaczenie ładowania
        muter.hidden = false;                           // pojawia się ikona wycszenia
        e.currentTarget.play();                         // włączenie tła
        const background = e.currentTarget;
        setInterval(() => {background.currentTime = 0},(e.currentTarget.duration-0.5)*1000);
                                                        // zapętlenie nagrana (bo w chromie nie działał atrybut loop)
    });
    background.src = `src/videos/${chooseVideo(id, currentWeather.sys)}`;
    background.id = "bg";

    return background;
};


const setBackground = ( currentWeather, element = document.body) =>
{
    const isMuted = parseInt(localStorage.getItem("isMuted")) || 0; // pobiera ze schowka info o wyciszeniu

    let background = document.querySelector("#bg");
    let loader, muter;
    if (background !== null)                        // jeżeli tło już istnieje 
    {
        element.removeChild(background);            // reset tła

        const loadingBox = document.querySelector("body > .loadingBox");    // reset loadera
        loader = loadingBox.querySelector(".loader");               
        loader.start();

        muter = document.querySelector('#bg-muter');    // resest wyciszacza
        muter.hidden = true;
    }
    else                                           // gdy tło jeszcze nie istnieje 
    {
        document.addEventListener("keypress", togglePress);

        const loadingBox = document.createElement("div");   // tworzenie loadera
        loadingBox.classList.add("loadingBox");
        loadingBox.style.setProperty("--width", "200px");
        loadingBox.style.setProperty("--height", "200px");
        loader = new Loader(loadingBox);
        element.appendChild(loadingBox);

        muter = document.createElement("img");              // tworzenie wyciszacza
        muter.src = !(isMuted) ?  "../src/img/soundon.svg" : "../src/img/soundoff.svg";
        muter.classList.add("muter");
        muter.id = "bg-muter";    
        muter.hidden = true;
        element.appendChild(muter);
        muter.addEventListener('click', toggleClick);
    }
    background = createBackground(currentWeather, loader, muter);  // tworzenie tła
    background.volume = isMuted ? 0 :BACKGROND_VOLUME;
    element.appendChild(background);
    

    return background;
}

export default setBackground;