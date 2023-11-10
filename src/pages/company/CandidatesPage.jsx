import ListCandidates from "../../components/company/candidates/ListCandidates"
import Footer from "../../components/company/home/Footer"
import Navbar from "../../components/company/home/Navbar"


export default function CandidatesPage() {
  return (
    <>
        <Navbar/>
        <ListCandidates/>
        <Footer/> 
    </>
  )
}