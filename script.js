const form = document.getElementById("form");
const latitudeInput = document.getElementById("lat");
const longitudeInput = document.getElementById("lon");
const resultCard = document.getElementById("airCard"); // Renamed for clarity

const AqiResult = document.getElementById("aqiValue");
const CoResult = document.getElementById("coValue");
const NO2Result = document.getElementById("no2Value");
const O3Result = document.getElementById("ao3Value");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const latitude = latitudeInput.value;
    const longitude = longitudeInput.value;

    // 1. Use backticks (`) to insert your variables into the URL
    // 2. Switched to '/current/airquality' to get pollutants (CO, NO2, O3)
   const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=0bff100fdb339ffbcb47969100a0cfea`;
    const options = {
        method: 'GET'
    };
    fetch(url,options)
        .then(response=>{
            console.log("Response Status:", response.status);
            if(!response.ok){
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(result=>{
            console.log("API Response:", result);
            
            // Check if data exists (OpenWeatherMap returns list array)
            if(!result.list || result.list.length === 0){
                alert("No air quality data found for this location");
                return;
            }
            
            let readings = result.list[0].components;
            let aqi = result.list[0].main.aqi;
            console.log("Readings:", readings);
            
            // Display results if elements exist
            if(AqiResult) AqiResult.textContent = aqi || "N/A";
            if(CoResult) CoResult.textContent = (readings.co ? readings.co.toFixed(2) : "N/A");
            if(NO2Result) NO2Result.textContent = (readings.no2 ? readings.no2.toFixed(2) : "N/A");
            if(O3Result) O3Result.textContent = (readings.o3 ? readings.o3.toFixed(2) : "N/A");
            
            // Show result card
            if(resultCard) resultCard.style.display = "block";
        })
        .catch(error=>{
            console.error("Error fetching air quality data:", error);
            alert("Error: " + error.message);
        });
});
