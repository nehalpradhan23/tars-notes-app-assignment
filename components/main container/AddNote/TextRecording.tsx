import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import React from "react";
import { FaSquare } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const TextRecording = () => {
  const {
    text,
    hasRecognitionSupport,
    isListening,
    startListening,
    stopListening,
  } = useSpeechRecognition();
  // ============================================
  return (
    <div>
      {hasRecognitionSupport ? (
        <>
          {!isListening ? (
            <button
              onClick={startListening}
              className="bg-red-500 text-white mr-4 p-4 rounded-full flex items-center gap-3"
            >
              <GoDotFill />
              Start recording
            </button>
          ) : (
            <>
              <button
                onClick={stopListening}
                className="bg-green-600 text-white mr-4 p-4 rounded-full flex items-center gap-3"
              >
                <FaSquare />
                Stop recording
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <h1>Your browser has no support for speech recognition</h1>
        </>
      )}
    </div>
  );
};

export default TextRecording;
