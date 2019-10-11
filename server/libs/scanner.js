const promotions = require('../libs/promotions');//Gets all promotions

let getTotal = (itemsToScan)=>{//Gets the total for checkout

    [prices, amountPerItem, total] = scanItems(itemsToScan);//Use REST deconstruct to get each element

    Object.entries(amountPerItem).forEach(item => {
        total -= promotions[item[0]](item[1], prices[item[0]]);//Deduct from total the discount per item code
    });
    console.log(total);
    return total;
}

let scanItems = (itemsToScan)=>{//Scans all items to get amount of items per code, prices and subtotal
    let codes = [];
    let prices = {};
    let subtotal = 0;

    itemsToScan.forEach(item => {
        let key = Object.keys(item)[0]; //Gets each code
        let price = Object.values(item)[0].price; //Gets each price

        subtotal += price;//Adds all prices
        prices[key] = price;

        codes.push(Object.keys(item)[0]);//Gets all item codes
    });

    return [prices, countItemsCode(codes), subtotal];
}

let countItemsCode = (codes)=>{ //Gets each item code counted
    let count = {};
    codes.forEach(code => {
        count[code] = (count[code] || 0) +1;//Counts each appearance
    });
    return count;
}

module.exports = {
    getTotal:getTotal
}