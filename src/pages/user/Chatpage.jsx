import Navbar from '../../components/user/home/Navbar'
// import Footer from '../../components/company/home/Footer'
import Chatbox from '../../components/chat/Chatbox'
import { WebSocketProvider , socketConnection} from '../../context/UserAuthContext'


export default function Chatpage() {
  
  return (
    <>
        <Navbar/>
        
        <WebSocketProvider value={socketConnection}>
        <Chatbox senderRole={'users'} reciverRole={'company'}/>
        </WebSocketProvider>
        {/* <Footer/> */}
    </>
  ) 
}