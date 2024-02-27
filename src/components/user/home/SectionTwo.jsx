import { Link, useNavigate } from 'react-router-dom'
import '../../../assets/css/tooltip.css'

function SectionTwo({ JobData }) {

    const navigate = useNavigate()

    const MAX_DESCRIPTION_LENGTH = 150;
    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + '...';
        }
        return text;
    }


    const getTimeDifference = (postedDate) => {
        const currentDate = new Date();
        const postedTime = new Date(postedDate);

        const timeDifference = currentDate - postedTime;

        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(weeks / 4);

        if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (weeks > 0) {
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `few seconds ago`
        }
    };

    function toUpperCase(companyName) {
        return companyName.toUpperCase()
    }

    function navigateJobView() {
        navigate('/jobs')
    }

    return (
        <div className="font-dm-sans bg-white flex flex-col items-center justify-center h-auto md:h-auto sm:h-auto">

            <div className="text-center">
                <div>
                    <h1 className='font-dm-sans pt-12 text-5xl lg:text-8xl xl:text-8xl' style={{ color: 'rgba(0, 13, 255)' }}>1000+</h1>
                </div>
                <div className="text-xl lg:text-3xl xl:text-3xl mt-5" style={{ color: '#00044A' }}>Browse From Our Top Jobs</div>
                <p className="text-sm md:text-md lg:text-md xl:text-md mt-6 max-w-[500px] mx-auto" style={{ color: 'rgb(109, 110, 141)' }}>
                    The automated process starts as soon as your clothes go into the machine.
                    The outcome is gleaming. Placeholder text commonly used.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-4 lg:gap-1 xl:gap-1 mt-0 sm:py-10 py-10 md:py-10 lg:py-20 xl:py-20">
                    {/* Job Card  */}
                    {JobData.length > 0 && JobData.map((job) => (
                        <div key={job._id} className="dark:bg-white shadow-sm shadow-gray-300 border-2 border-gray-50 lg:h-72 xl:h-72 h-64 md:h-full p-4 sm:p-2 md:p-3 lg:p-4 mx-5 md:mx-5 lg:mx-5">
                            <div className="flex justify-between items-center mb-2">
                                {/* Job Logo (Left) */}
                                {/* Tooltip for company detail */}
                                <div className='has-tooltip'>
                                    <span className='tooltip rounded-md shadow-lg p-1 text-gray-800 -mt-11 sm:-mt-12 md:-mt-12'>
                                        about company</span>
                                    <Link to={`/about_company/${job?.companyId?._id}`}>
                                        <img src={job?.companyId?.profile} alt="Job Logo" className="w-16 h-16 cursor-pointer" />

                                    </Link>
                                </div>
                                {/* End Tooltip for company detail */}
                                {/* Job Type Button and Active Now Text (Right) */}
                                <div className="flex flex-col items-end">
                                    {/* <button className="bg-sky-100 text-sky-600 px-2 py-1 rounded-md text-sm">{job.workType}</button> */}
                                    <button className="bg-sky-100 text-sky-600 px-2 py-1 rounded-md text-sm">{job.workType} role</button>
                                    <p className="text-green-500 text-xs mt-5">{job.status === 'Active' ? 'Actively Hiring' : ''}</p>
                                </div>
                            </div>
                            {/* Job Title */}
                            {/* <h1 className="text-s font-normal text-left md:mt-6 lg:mt-4 xl:mt-4">{job?.companyId?.companyName}</h1> */}
                            <h2 className="text-sm text-green-500 font-normal text-left md:mt-6 lg:mt-4 xl:mt-4">{getTimeDifference(job.createdAt)}</h2>
                            <h2 onClick={navigateJobView} className="cursor-pointer lg:text-2xl xl:text-2xl md:text-xl text-lg mt-4 font-normal text-left" style={{ color: 'rgba(0, 4, 74, 1)' }}>{job.jobTitle}</h2>

                            {/* Job Description */}
                            <p className="text-xs lg:text-sm xl:text-sm md:mt-3 mt-2 text-left" style={{ color: 'rgba(109, 110, 141, 1)' }}> <span style={{ color: 'rgba(0, 4, 74, 1)' }}>{toUpperCase(job?.companyId?.companyName)} :</span> {truncateText(job.jobDescription, MAX_DESCRIPTION_LENGTH)}</p>
                            <h1 className='text-xs lg:text-base xl:text-base md:mt-3 mt-2 text-left cursor-pointer' onClick={navigateJobView} style={{ color: 'rgba(0, 13, 255, 1)' }}>Browse Jobs</h1>
                        </div>
                    ))}
                    {/* Job Card */}

                </div>


            </div>
        </div>
    )
}

export default SectionTwo