import { useNavigate } from "react-router-dom"


function SectioFour() {

    const navigate = useNavigate()

    function Navigate() {
        navigate('/jobs')
    }

    return (
        <div className="font-dm-sans font-normal flex flex-col items-center">
            {/* Heading at the Top */}
            <h1 className="text-rgb-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-12 text-center mb-4 sm:mb-0">Browse From Top Categories</h1>

            {/* Additional Text Below */}
            <div className='px-6 sm:px-12 md:px-24 lg:px-48 xl:px-72'>
                <p className="text-md text-center mt-9 " style={{ color: 'rgba(109, 110, 141, 1)' }}>The automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes. Placeholder text commonly used.</p>
            </div>

            {/* Grid Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mx-auto lg:mx-0">
                {/* Box 1 */}
                <div className="dark:bg-white border-2 border-gray-50 shadow-md shadow-gray-200 h-72 w-64 md:h-68 lg:h-68 md:w-80 lg:w-72 rounded-md p-6">
                    <img src="https://media.istockphoto.com/id/1345681613/vector/creative-people-logo-vector-illustration-design-editable-resizable-eps-10.jpg?s=612x612&w=0&k=20&c=9XUHICA1ljbxBcLw8ERp0kDDxLNQ8Bp2yR4aUSS6SBs=" alt="Logo 1" className="h-16 w-24 md:h-16 bg-slate-400 md:w-28 rounded-full mb-4" />
                    <h2 className="text-xl text-rgb-text mb-2">Design & creatives</h2>
                    <p className="text-sm" style={{ color: 'rgba(109, 110, 141, 1)' }}>The automated process starts as soon as your clothes go into the machine, ensuring efficiency and convenience for your daily chores.</p>
                    <button className='mt-4 cursor-pointer' onClick={Navigate} style={{ color: 'rgba(0, 13, 255, 1)' }}>Browse Jobs</button>
                </div>

                {/* Box 2 */}
                <div className="dark:bg-white border-2 border-gray-50 shadow-md shadow-gray-200 h-72 w-64 md:h-68 lg:h-68 md:w-80 lg:w-72 rounded-md p-6">
                    <img src="https://img.freepik.com/premium-vector/business-finance-vector-logo-design_487414-4162.jpg" alt="Logo 2" className="h-16 w-24 md:h-16 bg-slate-400 md:w-28 rounded-full mb-4" />
                    <h2 className="text-xl text-rgb-text mb-2">Finance</h2>
                    <p className="text-sm" style={{ color: 'rgba(109, 110, 141, 1)' }}>The automated process starts as soon as your clothes go into the machine, ensuring efficiency and convenience for your daily chores.</p>
                    <button className='mt-4 cursor-pointer' onClick={Navigate} style={{ color: 'rgba(0, 13, 255, 1)' }}>Browse Jobs</button>
                </div>

                {/* Box 3 */}
                <div className="dark:bg-white border-2 border-gray-50 shadow-md shadow-gray-200 h-72 w-64 md:h-68 lg:h-68 md:w-80 lg:w-72 rounded-md p-6">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnTlNDJg-IriTH1lKavE62_13KwhSWxU6et07s1SeXcujuDGzWbI5bqejZj-d_J_N08xg&usqp=CAU" alt="Logo 3" className="h-16 w-24 md:h-16 bg-slate-400 md:w-20 rounded-full mb-4" />
                    <h2 className="text-xl text-rgb-text mb-2">Marketing</h2>
                    <p className="text-sm" style={{ color: 'rgba(109, 110, 141, 1)' }}>The automated process starts as soon as your clothes go into the machine, ensuring efficiency and convenience for your daily chores.</p>
                    <button className='mt-4 cursor-pointer' onClick={Navigate} style={{ color: 'rgba(0, 13, 255, 1)' }}>Browse Jobs</button>
                </div>

                {/* Box 4 (Row 2) */}
                <div className="dark:bg-white border-2 border-gray-50 shadow-md shadow-gray-200 h-72 w-64 md:h-68 lg:h-68 md:w-80 lg:w-72 rounded-md p-6">
                    <img src="https://media.istockphoto.com/id/1312665318/vector/medical-logo-design-vector.jpg?s=612x612&w=0&k=20&c=dp5fFItTDGnZy8j1gB0GVjqVyJPG_Xznp_JTRZFXCXs=" alt="Logo 4" className="h-16 w-24 md:h-14 bg-slate-400 md:w-28 rounded-full mb-4" />
                    <h2 className="text-xl text-rgb-text mb-2">Health/Medical</h2>
                    <p className="text-sm" style={{ color: 'rgba(109, 110, 141, 1)' }}>The automated process starts as soon as your clothes go into the machine, ensuring efficiency and convenience for your daily chores.</p>
                    <button className='mt-4 cursor-pointer' onClick={Navigate} style={{ color: 'rgba(0, 13, 255, 1)' }}>Browse Jobs</button>
                </div>

                {/* Box 5 (Row 2) */}
                <div className="dark:bg-white border-2 border-gray-50 shadow-md shadow-gray-200 h-72 w-64 md:h-68 lg:h-68 md:w-80 lg:w-72 rounded-md p-6">
                    <img src="data:image/jpeg;base64,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" alt="Logo 5" className="h-16 w-24 md:h-14 bg-slate-400 md:w-28 rounded-full mb-4" />
                    <h2 className="text-xl text-rgb-text mb-2">Corporate</h2>
                    <p className="text-sm" style={{ color: 'rgba(109, 110, 141, 1)' }}>The automated process starts as soon as your clothes go into the machine, ensuring efficiency and convenience for your daily chores.</p>
                    <button className='mt-4 cursor-pointer' onClick={Navigate} style={{ color: 'rgba(0, 13, 255, 1)' }}>Browse Jobs</button>
                </div>

                {/* Box 6 (Row 2) */}
                <div className="dark:bg-white border-2 border-gray-50 shadow-md shadow-gray-200 h-72 w-64 md:h-68 lg:h-68 md:w-80 lg:w-72 rounded-md p-6">
                    <img src="https://img.freepik.com/free-vector/quill-pen-logo-template_23-2149852429.jpg" alt="Logo 6" className="h-16 w-24 md:h-14 bg-slate-400 md:w-24 rounded-full mb-4" />
                    <h2 className="text-xl text-rgb-text mb-2">Copywriting</h2>
                    <p className="text-sm" style={{ color: 'rgba(109, 110, 141, 1)' }}>The automated process starts as soon as your clothes go into the machine, ensuring efficiency and convenience for your daily chores.</p>
                    <button className='mt-4 cursor-pointer' onClick={Navigate} style={{ color: 'rgba(0, 13, 255, 1)' }}>Browse Jobs</button>
                </div>
            </div>
            {/* End Grid */}

            <div className="w-10/12 sm:w-10/12 md:w-5/6 lg:w-4/6 xl:w-4/6 mx-auto my-16 flex items-center justify-center relative rounded-xl" style={{ backgroundColor: 'rgba(0, 13, 255, 1)', height: '400px' }}>
                <div className='sm:p-10 p-8 md:p-24 lg:p-40 z-10 mb-28'>
                    <div className='flex items-start justify-between'>
                        <div className='w-12 h-12 sm:w-12 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 flex items-start'>
                            <img src="/src/assets/SemiColonStyle.png" alt="" className='w-full h-full object-contain' />
                        </div>
                        <div className='w-12 h-12 sm:w-12 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 flex items-start'>
                            <img src="/src/assets/SemiColonStyle.png" alt="" className='w-full h-full object-contain' />
                        </div>
                    </div>
                    <p className="text-white text-center text-sm md:text-2xl lg:text-2xl mt-3">
                        The automated process starts as soon as your clothes go into the machine. This site outcome is gleaming clothes. Placeholder text commonly used. In publishing and graphic.
                    </p>
                </div>
                <div className="absolute bottom-0 right-0 mb-0 w-32 h-20 sm:w-40 sm:h-28 md:w-48 md:h-32 lg:w-56 lg:h-40 xl:w-72 xl:h-48">
                    {/* Your image component goes here */}
                    <img src="/src/assets/roundedStyle.png" alt="" className="w-full h-full object-cover" />
                </div>

            </div>
        </div>
    )
}

export default SectioFour