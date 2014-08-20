var assert = chai.assert;

Siz._test = {};

Siz._test.toCutUp = "In certain lights that mark on the wall seems actually to project from the wall. Nor is it entirely circular. I cannot be sure, but it seems to cast a perceptible shadow, suggesting that if I ran my finger down that strip of the wall it would, at a certain point, mount and descend a small tumuls, a smooth tumulus like those barrows on the South Downs which are, they say, either tombs or camps. Of the two I should prefer them to be tombs, desiring melancholy like most English people, and finding it natural at the end of a walk to think of the bones stretched beneath the turf...";

suite('Burroughs', function() {
  function shuffler(arr) {
    var shuffArr = [];

    shuffArr[0] = arr[1];
    shuffArr[1] = arr[0];
    shuffArr[2] = arr[3];
    shuffArr[3] = arr[2];

    return shuffArr;
  }

    var cpl = 60;

  test('#burSpl - cuts up and rearranges a string as if with scissors on a page', function() {
    var expected = "e wall seems actually to project In certain lights that mark on thly circular. I cannot be sure, from the wall. Nor is it entireble shadow, suggesting that if but it seems to cast a percepti the wall it would, at a certain I ran my finger down that strip of tumuls, a smooth tumulus like point, mount and descend a smalls which are, they say, either those barrows on the South Downould prefer them to be tombs, tombs or camps. Of the two I shnglish people, and finding it desiring melancholy like most E think of the bones stretched natural at the end of a walk to                              beneath the turf...";

    var cutUp = Siz.burSpl(Siz._test.toCutUp, cpl, shuffler);

    assert.equal(cutUp, expected);
  });

  test('#burWrd - cuts up and rearranges a string respecting word breaks', function() {
    var expected = "wall seems actually to project In certain lights that mark on the circular. I cannot be sure, from the wall. Nor is it entirely perceptible shadow, suggesting that if but it seems to cast a the wall it would, at a certain I ran my finger down that strip of tumuls, a smooth tumulus like point, mount and descend a small which are, they say, either those barrows on the South Downs should prefer them to be tombs, tombs or camps. Of the two I people, and finding it desiring melancholy like most English to think of the bones stretched natural at the end of a walk                      beneath the turf...";

    var cutUp = Siz.burWrd(Siz._test.toCutUp, cpl, shuffler);

    assert.equal(cutUp, expected);
  }); 
});

suite('Reverse', function() {
  test('#reverseWords', function() {
    var expected = "turf... the beneath stretched bones the of think to walk a of end the at natural it finding and people, English most like melancholy desiring tombs, be to them prefer should I two the Of camps. or tombs either say, they are, which Downs South the on barrows those like tumulus smooth a tumuls, small a descend and mount point, certain a at would, it wall the of strip that down finger my ran I if that suggesting shadow, perceptible a cast to seems it but sure, be cannot I circular. entirely it is Nor wall. the from project to actually seems wall the on mark that lights certain In";

    var cutUp = Siz.reverseWords(Siz._test.toCutUp);

    assert.equal(cutUp, expected);
  });

  test('#reverseLines', function() {
    var expected = 'of the bones stretched beneath the turf...              people, and finding it natural at the end of a walk to think prefer them to be tombs, desiring melancholy like most English are, they say, either tombs or camps. Of the two I should smooth tumulus like those barrows on the South Downs which at a certain point, mount and descend a small tumuls, a that if I ran my finger down that strip of the wall it would, be sure, but it seems to cast a perceptible shadow, suggesting project from the wall. Nor is it entirely circular. I cannot In certain lights that mark on the wall seems actually to';

    var cutUp = Siz.reverseLines(Siz._test.toCutUp, 55);

    assert.equal(cutUp, expected);
  });
});

suite('Shuffle', function() {
  function shuffler(arr) {
    var shuffArr = [];
    var shuffList = [93, 57, 68, 10, 70, 17, 77, 84, 42, 38, 37, 89, 101, 6, 91, 78, 50, 58, 60, 53, 96, 103, 16, 13, 11, 106, 83, 80, 24, 21, 31, 52, 107, 94, 73, 29, 59, 62, 66, 79, 27, 36, 76, 47, 71, 45, 25, 14, 56, 85, 86, 92, 108, 90, 51, 82, 88, 3, 48, 5, 102, 100, 20, 33, 44, 4, 69, 2, 99, 97, 49, 74, 1, 81, 7, 8, 39, 0, 35, 75, 43, 98, 55, 34, 63, 22, 105, 46, 64, 19, 40, 26, 18, 30, 23, 95, 72, 12, 67, 41, 54, 15, 32, 65, 87, 28, 9, 104, 61, 109];
    var index = 0;

    for (var n = 0; n < shuffList.length; n++) {
      index = shuffList[n];
      shuffArr[n] = arr[index];
    }

    return shuffArr;
  }

  test('#shuffleWords', function() {
    var expected = 'it a are, to say, it two tombs, of finger my English to the and I point, smooth like descend the of is the project stretched be prefer but cannot shadow, and beneath natural or a tumulus barrows Downs should to ran the at either it it wall. tumuls, desiring melancholy finding the people, mount to most that a on think walk I that wall mark they lights a end certain camps. certain them wall seems down In I Of the of small if on be bones would, the circular. that seems entirely perceptible sure, at tombs from which strip a Nor suggesting South like cast actually the those turf...';

    var cutUp = Siz.shuffleWords(Siz._test.toCutUp, shuffler);

    assert.equal(cutUp, expected);
  });

  test('#shuffleLines', function() {
    var expected = 'tombs or camps. Of the two I should prefer them to be tombs, I ran my finger down that strip of the wall it would, at a certain those barrows on the South Downs which are, they say, either point, mount and descend a small tumuls, a smooth tumulus like but it seems to cast a perceptible shadow, suggesting that if from the wall. Nor is it entirely circular. I cannot be sure, desiring melancholy like most English people, and finding it natural at the end of a walk to think of the bones stretched In certain lights that mark on the wall seems actually to project beneath the turf...';

    var cutUp = Siz.shuffleLines(Siz._test.toCutUp, shuffler, 60);

    assert.equal(cutUp, expected);
  })
});
