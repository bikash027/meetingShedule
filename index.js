const express = require('express');
const bodyParser = require('body-parser');
const axios= require('axios');
const app = express();
const path=require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let httpsProxyAgent = require('https-proxy-agent');
const agent = new httpsProxyAgent('http://172.16.199.40:8080');

const config = {
  url: 'https://totalcloud-static.s3.amazonaws.com/intern.json'
}
let ar=[];
app.get('/api',function(req,res){
  axios.request(config)
  .then(response=>{
    ar=response.data;
    res.status(200).json(response.data);
  })
  .catch(err=>{
    console.log("could not fetch recent data");
    res.status(200).json(ar);
  })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

const port = parseInt(process.env.PORT, 10) || 5000;
app.listen(port, () => {
    console.log(`Server is started at PORT: ${port}`);
});


