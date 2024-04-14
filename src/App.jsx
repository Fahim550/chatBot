import "regenerator-runtime";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import LeftSectio from "./components/LeftSectio";
import RightSection from "./components/RightSection";

const API_KEY = "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";

const App = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [aiText, setAiText] = useState("");
  const microphoneRef = useRef(null);
  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   return (
  //     <div className="mircophone-container">
  //       Browser is not Support Speech Recognition.
  //     </div>
  //   );
  // }
  // const handleListing = () => {
  //   setIsListening(true);
  //   SpeechRecognition.startListening();
  //   setMessages(transcript);
  //   // microphoneRef.current.classList.add(isListening);
  //   // SpeechRecognition.startListening({
  //   //   continuous: true,
  //   // });
  // };

  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  //😃
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  // const [isTyping, setIsTyping] = useState(false);

  // const handleListing = async () => {
  //   setIsListening(true);
  //   SpeechRecognition.startListening();
  //   microphoneRef.current.classList.add(isListening);
  //   // SpeechRecognition.startListening({
  //   //   continuous: true,
  //   // });
  //   setMessages((prevMessages) => [...prevMessages, newMessage]);
  //   const newMessage = {
  //     messages: transcript,
  //     direction: "outgoing",
  //     sender: "user",
  //   };
  //   try {
  //     const response = await processMessageToChatGPT([...messages, newMessage]);
  //     const content = response.choices[0]?.message?.content;
  //     if (content) {
  //       const chatGPTResponse = {
  //         message: content,
  //         sender: "ChatGPT",
  //       };
  //       setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
  //     }
  //   } catch (error) {
  //     console.error("Error processing message:", error);
  //   } finally {
  //     setIsListening(false);
  //   }
  //   console.log("response", messages);
  // };

  // async function processMessageToChatGPT(chatMessages) {
  //   setIsListening(true);
  //   const apiMessages = chatMessages.map((messageObject) => {
  //     const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
  //     return { role, content: messageObject.message };
  //   });

  //   const apiRequestBody = {
  //     model: "gpt-3.5-turbo",
  //     messages: [
  //       { role: "system", content: "I'm a Student using ChatGPT for learning" },
  //       ...apiMessages,
  //     ],
  //   };

  //   const response = await fetch("https://api.openai.com/v1/chat/completions", {
  //     method: "POST",
  //     headers: {
  //       Authorization: "Bearer " + API_KEY,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(apiRequestBody),
  //   });
  //   console.log("body💕", response);
  //   return response.json();
  // }
  // useEffect(() => {
  //   if (!isListening && transcript) {
  //     processMessageToChatGPT(transcript).then((response) => {
  //       const speechSynthesis = window.speechSynthesis;
  //       const utterance = new SpeechSynthesisUtterance(response);
  //       speechSynthesis.speak(utterance);
  //       setAiText(response);
  //     });
  //   }
  // }, [transcript, isListening]);
  return (
    <div className="w-screen h-screen flex flex-row ">
      <div className=" w-1/5  overflow-hidden">
        <LeftSectio />
      </div>
      <div className="w-4/5  overflow-hidden">
        <RightSection />
      </div>
    </div>
    // <div className="App">
    //   <div style={{ position: "relative", height: "800px", width: "700px" }}>
    //     <main>
    //       <div>
    //         <h1>{aiText}</h1>
    //         {/* <MessageList
    //           scrollBehavior="smooth"
    //           typingIndicator={
    //             isTyping ? (
    //               <TypingIndicator content="ChatGPT is typing" />
    //             ) : null
    //           }
    //         >

    //           {messages.map((message, i) => {
    //             console.log(message);
    //             return <Message key={i} model={message} />;
    //           })}
    //         </MessageList> */}

    //         <button ref={microphoneRef} onClick={handleListing}>
    //           ask me {transcript && <h2>{transcript}</h2>}
    //         </button>
    //       </div>
    //     </main>
    //   </div>
    // </div>
  );
};

export default App;

// 2nd design 💕🙌😍
// import "regenerator-runtime";
// import { useRef, useState } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import "./App.css";
// import microPhoneIcon from "./assets/react.svg";

// function App() {
//   const { transcript, resetTranscript } = useSpeechRecognition();
//   const [isListening, setIsListening] = useState(false);
//   const microphoneRef = useRef(null);
//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return (
//       <div className="mircophone-container">
//         Browser is not Support Speech Recognition.
//       </div>
//     );
//   }
//   const handleListing = () => {
//     setIsListening(true);
//     microphoneRef.current.classList.add("listening");
//     SpeechRecognition.startListening({
//       continuous: true,
//     });
//   };
//   const stopHandle = () => {
//     setIsListening(false);
//     microphoneRef.current.classList.remove("listening");
//     SpeechRecognition.stopListening();
//   };
//   const handleReset = () => {
//     stopHandle();
//     resetTranscript();
//   };
//   return (
//     <div className="microphone-wrapper">
//       <div className="mircophone-container">
//         <div
//           className="microphone-icon-container"
//           ref={microphoneRef}
//           onClick={handleListing}
//         >
//           <img src={microPhoneIcon} className="microphone-icon" />
//         </div>
//         <div className="microphone-status">
//           {isListening ? "Listening........." : "Click to start Listening"}
//         </div>
//         {isListening && (
//           <button className="microphone-stop btn" onClick={stopHandle}>
//             Stop
//           </button>
//         )}
//       </div>
//       {transcript && (
//         <div className="microphone-result-container">
//           <div className="microphone-result-text">{transcript}</div>
//           <button className="microphone-reset btn" onClick={handleReset}>
//             Reset
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
// export default App;
