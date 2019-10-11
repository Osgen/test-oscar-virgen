const express = require('express');//Get express module
const cors = require('cors');//Get cors module
const storeRoutes = require('./routes/storeRoutes');//get my storeRoutes function 

const PORT = process.env.PORT || 5000;//if not environment port, set 3000

const app = express();

app.use(express.json());
app.use(cors());//Use cors to allow request inside the same server
storeRoutes(app);//send express app to function storeRoutes

app.listen(PORT, ()=>{console.log(`API RUNNING AT ${PORT}`)});//Express listening to X port
  