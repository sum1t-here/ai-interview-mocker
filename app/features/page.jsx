import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, BarChart, Zap, Users, Clock, Laptop } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Bot className="w-12 h-12 text-blue-500" />,
      title: "AI-Powered Interviews",
      description:
        "Experience realistic interview scenarios with our advanced AI technology. Our system adapts to your responses, providing a dynamic and challenging interview experience.",
    },
    {
      icon: <BarChart className="w-12 h-12 text-blue-500" />,
      title: "Personalized Feedback",
      description:
        "Receive detailed, actionable feedback after each interview. Our AI analyzes your responses, body language, and tone to provide comprehensive insights for improvement.",
    },
    {
      icon: <Zap className="w-12 h-12 text-blue-500" />,
      title: "Industry-Specific Questions",
      description:
        "Practice with questions tailored to your target industry and role. Our extensive database covers a wide range of sectors and job positions.",
    },
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Mock Panel Interviews",
      description:
        "Prepare for panel interviews with our multi-AI interviewer feature. Face questions from different perspectives and learn to handle complex interview dynamics.",
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-500" />,
      title: "Flexible Scheduling",
      description:
        "Practice at your own pace with 24/7 availability. Schedule interviews at your convenience or start an impromptu session whenever you feel ready.",
    },
    {
      icon: <Laptop className="w-12 h-12 text-blue-500" />,
      title: "Cross-Platform Compatibility",
      description:
        "Access your interview practice sessions from any device. Our responsive design ensures a seamless experience on desktops, tablets, and mobile phones.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Powerful Features to Ace Your Interviews
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Discover how InterviewAI can help you prepare for your next job
          interview with our cutting-edge AI technology and comprehensive
          feature set.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="mb-4">{feature.icon}</div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                {feature.title}
              </h2>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Elevate Your Interview Skills?
          </h2>
          <Button
            size="lg"
            className="text-lg px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 text-white"
          >
            Start Your Free Trial
          </Button>
        </div>
      </main>

      <footer className="bg-gray-50 py-8 mt-16 border-t border-gray-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            <span className="text-xl font-bold">InterviewAI</span>
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
