const client = require('./db/client')
const express = require('express');
const app = express();
const PORT = 7474;

client.connect()

app.get ('/',(req,res) => {
    res.send('welcome')
});


app.get ('/robots',async (req,res) => {
    try {
        const {rows: robots} = await client.query(`SELECT * FROM robots`);
        console.log("robots", robots)
        res.send(robots)
        
    } catch (error) {
        console.log(error)
    }
});
app.listen(PORT,() => {
    console.log(`I'm here ${PORT}`)
});






