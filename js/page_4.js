
/*
  Specific javascript for the "other_page.html"
  - loads specific clickable elements defined in 'clickableElements' map
  - loads translations for words in the story
*/

/*
  TODO: create other screen ratios, change svg based on ratio, make english appear under instead of replace
*/

// E’la! Gosdagisdi tsutseli Selu, Tsisdu degahyagi’a. Tsisdu Hwihnagi!
// ᎡᎳ ! ᎪᏍᏓᎩᏍᏗ  ᏧᏤᎵ  ᏎᎷ ,       ᏥᏍᏚ     ᏕᎦᏯᎩᎠ .  ᏥᏍᏚ  ᏫᎾᎩ !
// Oh no! Lettuce hers (plural) Selu, Rabbit is eating them (flexible). Rabbit (You) pick up over there (animate/flexible)!


var wordDataList = [["E’la!", "ᎡᎳ", "Oh no!", "page_4/word_1.wav", "wav"],
                    ["Gosdagisdi", "ᎪᏍᏓᎩᏍᏗ", "Lettuce", "page_4/word_2.wav", "wav"],
                    ["tsutseli", "ᏧᏤᎵ", "hers (plural)", "page_4/word_3.wav", "wav"],
                    ["Selu,", "ᏎᎷ", "Selu,", "page_4/word_4.wav", "wav"],
                    ["Tsisdu", "ᏥᏍᏚ", "Rabbit", "page_4/word_5.wav", "wav"],
                    ["degahyagi’a.", "ᏕᎦᏯᎩᎠ", "is eating them (flexible).", "page_4/word_6.wav", "wav"],
                    ["Tsisdu", "ᏥᏍᏚ", "Rabbit", "page_4/word_7.wav", "wav"],
                    ["Hwihnagi!", "ᏫᎾᎩ", "(You) pick up over there (animate/flexible)!", "page_4/word_8.wav", "wav"]
                    ];

var WORD_DATA_PHONETICS_INDEX = 0;
var WORD_DATA_SYLLABARY_INDEX = 1;
var WORD_DATA_ENG_INDEX = 2;
var WORD_DATA_AUDIO_INDEX = 3;

var RABBIT_NEEDS_TO_ANIMATE = true;


// ID of element group in SVG --> [syllabary, phonetic, audioFileName, numElems]
var clickableElements = {
  'lettuce' : ["ᎪᏍᏓᎩᏍᏗ", "gosdagisdi", "page_4/word_2.wav", 3],
  'rabbit' : ["ᏥᏍᏚ", "tsisdu", "page_4/word_5.wav", 1],
  'cucumber' : ["ᎦᎦᎹ", "gagama", "page_2/word_4.wav", 1],
  'selu' : ["ᏎᎷ", "Selu", "page_4/word_4.wav", 1]
}
var RESOURCE_DATA_SYLLABARY_INDEX = 0;
var RESOURCE_DATA_PHONETICS_INDEX = 1;


var s = Snap("#interactive-area");

main();

function main(){
  var fullPageHeight = document.documentElement.clientHeight;
  var fullPageWidth = document.documentElement.clientWidth;
  var widthHeightRatio = fullPageWidth/fullPageHeight;
  var navBarHeight = document.getElementById('navbar').clientHeight;

  var imageHeight = fullPageHeight - navBarHeight;

  s.attr({ viewBox: "0 0 " + fullPageWidth + " " + imageHeight });

  /* This loads the image that fits an iPad */
  Snap.load("images/page_4_tablet.svg", onSVGLoaded ) ;

  // Create main audio
  var audioElem = createAudioElement("audio-main",
                   "audio/" + "page_4/page_4_story.wav",
                   "audio/" + "wav");
        document.getElementById('audio-elements').appendChild(audioElem);

  var munchAudio = createAudioElement("audio-munch",
                   "audio/" + "lettuce_short.wav",
                   "audio/" + "wav");
        document.getElementById('audio-elements').appendChild(munchAudio);

  // Add the story text
  var textDiv = document.getElementById('story-text-div');
  for (var i = 0; i < wordDataList.length; i++){
    var wordDiv = createWordDiv(i, wordDataList[i][WORD_DATA_SYLLABARY_INDEX]);
    textDiv.appendChild(wordDiv);

    // add word audio
    var audioElem = createAudioElement("audio-" + i,
                   "audio/" + wordDataList[i][WORD_DATA_AUDIO_INDEX], "audio/mp4");
        document.getElementById('audio-elements').appendChild(audioElem);
  }
  playMainAudio();
}

function onSVGLoaded( f ){ 
   // add whole fragment to the SVG
   s.append( f );

   
   // add the correct class to SVG elements that should be clickable
   for(var clickableElem in clickableElements){
    if(clickableElements[clickableElem][3] > 1){
      for(var i = 1; i <= clickableElements[clickableElem][3]; i++){
        // make each element clickable
        var svgElem = s.select("#" + clickableElem + i);    
        svgElem.attr({'class': 'clickable-g'});
      }
    } else {
      // make that one element clickable
      var svgElem = s.select("#" + clickableElem);    
      svgElem.attr({'class': 'clickable-g'});
    }
    // add audio for this group type
    if(clickableElements[clickableElem][2].length !== 0){
      var audioElem = createAudioElement(clickableElem + "-audio",
                   "audio/" + clickableElements[clickableElem][2], "audio/wav");
      document.getElementById('audio-elements').appendChild(audioElem);
    }
  }
  loadClickableElementsInSVG();
  loadAnimations();
}

function loadAnimations(){
  // rabbit eating lettuce animation
   var rabbitSVG = s.select("#rabbit");
   var lettuceSVG = s.select("#lettuce3");
   var leafSVG = s.select("#eat_lettuce");
   lettuceSVG.click(eatOtherLettuceAnimation);
   rabbitSVG.click(rabbitEatingLettuceAnimation);
   leafSVG.click(rabbitEatingLettuceAnimation);
   s.select("#arm").click(rabbitEatingLettuceAnimation);
}

function moveRabbit(){
  if(RABBIT_NEEDS_TO_ANIMATE){
    var rabbitSVG = s.select("#rabbit");
    var orgX = rabbitSVG.node.getBoundingClientRect().x;
    var orgY = rabbitSVG.node.getBoundingClientRect().y;

    var targetSVG = s.select("#arm");
    var targetY = targetSVG.node.getBoundingClientRect().y;
    var targetX = targetSVG.node.getBoundingClientRect().x;
    
    rabbitSVG.animate({
      transform:'t' + -(orgX - targetX)*.8 + ',' + -(orgY - targetY)*.8} 
      , 2000,     mina.easein);
    // mouth
    RABBIT_NEEDS_TO_ANIMATE = false;
  }
}

function playMunchSound(){
  document.getElementById("audio-munch").play();
}

function eatOtherLettuceAnimation(){
// eat_lettuce_2
  var leafSVG = s.select("#eat_lettuce_2");
  leafSVG.animate({
      "opacity":"0.0"
    }, 
    1500, // -- duration 
    playMunchSound // -- finished
  );
}


function rabbitEatingLettuceAnimation(){

  // make lettuce fade away --> when click on lettuce? rabbit?
  var leafSVG = s.select("#eat_lettuce");
  playMunchSound();
  leafSVG.animate({
      "opacity":"0.0"
    }, 
    1500, // -- duration 
    moveRabbit // -- finished
    );
}


