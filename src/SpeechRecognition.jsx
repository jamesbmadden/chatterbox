import React, { useState, useEffect } from "react";

export default function SpeechRecog() {

  const [ words, setWords ] = useState("");

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
      grammarList = new window.webkitSpeechGrammarList();
    }
    else alert("no speech recognition support :(");

    // set the words to be recognized
    const grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
    grammarList.addFromString(grammar, 1);
    recognition.grammars = grammarList;
    const bg = document.querySelector('html');

    document.body.onclick = () => {
      recognition.start();
      console.log('Ready to receive a color command.');
    }

    recognition.onresult = (event) => {
      const color = event.results[0][0].transcript.replace('.', '');
      setWords(`Result received: ${color}`);
      bg.style.backgroundColor = color;
    }

  }, []);

  return <p>{words}</p>;

}