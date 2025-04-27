<h1>AI-Powered Sign Language Translator</h1>
This project is a real-time sign language translator that uses AI to detect hand gestures via a webcam and convert them into text and speech. 
It utilizes React for the frontend, TensorFlow.js for AI-based recognition, and MediaPipe Hands for hand tracking.

<img src="public/demo.png" alt="ScreenShot"/>

<h3>1️⃣ Project Features</h3>
<p>✅ Real-time sign language recognition<br>
✅ Converts hand gestures into text<br>
✅ Text-to-speech (TTS) for spoken output<br>
✅ User-friendly UI with a live camera feed<br>
✅ Supports American Sign Language (ASL) (can be expanded to other sign languages)

<h3>2️⃣ Tech Stack</h3>
Frontend<br>
React.js – UI development<br>
Tailwind CSS – Styling<br>
Webcam API – Captures video input<br>
Speech Synthesis API – Converts text to speech<br>

<h3>3️⃣AI & ML</h3>
TensorFlow.js – Deep learning for sign recognition<br>
MediaPipe Hands – Hand tracking<br>
Pre-trained Models – Recognizes hand gestures<br>

<h3>4️⃣Project Architecture</h3>

1️⃣ Webcam Input – Captures the live hand movement<br>
2️⃣ Hand Detection – MediaPipe detects keypoints of the hand<br>
3️⃣ Feature Extraction – Extracts hand landmark coordinates<br>
4️⃣ Model Processing – TensorFlow.js interprets gestures<br>
5️⃣ Text Output – Converts gestures to text<br>
6️⃣ Speech Output – Reads the detected text using TTS<br>

<h3>5️⃣ Project Setup</h3>
<h4>Step 1: Initialize React App</h4>
npx create-react-app sign-language-translator<br>
cd sign-language-translator<br>
npm install<br>

<h4>Step 2: Install Dependencies</h4>
npm install @tensorflow/tfjs @tensorflow-models/handpose<br>
npm install @mediapipe/hands<br>
npm install react-webcam<br>

<h4>Step 3: Setup Webcam</h4>
import React from "react";<br>
import Webcam from "react-webcam";<br>

<h4>Step 4: Detect Hands with MediaPipe</h4>
Use MediaPipe Hands to detect landmarks (21 points on the hand).<br>
Connect it with TensorFlow.js to recognize gestures.<br>
import * as handpose from "@tensorflow-models/handpose";<br>
import "@tensorflow/tfjs";<br>

const detectHands = async (webcamRef) => {<br>
  const model = await handpose.load();<br>
  const video = webcamRef.current.video;<br>

  setInterval(async () => {<br>
    const hand = await model.estimateHands(video);<br>
    console.log(hand);<br>
  }, 100);<br>
};<br>
<br>
<h4>Step 5: Convert Gestures to Text</h4>
Use a pre-trained model or custom ML logic to classify hand gestures.<br>


<h4>Step 6: Text-to-Speech (TTS)</h4>
Use Speech Synthesis API to read out the detected text.<br>
const speak = (text) => {
  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(speech);
};


