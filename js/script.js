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

// Returns the next token from a math Expression
function nextToken(mathString) {
  var re = /\+|\-|\*|\/|[0-9]+([.0-9]+)?/;
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
  calculateResult(mathInput);
  // result = calculateResult(mathInput);
  // display.val(result);
};

function calculateResult(mathString) {
  var operandStack = [];
  var operatorStack = [];

  token = nextToken(mathString)
  do{
    if(isOperand(token)){
      if(isEmpty(operatorStack)){
        operandStack.push(token);
      } else {
        if ( isMultiplicationOrDivision(operatorStack.peek()) ){
          leftOperand = operandStack.pop();
          operator = operatorStack.pop();
          result = doMath(leftOperand, token, operator);
          operandStack.push(result);
        } else { // last stacked operator is not * or /
          operandStack.push(token);
        }
      }
    } else { // not operand, i.e. an operator
      operatorStack.push(token);
    }
    console.log("OperatorStack: " + operatorStack);
    mathString = mathString.slice(token.length);
    token = nextToken(mathString);
    console.log("Math Str: " + mathString)
  } while(token != null);

  // after simplification, add or minus the result
  leftOperand = operandStack.pop();
  while(!isEmpty(operandStack)){
    operator = operatorStack.pop();
    rightOperand = operandStack.pop();
    leftOperand = doMath(leftOperand, rightOperand, operator);
  }
  showInDisplay(leftOperand);
  console.log(leftOperand);
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