
/*
  Specific javascript for the "page_1.html"
  - loads specific clickable elements defined in 'clickableElements' map
  - loads translations for words in the story
*/

// Hia Selu, sidanelv unihwisvnv’i edoha. 
// ᎯᎠ ᏎᎷ , ᏏᏓᏁᎸ     ᎤᏂᏫᏒᏅᎢ
// This Selu family where they plant she is at.


var wordDataList = [["Hia", "ᎯᎠ", "This", "page_1/hia.wav", "wav"],
 ["Selu,", "ᏎᎷ", "Selu,", "page_1/selu.wav", "wav"],
   ["sidanelv", "ᏏᏓᏁᎸ", "family", "page_1/sidanelv.wav", "wav"],
    ["unihwisvnv’i", "ᎤᏂᏫᏒᏅᎢ", "where they plant at", "page_1/unihwisvnvi.wav", "wav"],
     ["edoha", "ᎡᏙᎭ", "she is at", "page_1/edoha.wav", "wav"]];

var WORD_DATA_PHONETICS_INDEX = 0;
var WORD_DATA_SYLLABARY_INDEX = 1;
var WORD_DATA_ENG_INDEX = 2;
var WORD_DATA_AUDIO_INDEX = 3; // audio is link to file in audio folder
var WORD_DATA_AUDIO_TYPE_INDEX = 4; // audio is link to file in audio folder


// ID of element group in SVG --> [syllabary, phonetic, audioFileName, numElems]
var clickableElements = {
  'lettuce' : ["ᎪᏍᏓᎩᏍᏗ", "gosdagisdi", "page_4/word_2.wav", 3],
  'tree' : ["ᏡᎬ", "tlugv", "", 5],
  'tomato' : ["ᎤᎾᎫᎯᏍᏗ", "unaguhisdi", "page_3/unaguhisdi.wav", 2],
  'cucumber' : ["ᎦᎦᎹ", "gagama", "page_2/word_4.wav", 3],
  'water' : ["ᎠᎹ", "ama", "page_5/word_3.wav", 1],
  'selu' : ["ᏎᎷ", "Selu,", "page_1/selu.wav", 1]
}
var RESOURCE_DATA_SYLLABARY_INDEX = 0;
var RESOURCE_DATA_PHONETICS_INDEX = 1;

var SELU_ANIMATED = false;

var s = Snap("#interactive-area");

var fullPageHeight = document.documentElement.clientHeight;
var fullPageWidth = document.documentElement.clientWidth;
var widthHeightRatio = fullPageWidth/fullPageHeight;
var navBarHeight = document.getElementById('navbar').clientHeight;

var imageHeight = fullPageHeight - navBarHeight;

s.attr({ viewBox: "0 0 " + fullPageWidth + " " + imageHeight });

/* This loads the image that fits an iPad */
Snap.load("images/page_1_tablet.svg", onSVGLoaded ) ;

// Create main audio
var audioElem = createAudioElement("audio-main",
                 "audio/" + "page_1/page_1_story.wav",
                 "audio/" + "wav");
      document.getElementById('audio-elements').appendChild(audioElem);

// Add the story text
var textDiv = document.getElementById('story-text-div');
for (var i = 0; i < wordDataList.length; i++){
  var wordDiv = createWordDiv(i, wordDataList[i][WORD_DATA_SYLLABARY_INDEX]);
  textDiv.appendChild(wordDiv);

  // add word audio
  var audioElem = createAudioElement("audio-" + i,
                 "audio/" + wordDataList[i][WORD_DATA_AUDIO_INDEX],
                 "audio/" + wordDataList[i][WORD_DATA_AUDIO_TYPE_INDEX]);
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
  //    svgElem.click(svgImageClicked)
      svgElem.node.classList.add("clickable-g"); 
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
var seluSVG = s.select("#selu");
  seluSVG.click(moveSeluToTarget);
}

function moveSeluToTarget(){
  if(!SELU_ANIMATED){
  var seluSVG = s.select("#selu");
    var orgX = seluSVG.node.getBoundingClientRect().x;
    var orgY = seluSVG.node.getBoundingClientRect().y;
    var targetSVG = s.select("#selu_target");
    var targetY = targetSVG.node.getBoundingClientRect().y;
    var targetX = targetSVG.node.getBoundingClientRect().x;
    seluSVG.animate({
      transform:'t' + ( targetX - orgX)*.8 + ',' + ((orgY - targetY))*.8 + 's.75,.75'} 
      , 2000,     mina.easein);
    SELU_ANIMATED = true;
  }
}

