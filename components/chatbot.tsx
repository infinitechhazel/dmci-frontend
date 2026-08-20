"use client";
//deploy
import { getAuthHeaders } from "@/app/auth";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChatBot from "react-chatbotify";
import { Params } from "react-chatbotify";
import { LuBuilding2 } from "react-icons/lu";
const Chatbot = () => {
  const helpOptions = [
    "Vision & Mission",
    "DMCI Creed",
    "Core Values",
    "Properties",
  ];
  const [properties, setProperties] = useState<any[]>([]);
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const headers = getAuthHeaders();
  const endpoint = `${apiUrl}/api/user/properties`;

  const pathname = usePathname();

  if (pathname.includes("/room-planner")) {
    return null;
  }

  const fetchProperties = async () => {
    try {
      const headers = getAuthHeaders();
      const response = await fetch(endpoint, {
        method: "GET",
        headers,
        cache: "no-cache",
      });
      const data = await response.json();
      setProperties(data.records);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const flow = {
    start: {
      message: "Welcome to DMCI! How can I assist you today?",
      transition: { duration: 1000 },
      path: "show_options",
    },
    show_options: {
      message: "What would you like to know about?",
      options: helpOptions,
      path: "process_options",
    },
    prompt_again: {
      message: "Do you need any other help?",
      options: helpOptions,
      path: "process_options",
    },
    unknown_input: {
      message: "Sorry, I can only answer questions related to DMCI",
      options: helpOptions,
      path: "process_options",
    },
    process_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params: Params) => {
        let message = "";
        switch (params.userInput) {
          case "Vision & Mission":
            message =
              "Vision & Mission\n\n" +
              "We shall be the best provider of residential communities designed to create quality lifestyle responsive to the changing needs and preferences of the market we serve.";
            break;
          case "DMCI Creed":
            message =
              "DMCI Creed\n\n" +
              "We believe:\n\n" +
              "That construction is a noble profession whose activities are vital to economic development and national progress,\n" +
              "That fair competition is essential to the growth and stability of the construction industry,\n\n" +
              "That a contractor's primary responsibility to his client is to give his best in faithful compliance with their agreement;\n\n" +
              "That labor and capital should cooperate with one another so that labor may live with dignity and capital may find its just rewards;\n\n" +
              "That the ill-gotten violates business ethics and the ill-conceived wreaks havoc on the public good;\n\n" +
              "That the ultimate objectives are to serve not only man but humankind; and to build not only an enterprise but an institution that will serve society.";
            break;
          case "Core Values":
            message =
              "Our Core Values\n\n" +
              "Interdependence\n" +
              "With unity in purpose and mutual trust and respect for each other, we work toward shared aspirations and transcend boundaries along functional and organizational lines.\n\n" +
              "Customer Orientation\n" +
              "Our goal is to delight and please our customers. Thus, all activities and programs we undertake result in innovative projects and in the enhancement of productivity and quality.\n\n" +
              "Excellence\n" +
              "We reject mediocrity and strive for excellence in even the smallest of details.\n\n" +
              "Integrity\n" +
              "All our actions are guided by what is ethical, fair, and right. Believing in profit with honor, we are committed to good governance and the highest moral standards.\n\n";
            break;
          case "Properties":
            if (properties.length > 0) {
              message =
                "🏡 **Here are some of our properties:**\n\n" +
                properties
                  .map((property: any) => `🏢 ${property.name}`)
                  .join("\n\n");
            } else {
              message =
                "Sorry, I couldn't retrieve the properties at the moment.";
            }
            break;
          default:
            return "unknown_input";
        }

        await params.injectMessage(message);
        return "repeat";
      },
    },

    repeat: {
      transition: { duration: 500 },
      path: "prompt_again",
    },
  };

  return (
    <ChatBot
      flow={flow}
      settings={{
        general: {
          primaryColor: "#1e40af",
          secondaryColor: "#1e40af",
          showFooter: false,
        },
        header: {
          title: "DMCI Homes by Ella",
          avatar: "/ella.png",
        },
        botBubble: {
          showAvatar: true,
          avatar: "/ella.png",
        },
        chatButton: {
          icon: "/ella.png",
        },
        tooltip: {
          mode: "NEVER",
        },
      }}
    />
  );
};

export default Chatbot;
