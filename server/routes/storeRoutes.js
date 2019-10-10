const items = require('../models/Items');

module.exports = (app)=>{//get express app as parameter and send module as a function

    let scanItems = (itemsToScan)=>{//Scans all items and gets calculated total
        let pants = 0;
        let tshirt = 0;
        let total = 0;
        itemsToScan.forEach(item => {
            if(item.name == "Pants"){
                pants++;
                total += items.PANTS.price;
            }else if(item.name == "T-Shirt"){
                tshirt++;
                total += items.TSHIRT.price;
            }else{
                total += items.HAT.price;
            }
        });
        return (total - calculateDiscount(pants, tshirt));
    }

    let calculateDiscount = (pants, tshirt) =>{//by amount, calculated and returns discount
        let discount = 0;
        if(pants > 1){
            discount += (Math.floor(pants/2)) * items.PANTS.price;
        }else if(tshirt>=3){
            discount += tshirt * 1;
        }
        return discount;
    }
    
    app.get('/store/', function(req, res) {//sets root path for store
        res.json(items);
    });

    app.get('/store/checkout/', function(req, res){//sets checkout for store and manages  discounts and promotions
        let itemsToScan = req.body; //Gets items that need to be scanned
        res.json({"items":[...itemsToScan], "total":scanItems(itemsToScan)});//returns scanned items with total
    });

};