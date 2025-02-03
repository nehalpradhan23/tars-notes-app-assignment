"use client";
import { useGlobalContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";

const useSpeechRecognition = () => {
  const {
    textRecordingObject: { isListening, setIsListening, setText, text },
    setNoteIsRecorded,
    newNoteModalObject: { setNewNoteModalOpen },
  } = useGlobalContext();

  // ✅ State to store recognition instance
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    // ✅ Ensure this runs only on the client
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.lang = "en-US";

      speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
        setText(event.results[0][0].transcript);
        speechRecognition.stop();
        setIsListening(false);
      };

      setRecognition(speechRecognition); // Store instance in state
    }
  }, []);

  const startListening = () => {
    if (!recognition) return;
    setText("");
    setNoteIsRecorded(true);
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    if (!recognition) return;
    setIsListening(false);
    setNewNoteModalOpen(true);
    recognition.stop();
    // setNoteIsRecorded(false);
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
