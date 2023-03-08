const searchbutton=document.querySelector(".search button");
const searchbar=document.querySelector(".search-bar");
const counter = document.getElementById('count');


let weather={
    fetchWeather: function (city) {
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=853145866375e2b2ea0167120658efff'
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText =name;
        document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText =description;
        document.querySelector(".temp").innerText =(temp-273.15).toFixed(2)+ "°C";
        document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText ="Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
}

searchbutton.addEventListener("click", function () {
        weather.search();
    });

searchbar.addEventListener("keyup", function (event) {
       if (event.key == "Enter") {
           weather.search();
        }
    });

weather.fetchWeather("kanpur");

updateVisitCount();
function updateVisitCount() {
    fetch('https://api.countapi.xyz/update/Weather/App/?amount=1')
    .then(res => res.json())
    .then(res => {
        counter.innerHTML = res.value;
    });
    
}