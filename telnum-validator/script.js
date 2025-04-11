const check = document.getElementById("check-btn");
const clear = document.getElementById("clear-btn");
const number = document.getElementById("user-input")

 const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;



check.addEventListener("click", ()=> {

 const phoneNumber = number.value.trim();
if(!phoneNumber){
  alert("Please provide a phone number");
  return;
}
 const output = document.getElementById("output-section");
 const newResult = document.createElement("p");
 output.style.display = "block";

 const result = document.getElementById("results-div");


    if (phoneRegex.test(phoneNumber)) {
      
      newResult.textContent = `Valid US number: ${phoneNumber}`;
      newResult.style.color = "#75f0b5";
    } 
    
    else {
      
      newResult.textContent = `Invalid US number: ${phoneNumber}`;
      newResult.style.color = "#e0462b";
    }

     result.appendChild(newResult);
});




clear.addEventListener("click", ()=> {

  document.getElementById("output-section").style.display = "none";
  number.value = "";
  document.getElementById("results-div").innerHTML="";
  
})
