let price = 19.5;
let cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];

// Currency denominations (in cents)
const currencyDenominations = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['HUNDRED', 100]
];

const purchaseBtn = document.getElementById("purchase-btn");

const total = document.getElementById("total");
total.textContent = `$${price}`;
console.log(cid.length);

function updateChangeDue(change) {
  // Loop through the 'cid' array and update the respective span elements with change values
  change.forEach(([coinType, coinAmount]) => {
    const coinElement = document.getElementById(coinType.toLowerCase());  // Convert to lowercase to match IDs
    if (coinElement) {
      coinElement.textContent = `$${coinAmount.toFixed(2)}`;
    }
  });
}

updateChangeDue(cid);

purchaseBtn.addEventListener("click", () => {
  const cash = document.getElementById("cash").value;

  const customerCash = parseFloat(cash);

  if (isNaN(customerCash) || customerCash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  const result = calculateChange(customerCash);

  const changeDueElement = document.getElementById("change-due");
  const changeDueText = result.change.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join("\n");

  // Show result
  document.getElementById("change-div").style.display = "block";
  if(result.status === "No change due - customer paid with exact cash" ){
    changeDueElement.textContent = `No change due - customer paid with exact cash`;
  }else{
  changeDueElement.textContent = `Status: ${result.status}\n${changeDueText}`;
  }
});

const calculateChange = (cash) => {
  let changeDue = cash - price;
  let change = [];
  let status = "OPEN";

  // Convert all values to cents for precision
  let totalCid = cid.reduce((acc, currency) => acc + currency[1] * 100, 0);
  changeDue = Math.round(changeDue * 100); // Convert change due to cents for precision

  // Check for sufficient funds in drawer
  if (totalCid < changeDue) {
    status = "INSUFFICIENT_FUNDS";
    change = [];
  } /*else if (totalCid === changeDue) {
    status = "CLOSED";
    change = [];
  }*/ else {
    // Case when no change is due (exact cash paid)
    if (changeDue === 0) {
      status = "No change due - customer paid with exact cash";
      change = [];
    } else {
      // Give change
       if (totalCid === changeDue){
         status = "CLOSED";
      }
      for (let i = cid.length - 1; i >= 0; i--) {
        const coinValue = currencyDenominations[i][1] * 100;
        const coinName = currencyDenominations[i][0];
        let coinAmount = Math.round(cid[i][1] * 100);

        if (changeDue >= coinValue) {
          const coinCount = Math.min(Math.floor(changeDue / coinValue), Math.floor(coinAmount / coinValue));

          if (coinCount > 0) {
            change.push([coinName, (coinCount * coinValue) / 100]);
            changeDue -= coinCount * coinValue;

            // Update remaining coins in the drawer
            cid[i][1] -= (coinCount * coinValue) / 100;

            changeDue = Math.round(changeDue * 100) / 100;
          }
        }
      }
     

      // If there's any change left after going through all denominations
      if (changeDue > 0) {
        status = "INSUFFICIENT_FUNDS";
        change = [];
      }
    }
  }
  updateChangeDue(cid);

  return { status, change };
};
