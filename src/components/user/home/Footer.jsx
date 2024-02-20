import { useNavigate } from "react-router-dom"
import jobWaveLogo from "/src/assets/JOBWAVELOGO.png"

function Footer() {

    const navigate = useNavigate()

    function Navigate() {
        navigate('/jobs')
    }

    return (
        <footer className="font-dm-sans font-normal bg-slate-100 text-white py-8">
            <div className="container mx-auto px-4 sm:px-4 md:px-4 lg:px-8 xl:px-8 flex flex-col sm:flex-row justify-center">
                <div className="w-full sm:w-1/3 flex flex-col items-start p-4">
                    <img className='w-28 h-28' src={jobWaveLogo} alt="" />
                    <p className='' style={{ color: 'rgba(109, 110, 141, 1)' }}>The automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes.</p>
                </div>

                <div className="w-full sm:w-1/3 flex flex-col md:items-center lg:items-center xl:items-center items-start p-4">
                    <ul className="flex flex-col sm:items-start" style={{ color: 'rgba(109, 110, 141, 1)' }}>
                        <h2 className="text-lg font-normal mb-4 text-rgb-text text-start">Useful links</h2>
                        <li className="mb-3">Design & creatives</li>
                        <li className="mb-3">Telecommunication</li>
                        <li className="mb-3">Restaurant</li>
                        <li className="mb-3">Programing</li>
                        <li className="mb-3">Architecture</li>
                    </ul>
                </div>

                <div className="w-full sm:w-1/3 flex flex-col items-start p-4">
                    <h2 className="text-lg font-normal mb-4 text-rgb-text">Subscribe Newsletter</h2>
                    <p className='' style={{ color: 'rgba(109, 110, 141, 1)' }}>Subscribe to our newsletter to get updates about new jobs and exciting career opportunities.</p>
                    <button onClick={Navigate} className="flex justify-center sm:justify-start lg:justify-start xl:justify-start text-center text-white px-8 sm:px-10 py-3 rounded mx-auto lg:mx-0 mt-12 md:mt-auto lg:mt-auto xl:mt-auto mb-6 " style={{ backgroundColor: 'rgba(0, 13, 255, 1)' }}>
                        Find Talent
                    </button>
                </div>
            </div>

            {/* Copyright Text */}
            <div className="text-center mt-8 text-sm font-normal " style={{ color: 'rgba(109, 110, 141, 1)' }}>
                &copy; 2024 JobWave. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer