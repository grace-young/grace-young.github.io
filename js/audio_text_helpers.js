/*
  Creates and returns audio element with ID, filename, and audio type specified
  audioType - something like "audio/wav"
*/
function createAudioElement(audioID, audioFileName, audioType){
  
  var audioElem = document.createElement("AUDIO");
  audioElem.id = audioID;

  var audioSource = document.createElement("SOURCE");
  audioSource.src =  audioFileName;
  audioSource.type = audioType;

  audioElem.appendChild(audioSource);
  return audioElem;
}

/*
  Creates popup that will go over word element
*/
function createPopup(innerElements, wordButtonUnderneath){
  var popoutWidth = innerElements.offsetWidth;

  var wordHeight = wordButtonUnderneath.offsetHeight;
  var wordWidth = wordButtonUnderneath.offsetWidth;

  var calloutDiv =  document.createElement("div");
  calloutDiv.classList.add("callout", "popup");
  calloutDiv.style.marginTop = (wordHeight * 3 * -1) + "px";
  if(wordWidth > 140){
    calloutDiv.style.marginLeft = (wordWidth / 3) + "px";
  } else if(wordWidth < 30){ 
    calloutDiv.style.marginLeft = (wordWidth * -2.1) + "px";
        console.log("range < 30");
  } else if(wordWidth >= 30 && wordWidth < 46){
      calloutDiv.style.marginLeft = (wordWidth * -1) + "px";
        console.log("range 30 - 45");
  }else if( wordWidth >= 46 && wordWidth < 50){
    calloutDiv.style.marginLeft = (wordWidth *2* -1) + "px";
        console.log("range 45 - 50");
  } else if(wordWidth >= 50 && wordWidth < 65){
    console.log("range 50 - 65");
    calloutDiv.style.marginLeft = (wordWidth/1.8 * -1) + "px";
  } else if(wordWidth >= 65 && wordWidth < 70){
    console.log("range 65 - 70");
    calloutDiv.style.marginLeft = (wordWidth/2 * -1) + "px";
  } else if(wordWidth >= 70 && wordWidth < 100){
    console.log("range 70 - 100");
    calloutDiv.style.marginLeft = (wordWidth/4 * -1) + "px";
  }
  // // here, add what is supposed to be on the button

  calloutDiv.appendChild(innerElements);

  var notch = document.createElement("b");
  notch.classList.add("notch");
  calloutDiv.appendChild(notch);

  return calloutDiv;
}

/*
  Returns div with all word buttons to translate/play attached
*/
function createWordDiv(wordNum, cherokeeWord){
  var wordButtonButActuallyDiv = document.createElement("div");
  wordButtonButActuallyDiv.classList.add("test-word-button");

  var wordSpan = document.createElement("span");
  wordSpan.classList.add("btn-text", "word-text-span");
  wordSpan.id = "word-" + wordNum; 
  wordSpan.innerHTML = cherokeeWord;

  wordButtonButActuallyDiv.appendChild(wordSpan);

  return wordButtonButActuallyDiv;
}
