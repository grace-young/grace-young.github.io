
/*
  Specific javascript for the "other_page.html"
  - loads specific clickable elements defined in 'clickableElements' map
  - loads translations for words in the story
*/

/*
  TODO: create other screen ratios, change svg based on ratio, make english appear under instead of replace
*/

// Ugahnawa doyi iditsa. Ama atsisdv(’i) (E) Hitlagi! 
// ᎤᎦᎾᏩ   ᏙᏱ ᎢᏗᏣ .  ᎠᎹ  ᎠᏥᏍᏛᎢ   ᎯᏝᎩ
// Warm outside. Water contained You Pick it up {glass = solid}!


var wordDataList = [["Ugahnawa", "ᎤᎦᎾᏩ", "Warm", "page_5/word_1.wav", "wav"],
                    ["doyi iditsa", "ᏙᏱ ᎢᏗᏣ", "outside", "page_5/word_2.wav", "wav"],
                    ["Ama", "ᎠᎹ", "water", "page_5/word_3.wav", "wav"],
                    ["atsisdv(’i),", "ᎠᏥᏍᏛᎢ", "contained", "page_5/word_4.wav", "wav"],
                    ["Hitlagi!", "ᎯᏝᎩ", "You Pick it up {glass = solid}!", "page_5/word_5.wav", "wav"],
                    ];

var WORD_DATA_PHONETICS_INDEX = 0;
var WORD_DATA_SYLLABARY_INDEX = 1;
var WORD_DATA_ENG_INDEX = 2;
var WORD_DATA_AUDIO_INDEX = 3;


// ID of element group in SVG --> [syllabary, phonetic, audioFileName, numElems]
var clickableElements = {
  'lettuce' : ["ᎪᏍᏓᎩᏍᏗ", "gosdagisdi", "page_4/word_2.wav", 3],
  'rabbit' : ["ᏥᏍᏚ", "tsisdu", "page_4/word_5.wav", 1],
  'cucumber' : ["ᎦᎦᎹ", "gagama", "page_2/word_4.wav", 3],
  'sun' : ["ᎢᎦ ᎡᎯ ᏅᏓ", "Iga ehi nvda", "" ,1],
  'tomato' : ["ᎤᎾᎫᎯᏍᏗ", "unaguhisdi", "page_3/unaguhisdi.wav", 2],
  'selu' : ["ᏎᎷ", "Selu", "page_4/word_4.wav", 1],
  'water' : ["ᎠᎹ", "ama", "page_5/word_3.wav", 1],
  'tree' : ["ᏡᎬ", "tlugv", "", 5]
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
  Snap.load("images/page_5_tablet.svg", onSVGLoaded ) ;

  // Create main audio
  var audioElem = createAudioElement("audio-main",
                   "audio/" + "page_5/page_5_story.wav",
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
  // set sun animations
  $('#' + 'sun').on('click', sunClicked); 
  // water
  s.select("#water").click(moveWaterToSelu);
}

function sunClicked(){
  console.log("sunClicked");
  var orgFill = "#FCEE21";
  var sunSVG = s.select("#sun");
  sunSVG.animate({
      "fill":"#FEBD25"
    }, 
    2500, // -- duration 
    function(){
      sunSVG.animate({
      "fill":"#FCEE21"
        }, 
        700, // -- duration 
        )
    } // -- finished
  );
}

function moveWaterToSelu(){
    var waterSVG = s.select("#water");
    var orgX = waterSVG.node.getBoundingClientRect().x;
    var orgY = waterSVG.node.getBoundingClientRect().y;

    var targetSVG = s.select("#hand_target");
    var targetY = targetSVG.node.getBoundingClientRect().y;
    var targetX = targetSVG.node.getBoundingClientRect().x;
    
    waterSVG.animate({
      transform:'t' + -(orgX - targetX)*.9 + ',' + -(orgY - targetY)*.9} 
      , 2000,     mina.easein);
    // mouth
}

