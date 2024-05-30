function getWeather() {
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `http://localhost:3000/weather?city=${city}`;
    const hourlyForecastUrl = `http://localhost:3000/forecast?city=${city}`;
    const fiveDayForecastUrl = `http://localhost:3000/five-day-forecast?city=${city}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(hourlyForecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });

    fetch(fiveDayForecastUrl)
        .then(response => response.json())
        .then(data => {
            displayFiveDayForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching 5-day forecast data:', error);
            alert('Error fetching 5-day forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = ''; // Clear previous content

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
            <p>${temperature}°C</p>
            <img src="${iconUrl}" alt="${description}">
        `;

        weatherInfoDiv.innerHTML = weatherHtml;
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = ''; // Clear previous content

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function getFiveDayForecast(city) {
    const forecastUrl = `http://localhost:3000/five-day-forecast?city=${city}`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayFiveDayForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching 5-day forecast data:', error);
            alert('Error fetching 5-day forecast data. Please try again.');
        });
}

function displayFiveDayForecast(fiveDayForecastData) {
    const fiveDayForecastDiv = document.getElementById('five-day-forecast');
    fiveDayForecastDiv.innerHTML = ''; // Clear previous content

    // Group forecast data by date
    const dailyData = {};

    fiveDayForecastData.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();

        if (!dailyData[date]) {
            dailyData[date] = [];
        }

        dailyData[date].push(item);
    });

    // Calculate daily averages and display
    for (const [date, dayData] of Object.entries(dailyData)) {
        const temperatures = dayData.map(item => item.main.temp - 273.15); // Convert to Celsius
        const descriptions = dayData.map(item => item.weather[0].description);
        const icons = dayData.map(item => item.weather[0].icon);

        const averageTemp = Math.round(temperatures.reduce((a, b) => a + b, 0) / temperatures.length);
        const description = descriptions[0]; // Take the description from the first entry
        const iconCode = icons[0]; // Take the icon code from the first entry
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const dayHtml = `
            <div class="day-forecast">
                <p>Date: ${date}</p>
                <p>Temperature: ${averageTemp}°C</p>
                <p>Description: ${description}</p>
                <img src="${iconUrl}" alt="${description}">
            </div>
        `;

        fiveDayForecastDiv.innerHTML += dayHtml;
    }
}
