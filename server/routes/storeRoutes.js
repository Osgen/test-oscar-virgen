const items = require('../models/Items');
const scanner = require('../libs/scanner');


module.exports = (app)=>{//get express app as parameter and send module as a function
    
    app.get('/store/', function(req, res) {//sets root path for store
        res.json(items);
    });

    app.post('/store/checkout/', function(req, res){//sets checkout for store and manages  discounts and promotions
        let itemsToScan = req.body.data; //Gets items that need to be scanned
        console.log(req.body);
        res.json({"total":scanner.getTotal(itemsToScan)});//returns total
    });

};