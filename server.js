const express = require('express'),
        server = express(),
    fs = require('fs'),
            orderData = require('./orders')

server.set('port', process.env.PORT || 3000);

server.get('/',(request,response)=>{
    response.send('Welcome to my first e-commerce site');
   });

server.listen(3000, ()=>{
    console.log('Express server started at port 3000');
});