const lengthTxt = 18;
const txt = 'Проверка на колическтво символов';

function isValid (str, lengthStr) {
  return str.length <= lengthStr;
}

isValid(txt, lengthTxt);

function isPalindrome (str) {
  let newStr = str.toLowerCase();
  str = newStr;
  newStr = str.replaceAll(' ', '');
  str = newStr;
  for (let i = 0; i <= str.length / 2; i++) {
    if (str[i] !== str[(str.length - 1) - i]) {
      return false;
    }
  }
  return true;
}

isPalindrome(txt);
