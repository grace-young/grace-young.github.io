
/*
  Specific javascript for the "other_page.html"
  - loads specific clickable elements defined in 'clickableElements' map
  - loads translations for words in the story
*/

/*
  TODO: create other screen ratios, change svg based on ratio, make english appear under instead of replace
*/

// Gvlielitse osda ginadodagwa akiw’svnv’i.
// ᎬᎵᎡᎵᏤ    ᎣᏍᏓ   ᎩᎾᏙᏓᏆ     ᎠᏈᏒᏅᎢ
// I am thanking you that we “day-ed/spent a whole day” in a good way in my garden.
// Thank you for a nice day in the my garden.

var wordDataList = [["Gvlielitse", "ᎬᎵᎡᎵᏤ", "I am thanking you", "page_7/word_1.wav", "wav"],
                    ["osda", "ᎣᏍᏓ", "good way", "page_7/word_2.wav", "wav"],
                    ["ginadodagwa", "ᎩᎾᏙᏓᏆ", "we 'day-ed/spent a whole day'", "page_7/word_3.wav", "wav"],
                    ["akiw’svnv’i.", "ᎠᏈᏒᏅᎢ", "in my garden", "page_7/word_4.wav", "wav"]
                    ];

var WORD_DATA_PHONETICS_INDEX = 0;
var WORD_DATA_SYLLABARY_INDEX = 1;
var WORD_DATA_ENG_INDEX = 2;
var WORD_DATA_AUDIO_INDEX = 3;

var SUN_SET_NEEDS_TO_HAPPEN = true;


// ID of element group in SVG --> [syllabary, phonetic, audioFileName, numElems]
var clickableElements = {
    'water' : ["ᎠᎹ", "ama", "page_5/word_3.wav", 1],
    'tree' : ["ᏡᎬ", "tlugv", "", 4],
    'cucumber' : ["ᎦᎦᎹ", "gagama", "page_2/word_4.wav", 2],
    'tomato' : ["ᎤᎾᎫᎯᏍᏗ", "unaguhisdi", "page_3/unaguhisdi.wav", 1],
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
Snap.load("images/page_7_tablet.svg", onSVGLoaded ) ;

// Create main audio
var audioElem = createAudioElement("audio-main",
                 "audio/" + "page_7/page_7_story.wav",
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

  loadAnimations();
}

function loadAnimations(){
  var sunSVG = s.select("#sun");
  sunSVG.click(sunsetAnimation);
}

function sunsetAnimation(){
  if(SUN_SET_NEEDS_TO_HAPPEN){
    // change sun color
    var sunSVG = s.select("#sun");
    sunSVG.animate({
        "fill":"#FEBD25"
      }, 
      2500, // -- duration 
      moveSunDown // -- set sun after it has changed color
    );

    s.select("#sky").animate({
        "fill":"#AF93DD"
      }, 
      2000, // -- duration 
       changeCloudColors // -- set sun after it has changed color
    );

    SUN_SET_NEEDS_TO_HAPPEN = true;
  }
}

function moveSunDown(){
    var sunSVG = s.select("#sun");
    var orgX = sunSVG.node.getBoundingClientRect().x;
    var orgY = sunSVG.node.getBoundingClientRect().y;
    var targetSVG = s.select("#sun_target");
    var targetY = targetSVG.node.getBoundingClientRect().y;
    var targetX = targetSVG.node.getBoundingClientRect().x;

    sunSVG.animate({
      transform:'t' + 0 + ',' + (( targetY - orgY)) + 's.5,.5'} 
      , 6000,
      mina.linear);
}

function changeCloudColors(){
  s.select("#cloud1").animate({
        "fill":"#DDA7FA"
      }, 
      2500, // -- duration 
    );
}

