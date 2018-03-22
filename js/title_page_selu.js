
/*
  Specific javascript for the "other_page.html"
  - loads specific clickable elements defined in 'clickableElements' map
  - loads translations for words in the story
*/

/*
  TODO: create other screen ratios, change svg based on ratio, make english appear under instead of replace
*/

var WORD_DATA_PHONETICS_INDEX = 0;
var WORD_DATA_SYLLABARY_INDEX = 1;
var WORD_DATA_ENG_INDEX = 2;
var WORD_DATA_AUDIO_INDEX = 3;


// ID of element group in SVG --> [syllabary, phonetic, audioFileName, numElems]
var clickableElements = {
  'selu' : ["ᏎᎷ", "Selu", "page_4/word_4.wav", 1],
  //'garden' : ["","Uhwisvnv’i", ]
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
Snap.load("images/title_page.svg", onSVGLoaded ) ;

// Create audio that plays title
var audioElem = createAudioElement("audio-main",
                 "audio/" + "selu_uhwisvnvi.wav",
                 "audio/" + "wav");
      document.getElementById('audio-elements').appendChild(audioElem);

if (window.innerHeight > window.innerWidth) {
  window.alert("Rotate your device! This website should be used in landscape mode ");
   window.confirm("Rotate your device! This website should be used in landscape mode ");
  console.log("should have alerted");
} else {
  console.log("landscape");
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
    var audioElem = createAudioElement(clickableElem + "-audio",
                 "audio/" + clickableElements[clickableElem][2], "audio/wav");
    document.getElementById('audio-elements').appendChild(audioElem);
  }
}




