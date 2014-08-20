'use strict';

var Siz = {};

Siz.reverseWords = function(text) {
  //var reverse = Array.prototype.reverse.bind(text);
  //var reversedText = Siz._onWords(text, reverse);

  var toReverse = new Siz._Page(text);
  return toReverse.reverseWords();
}

Siz.shuffleWords = function(text, shuffler) {
  var toShuffle = new Siz._Page(text);
  return toShuffle.shuffleWords(shuffler);
}

Siz.shuffleLines = function(text, shuffler, cpl) {
  var toShuffle = new Siz._Page(text, cpl);
  return toShuffle.shuffleLines(shuffler)
}

// Burroughs methods' args:
//
// text:     the text to be cut up.
//
// cpl:      (optional) the average number of characters per line on the
//           "page" to be cut up. defaults to a random value between 35 
//           and 95.
//
// shuffler: (optional) the function to use to shuffle the pieces of 
//           the "page" after it's been cut into quarters. defaults
//           to Underscore's shuffle(). 

Siz.burSpl = function(text, cpl, shuffler) {
  var toCut = new Siz._Page(text, cpl);
  return toCut.burroughs(shuffler, 'not around words');
}

Siz.burWrd = function(text, cpl, shuffler) {
  var toCut = new Siz._Page(text, cpl);
  return toCut.burroughs(shuffler, 'around words');
}

// non-public; these methods don't present a stable API, so if
// you're an outside developer, depend on them at your own risk

Siz._Page = function(text, charsPerLine) {
  this.text = text;
  this.charsPerLine = charsPerLine;

  if (typeof this.charsPerLine === 'undefined') {
    this.charsPerLine = this.genCharsPerLine();
  }
}

Siz._Page.prototype.genCharsPerLine = function() {
  var CPLs = _.range(35, 95);

  return _.sample(CPLs);
}

Siz._Page.prototype.getWords = function() {
  return this.text.split(' ');
}

Siz._Page.prototype.shuffleWords = function(shuffler) {
  if (typeof shuffler === 'undefined') {
    shuffler = _.shuffle;
  }
  
  return shuffler(this.getWords()).join(' ');
}

Siz._Page.prototype.shuffleLines = function(shuffler) {
  if (typeof shuffler === 'undefined') {
    shuffler = _.shuffle;
  }
  
  return shuffler(this.groupWordsByCharLimit()).join('').trim();
}

Siz._Page.prototype.reverseWords = function() {
  var reversed = this.getWords().reverse();

  return reversed.join(' ');
}

Siz._Page.prototype.halve = function(halver, splitText) {
  if (halver == 'not around words') {
    return this.splitIntoHalfLines(splitText);
  } else if (halver == 'around words') {
    return this.splitIntoHalfLinesAroundWords(splitText);
  } else {
    throw new Error("halve() does not understand " + halver)
  }
}

Siz._Page.prototype.burroughs = function(shuffler, halver) {
  var lines = '';
  var halves = '';
  var quarters = '';
  var shuffled = '';
  var joined = '';
  var splitText = this.getWords();

  if (typeof shuffler === 'undefined') {
    shuffler = _.shuffle;
  }

  halves = this.halve(halver, splitText);

  quarters = Siz._halfLinesIntoQuarters(halves); 

  shuffled = shuffler(quarters);
  joined = Siz._joinQuarters(shuffled); 

  return joined.trim();
}

Siz._Page.prototype.burroughsSplit = function(shuffler) {
  var halver = this.splitIntoHalfLines;

  if (typeof shuffler === 'undefined') {
    shuffler = _.shuffle;
  }

  this.burroughs(shuffler, halver);
}

Siz._Page.prototype.groupWordsByCharLimit = function() {
  var line = "";
  var lines = [];
  var splitStringArr = this.getWords();
  var limit = this.charsPerLine;

  while (splitStringArr.length > 0) {
    line = "";
    while (line.length <= limit) {
      if (splitStringArr.length > 0) {
        line = line + splitStringArr.shift() + ' ';
      } else {
        line = line + ' ';
      }
    }
    lines.push(line);
  }

  return lines;
}

Siz._Page.prototype.splitIntoHalfLines = function() {
  var lines = this.groupWordsByCharLimit();
  var halfLines = [];
  var first = "";
  var second = "";
  var midpoint = 0;

  lines.forEach(function (line) {
    midpoint = Math.ceil(line.length / 2);
    first = line.slice(0, midpoint);
    second = line.slice(midpoint, line.length);

    halfLines.push(first, second);
  })

  return halfLines;
}

Siz._Page.prototype.splitIntoHalfLinesAroundWords = function() {
  var lines = this.groupWordsByCharLimit();
  var halfLines = [];
  var splitLine = [];
  var firstArr = "";
  var secondArr = "";
  var first = "";
  var second = "";
  var midpoint = 0;

  lines.forEach(function (line) {
    splitLine = line.split(' ');
    midpoint = Math.ceil(splitLine.length / 2);
    firstArr = splitLine.slice(0, midpoint);
    secondArr = splitLine.slice(midpoint, line.length);
    first = firstArr.join(' ') + ' ';
    second = secondArr.join(' ');

    halfLines.push(first, second);
  })

  return halfLines;
}


Siz._halfLinesIntoQuarters = function(halfLines) {
  var firstHalf = [];
  var secondHalf = [];
  var firstHalfMid = 0;
  var secondHalfMid = 0;
  var firstQuarter = [];
  var secondQuarter = [];
  var thirdQuarter = [];
  var fourthQuarter = [];

  while (halfLines.length > 0) {
    firstHalf.push(halfLines.shift());
    if (halfLines[0]) {
      secondHalf.push(halfLines.shift());
    }
  }

  firstHalfMid = Math.floor(firstHalf.length / 2);
  secondHalfMid = Math.floor(secondHalf.length / 2);

  firstQuarter = firstHalf.slice(0, firstHalfMid);
  secondQuarter = secondHalf.slice(0, secondHalfMid);
  thirdQuarter = firstHalf.slice(firstHalfMid, firstHalf.length);
  fourthQuarter = secondHalf.slice(secondHalfMid, secondHalf.length);

  return [firstQuarter, secondQuarter, thirdQuarter, fourthQuarter];
}

Siz._joinQuarters = function(quarters) {
  var joined = "";
  var half = [];

  while (quarters.length > 0) {
    half.push(quarters.shift()); 
    half.push(quarters.shift()); 

    while (half[0].length > 0 && half[1].length > 0) {
      joined = joined + half[0].shift();
      joined = joined + half[1].shift();
    }

    half = [];
  }

  return joined;
}
