const form = document.querySelector('.busca')
const input = document.querySelector('#searchInput')
const btnEnviar = document.querySelector('button')
const message = document.querySelector('.aviso')

const titulo = document.querySelector('.titulo')
const tempInfo = document.querySelector('.tempInfo')
const windSpeed = document.querySelector('.ventoInfo')
const tempIcon = document.querySelector('.temp img')
const windAngle = document.querySelector('.ventoPonto')
const resultado = document.querySelector('.resultado')

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  const inputValue = input.value

  if (inputValue !== '') {
    clearInfo()
    showWarning('Carregando...')

    const apiKey = '04397c4d97324943aff13a24dc5a67d2'
    const unit = 'metric'
    const lang = 'pt_br'
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(inputValue)}&appid=${apiKey}&units=${unit}&lang=${lang}`

    let results = await fetch(url)
    let json = await results.json()
    
    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      })
    } else {
      clearInfo()
      showWarning('Localização não encontrada!')
    }
  } else {
    clearInfo()
  }
})

const showInfo = json => {
  showWarning('')

  titulo.innerHTML = `${json.name}, ${json.country}`
  tempInfo.innerHTML = `${json.temp} <sup>ºC</sup>`
  windSpeed.innerHTML = `${json.windSpeed} <span>km/h</span>`
  tempIcon.setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
  windAngle.style.transform = `rotate(${json.windAngle - 90}deg)`
  resultado.style.display = 'block'
}

const showWarning = msg => {
  message.innerHTML = msg
}

const clearInfo = () => {
  showWarning('')
  resultado.style.display = 'none'
}