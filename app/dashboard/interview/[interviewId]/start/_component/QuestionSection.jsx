import { Volume2Icon } from "lucide-react";
import React from "react";

function QuestionSection({ question, activeQuestion }) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis is not supported in this browser");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div
          className={`p-2 w-full bg-secondary rounded-full m-3 flex flex-row justify-center items-center ${
            activeQuestion == question.id ? `bg-blue-700 text-white` : ``
          }`}
        >
          <strong>Question #</strong>
          <p>{question.id}</p>
        </div>
      </div>
      <div className="m-2">
        {activeQuestion === question.id && (
          <div className="border-2 border-blue-500 bg-blue-300 text-sm rounded-sm p-2 flex flex-col items-start gap-2">
            <p>{question.question}</p>
            <Volume2Icon
              className="w-6 h-6 cursor-pointer"
              onClick={() => textToSpeech(question.question)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionSection;
