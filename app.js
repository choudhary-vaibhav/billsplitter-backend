const express = require('express');
const app = express();
const dotenv  = require('dotenv'); // env file read
const morgan = require('morgan');
const logger= require('./utils/app-logger')(__filename);

const serverLogStream = require('./utils/server-logger');

app.use(morgan('combined',{stream:serverLogStream}));

app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded());
//Dynamic Routing
app.use('/', require('./routes/group'));
app.use('/ledger', require('./routes/ledger'));

const port = process.env.PORT || 1000;
const server = app.listen(port, (err) => {
    if(err){
        //console.log('Server Crash'+ JSON.stringify(err));
        logger.error('Server Crash'+ JSON.stringify(err));
        
    }else{
        //console.log('Server Start ', server.address);
        logger.debug('Server Start At '+ server.address().port );

    }
})