const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());

app.listen(9002, async () => {
    console.log('Server Started');
})

app.get('/index', (req, res) => {
    let var_0 = req.query.no;
    var_0 = var_0 * 2 + '';
    res.json(var_0)
})