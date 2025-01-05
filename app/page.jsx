"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bot, User } from "lucide-react";

function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const questions = [
    "Tell me about yourself.",
    "What's your greatest strength?",
    "Where do you see yourself in 5 years?",
    "Why should we hire you?",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1500);
      } else {
        setCurrentQuestion(0);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentQuestion]);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full text-center relative overflow-hidden min-h-screen">
        {/* Gradient Background */}
        <div className="absolute inset-0  bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 blur-3xl"></div>
        <h1 className="text-5xl md:text-7xl font-bold mt-5 relative z-10 text-gray-900">
          Master Your Interviews with AI
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-600 relative z-10">
          Practice, improve, and ace your job interviews with our cutting-edge
          AI-powered mock interview platform.
        </p>
        <Button
          size="lg"
          className="text-lg px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 relative z-10 text-white"
        >
          Start Practicing Now
        </Button>
        {/* Interactive AI Interview Simulation */}
        <div className="mt-16 bg-white rounded-lg p-6 max-w-2xl mx-auto shadow-2xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Bot className="text-blue-500" size={24} />
              <span className="font-semibold text-gray-900">
                AI Interviewer
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="text-green-500" size={24} />
              <span className="font-semibold text-gray-900">You</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Bot className="text-blue-500 mt-1" size={20} />
              <div className="bg-gray-100 rounded-lg p-3 flex-grow">
                <p className="text-gray-900">{questions[currentQuestion]}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2 justify-end">
              <div className="bg-blue-500 rounded-lg p-3 max-w-md">
                {isTyping ? (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                ) : (
                  <p className="text-white">Your response here...</p>
                )}
              </div>
              <User className="text-green-500 mt-1" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
          Key Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "AI-Powered Interviews",
              description:
                "Experience realistic interviews with our advanced AI technology.",
            },
            {
              title: "Personalized Feedback",
              description:
                "Receive detailed feedback and suggestions to improve your performance.",
            },
            {
              title: "Industry-Specific Questions",
              description:
                "Practice with questions tailored to your target industry and role.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full mb-4 flex items-center justify-center">
                <span className="text-2xl text-white">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-50 py-8 w-full border-t border-gray-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            <span className="text-xl font-bold text-gray-900">InterviewAI</span>
          </div>
          <nav className="flex space-x-4">
            <Link
              href="#"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Home;
