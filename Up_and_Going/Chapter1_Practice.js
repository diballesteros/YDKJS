const TAX_RATE = 0.08;
const phonePrice = 99.99;
const accPrice = 9.99;
const threshold = 200;
    
var bank_account_balance = 303.91;
var totalPrice = 0;
var individualPurchase = 0;

function format(amt){
   return amt ="$" + amt.toFixed(2);
}
    
function calculateTax(amt){
   return  amt += (amt * TAX_RATE);
}
    
// Outer function to calculate phone purchases
while(bank_account_balance > totalPrice){
     individualPurchase = phonePrice; 
    
    //Inner Loop for phone accessories
     if(threshold > individualPurchase){
            individualPurchase += accPrice;
        }
    
    totalPrice += individualPurchase;
    
}

console.log("Your purchase amount: " +format(calculateTax(totalPrice)));