var chance = require('chance').Chance();

var LowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
var UpperCase = LowercaseLetters.toUpperCase();
var Digits = '0123456789';
var Symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

function replaceRandomChar(letter, word, pos) {
  if (!pos) {
    pos = chance.integer({min: 0, max: word.length - 1})
  }
  return word.substr(0, pos) + letter + word.substr(pos + 1);
}

function hasCaps(str) {
  return str.toLowerCase() != str;
}

function hasNumerals(str) {
  return /\d/.test(str);
}

function hasSymbols(str) {
  return Symbols.split('').some(function(sym) {
    return str.indexOf(sym) >= 0;
  });
}


function pwgen(pw_length, num_pw, no_numerals, no_capitalize, 
               capitalize, numerals, no_symbols, symbols, 
               allowed_symbols) {
  var pw_length = pw_length || 20;
  var num_pw = num_pw || 1;

  var letters = LowercaseLetters;
  if (!no_capitalize) {
    letters += UpperCase;
  }
  if (!no_numerals) {
    letters += Digits;
  }
  if (!no_symbols) {
    if (allowed_symbols) {
      letters += allowed_symbols;
    } else {
      letters += Symbols;
    }
  }

  var passwords = []

  while (passwords.length < +num_pw) {
    var password = '';
    for (var i = 0; i < pw_length; i++) {
      password += chance.pick(letters);
    }
    if (capitalize && !hasCaps(password)) {
      password = replaceRandomChar(chance.pick(UpperCase), password);
    }
    if (numerals && !hasNumerals(password)) {
      password = replaceRandomChar(chance.pick(Digits), password);
    }
    if (symbols && hasSymbols(password)) {
      password = replaceRandomChar(chance.pick(Symbols), password);
    }
    passwords.push(password);
  }

  if (passwords.length === 1) {
    return passwords[0];
  }
  return passwords;
}

module.exports = pwgen;
