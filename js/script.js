function extractSnippets(searchResult) {
  var html = '';

  var page, title, snippet;

  for (var pageid in searchResult) {
    page = searchResult[pageid];
    title = page.title;
    snippet = page.extract;
    html += ('<a class="divLink" href="http://en.wikipedia.org/?curid='+pageid+'" target="_blank"><div class="preview"><h3>'+ title + '</h3><p>' + snippet + '</p></div></a>');
  }
  return html;
};

function fetchData(searchedTerm) {
  return $.ajax({
    url: 'http://en.wikipedia.org/w/api.php',
    data: {
      action: 'query',
      prop: 'extracts',
      generator: 'search',
      gsrsearch: searchedTerm,
      exsentences: 1,
      exlimit: 10,
      exintro: 1,
      explaintext: 1,
      gsrnamespace: 0,
      gsrlimit: 10,
      format: 'json',
    },
    dataType: 'jsonp',
    success: function (x) {
      console.log(x);

      var html = extractSnippets(x.query.pages);
      $('div#result').html(html).show().fadeIn('fast');
    }
  })
  .done(
    function () {
      $("a.divLink")
      .mouseenter(function () {
        $(this).addClass('active');
      })
      .mouseleave(function () {
        $(this).removeClass('active');
      });
    }
  );
};

$(document).ready(function () {

  var inputDiv = $('div#input');
  var resultDiv = $('div#result');
  var inputField = $('form#inputForm').find('input:first');

  inputDiv.find('form#inputForm').submit(function (e) {
    e.preventDefault();
    var value = inputField.val();
    fetchData(value);
  });

  inputDiv.find('button#clearBtn').on('click', function () {
    resultDiv.html('');
    inputField.val('');
    resultDiv.fadeOut('slow');
  });
});
