

module.exports = {
    TSHIRT:(amount, ...trash)=>{ //Gets the discount for TSHIRT
        if(amount >= 3){
            return amount*1;
        }
        return 0;
    },
    PANTS:(amount, price, ...trash)=>{
        return (Math.floor(amount/2)) * price;//Gets the discount and price for PANTS
    }
}