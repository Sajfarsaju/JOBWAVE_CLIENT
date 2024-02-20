import { useNavigate } from "react-router-dom"
import mobileLogo from "/src/assets/mobileLogo.png"


function SectionThree() {

    const navigate = useNavigate()

    function Navigate() {

        navigate('/jobs')
    }

    return (
        <div className="bg-slate-100 font-dm-sans flex flex-col sm:flex-row h-auto">
            {/* Left Half with Image */}
            <div className="sm:flex-1 flex items-center justify-center p-16">
                <img src={mobileLogo} alt="Sample Image" className="max-w-full max-h-full" />
            </div>

            {/* Right Half with Text Content */}
            <div className="sm:flex-1 flex items-center justify-center">
                <div className="p-8 sm:p-20">
                    <p className="text-rgb-text text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-normal lg:pt-14 hover:scale-105 duration-500">We Build Lasting Relationships Between Candidates & Businesses</p>

                    <div className="">
                        <p className="text-md mt-8" style={{ color: 'rgba(109, 110, 141, 1)' }}>The automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes. Placeholder text commonly used.</p>
                        <p className="text-md mt-8" style={{ color: 'rgba(109, 110, 141, 1)' }}>Automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes. Placeholder text commonly used.</p>

                        <button onClick={Navigate} className="flex lg:justify-center xl:justify-center mt-8 text-white px-8 lg:px-16 py-3 rounded mx-auto lg:mx-0" style={{ backgroundColor: 'rgba(0, 13, 255, 1)' }}>
                            Find Talent
                        </button>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionThree