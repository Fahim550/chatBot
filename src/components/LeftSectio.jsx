import React from "react";
import chatgptlogo from "../assets/chatgptlogo.png";
import nouserlogo from "../assets/nouserlogo.png";

export default function LeftSectio() {
  const allChats = [
    {
      id: 1,
      chatName: "This is sample Chat 1",
    },
    {
      id: 2,
      chatName: "This is sample Chat 2",
    },
    {
      id: 3,
      chatName: "This is sample Chat 3",
    },
    {
      id: 4,
      chatName: "This is sample Chat 4",
    },
    {
      id: 5,
      chatName: "This is sample Chat 5",
    },
  ];
  return (
    <div className="bg-zinc-950 h-full flex flex-col justify-between">
      <div className="flex  justify-between items-center py-0 px-5 h-2/12">
        <div className="flex items-center gap-3 mt-3">
          <img
            src={chatgptlogo}
            className="rounded-2xl"
            alt="ChatGPT"
            width={30}
            height={30}
          />
          <p className="text-white size-5">NewChat</p>
        </div>
        <button  onClick={() => {
            window.location.reload(false);
          }}>
        <svg
         
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-white items-end  "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
        </button>
        
      </div>
      <div className="h-8/12 overflow-auto flex flex-col gap-5 py-2 px-5">
        <h2 >Recent Ask</h2>
        {allChats.map((chat) => (
          <div key={chat.id} className=" py-2 w-10/12">
            <p className="text-white ">{chat.chatName}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-items-center items-center py-0 px-5 h-2/12">
        <img
          src={nouserlogo}
          className="rounded-2xl "
          alt="ChatGPT"
          width={50}
          height={50}
        />
        <p className="text-white mx-2">Guest</p>
      </div>
    </div>
  );
}
