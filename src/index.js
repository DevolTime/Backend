const express = require('express');

const app = express();

//Endpoints 
app.get ('/health', (req, res) => {
    res.json({
        msg: 'Sition funca'
    })
})

// Endpoints agrupados por entidad

app.use('/users', require('./routes/user.routes.js'))



app.listen(3000, () => {
    console.log(`server runing on http://localhost:3000`)
})