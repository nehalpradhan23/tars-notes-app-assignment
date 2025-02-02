"use client";
import { useGlobalContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";

// check for support
let recognition: any = null;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";
}

const useSpeechRecognition = () => {
  const {
    textRecordingObject: { isListening, setIsListening, setText, text },
    setNoteIsRecorded,
  } = useGlobalContext();

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      // console.log("result: ", event);
      setText(event.results[0][0].transcript); // store text
      recognition.stop();
      setIsListening(false);
    };
  }, []);

  const startListening = () => {
    setText("");
    setNoteIsRecorded(true);
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  };
};

export default useSpeechRecognition;
