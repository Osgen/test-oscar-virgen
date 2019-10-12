const promotions = require('../libs/promotions');//Gets all promotions

let getTotal = (itemsToScan)=>{//Gets the total for checkout

    [prices, amountPerItem, total] = scanItems(itemsToScan);//Use REST deconstruct to get each element

    Object.entries(amountPerItem).forEach(item => {
        let code  = item[0];//Code of item
        let amount = item[1];//Amount of each item
        if(typeof(promotions[code]) === 'function'){//If promotion of item exists
            total -= promotions[code](amount, prices[code]);//Deduct from total the discount per item code
        }
    });
    return total;
}

let scanItems = (itemsToScan)=>{//Scans all items to get amount of items per code, prices and subtotal
    let codes = [];
    let prices = {};
    let countedItems = {};
    let subtotal = 0;

    itemsToScan.forEach(item => {
        let key = Object.keys(item)[0]; //Gets each code
        let price = Object.values(item)[0].price; //Gets each price

        subtotal += price;//Adds all prices
        prices[key] = price;
        countedItems[key] = (countedItems[key] || 0) + 1;
        codes.push(Object.keys(item)[0]);//Gets all item codes
    });

    return [prices, countedItems, subtotal];
}

module.exports = {
    getTotal:getTotal
}