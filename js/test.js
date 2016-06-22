function nextToken(mathString) {
  var re = /[\+|\-]?[0-9]?([.0-9]+)(([\*|\/])[\+|\-]?[0-9]+([.0-9]+)?)?/;
  var result = mathString.match(re);
  return (result !== null) ? result[0] : null;
}

exp = '3*32.5+32-3'

token = nextToken(exp);
result = '';
while(token !== null){
  console.log("Token: " + token)
  result += token;
  console.log(eval(result));
  exp = exp.slice(token.length);
  token = nextToken(exp)
}