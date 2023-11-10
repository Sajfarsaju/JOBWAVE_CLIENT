import Navbar from '../../components/company/home/Navbar'
import Chatbox from '../../components/chat/Chatbox'


function ChatPage() {
  return (
    <>
        <Navbar/>
        <Chatbox senderRole={'company'} reciverRole={'users'}/>

    </>
  )
}

export default ChatPage