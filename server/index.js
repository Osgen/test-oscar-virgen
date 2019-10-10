const express = require('express');//Get express module
const storeRoutes = require('./routes/storeRoutes');//get my storeRoutes function 

const PORT = process.env.PORT || 3000;//if not environment port, set 3000

const app = express();

app.use(express.json());
storeRoutes(app);//send express app to function storeRoutes



app.listen(PORT);
  