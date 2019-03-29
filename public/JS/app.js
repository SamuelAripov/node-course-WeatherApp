let units = 'auto'
let tempType = 'F'

let tempSlider = document.getElementById('tempUnit')

let fetchTheWeather = () => {
    let ipAddress = new Promise((reject, resolve) => {
        fetch('https://ipapi.co/json/').then((res) => {
            return res.json().then((data) => {
                resolve(data)
            })
        })
    })
    ipAddress.then((value) => {
    }).catch(value => {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a7056b73015ab391704090db56a47c69/${value.latitude},${value.longitude}?units=${units}`).then((res) => {
            res.json().then((data) => {
                document.querySelector('#weatherItself').innerHTML = `Weather in ${value.city} ${value.region} ${value.country_name} is:<br>${data.daily.summary}<br>${data.daily.data[0].summary}<br>And the current temperature is about ${data.currently.temperature}°${tempType}<br>There is ${data.currently.precipProbability}% chance of rain`
            })
        })
    })
}
fetchTheWeather()

setInterval(() => {
    fetchTheWeather()
}, 60000)
tempSlider.addEventListener("click", e => {
    if (tempSlider.checked == true) {
        units = 'si'
        tempType = 'C'
    } else {
        units = 'auto'
        tempType = 'F'
    }
    fetchTheWeather()
})