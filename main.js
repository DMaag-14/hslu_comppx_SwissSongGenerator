// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
LSTM Generator example with p5.js
This uses a pre-trained model on a corpus of Virginia Woolf
For more models see: https://github.com/ml5js/ml5-data-and-training/tree/master/models/charRNN
=== */

let charRNN;
let textInput;
let button;
let runningInference = false;
let status; 
let resultText;

let iconClose = document.querySelectorAll(".iconClose");
let iconInfo = document.querySelectorAll(".iconInfo");
let overlay = document.querySelectorAll(".overlay");
let container = document.querySelectorAll(".container");
let songText = document.querySelectorAll(".songText");

function setup() {

    // Create the LSTM Generator passing it the model directory
    charRNN = ml5.charRNN('./model');
  
    // Grab the DOM elements
    textInput = document.querySelector('#textInput');
    button = document.querySelector('#generate');
    status = document.querySelector('#status')
    resultText = document.querySelector('#result')
  
    // DOM element events
    button.addEventListener('click', generate);
  }
  
  setup();
  
  function modelReady() {
    status.innerHTML = 'Model Loaded';
  }
  
  // Generate new text
  function generate() {
    // prevent starting inference if we've already started another instance
    // TODO: is there better JS way of doing this?
    if(!runningInference) {
      runningInference = true;
  
      // Update the status log
      status.innerHTML = 'Kurze Moment, de Text isch am generiere ...';
      resultText.innerHTML = ' ';
      songText.forEach(element => { element.classList.remove("none"); })
  
      // Grab the original text
      const original = textInput.value;
      // Make it to lower case
      //const txt = original.toLowerCase();
      const txt = original + ' ';
  
      // Check if there's something to send
      if (txt.length > 0) {
        // This is what the LSTM generator needs
        // Seed text, temperature, length to outputs
        // TODO: What are the defaults?
        const data = {
          seed: txt,
          temperature: 0.5,
          length: 700
        };
  
        // Generate text with the charRNN
        charRNN.generate(data, gotData);
  
        // When it's done
        function gotData(err, result) {
          console.log(result.sample);
          // Update the status log
          status.innerHTML = 'Fertig! Din Text:';
          resultText.innerHTML = txt + result.sample;
          runningInference = false;
        }
      }
    }
  }

iconInfo.forEach(element => { element.addEventListener("click", function() {
    iconInfo.forEach(element => { element.classList.add("none"); })
    iconClose.forEach(element => { element.classList.remove("none"); })
    overlay.forEach(element => { element.classList.remove("none"); })
    container.forEach(element => { element.classList.add("none"); })
})
})
iconClose.forEach(element => { element.addEventListener("click", function() {
    iconInfo.forEach(element => { element.classList.remove("none"); })
    iconClose.forEach(element => { element.classList.add("none"); })
    overlay.forEach(element => { element.classList.add("none"); })
    container.forEach(element => { element.classList.remove("none"); })
})
})