import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, FileText, Mic, BarChart, CheckCircle } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <LogIn className="w-12 h-12 text-blue-600" />,
      title: "Log In",
      description:
        "Create an account or log in to access the AI interview platform.",
    },
    {
      icon: <FileText className="w-12 h-12 text-blue-600" />,
      title: "Create Interview",
      description:
        "Set up your interview by selecting your industry and job role.",
    },
    {
      icon: <Mic className="w-12 h-12 text-blue-600" />,
      title: "Answer Questions",
      description: "Respond to 5 AI-generated questions using your voice.",
    },
    {
      icon: <BarChart className="w-12 h-12 text-blue-600" />,
      title: "Receive Feedback",
      description: "Get detailed AI-generated feedback on your performance.",
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-blue-600" />,
      title: "Improve and Practice",
      description:
        "Use the feedback to improve and practice for your real interview.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          How InterviewAI Works
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Master your interview skills with our AI-powered platform in just a
          few simple steps.
        </p>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start mb-12">
              <div className="flex-shrink-0 mr-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">{step.title}</h2>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <Button
            size="lg"
            className="text-lg px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Start Practicing Now
          </Button>
        </div>
      </main>

      <footer className="bg-gray-100 py-8 mt-16 border-t border-gray-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
            <span className="text-xl font-bold text-gray-900">InterviewAI</span>
          </div>
          <nav className="flex space-x-4">
            <Link
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
