module.exports = (app)=>{//get express app as parameter
    
    app.get('/store/', function(req, res) {//sets root path for store
        res.json([
            {"code":"PANTS", "name":"Pants", "price":5.0},
            {"code":"TSHIRT", "name":"T-Shirt", "price":20.0},
            {"code":"HAT", "name":"Hat", "price":7.50}
        ]);
    });

    app.get('/store/checkout/', function(req, res){//sets checkout for store and manages  discounts and promotions
        let itemsToScan = req.body; //Gets items that need to be scanned
        let tr = [{"A":1}, {"B":2}];//Test
        res.json({"items":[...tr], "total":10});//returns scanned items with total
    });

};