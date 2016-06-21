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

function solveMath(display) {
  mathInput = display.val();
  calculateResult(mathInput);
  // result = calculateResult(mathInput);
  // display.val(result);
};

function calculateResult(mathString) {
  token = nextToken(mathString)
  do{
    showInDisplay(token);
    console.log(token);
    mathString = mathString.slice(token.length);
    token = nextToken(mathString);
    console.log("Math Str: " + mathString)
  } while(token != null);
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