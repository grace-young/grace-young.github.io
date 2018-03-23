
/*
  Specific javascript for the "other_page.html"
  - loads specific clickable elements defined in 'clickableElements' map
  - loads translations for words in the story
*/

/*
  TODO: create other screen ratios, change svg based on ratio, make english appear under instead of replace
*/

// Gagama uduli(ha) ugisdiyi. Gagama Hiya!
// ᎦᎦᎹ ᎤᏚᎵ   ᎤᎩᏍᏗᏱ. ᎦᎦᎹ ᎯᏯ !
// Cucumber she wants to eat {S/N}  Cucumber You pick it up over there / You pick it up!


var wordDataList = [["Gagama", "ᎦᎦᎹ", "Cucumber", "page_2/word_1.wav", "wav"],
              ["uduli(ha)", "ᎤᏚᎵ", "she wants", "page_2/word_2.wav", "wav"],
              ["ugisdiyi.", "ᎤᎩᏍᏗᏱ", "to eat peeled & sliced {S/N}.", "page_2/word_3.wav", "wav"],
              ["Gagama", "ᎦᎦᎹ", "Cucumber", "page_2/word_4.wav", "wav"],
              ["hiya!", "ᎯᏯ", "You pick it {long/rigid} up!", "page_2/word_5.wav", "wav"]];

var WORD_DATA_PHONETICS_INDEX = 0;
var WORD_DATA_SYLLABARY_INDEX = 1;
var WORD_DATA_ENG_INDEX = 2;
var WORD_DATA_AUDIO_INDEX = 3;


// ID of element group in SVG --> [syllabary, phonetic, audioFileName, numElems]
var clickableElements = {
  'lettuce' : ["ᎪᏍᏓᎩᏍᏗ", "gosdagisdi", "page_4/word_2.wav", 3],
  'tomato' : ["ᎤᎾᎫᎯᏍᏗ", "unaguhisdi", "page_3/unaguhisdi.wav", 5],
  'cucumber' : ["ᎦᎦᎹ", "gagama", "page_2/word_4.wav", 3],
  'selu' : ["ᏎᎷ", "Selu", "page_4/word_4.wav", 1],
}
var RESOURCE_DATA_SYLLABARY_INDEX = 0;
var RESOURCE_DATA_PHONETICS_INDEX = 1;


var s = Snap("#interactive-area");

var fullPageHeight = document.documentElement.clientHeight;
var fullPageWidth = document.documentElement.clientWidth;
var widthHeightRatio = fullPageWidth/fullPageHeight;
var navBarHeight = document.getElementById('navbar').clientHeight;

var imageHeight = fullPageHeight - navBarHeight;

s.attr({ viewBox: "0 0 " + fullPageWidth + " " + imageHeight });

/* This loads the image that fits an iPad */
Snap.load("images/page_2_tablet.svg", onSVGLoaded ) ;

// Create main audio
var audioElem = createAudioElement("audio-main",
                 "audio/" + "page_2/page_2_story.wav",
                 "audio/" + "wav");
      document.getElementById('audio-elements').appendChild(audioElem);

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


function onSVGLoaded( f ){ 
   // add whole fragment to the SVG
   s.append( f );

   
   // add the correct class to SVG elements that should be clickable
   for(var clickableElem in clickableElements){
    if(clickableElements[clickableElem][3] > 1){
      for(var i = 1; i <= clickableElements[clickableElem][3]; i++){
        // make each element clickable
        var lookingForID = clickableElem + i;
        var svgElem = s.select("#" + lookingForID);    
        svgElem.node.classList.add("clickable-g"); 
      }
    } else {
      // make that one element clickable
      var svgElem = s.select("#" + clickableElem);
      svgElem.node.classList.add("clickable-g")    
    }
    // add audio for this group type
    var audioElem = createAudioElement(clickableElem + "-audio",
                 "audio/" + clickableElements[clickableElem][2], "audio/wav");
    document.getElementById('audio-elements').appendChild(audioElem);
  }
  loadClickableElementsInSVG();
  loadAnimations();
}

function loadAnimations(){
  // set gagama animations
  for(var i=1; i <= clickableElements["cucumber"][3]; i++){
    // get from s.
    var elemID = "cucumber" + i;

    $('#' + elemID).on('click', cucumberClicked);
  }
}

function getRandomNumber(){
  return Math.floor((Math.random() * 10) + 1);
}

var cucumberClicked = function(event) {

  var vegID = event.currentTarget.id;
  var vegNumber = parseInt(vegID.substr(vegID.length - 1));
  var vegElem = s.select("#" + vegID);
  var vegX = vegElem.node.getBoundingClientRect().x;
  var vegY = vegElem.node.getBoundingClientRect().y;

  var handSVG = s.select("#hand_target");
  var handX = handSVG.node.getBoundingClientRect().x;
  var handY = handSVG.node.getBoundingClientRect().y;

  vegElem.animate({
      transform: 't' + (handX - vegX-vegNumber*getRandomNumber()) + ',' + (handY-vegY+getRandomNumber()*3)
    }, 1500, 
    mina.easein);
}

