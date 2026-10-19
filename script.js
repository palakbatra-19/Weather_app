const apiKey = "0246837f79924bb9b1f102958253107";

function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (location === "") {
    resultDiv.innerHTML = "<p>Please enter a location.</p>";
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Location not found");
      }
      return response.json();
    })
    .then(data => {
      const tempC = data.current.temp_c;
      const condition = data.current.condition.text;
      const city = data.location.name;
      const country = data.location.country;

      resultDiv.innerHTML = `
        <h2>Weather in ${city}, ${country}</h2>
        <p><strong>Temperature:</strong> ${tempC}°C</p>
        <p><strong>Condition:</strong> ${condition}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

