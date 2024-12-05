import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { HashLoader } from "react-spinners";
import chatgptlogo from "../assets/chatgptlogo.png";
import nouserlogo from "../assets/nouserlogo.png";
export default function RightSection() {
  const trainingPrompt = [
    {
      role: "user",
      parts: [
        {
          text: "This is Introductory dialogue for any prompt :  'Hello, my dear friend, I am the CHATGPT Bot. Ask me anything regarding procurement, purchase, and logistics. I will be happy to help you. '",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "okay",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Special Dialogue 1 : if any prompt mentions 'Shashi Shahi' word :  'Ofcourse! Dr. Shashi Shahi is one of the prominent professors at UWindsor! He is an IIT-D alumni with year of invaluable experience and a fun way of engaging in lectures!' 'Likes: Analytics and Research and Case Studies ''Dislikes: Students near riverside.'",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "okay",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Special Dialogue 2 : Any prompt that mentions CHATGPT class / classroom  A : ' The CHATGPT Batch of 2023 is by far the best the university has ever seen by all sets of standards. Students from different come together to form a truly diverse and culturally rich classroom experience. I believe that all students are highly capable and will achieve all great things in their professional career!' ",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "okay",
        },
      ],
    },
  ];
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(true);
  const [allMessages, setAllMessages] = useState([]);
  const [response, setResponse] = useState();
  const [isPaused, setIsPaused] = useState(true);
  const [utterance, setUtterance] = useState(null);
  const API_KEY = "AIzaSyAThH_hZ33Oy1g--v36RZ3rROd_jQ8ghJc";
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);

  let url =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=` +
    API_KEY;
  let messagesToSend = [
    ...trainingPrompt,
    ...allMessages,
    {
      role: "user",
      parts: [
        {
          text: message,
        },
      ],
    },
  ];
  const sendMessage = async () => {
    setIsSent(false);
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: messagesToSend,
      }),
    });
    let resjson = await res.json();
    // console.log("resjson", resjson);
    setIsSent(true);
    console.log(
      "responseMessage",
      resjson?.candidates[0]?.content?.parts[0]?.text
    );
    let responseMessage = resjson?.candidates[0]?.content?.parts[0]?.text;

    setResponse(responseMessage);
    let newAllMessages = [
      ...allMessages,
      {
        role: "user",
        parts: [
          {
            text: message,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: responseMessage,
          },
        ],
      },
    ];
    console.log(newAllMessages);
    // console.log(message);

    setAllMessages(newAllMessages);
    console.log("allmessage", allMessages);
    setMessage("");
  };
  useEffect(() => {
    setMessage(transcript);
    // console.log(transcript);
    const speechSynthesis = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(response);
    setUtterance(u);
    return () => {
      speechSynthesis.cancel();
    };
  }, [transcript, response]);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = async () => {
    setIsListening(true);
    SpeechRecognition.startListening();
    microphoneRef.current.classList.add(isSent);
    SpeechRecognition.lang = "en-US";

    console.log("transcript", transcript);
    // await resetTranscript();
    try {
      let res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: messagesToSend,
        }),
      });

      let resjson = await res.json();
      setIsSent(true);
      // console.log(resjson.candidates[0].content.parts[0].text)
      let responseMessage = resjson.candidates[0].content.parts[0].text;
      let newAllMessages = [
        ...allMessages,
        {
          role: "user",
          parts: [
            {
              text: message,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: responseMessage,
            },
          ],
        },
      ];
      console.log(newAllMessages);
      setAllMessages(newAllMessages);
      setMessage("");
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsListening(false);
    }
  };

  const handleSpeak = async () => {
    speechSynthesis.speak(utterance);
    setIsPaused(false);
    // console.log("speak");
  };
  const handleStop = () => {
    speechSynthesis.cancel();
    setIsPaused(true);
  };
  const Ask = [
    {
      headText: "make your daily study plan",
      bodyText: "how to make my daily study plan",
    },
    {
      headText: "This plan for first shift students",
      bodyText:
        "make me 8 hour well study plan,where 8 am to 1 pm my college time",
    },
    {
      headText: "This plan for second shift students",
      bodyText:
        "make me 8 hour well study plan,where 1 pm to 5 pm my college time",
    },
    {
      headText: "Focus Your Studies Properly",
      bodyText: "How to Focus my Studies Properly",
    },
  ];
  const [askQuestion, setAskQuestion] = useState(Ask);
  return (
    <div className="bg-zinc-900 h-screen py-0 px-5 justify-between relative box-border">
      {/* <Image src={schoolbg} alt="" className={styles.schoolbg} /> */}
      <div className="z-10 absolute w-full  h-full ">
        <div className="flex items-center h-1/6 text-gray-900 text-xl gap-3 z-2">
          <p className="text-white text-xl ">Chat </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 z-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>

        {allMessages.length > 0 ? (
          <div className="h-4/6 w-full pl-10vw flex flex-col gap-6 overflow-auto">
            {allMessages.map((msg, index) => (
              <div key={index} className=" w-full ">
                <div className="flex gap-3 w-10/12">
                  <img
                    className="w-12 h-12 rounded-xl "
                    src={msg.role === "user" ? nouserlogo : chatgptlogo}
                    width={50}
                    height={50}
                    alt=""
                  />
                  <div className="flex flex-col gap-3">
                    <h2 className="text-gray-50 taxt-xl font-medium mt-1">
                      {msg.role === "user" ? "You" : "CHATGPT Bot"}
                    </h2>
                    <p
                      className={`text-gray-50 text-lg font-medium ${
                        msg.role === "model"
                          ? "bg-zinc-600 rounded-lg p-3 bg-opacity-40"
                          : ""
                      }`}
                    >
                      {msg.parts[0].text}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 w-10/12 ">
                  {msg.role === "model" ? (
                    <h5 className="flex gap-3 w-4/12 mt-2 justify-center">
                      {isPaused ? (
                        <div onClick={handleSpeak}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon-md text-white"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11 4.9099C11 4.47485 10.4828 4.24734 10.1621 4.54132L6.67572 7.7372C6.49129 7.90626 6.25019 8.00005 6 8.00005H4C3.44772 8.00005 3 8.44776 3 9.00005V15C3 15.5523 3.44772 16 4 16H6C6.25019 16 6.49129 16.0938 6.67572 16.2629L10.1621 19.4588C10.4828 19.7527 11 19.5252 11 19.0902V4.9099ZM8.81069 3.06701C10.4142 1.59714 13 2.73463 13 4.9099V19.0902C13 21.2655 10.4142 22.403 8.81069 20.9331L5.61102 18H4C2.34315 18 1 16.6569 1 15V9.00005C1 7.34319 2.34315 6.00005 4 6.00005H5.61102L8.81069 3.06701ZM20.3166 6.35665C20.8019 6.09313 21.409 6.27296 21.6725 6.75833C22.5191 8.3176 22.9996 10.1042 22.9996 12.0001C22.9996 13.8507 22.5418 15.5974 21.7323 17.1302C21.4744 17.6185 20.8695 17.8054 20.3811 17.5475C19.8927 17.2896 19.7059 16.6846 19.9638 16.1962C20.6249 14.9444 20.9996 13.5175 20.9996 12.0001C20.9996 10.4458 20.6064 8.98627 19.9149 7.71262C19.6514 7.22726 19.8312 6.62017 20.3166 6.35665ZM15.7994 7.90049C16.241 7.5688 16.8679 7.65789 17.1995 8.09947C18.0156 9.18593 18.4996 10.5379 18.4996 12.0001C18.4996 13.3127 18.1094 14.5372 17.4385 15.5604C17.1357 16.0222 16.5158 16.1511 16.0539 15.8483C15.5921 15.5455 15.4632 14.9255 15.766 14.4637C16.2298 13.7564 16.4996 12.9113 16.4996 12.0001C16.4996 10.9859 16.1653 10.0526 15.6004 9.30063C15.2687 8.85905 15.3578 8.23218 15.7994 7.90049Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      ) : (
                        <div onClick={handleStop}>
                          <svg
                            height="24px"
                            width="24px"
                            version="1.1"
                            id="_x32_"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 512.00 512.00"
                            xmlSpace="preserve"
                            className="text-white"
                            fill="#ffffff"
                            stroke="#"
                            strokeWidth="0.00512"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <style type="text/css"> </style>{" "}
                              <g>
                                {" "}
                                <path
                                  className="st0"
                                  d="M256,0C114.625,0,0,114.625,0,256s114.625,256,256,256s256-114.625,256-256S397.375,0,256,0z M328,328H184V184 h144V328z"
                                ></path>{" "}
                              </g>{" "}
                            </g>
                          </svg>
                        </div>
                      )}
                      <CopyToClipboard text={`${msg.parts[0].text}`}>
                        <button>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon-md text-white"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 3.5C10.8954 3.5 10 4.39543 10 5.5H14C14 4.39543 13.1046 3.5 12 3.5ZM8.53513 3.5C9.22675 2.3044 10.5194 1.5 12 1.5C13.4806 1.5 14.7733 2.3044 15.4649 3.5H17.25C18.9069 3.5 20.25 4.84315 20.25 6.5V18.5C20.25 20.1569 19.1569 21.5 17.25 21.5H6.75C5.09315 21.5 3.75 20.1569 3.75 18.5V6.5C3.75 4.84315 5.09315 3.5 6.75 3.5H8.53513ZM8 5.5H6.75C6.19772 5.5 5.75 5.94772 5.75 6.5V18.5C5.75 19.0523 6.19772 19.5 6.75 19.5H17.25C18.0523 19.5 18.25 19.0523 18.25 18.5V6.5C18.25 5.94772 17.8023 5.5 17.25 5.5H16C16 6.60457 15.1046 7.5 14 7.5H10C8.89543 7.5 8 6.60457 8 5.5Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </button>
                      </CopyToClipboard>
                    </h5>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-end items-center text-gray-900 text-2xl h-4/6 relative">
            <img src={chatgptlogo} alt="chatgpt" height={70} width={70} />
            <div className="flex gap-3 items-center  top-2/6 left-1/2">
              <h1 className="text-3xl font-normal text-white my-3">
                How can I help you today?
              </h1>
            </div>
            <div className="flex flex-wrap w-4/5 gap-3 justify-center overflow-auto">
              {askQuestion &&
                askQuestion.map((ask, i) => (
                  // console.log("ASK", ask.bodyText),
                  <div
                    key={i}
                    className="flex flex-col p-2 w-96 rounded-lg border-2 border-solid border-gray-200 justify-center items-center"
                  >
                    <h2 className="text-lg font-medium my-2 text-gray-50">
                      {ask?.headText}
                    </h2>
                    <div
                      onClick={() => {
                        setMessage(ask.bodyText);
                      }}
                    >
                      <p className="text-lg font-normal text-gray-500">
                        {ask.bodyText}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        <div className="h-1/5 flex flex-col justify-end items-center gap-5 z-10 ">
          <div className="border-1 border-solid border-gray-500 items-center flex p-4 mb-2 rounded-lg justify-between w-4/5 ">
            <input
              className="bg-gray-300 border-none outline-none rounded-xl p-2 text-xl text-gray-950 w-screen mt-2"
              type="text"
              placeholder="Message CHATGPT Bot..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />

            {isSent ? (
              <svg
                onClick={sendMessage}
                className="w-10 h-10 m-1 bg-zinc-950  p-2 rounded-md hover:cursor-pointer hover:bg-zinc-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={4.5}
                stroke="#36d7b7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
              </svg>
            ) : (
              <HashLoader className="ml-2" color="#36d7b7" size={30} />
            )}
            <div onClick={handleListing}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-mic"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
