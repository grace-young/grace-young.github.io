
/*
  Specific javascript for the "other_page.html"
  - loads specific clickable elements defined in 'clickableElements' map
  - loads translations for words in the story
*/

/*
  TODO: create other screen ratios, change svg based on ratio, make english appear under instead of replace
*/

// Ahh osda!
// Ꭰ   ᎣᏍᏓ !
// Ahhhh refreshing.
// Ahh good!

var wordDataList = [["Ahh", "Ꭰ", "Ahh", "page_6/ahhh.wav", "wav"],
                    ["osda!", "ᎣᏍᏓ", "good", "page_6/osda.wav", "wav"]
                    ];

var WORD_DATA_PHONETICS_INDEX = 0;
var WORD_DATA_SYLLABARY_INDEX = 1;
var WORD_DATA_ENG_INDEX = 2;
var WORD_DATA_AUDIO_INDEX = 3;


// ID of element group in SVG --> [syllabary, phonetic, audioFileName, numElems]
var clickableElements = {
    'cup' : ["ᎠᎹ", "ama", "page_5/word_3.wav", 1]
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
Snap.load("images/page_6_tablet.svg", onSVGLoaded ) ;

// Create main audio
var audioElem = createAudioElement("audio-main",
                 "audio/" + "page_6/page_6_story.wav",
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
  var cupSVG = s.select("#cup");
  cupSVG.click(drinkWaterAnimation);
  s.select("#mouth").click(drinkWaterAnimation);
}

function drinkWaterAnimation(){
  var waterSVG = s.select("#water");
    waterSVG.animate({
      "opacity":"0.0"
    }, 2000);
}


