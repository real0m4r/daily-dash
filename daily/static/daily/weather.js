document.addEventListener("DOMContentLoaded", function () {
            const searchButton = document.getElementById("searchButton");
            const locationInput = document.getElementById("locationInput");
            const weatherInfo = document.getElementById("weatherInfo");

            searchButton.addEventListener("click", function () {
                const location = locationInput.value.trim();
                if (location === "") {
                    alert("Please enter a location.");
                    return;
                }

                const apiKey = "aae130b3867d06131c66feb536733dce";
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        const temperature = Math.round(data.main.temp - 273.15);
                        const description = data.weather[0].description;
                        const windSpeed = data.wind.speed;
                        const humidity = data.main.humidity;

                        const weatherHTML = `
                            <p>Location: ${data.name}, ${data.sys.country}</p>
                            <p>Temperature: ${temperature}°C</p>
                            <p>Description: ${description}</p>
                            <p>Wind: ${windSpeed} m/s</p>
                            <p>Humidity: ${humidity}%</p>
                        `;
                        weatherInfo.innerHTML = weatherHTML;
                    })
                    .catch(error => {
                        console.error("Error fetching weather data:", error);
                        weatherInfo.innerHTML = "Failed to fetch weather data.";
                    });
            });
        });
