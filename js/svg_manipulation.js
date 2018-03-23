/*
  Handles SVG element interaction, including  
    - drawing the label for the clickable elements
    - changing text of the label to syllabary or phonetics
    - sound for each element
*/

/*
  TODO: add onclick to give afforadance for clicking left/right arrows
*/

$(document).ready(function(){

});


function svgImageClicked(groupID){
  console.log("svgImageClicked: " + groupID);
  // ---- Handle Label ----- 
  var labelGroup = Snap.select("#" + getLabelIDFromGroupID(groupID));

  if(isLabelDisplayed(labelGroup)){
    // Hide the label
    hideLabel(labelGroup);
  } else {
    // Show or Create the label
    if(labelGroup == null){
      // make a little element appear over the image
      createLabel(groupID); 
    } else {
      showLabel(labelGroup);
    }
  }

  hearTappedGroup(groupID);
}

/* Called when a particular label is clicked */
function labelClicked(event){
  event.stopPropagation();

  var groupID = event.target.id.split("--label")[0];
  hideLabelFromGroupID(groupID);
}


/* Creates and appends label for specific group */
function createLabel(groupID){
  // get text to display
  var tsalagiText;
  if(usingSyllabary){
    tsalagiText = clickableElements[getResourceName(groupID)][RESOURCE_DATA_SYLLABARY_INDEX];
  } else {
    tsalagiText = clickableElements[getResourceName(groupID)][RESOURCE_DATA_PHONETICS_INDEX];
  }

  var groupClicked = Snap.select("#"+groupID);

  /* help from: https://gist.github.com/brainwipe/7689151 */
  var groupX = groupClicked.node.getBoundingClientRect().x;
  var groupY = groupClicked.node.getBoundingClientRect().y;

  var block = groupClicked.rect(groupX, groupY, 30, 30, 2, 2);
  block.attr({
      fill: "#f5f5f5",
      stroke: "#CCCCCC",
      strokeWidth: 2,
      'class' : 'svg-label',
      'id' : getLabelRectIDFromGroupID(groupID)
  });

  var text = groupClicked.text(groupX, groupY, tsalagiText);
  text.attr({
      'font-size':16,
      'class' : 'svg-label',
      'id' : getLabelTextIDFromGroupID(groupID)
  });

  resizeBoxToFitText(text, block, groupID);

  var labelGroup =  groupClicked.g(block,text);
  labelGroup.attr({
  'class' : 'svg-label show-label',
  'id' : getLabelIDFromGroupID(groupID),
  visibility : 'visible' 
  });

  // sets on-click for the label 
  labelGroup.click(labelClicked);
}

function hearTappedGroup(groupID){
   // get audio element name from JS
   var audioName = clickableElements[getResourceName(groupID)][2];
   if(audioName.length !== 0){
    document.getElementById(getResourceName(groupID) + "-audio").play();   
    }
}

function toggleToPhonetics(switchToPhonetics){
  var allTextLabels = $('text.svg-label');

  for(var i=0; i <allTextLabels.length; i++){
    var groupID = allTextLabels[i].id.split('--')[0];
    if(switchToPhonetics){
      allTextLabels[i].innerHTML =  clickableElements[getResourceName(groupID)][RESOURCE_DATA_PHONETICS_INDEX];
    } else {
      allTextLabels[i].innerHTML =  clickableElements[getResourceName(groupID)][RESOURCE_DATA_SYLLABARY_INDEX];
    }
    var block = Snap.select("#" + getLabelRectIDFromGroupID(groupID));
    resizeBoxToFitText(allTextLabels[i], block, groupID);
  }
}


/* ------- HELPER FUNCTIONS ------- */

function hasNumberInGroupID(groupID){
  return ($.isNumeric(groupID[groupID.length-1]));
}

/* Returns the name of the resource that its audio/translations 
  are referenced by
*/
function getResourceName(groupID){
  if($.isNumeric(groupID[groupID.length-1])){
    return  groupID.slice(0,groupID.length-1);
  }
  return groupID;
}

/* Returns whether or not the label is showing syllabary */
function isShowingSyllabary(groupID){
   var text = Snap.select("#" + getLabelTextIDFromGroupID(groupID));
   return (text.node.textContent === clickableElements[getResourceName(groupID)][0]);
}

/* sets text of the label to by in Phonetics */
function showPhonetics(groupID){
   var text = Snap.select("#" + getLabelTextIDFromGroupID(groupID));
   text.node.textContent = clickableElements[getResourceName(groupID)][1];

   var block = Snap.select("#" + getLabelRectIDFromGroupID(groupID));
   resizeBoxToFitText(text, block, groupID);
}

/* Resizes rectangle underneath text to fit the text content passed in */
function resizeBoxToFitText(text, block, groupID){
  var textBB = text.getBBox();
    block.attr({
      y: textBB.y,
      x: textBB.x - 2,
      width: (textBB.width + 3),
      height: (textBB.height + 5)
  });
}

/* sets text of the label to by in Syllabary */
function setTextToSyllbary(groupID){
   var text = Snap.select("#" + getLabelTextIDFromGroupID(groupID));
   text.node.textContent = clickableElements[getResourceName(groupID)][0];
}

/* Creates string of the ID of the label's group element */
function getLabelIDFromGroupID(groupID){
   return groupID + "--labelg";
}

/* Creates ID string for text element of label */
function getLabelTextIDFromGroupID(groupID){
   return groupID + "--labelt";
}

/* Creates ID string for rectangle box element of label */
function getLabelRectIDFromGroupID(groupID){
   return groupID + "--labelr";
}

/* Assumes that the label is created 
  labelGroup -- the Snap element label group that should be hidden */
function hideLabel(labelGroup){
  labelGroup.attr({visibility:'hidden'});
}

/* Assumes that the label is created 
  groupID -- ID of the label group that should be hidden */
function hideLabelFromGroupID(groupID){
  var labelGroup = Snap.select("#" + getLabelIDFromGroupID(groupID));
  labelGroup.attr({visibility:'hidden'});
}

/* Assumes that the label is created 
  labelGroup -- the Snap element label group that should be shown */
function showLabel(labelGroup){
  labelGroup.attr({visibility:'visible'});
}

/* Returns whether or not a label is displayed for this group */
function isLabelDisplayed(labelGroup){
  //true if found label
   if(labelGroup != null){
    // this found label must be displayed
     return labelGroup.node.style.visibility === 'visible';
   }
  return false;
}
