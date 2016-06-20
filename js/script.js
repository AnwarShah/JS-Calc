function appendToDisplay(display, text) {
  display.val( display.val() + text );
};

function clearDisplay() {
  $('.display').val('');
};

function eraseDigit(display) {
  currentText = display.val();
  newText = currentText.slice(0, currentText.length - 1);
  display.val(newText);
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

});