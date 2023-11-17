import { useEffect, useRef, useState } from 'react'
import { useSelector } from "react-redux";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Axios_Instance from '../../api/userAxios';
import { useNavigate, useParams } from 'react-router-dom';
import { socketConnection } from '../../context/UserAuthContext';


export default function Chatbox({ senderRole, reciverRole }) {

  const navigate = useNavigate()
  const { companyId } = useParams();

  const [inboxChatList, setInboxChatList] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false)
  // ?
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [selectedChat, setSelectedChat] = useState({})
  const [spinner, setSpinner] = useState(true);

  const currentPersonId = useSelector((state) =>
    senderRole === "company" ? state.company.id : state.user.id
  );

  const currentPersonRole = senderRole === "company" ? "company" : "users";

  useEffect(() => {
    if (allMessages) {
      scroll.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [allMessages])



  useEffect(() => {

    (async function fetchData() {

      try {

        if (senderRole === 'users') {

          const response = await Axios_Instance.get(`/chats?compId=${companyId}&senderRole=${senderRole}`);
          if (response.status === 200) {

            openChatBox(response.data.selectedChat);
            setInboxChatList(response.data.chatList)
            setIsInitialRender(false);
          }
        } else {

          const response = await Axios_Instance.get(`/company/chats?senderRole=${senderRole}`);

          if (response.status === 200) {
            setInboxChatList(response.data.chatList)
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [senderRole]);


  const sendMessage = async (e) => {
    e.preventDefault()

    if (newMessage.trim() === "") return;

    const newMessageData = {
      content: newMessage,
      chatId: selectedChat._id,
      senderId: { _id: currentPersonId },
      senderRole: currentPersonRole,
      createdAt: new Date(),
    };

    setAllMessages((prevMessages) => [
      ...prevMessages,
      newMessageData,
    ]);
                         
    socketConnection.emit(`send_message`, newMessageData)
    setNewMessage("")

  };

  useEffect(() => {
    if (!isInitialRender && selectedChat) {

      socketConnection.emit('join_room', { room: selectedChat._id });
    }
  }, [selectedChat]);

  const joinRoomCompany = (selectedUser) => {

    if (senderRole === 'company') {

      setSelectedChat(selectedUser)

      socketConnection.emit('join_room', { room: selectedUser._id })
    }

  }


  // useEffect(() => {
  //   socketConnection.on("message_response", (data) => {
  //     setInboxChatList((prevInboxChats) => {
  //       // Check if the response is already in the inboxChatList array
  //       if (!prevInboxChats.some((chat) => chat._id === data._id)) {
  //         // If not, add it to the array
  //         return [...prevInboxChats, data];
  //       }
  //       return prevInboxChats; // If it's already in the array, no need to update
  //     });
  //   });
  // }, []);
  useEffect(() => {
    if (socketConnection && selectedChat) {

      socketConnection.on("message_response", (data) => {
        
        setAllMessages((prevChats) => [...prevChats, data]);
      });
      
    }
  }, [socketConnection]);


  const formatMessageTime = (timestamp) => {
    const messageTime = new Date(timestamp);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return messageTime.toLocaleString(undefined, options);
  };


  const openChatBox = (selectedChat) => {

    let companyId = selectedChat.companyId._id
    const chatId = selectedChat._id

    joinRoomCompany(selectedChat)
    
    setSelectedChat(selectedChat);
    setIsChatOpen(true);

    if (senderRole === 'users') {
      navigate(`/chats/${companyId}`)
      Axios_Instance.get(`/openChat?chatId=${chatId}`).then((res) => {

        if(res.status === 200){
          setSpinner(false)
          setAllMessages(res.data.allMessages);
        }
      })
    } else {
      // navigate(`/chats/${userId}`)
      Axios_Instance.get(`/company/openChat?chatId=${chatId}`).then((res) => {
        
        if(res.status === 200){
          setSpinner(false)
          setAllMessages(res.data.allMessages);
        }
      })
    }
  }


  return (
    <div className={`"container mx-auto " ${senderRole === 'company' ? 'mt-24' : 'mt-3'}`}>
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">
          <div className="mx-3 my-3 ">
            <div className="relative  text-gray-600 ">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="search"
                className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                placeholder="Search"
                required
              />
            </div>
          </div>

          <ul className={`${isChatOpen ? 'hidden lg:overflow-auto lg:h-[32rem] lg:block ' : 'overflow-auto lg:h-[32rem]'}`}>
            <h2 className="my-2 mb-2 ml-2 text-lg font-serif text-gray-600">Chats</h2>

            {/* ChatList */}
            <li className=''>
              {inboxChatList.map((chat) => (

                <div
                  key={chat._id}
                  onClick={() => openChatBox(chat)}
                  className={`${chat?.companyId?.companyName === selectedChat?.companyId?.companyName ? 'lg:bg-sky-200 xl:bg-sky-200 flex items-center px-3 py-2  text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer ' :
                    'flex items-center px-3 py-2  text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-slate-200 focus:outline-none'}`}
                >
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={senderRole === 'users' ? chat?.companyId?.profile : chat?.userId?.profile}
                    alt="username"
                  />
                  <div className="w-full pb-2"
                  >
                    <div className="flex justify-between"
                      >
                      <span className="block ml-2 font-semibold text-gray-600">
                        {senderRole === 'users' ? chat?.companyId?.companyName : chat?.userId?.firstName} {senderRole === 'company' && chat?.userId?.lastName}
                      </span>
                      <span className="block ml-2 text-sm text-gray-600">10 unread messages</span>
                    </div>
                    <span className="block ml-2 text-sm text-gray-600">time</span>
                  </div>
                </div>
              ))}
            </li>
            
            {/* End ChatList*/}
          </ul>
        </div>


        {/* Right box */}
{isChatOpen ? (
  <div className="lg:col-span-2 lg:block">
    <div className="w-full">

      <div className="relative flex bg-slate-100 items-center p-3 border-b border-gray-300">
        <AiOutlineArrowLeft className={`lg:hidden`} onClick={() => setIsChatOpen(false)} />
        {selectedChat && (
          <>
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={senderRole === 'users' ? selectedChat?.companyId?.profile : selectedChat?.userId?.profile}
              alt=""
            />
            <span className="block ml-2 font-bold text-gray-600">
              {senderRole === 'users' ? selectedChat?.companyId?.companyName : selectedChat?.userId?.firstName} {senderRole === 'company' && selectedChat?.userId?.lastName}
            </span>
          </>
        )}
      </div>

      {/* Message area */}
      <div className="relative w-full p-6 overflow-y-auto h-[28rem]">
        {allMessages.length === 0 && isChatOpen ? (
          <div className="flex items-center justify-center h-full">
            <div className="p-6 bg-slate-100 shadow-md shadow-gray-400 rounded-lg">
              <p className="text-center font-serif text-lg text-gray-700">No messages yet. Start the conversation!</p>
            </div>
          </div>
        ) : (
          <ul className="space-y-2">
            {allMessages.map((message, index) => (
              <li key={index} >
                <div className={`${currentPersonId === message.senderId._id ? "flex justify-end" : "flex justify-start"}`} >
                  <div
                    className={`relative px-3 py-2 w-fit text-gray-800 rounded-xl shadow border inline-block chat-bubble
                              ${currentPersonId === message.senderId._id ? "bg-green-300 rounded-br-none" : "bg-green-200 rounded-tl-none"}`}
                  >
                    <span className="block break-all">{message.content}</span>
                    <span className="text-xs flex justify-end">{formatMessageTime(message.createdAt)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* End Message area */}

      <form onSubmit={sendMessage} className="flex items-center justify-between w-full p-3 border-t border-gray-300">
        <input
          type="text"
          placeholder="Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
          name="message"
          required
        />
        <button type='submit'>
          <svg
            className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </div>
  </div>
) : (
  <div className="lg:col-span-2 flex items-center justify-center lg:block bg-slate-100 p-6">

  <p className="text-center text-gray-700 text-lg">Select a chat to start the conversation.</p>

</div>
  // <div className="flex items-center justify-center h-full">
  // <div className="lg:col-span-2 lg:block p-6 bg-slate-100 shadow-md shadow-gray-400 rounded-lg">
  //   <p className="text-center font-serif text-lg text-gray-700">Select a chat to start the conversation.</p>
  // </div>
  // </div>
)}
      </div>
    </div>
  )
}