
/*
  Specific javascript for the "other_page.html"
  - loads specific clickable elements defined in 'clickableElements' map
  - loads translations for words in the story
*/

/*
  TODO: create other screen ratios, change svg based on ratio.
*/

var wordDataList = [["Siyo", "ᏏᏲ", "Hello", "fishbubbles.m4a"],["ahwisvdiyi", "ᎠᏫᏒᏗᏳ", "garden", "fishbubbles.m4a"]];

var WORD_DATA_PHONETICS_INDEX = 0;
var WORD_DATA_SYLLABARY_INDEX = 1;
var WORD_DATA_ENG_INDEX = 2;
var WORD_DATA_AUDIO_INDEX = 3;


// ID of element group in SVG --> [syllabary, phonetic, audioFileName, numElems]
var clickableElements = {
  'lettuce' : ["ᎠᎪᏍᏓᎩᏍᏗ", "agosdagisdi", "meow1.wav", 3],
  'cloud' : ["ᎤᎶᎩᎵ", "ulogili", "meow1.wav", 2],
  'tree' : ["ᏡᎬ", "tlugv", "meow1.wav", 3],
  'tomatoplant' : ["ᏔᎹᏟ", "tamahli", "meow1.wav", 2]
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
Snap.load("images/page_1_scene_cucmbers_slice.svg", onSVGLoaded ) ;

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
    var audioElem = createAudioElement(clickableElem + "-audio",
                 "audio/" + clickableElements[clickableElem][2], "audio/wav");
    document.getElementById('audio-elements').appendChild(audioElem);
  }
}


