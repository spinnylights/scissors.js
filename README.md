# Scissors.js

Scissors.js is a library for making literary cut-ups, à la [William Burroughs](http://www.writing.upenn.edu/~afilreis/88v/burroughs-cutup.html) or [Tristan Tzara](http://www.in-vacua.com/tzara.shtml).

To install, clone this repo or:

```bash
wget https://github.com/zaaanderson/scissors.js/raw/master/scissors-min.js
```

then include scissors-min.js in your project.

All the functions are stored in a global object called `Siz`. To use, say, `shuffleWords()`, call `Siz.shuffleWords("the string to shuffle")`.

## Functions

* [reverseWords()](#reverseWords)
* [shuffleWords()](#scrambleWords)
* [reverseLines()](#reverseLines)
* [shuffleLines()](#shuffleLines)
* [burSpl()](#burroughsSplit)
* [burWrd()](#burroughsWord)

### reverseWords(*string*)

Returns *string* with its words reversed. Splits on spaces.

#### Example:

> It is so long since I first took opium that if it had been a trifling incident in my life I might have forgotten its date; but cardinal events are not to be forgotten, and from circumstances connected with it I remember that it must be referred to the autumn of 1804.

gives:

> 1804\. of autumn the to referred be must it that remember I it with connected circumstances from and forgotten, be to not are events cardinal but date; its forgotten have might I life my in incident trifling a been had it if that opium took first I since long so is It

[&uarr; top](#functions)

### shuffleWords(*string*)

Returns *string* with its words in a random order. Splits on spaces.

#### Example:

>Immured in Heaven!  
>What a cell!  
>Let every Bondage be,  
>Thou sweetest of the Universe,  
>Like that which ravished thee!  

could give

>be,  
>of in that a Thou Universe,  
>every ravished the What Let cell!  
>Like sweetest Bondage which Heaven!  
>thee! Immured  

[&uarr; top](#functions)

### reverseLines(*string*)

Formats the string as if it were laid out on a page, then reverses the order of the "lines". Respects word breaks.

#### Example:

[&uarr; top](#functions)

### shuffleLines(*string*)

Formats the string as if it were laid out on a page, then shuffles the order of the "lines". Respects word breaks.

#### Example:

[&uarr; top](#functions)

### burSpl(*string*)

Formats the string as if it were laid out on a page, then cuts the virtual page into four equally-sized pieces, shuffles the pieces, and stitches them back together. Doesn't respect word breaks.

This is an accurate reproduction of the Burroughs-Gysin cut-up method. Burroughs liked the way that split-up words would be combined to make new words.

#### Example:

[&uarr; top](#functions)

### burWrd(*string*)

Formats the string as if it were laid out on a page, then cuts the virtual page into four equally-sized pieces, shuffles the pieces, and stitches them back together. Does respect word breaks.

#### Example:

[&uarr; top](#functions)
