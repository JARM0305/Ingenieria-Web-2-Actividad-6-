const express = require('express');
const cors = require('cors');
const router = require('./API/routes/usuarios.routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);

app.listen(3000, () => {
    console.log('API funcionando');
});