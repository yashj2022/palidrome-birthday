var showOutput = document.querySelector("#show-output");
var birthdayInput = document.querySelector("#birthday-input");
var showBtn = document.querySelector("#show-btn");

function convertDateToString(date) {
  var dateStr = {
    day: "",
    month: "",
    year: "",
  };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}
function reverseStr(str) {
  var rev = str.split("").reverse().join("");
  return rev;
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

function getAllDateFormates(date) {
  var dateStr = convertDateToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function CheckPalindromeForAllDateFormats(date) {
  var listOfPalindromes = getAllDateFormates(date);
  var flag = false;
  for (let i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
}

function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPalindrome = CheckPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      //doubut
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

var date = {
  day: 2,
  month: 11,
  year: 2020,
};

function clickHandler() {
  console.log("i have clicked");
  var birthdayStr = birthdayInput.value;
  if (birthdayStr === "") {
    showOutput.innerText = `Please choose a date... `;
    showOutput.style.color = "red";
  }
  if (birthdayStr !== "") {
    var listOfDate = birthdayStr.split("-");
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };
    console.log(listOfDate);
    console.log(date);
    var isPalindrome = CheckPalindromeForAllDateFormats(date);
    console.log(isPalindrome);
    if (isPalindrome) {
      showOutput.innerText = "Yay! Your birthday is a Palindrome 🎂🎉🥳";
    } else {
      var [counter, nextDate] = getNextPalindromeDate(date);
      showOutput.innerText = `The Next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} , You missed it by ${counter} days!`;
      showOutput.style.color = "blue";
    }
  }
}

showBtn.addEventListener("click", clickHandler);