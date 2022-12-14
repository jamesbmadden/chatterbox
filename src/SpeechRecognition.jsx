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
    console.log('Ready to receive a command');

    let resultIndex = 0;

    let endForGood = false;

    let alreadyGotResults = new Set();

    recognition.onresult = (event) => {
      const command = event.results[resultIndex][0].transcript.replace('.', '');


      if (command.toLowerCase().includes('chatterbox') && !alreadyGotResults.has(resultIndex)) {
        // pause the playback!
        //spotify.pause();
        // if this is true, clear the command so it doesn't get run multiple times
        if (runCommand(command.toLowerCase(), spotify)) {
          alreadyGotResults.add(resultIndex);
        }

      }

      if (event.results[resultIndex].isFinal) resultIndex++;
    }

    recognition.onend = () => {
      if (!endForGood) {
        recognition.start();
        resultIndex = 0;
        alreadyGotResults = new Set();
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
    return true;
  }
  if (command.includes("chatterbox play")) {
    spotify.play()
    return true;
  }
  if (command.includes("chatterbox skip") || command.includes("chatterbox next")) {
    spotify.nextTrack();
    return true;
  }
  if (command.includes("chatterbox back") || command.includes("chatterbox previous")) {
    spotify.prevTrack();
    return true;
  }
  // all the various genre commands
  if (command.includes("chatterbox genre health")) {
    spotify.search('health');
    return true;
  }
  if (command.includes("chatterbox genre wellness")) {
    spotify.search('wellness');
    return true;
  }
  if (command.includes("chatterbox genre true crime")) {
    spotify.search('true crime');
    return true;
  }
  if (command.includes("chatterbox genre news")) {
    spotify.search('news');
    return true;
  }
  if (command.includes("chatterbox genre comedy")) {
    spotify.search('comedy');
    return true;
  }
  if (command.includes("chatterbox genre sports")) {
    spotify.search('sports');
    return true;
  }
  if (command.includes("chatterbox genre business")) {
    spotify.search('business');
    return true;
  }
  if (command.includes("chatterbox genre arts")) {
    spotify.search('arts');
    return true;
  }
  if (command.includes("chatterbox genre fitness")) {
    spotify.search('fitness');
    return true;
  }
  if (command.includes("chatterbox genre music")) {
    spotify.search('music');
    return true;
  }
  if (command.includes("chatterbox genre food")) {
    spotify.search('food');
    return true;
  }
  if (command.includes("chatterbox genre culture")) {
    spotify.search('culture');
    return true;
  }

}