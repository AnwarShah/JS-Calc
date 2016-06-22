Array.prototype.peek = function(){
  return this[this.length-1]; // return the last element
};

function appendToDisplay(display, text) {
  display.val( display.val() + text );
};

function showInDisplay(text) {
  $('.display').val(text);
}

function clearDisplay() {
  $('.display').val('');
};

function eraseDigit(display) {
  currentText = display.val();
  newText = currentText.slice(0, currentText.length - 1);
  display.val(newText);
};

// Returns the next evaluatable compound expression
// Example: -32*32+3
// First Token: -32*32, Second Token: +3
function nextToken(mathString) {
  var re = /[\+|\-]?[0-9]?([.0-9]+)(([\*|\/])[\+|\-]?[0-9]+([.0-9]+)?)?/;
  var result = mathString.match(re);
  return (result !== null) ? result[0] : null;
}

function isOperator(str) {
  return str.match(/\+|\-|\*|\//) !== null
}

function isOperand(str) {
  return !isOperator(str); // if str is not operator, it is operand
}

function isMultiplicationOrDivision(operatorToken) {
  return operatorToken.match(/\*|\//) !== null
}

function isEmpty(arr) {
  return arr.length === 0;
}

function doMath(leftOperand, rightOperand, operator) {
  return eval(leftOperand + operator + rightOperand);
}

function solveMath(display) {
  mathInput = display.val();
  result = calculateResult(mathInput);
  display.val(result);
};

function calculateResult(mathString) {
  token = nextToken(mathString);
  result = '';
  while(token !== null){
    console.log(token);
    result = eval(result + token); // old result + new compound token
    mathString = mathString.slice(token.length);
    token = nextToken(mathString);
  }
  return result;
};

$( document ).ready(function() {
  var display = $('.display');

  $('.digit').click(function(e) {
    appendToDisplay(display, $(this).text());
  });

  $('.operator').click(function(e) {
    appendToDisplay(display, $(this).text());
  });

  $('#ac').click(function(e) {
    clearDisplay();
  });

  $('#ce').click(function(e) {
    eraseDigit(display);
  });

  // solve the math now
  $('#equal').click(function(e) {
    solveMath(display);
  });

});