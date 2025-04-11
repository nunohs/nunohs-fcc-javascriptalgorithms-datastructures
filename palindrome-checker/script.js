const form = document.querySelector('#palindrome-form');
const textInput = document.querySelector('#text-input');
const resultMsg = document.getElementById("result");

function isPalindrome() {
  
  // Normalize the string: convert to lowercase and remove non-alphanumeric characters
  const cleanedStr = textInput.value.toLowerCase().replace(/[^a-z0-9]/gi, '');

  // Check if the cleaned string is the same as its reverse
  const reversedStr = cleanedStr.split('').reverse().join('');
  
  return cleanedStr === reversedStr;
  
}
function checkText(e){
  e.preventDefault();
  // Check if the input field is empty
  if (textInput.value.trim() === '') {
    // Show an alert if empty
    alert('Please input a value');
  }
}
function clearText() {
  textInput.value = '';
}

function result(){
  checkText(event);
  if(isPalindrome()){
    resultMsg.innerText=`${textInput.value} is a palindrome`;
    
  }else{
    resultMsg.innerText=`${textInput.value} is not a palindrome`;
   
  }
  clearText();
}


form.addEventListener('submit', result);
