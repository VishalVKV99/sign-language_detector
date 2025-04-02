import React, { useState, useRef, useEffect, useCallback } from "react";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

const HandTracker = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [gesture, setGesture] = useState("No Hand Detected");

    const detect = useCallback(async (net) => {
        if (
            webcamRef.current &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const hands = await net.estimateHands(video);
            console.log("Detected Hands:", hands);  // 🔴 Debugging log

            const ctx = canvasRef.current.getContext("2d");
            drawHand(hands, ctx);

            if (hands.length > 0) {
                console.log(`✅ ${hands.length} Hand(s) Detected`);
                const detectedGestures = recognizeGesture(hands.map((hand) => hand.landmarks));
                setGesture(detectedGestures);
            } else {
                console.log("❌ No Hands Detected");
                setGesture("No Hand Detected");
            }
        }
    }, [setGesture]);

    useEffect(() => {
        const loadModel = async () => {
            await tf.setBackend("webgl");
            await tf.ready();
            console.log("Backend:", tf.getBackend()); // Debug log

            const net = await handpose.load();
            console.log("Handpose model loaded");

            setInterval(() => {
                detect(net);
            }, 100);
        };
        loadModel();
    }, [detect]);

    const recognizeGesture = (multiHandLandmarks) => {
        if (!multiHandLandmarks || multiHandLandmarks.length === 0) return "No Hand Detected";

        let gestures = [];

        multiHandLandmarks.forEach((landmarks, handIndex) => {
            if (!landmarks || landmarks.length < 21) return;

            const thumbTip = landmarks[4];
            const thumbBase = landmarks[2];

            const indexTip = landmarks[8];
            const indexPIP = landmarks[6];

            const middleTip = landmarks[12];
            const middlePIP = landmarks[10];

            const ringTip = landmarks[16];
            const ringPIP = landmarks[14];

            const littleTip = landmarks[20];
            const littlePIP = landmarks[18];

            const thumbUp = thumbTip[0] > thumbBase[0];
            const indexUp = indexTip[1] < indexPIP[1];
            const middleUp = middleTip[1] < middlePIP[1];
            const ringUp = ringTip[1] < ringPIP[1];
            const littleUp = littleTip[1] < littlePIP[1];

            let detectedGesture = "🤷 Unknown Gesture";

            if (!thumbUp && !indexUp && !middleUp && !ringUp && !littleUp) {
                detectedGesture = "✊ Fist";
            }
            if (thumbUp && indexUp && middleUp && ringUp && littleUp) {
                detectedGesture = "🖐️ Open Hand";
            }
            if (!thumbUp && indexUp && !middleUp && !ringUp && !littleUp) {
                detectedGesture = "1️⃣";
            }
            if (!thumbUp && indexUp && middleUp && !ringUp && !littleUp) {
                detectedGesture = "2️⃣ ✌️ V Sign";
            }
            if (!thumbUp && indexUp && middleUp && ringUp && !littleUp) {
                detectedGesture = "3️⃣";
            }
            if (!thumbUp && indexUp && middleUp && ringUp && littleUp) {
                detectedGesture = "4️⃣";
            }

            gestures.push(`Hand ${handIndex + 1}: ${detectedGesture}`);
        });

        return gestures.length > 0 ? gestures.join(" | ") : "No Hand Detected";
    };

    return (
        <div style={{ 
            backgroundColor: "#FFFAFA",  // 🌟 Light Cream Background
            color: "#000000",  // 🖤 Black Text
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Arial, sans-serif",
            padding: "20px"
        }}>
            {/* Left-aligned Title */}
            <h1 style={{ 
                color: "#ff5722", 
                marginBottom: "10px", 
                textAlign: "left",
                width: "100%", 
            }}>AI Sign Language Translator</h1>
    
            {/* Camera Feed with Black Border */}
            <Webcam ref={webcamRef} style={{ 
                width: 507, 
                height: 380, 
                borderRadius: "10px", 
                border: "solid #000000"  // 🖤 Black Border
            }} />
    
            <canvas ref={canvasRef} style={{ 
                position: "absolute", 
                left: 0, 
                top: 0, 
                width: 540, 
                height: 380 
            }} />
    
            {/* Gesture Display with Color Change Based on Detection */}
            <div style={{ marginTop: "25px" }}>
                <h3 style={{ 
                    fontSize: "1.5rem", 
                    color: gesture === "No Hand Detected" ? "#FF0000" : "#4CAF50" // 🔴 Red (No Hand) / 🟢 Green (Detected)
                }}>
                    {gesture}
                </h3>
            </div>
    
            {/* Gesture Text Box */}
            <textarea 
                value={gesture}
                readOnly
                style={{ 
                    width: "90%", 
                    height: "100px", 
                    fontSize: "1.2rem", 
                    padding: "10px", 
                    marginTop: "20px", 
                    border: "2px solidrgb(32, 3, 179)", 
                    borderRadius: "10px", 
                    backgroundColor: "#F2FAFF",  // 🌟 Light Gray Background
                    color: "#000000"  // 🖤 Black Text
                }}
            />
        </div>
    );
    
    
};

export default HandTracker;
