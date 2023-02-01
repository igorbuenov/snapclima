


//Interação
const citySearchInput = document.getElementById('citySearchInput')
const citySearchButton = document.getElementById('citySearchButton')

//Exibição
const currentDate = document.getElementById('currentDate')
const cityName = document.getElementById('cityName')
const weatherIcon = document.getElementById('weatherIcon')
const weatherDescription = document.getElementById('weatherDescription')
const currentTemperature = document.getElementById('currentTemperature')
const windSpeed = document.getElementById('windSpeed')
const feelsLikeTemperature = document.getElementById('feelsLikeTemperature')
const currentHumidity = document.getElementById('currentHumidity')
const sunriseTime = document.getElementById('sunriseTime')
const sunsetTime = document.getElementById('sunsetTime')

const apiKey = 'aee148f6133b16166a72d8a912995a8e';


citySearchButton.addEventListener('click', () => {
    let cityName = citySearchInput.value
    getCityWeather(cityName)
});

citySearchInput.addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
        let cityName = citySearchInput.value
        getCityWeather(cityName)
    }  
})

navigator.geolocation.getCurrentPosition(
    (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        getCurrentLocationWeather(lat, lon)
    },
    (err) => {
        if(err.code === 1){
            alert('Geolocalização negada pelo usuário, busque manualmente por uma cidade através da barra de pesquisa.')
        } else {
            console.log(err)
        }
    }
)

function getCurrentLocationWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&apiid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
}

function getCityWeather(cityName) {

    weatherIcon.src=`assets/img/loading-icon.svg`;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
}

function displayWeather(data) {
    let {
        dt,
        name,
        weather: [{ icon, description}],
        main: { temp, feels_like, humidity},
        wind: { speed },
        sys: { sunrise, sunset}
    } = data

    currentDate.textContent = formatDate(dt);
    cityName.textContent = name;
    weatherIcon.src=`assets/img/${icon}.svg`;
    weatherDescription.textContent = description;
    currentTemperature.textContent = `${Math.round(temp)}°C`;
    windSpeed.textContent = `${Math.round(speed * 3.6)}Km/h`;
    feelsLikeTemperature.textContent = `${Math.round(feels_like)}°C`;
    currentHumidity.textContent = `${humidity}%`;
    sunriseTime.textContent = formatTime(sunrise);
    sunsetTime.textContent = formatTime(sunset);

}

function formatDate(epochTime) {
    let date = new Date(epochTime * 1000);
    let formattedDate = date.toLocaleDateString('pt-BR', {month: 'long', day: 'numeric'})
    
    return `Hoje, ${formattedDate}`;
}

function formatTime(epochTime) {
    let date = new Date(epochTime * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return `${hours}:${minutes}`
}