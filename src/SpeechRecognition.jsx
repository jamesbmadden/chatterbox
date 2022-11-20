import React, { useState, useEffect } from "react";

// list of words to be recognized by the speech detector
const grammar = '#JSGF V1.0; grammar commands; public <command> = chatterbox | play | pause | next | skip;'

export default function SpeechRecog({ spotify }) {

  // only add listeners once per component
  useEffect(() => {

    console.log('establishing speech recognition...')

    let recognition, grammarList;
    // load the prefixed or unprefixed versions of the api, depending on what's supported
    if (window.SpeechRecognition) {
      recognition = new window.SpeechRecognition();
      grammarList = new window.SpeechGrammarList();
    } else if (window.webkitSpeechRecognition) {
      recognition = new window.webkitSpeechRecognition();
      if (window.webkitSpeechGrammarList) {
        grammarList = new window.webkitSpeechGrammarList();
      }
    }
    else alert("no speech recognition support :(");

    // set the words to be recognized
    
    if (window.SpeechGrammarList || window.webkitSpeechGrammarList) {
      grammarList.addFromString(grammar, 1);
      recognition.grammars = grammarList;
    }

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.start();
    console.log('Ready to receive a color command.');

    let resultIndex = 0;

    let endForGood = false;

    recognition.onresult = (event) => {
      const command = event.results[resultIndex][0].transcript.replace('.', '');


      if (command.toLowerCase().includes('chatterbox')) {
        // pause the playback!
        //spotify.pause();
        runCommand(command.toLowerCase(), spotify);

      }

      if (event.results[resultIndex].isFinal) resultIndex++;
    }

    recognition.onend = () => {
      if (!endForGood) {
        recognition.start();
        resultIndex = 0;
      }
    }

    return () => {
      endForGood = true;
      recognition.stop();
    }

  }, []);

  return <></>;

}

function runCommand(command, spotify) {

  console.log("COMMAND: " + command)


  if (command.includes("chatterbox pause")) {
    spotify.pause()
  }
  if (command.includes("chatterbox play")) {
    spotify.play()
  }

}