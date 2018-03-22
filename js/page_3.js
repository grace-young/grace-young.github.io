
/*
  Specific javascript for the "other_page.html"
  - loads specific clickable elements defined in 'clickableElements' map
  - loads translations for words in the story
*/

/*
  TODO: create other screen ratios, change svg based on ratio, make english appear under instead of replace
*/

// Unaguhisdi dagohwatiha. Dehutvgi!
// TODO: check syllbary for tv 
// ᎤᎾᎫᎯᏍᏗ   ᏓᎪᏩᏘᎭ .   ᏕᎱᏛᎩ !
// Tomato (S)he sees them. (You) Pick them up {S/N}!


var wordDataList = [["Unaguhisdi", "ᎤᎾᎫᎯᏍᏗ", "Tomato", "page_3/unaguhisdi.wav", "wav"],
                   ["dagohwatiha.", "ᏓᎪᏩᏘᎭ", "(s)he sees them.", "page_3/dagohwatiha.wav", "wav"],
                   ["Dehutvgi!", "ᏕᎱᏛᎩ", "(You) Pick them up {S/N}!", "page_3/dehutvgi.wav", "wav"]];

var WORD_DATA_PHONETICS_INDEX = 0;
var WORD_DATA_SYLLABARY_INDEX = 1;
var WORD_DATA_ENG_INDEX = 2;
var WORD_DATA_AUDIO_INDEX = 3;


// ID of element group in SVG --> [syllabary, phonetic, audioFileName, numElems]
var clickableElements = {
  'lettuce' : ["ᎠᎪᏍᏓᎩᏍᏗ", "agosdagisdi", "lettuce_short.wav", 3],
  'tomato' : ["ᎤᎾᎫᎯᏍᏗ", "unaguhisdi", "page_3/unaguhisdi.wav", 6],
  'cucumber' : ["ᎦᎦᎹ", "gagama", "page_2/word_4.wav", 3],
  'selu' : ["ᏎᎷ", "Selu", "page_4/word_4.wav", 1],
  'rabbit' : ["ᏥᏍᏚ", "tsisdu", "page_4/word_5.wav", 1]
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
Snap.load("images/page_3_tablet.svg", onSVGLoaded ) ;

// Create main audio
var audioElem = createAudioElement("audio-main",
                 "audio/" + "page_3/page_3_story.wav",
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
        var lookingForID = clickableElem + i;
        var svgElem = s.select("#" + lookingForID);  
        svgElem.node.classList.add("clickable-g"); 
      }
    } else {
      // make that one element clickable
      var svgElem = s.select("#" + clickableElem);   
      svgElem.node.classList.add("clickable-g");  
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
  var seluSVG = s.select("#selu");
  seluSVG.click(moveSeluAnimation);

  for(var i=1; i <= clickableElements["tomato"][3]; i++){
    // get from s.
    var elemID = "tomato" + i;
    $('#' + elemID).on('click', moveTomatoToSelu);
  }

  s.select("#rabbit").click(moveRabbit);
}

function moveRabbit(){
    var rabbitSVG = s.select("#rabbit");
    var orgX = rabbitSVG.node.getBoundingClientRect().x;
    var orgY = rabbitSVG.node.getBoundingClientRect().y;
    var targetSVG = s.select("#rabbit_target_2");
    rabbitSVG.animate({
      transform:'t' + (- targetSVG.node.getBoundingClientRect().x )+ ',' + 0}
      , 2000,     
      mina.bounce);
}

function moveTomatoToSelu(event){
  var tomatoID = event.currentTarget.id;
  var tomatoNumber = parseInt(tomatoID.substr(tomatoID.length - 1));
  var tomatoElem = s.select("#" + tomatoID);
  var tomatoX = tomatoElem.node.getBoundingClientRect().x;
    var tomatoY = tomatoElem.node.getBoundingClientRect().y;

  var seluSVG = s.select("#other_shoe");
    var seluX = seluSVG.node.getBoundingClientRect().x;
    var seluY = seluSVG.node.getBoundingClientRect().y;

    tomatoElem.animate({
      transform: 't' + (seluX - tomatoX-tomatoNumber*getRandomNumber()) + ',' + (seluY-tomatoY+getRandomNumber()*3)
    }, 1500, 
    mina.easein);
}

function getRandomNumber(){
  return Math.floor((Math.random() * 10) + 1);
}

function moveSeluAnimation(){
    var seluSVG = s.select("#selu");
    var orgX = seluSVG.node.getBoundingClientRect().x;
    var orgY = seluSVG.node.getBoundingClientRect().y;
    var targetSVG = s.select("#selu_target");
    seluSVG.animate({
      transform:'t' + (- targetSVG.node.getBoundingClientRect().x )+ ',' + 0}
      , 2000,     mina.easein);
}


