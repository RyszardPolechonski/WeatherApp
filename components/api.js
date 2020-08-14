

const getAPI = async (city, type = "current") => // city to miasto pobrane z inputa, a type to rodzaj pobieranej pogody
{                                                // tzn. pogoda w tym momencie czy pogoda na 5 dni itd.
    let apiAdress;
    switch (type)
    {
        case "current": //bierząca pogoda
            apiAdress = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pl&units=metric&APPID=37bc5c2efba7f70f2b60dd00061732e8`;
            break;
        // case "3 days": //pogoda na 3 dni
        //     apiAdress = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=pl&cnt=24&APPID=436d1eea572e5d346f8cd5eb7c8dfa14`;
        //     break;
        case "5 days": //pogoda na 5 dni
            apiAdress = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=pl&APPID=37bc5c2efba7f70f2b60dd00061732e8`;
            break;
        default:
            throw "Wrong type."
            
    }
    try
    {
        const file = await fetch(apiAdress);
        const data = await file.json();
        if (parseInt(data.cod) === 200) return data;
        else throw `${data.cod} ${data.message}`;
    }
    catch (err)
    {
        throw err;
    }
}

export default getAPI;