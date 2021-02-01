const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
app.use(express.json());
app.set('view engine', 'pug')
app.set('views', './src/back-end-src/views')

app.get('/', (req, res) => { 
    console.log('Rendering the spa for car maintenance')
    res.render('car_maintenance', {})
})

app.get('/maintenance/cars', (req, res)=>{
    console.log('Fetching cars information')
    const carsMaintenace = fs.readFileSync('./src/back-end-src/information-files/car-maintenance.json');
    const parseData = JSON.parse(carsMaintenace);
    res.status(200).send({carsMaintenance: parseData});
})

app.post('/maintenance/update', (req,res) => {
    const newCarData = req.body.newInformation;
    const stringData = JSON.stringify(newCarData);
    console.log('Updating the file with the new information')
    fs.writeFileSync('./src/back-end-src/information-files/car-maintenance.json', stringData, 'utf8')
    res.status(200).send({message: 'Everything was succesful'});
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))