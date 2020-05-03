const express = require('express');
const cors = require('cors');
const app = express();
const {
    scrapPinterest,
    scrapBehance,
    scrapDribbbleMobile,
    scrapDribbbleColor,
} = require('./module/scrapper.js');

app.use(cors())

app.get('/version', (req, res) => {
    res.send({
        status: true,
        message: 'Thank you for your request',
        version: 1.0
    })

})

app.get('/pin/:keyword', (req, res) => {

    const { keyword } = req.params

    scrapPinterest(keyword)
        .then(urls => {

            if (Array.isArray(urls)) {
                res.send({
                    status: true,
                    data: urls
                })
            } else {
                res.status(500).send({
                    status: false,
                    message: urls,
                })
            }
        })

})

app.get('/be/:keyword', (req, res) => {
    const { keyword } = req.params

    scrapBehance(keyword)
        .then(urls => {

            if (Array.isArray(urls)) {
                res.send({
                    status: true,
                    data: urls
                })
            } else {
                res.status(500).send({
                    status: false,
                    message: urls,
                })
            }
        })
        .catch(err => {
            res.send({
                status: false,
                message: err.message
            })
        })

})

app.get('/drib/:keyword', (req, res) => {
    const { keyword } = req.params
    scrapDribbbleMobile(keyword)
        .then(urls => {

            if (Array.isArray(urls)) {
                res.send({
                    status: true,
                    data: urls
                })
            } else {
                res.status(500).send({
                    status: false,
                    message: urls,
                })
            }
        })
})

app.get('/drib-color/:color', (req, res) => {
    const { color } = req.params
    scrapDribbbleColor(color)
        .then(urls => {

            if (Array.isArray(urls)) {
                res.send({
                    status: true,
                    data: urls
                })
            } else {
                res.status(500).send({
                    status: false,
                    message: urls,
                })
            }
        })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`))