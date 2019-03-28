const path = require('path')
const hbs = require('hbs')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

//Defining values for request
let units = 'auto'
let tempType = 'F'
let lang = 'en'

//Defining paths
const publicDirPath = express.static(path.join(__dirname, '../public'))
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setting up view engine and handlebars
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsPath)

//Setup static dir to serve
app.use(publicDirPath)

app.get('', (req, res) => {
    if (req.query.units == 'C' || req.query.units == 'c') {
        tempType = 'C'
        units = 'si'
    }
    if (req.query.units) {
        lang = req.query.lang
    }
    res.render('index', {
        title: 'Weather',
        text: `The weather in your area is: `,
    })
})
app.get('/about', (req, res) => {
    res.render(`about`, {
        title: 'About me!',
        text: 'A young developer with big goals.',
        href: '/'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        text: 'Having trouble? Look through the help articles to find a solution!',
        href: '/'
    })
})
app.get('/help/*', (req, res) => {
    res.render('help', {
        title: 'Whoops! This help article was not found! Sorry about that',
        href: '/help'
    })
})
app.get('*', (req, res) => {
    res.render('help', {
        title: '404 Page not found.',
        href: '/'
    })
})
app.listen(port, () => {
    console.log('Server is up on port 3000')
})