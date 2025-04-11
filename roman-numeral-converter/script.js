const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");




const romanToBinary = (input) => {
  let sym = "";
  
  const romanMap = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];
if (input === 0){
  return;
}

while(input>=0){
  for (let i=0;i<romanMap.length;i++){
    if(romanMap[i].value <= input){
      console.log(input);
      sym += romanMap[i].symbol;
      input -= romanMap[i].value;
      break;
    
    }
  }
}

return sym;
}


const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  if(inputInt < 0){
   result.textContent = "Please enter a number greater than or equal to 1";
   result.classList.add(`wrong`);
   return;
 }

 if(inputInt >= 4000){
   result.classList.add(`wrong`);
   return  result.textContent = "Please enter a number less than or equal to 3999";
 }

  if (!numberInput.value || isNaN(inputInt)) {
    result.classList.add(`wrong`);
    result.textContent = "Please enter a valid number"
    return;
  }

 
  console.log(inputInt);
  result.textContent = romanToBinary(inputInt);
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});