const express = require('express');
const router = require('./routes/routes');
const errorMiddleware = require('./middlewares/errors');

const PORT = process.env.PORT || 9797
const SERVER = process.env.SERVER_NAME || 'lhServerDEV02'
const ENVIRONMENT = process.env.ENVIRONMENT || 'development'

const app = express();
app.use(express.json());

app.use(router);

// middleware d erro deve ficar apos todos os outros middlewares
app.use(errorMiddleware);

app.listen(PORT, ()=>{
    console.log(`${SERVER} running on port ${PORT} - ${ENVIRONMENT}`)
})

