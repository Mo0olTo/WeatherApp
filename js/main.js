let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {
  getData(searchInput.value);
});


document.addEventListener("keydown" ,function(e){
  if(e.key == "Enter"){
    getData(searchInput.value);
  }
})



getlocation();
// getData("alexandria");

async function getData(city) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=f5e38c83393347058e8225802241312&q=${city}&days=3`
    );
    if (response.ok) {
      let data = await response.json();
      showData(data);
      showNextDays(data.forecast.forecastday);
    }
  } catch (error) {
    console.log(error);
  }
}

let currentDate = new Date();
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let dayName = daysOfWeek[currentDate.getDay()];
let monthName = monthsOfYear[currentDate.getMonth()];
let day = currentDate.getDate();

let date = `${dayName}, ${monthName} ${day}`;

function showData(data) {
  let x = "";

  x += `
    <div class="col-md-4  item-box g-4">

    <div class="inner">
        <div class="item-header">
          <p class="text-center clr-basic">${date}</p>
        </div>

      <div class="item-content text-center ">
        <p class="fw-bolder fs-2 clr-basic">${data.location.name}</p>
        <h2 class="clr-basic">${data.current.temp_c}°C</h2>
        <img src="https:${data.current.condition.icon}" alt="">
        <p class="clr-basic">${data.current.condition.text}</p>


        <div class="info d-flex flex-nowrap justify-content-center gap-4">
          <p class="clr-basic"><i class="fa-solid fa-umbrella"></i> ${data.current.humidity}%</p>
          <p class="clr-basic"><i class="fa-solid fa-wind"></i> ${data.current.wind_kph} km/h</p>
          <p class="clr-basic"><i class="fa-solid fa-compass"></i> ${data.current.wind_dir}</p>
        </div>
      </div>
          
         </div>
        
    </div>
  `;

  document.getElementById("rowData").innerHTML = x;
}







function showNextDays(forecastData) {
  let nextDays = "";

  let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

 

  for (let i = 1; i < 3; i++) {
    let dayData = forecastData[i];

    let forecastDate = new Date(dayData.date);
    let dayName = daysOfWeek[forecastDate.getDay()];
    let monthName = monthsOfYear[forecastDate.getMonth()];
    let day = forecastDate.getDate();

    let date = `${dayName}, ${monthName} ${day}`;




    nextDays += `
      <div class="col-md-4 item-box gy-4">
        <div class="inner ">

          <div class="item-header">
          <p class="text-center clr-basic">${date}</p>
        </div>

        <div class="item-content text-center mt-5">
          <h2 class="clr-basic">${dayData.day.avgtemp_c}°C</h2>
          <img src="https:${dayData.day.condition.icon}" alt="">
          <p class="clr-basic">${dayData.day.condition.text}</p>

          <div class="info d-flex flex-nowrap justify-content-center gap-4 mt-5">
            <p class="clr-basic"><i class="fa-solid fa-umbrella"></i> ${dayData.day.avghumidity}%</p>
            <p class="clr-basic"><i class="fa-solid fa-wind"></i> ${dayData.day.maxwind_kph} km/h</p>
            <p class="clr-basic"><i class="fa-solid fa-compass"></i> ${dayData.day.avgvis_km} </p>
          </div>
        </div>
          
         </div>

        
      </div>
    `;
  }

  document.getElementById("rowData").innerHTML += nextDays;
}






async function getLocationData(lat , lon) {
  try {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f5e38c83393347058e8225802241312&q=${lat},${lon}&days=3`);
    if(response.ok){
      let data = await response.json();
      showData(data)
      showNextDays(data.forecast.forecastday)
    }

  } catch (error) {
    console.log(error);
    
    
  }
  
}



function getlocation(){

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(

      function (position) {

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        getLocationData(lat , lon);

        
      },
      function (error) {
        console.log( error);

        getData("dahab");
        
       
      }
    );
  }

}


