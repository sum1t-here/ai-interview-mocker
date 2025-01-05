import { Volume2Icon } from "lucide-react";
import React from "react";

function QuestionSection({ question, activeQuestion }) {
  // Text-to-speech functionality
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis is not supported in this browser");
    }
  };

  return (
    <div className="w-full p-4">
      {/* Question Header */}
      <div
        className={`p-3 w-full rounded-lg transition-all duration-300 flex flex-row justify-between items-center cursor-pointer ${
          activeQuestion === question.id
            ? "bg-blue-700 text-white shadow-lg"
            : "bg-secondary"
        }`}
      >
        <div className="flex items-center gap-2">
          <strong>Question #</strong>
          <p>{question.id}</p>
        </div>
      </div>

      {/* Question Body */}
      {activeQuestion === question.id && (
        <div className="mt-2 p-4 border-2 border-blue-500 bg-blue-100 rounded-lg text-sm">
          <p className="text-gray-800">{question.question}</p>
          <Volume2Icon
            className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the parent onClick from firing
              textToSpeech(question.question);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default QuestionSection;
