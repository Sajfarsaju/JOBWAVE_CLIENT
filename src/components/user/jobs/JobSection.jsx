import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import Axios_Instance from '../../../api/userAxios';
import { Link, useNavigate } from 'react-router-dom'
import PlanModal from '../subscriptionPlan/PlanModal'
// import Skelton from './Skelton'
import { useSelector } from 'react-redux'
import { MdKeyboardArrowDown } from "react-icons/md";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { userLogout } from '../../../store/slice/userSlice'
import NoResultGif from '../../../assets/097297f8e21d501ba45d7ce437ed77bd.gif'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Spinner from '../../Spinner';



function JobSection({ searchQuery }) {

    const navigate = useNavigate()

    const dispatch = useDispatch()


    const userId = useSelector((state) => state.user.id)
    const { token } = useSelector((state) => state.user)

    const [userData, setUserData] = useState({})
    const [openPlanModal, setOpenPlanModal] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [Jobs, setJobs] = useState([]);
    const [skelton, setSkelton] = useState(true)
    // Search
    const [SearchJobs, setSearchJobs] = useState([]);
    const [showSearchResultsCount, setShowSearchResultsCount] = useState(false);
    const filterJobs = (query) => {
        return Jobs.filter((job) =>
            job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
            job.jobCategory.toLowerCase().includes(query.toLowerCase()) ||
            job?.companyId?.companyName.toLowerCase().includes(query.toLowerCase()) ||
            job.workType.toLowerCase().includes(query.toLowerCase()) ||
            job.workplace.toLowerCase().includes(query.toLowerCase())
        );
    };

    useEffect(() => {
        setSearchJobs(filterJobs(searchQuery));
        setShowSearchResultsCount(SearchJobs.length > 0);
    }, [Jobs, searchQuery]);
    // End


    const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState(SearchJobs);

    useEffect(() => {
        const newFilteredJobs = SearchJobs.filter((job) => {
            const matchesCategory =
                selectedFilters.length === 0 ||
                selectedFilters.includes(job.jobCategory);

            const matchesWorkType =
                selectedWorkTypes.length === 0 ||
                selectedWorkTypes.includes(job.workType);

            return matchesCategory && matchesWorkType;
        });

        setFilteredJobs(newFilteredJobs);
        // Calculate the total length by adding the lengths of both arrays
        const totalLength = SearchJobs.length + newFilteredJobs.length;

        // Update the showSearchResultsCount with the total length
        setShowSearchResultsCount(totalLength > 0);
    }, [selectedFilters, selectedWorkTypes, SearchJobs]);

    const toggleFilter = (category) => {
        if (selectedFilters.includes(category)) {
            setSelectedFilters(selectedFilters.filter((filter) => filter !== category));
        } else {
            setSelectedFilters([...selectedFilters, category]);
        }
    };
    const toggleWorkTypeFilter = (workType) => {
        if (selectedWorkTypes.includes(workType)) {
            setSelectedWorkTypes(selectedWorkTypes.filter((type) => type !== workType));
        } else {
            setSelectedWorkTypes([...selectedWorkTypes, workType]);
        }
    };





    const fetchUserSubscription = async () => {
        try {
            const response = await Axios_Instance.get(`/plan?userId=${userId}`);
            if (response.status === 200) {
                setUserData(response.data.user);
            }

        } catch (error) {
            console.log(error);

            //? If blocked user 
            if (error?.response?.data?.isBlocked) {
                dispatch(userLogout());
                toast.error(error?.response?.data?.errMsg);
            }
        }
    }
    useEffect(() => {

        fetchUserSubscription()
    }, [])

    const [uniqueCategories, setUniqueCategories] = useState([])
    const [uniqueWorkTypes, setUniqueWorkTypes] = useState([])
    const [limit, setLimit] = useState(6);
    const [jobTotalLength, setJobTotalLength] = useState();
    async function fetchJobs() {
        //? FETCH JOBS START
        try {
            const res = await Axios_Instance.get(`/jobs`, {
                params: {
                    userId,
                    search: searchQuery,
                    limit,
                    filters: selectedFilters.join(','),
                    worktype: selectedWorkTypes.join(',')
                }
            });
            setSkelton(false)
            setJobs(res.data.Jobs);
            setUniqueCategories(res.data.uniqueCategories)
            setUniqueWorkTypes(res.data.uniqueWorkTypes)
            setJobTotalLength(res.data.JobsLength)

        } catch (error) {
            console.log(error);

            //? If blocked user 
            if (error?.response?.data?.isBlocked) {
                dispatch(userLogout());
                toast.error(error?.response?.data?.errMsg);
            }

        }
    }
    useEffect(() => {
        fetchJobs()
    }, [token, searchQuery, limit, selectedFilters, selectedWorkTypes])

    //? FETCH JOBS END


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


    //? Create chat user

    const createChat = async (companyId) => {

        try {

            if (userData.subscriptionPlan) {

                navigate(`/chats/${companyId}`)

                const res = await Axios_Instance.post(`/chats`, { compId: companyId, senderRole: "users" });


            } else {
                //? Open subscription plan if user haven't plan
                setOpenPlanModal(true)
            }
        } catch (error) {
            console.log(error)
            //? If blocked user 
            if (error?.response?.data?.isBlocked) {
                toast.error(error?.response?.data?.errMsg);
            }
        }
    }
    //?End Create chat user



    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <>
            <PlanModal setOpenPlanModal={setOpenPlanModal} openPlanModal={openPlanModal} />

            <div className='bg-white font-dm-sans font-normal'>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-gray-100 py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 p-2 text-gray-800"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6 text-gray-700" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">


                                        <Disclosure as="div" key='' className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-gray-100 px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">Job Category</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    // <MinusIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
                                                                    <IoIosArrowUp className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    // <PlusIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
                                                                    <IoIosArrowDown className="h-5 w-5 text-gray-700" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-6">
                                                            {uniqueCategories.map((category, optionIdx) => (
                                                                <div key={optionIdx} className="flex items-center">
                                                                    <input
                                                                        id={`filter-category-${optionIdx}`}
                                                                        name={`category[]`}
                                                                        value={category}
                                                                        type="checkbox"
                                                                        checked={selectedFilters.includes(category)}
                                                                        onChange={() => toggleFilter(category)}
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-category-${optionIdx}`}
                                                                        className="ml-3 text-sm text-gray-600"
                                                                    >
                                                                        {category}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                        {/* category filter end */}

                                        <Disclosure as="div" key='' className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-gray-100 px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">Job Types</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-6">
                                                            {uniqueWorkTypes.map((workType, optionIdx) => (
                                                                <div key={optionIdx} className="flex items-center">
                                                                    <input
                                                                        id={`filter-job-type-${optionIdx}`}
                                                                        name={`workType[]`}
                                                                        value={workType}
                                                                        type="checkbox"
                                                                        checked={selectedWorkTypes.includes(workType)}
                                                                        onChange={() => toggleWorkTypeFilter(workType)}
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-job-type-${optionIdx}`}
                                                                        className="ml-3 text-sm text-gray-600"
                                                                    >
                                                                        {workType}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-20">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-2xl lg:text-2xl xl:text-2xl">
                            Find Jobs
                        </h1>

                        <div className="flex items-center">
                            {/* <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button> */}

                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-600 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="text-gray-600">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>


                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        {/* <h2 id="products-heading" className="text-black text-lg font-semibold">
                            Filter Your dream
                        </h2> */}

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 md:grid-cols-1 ">
                            {/* Filters */}
                            <form className=" hidden lg:block w-8/12">
                                <h3 className="sr-only">Categories</h3>

                                {/* FILTER START POINT */}
                                <Disclosure as="div" className="border-b border-gray-200 py-4 flex-col items-end">
                                    {({ open }) => (
                                        <>
                                            <h3 className=" flow-root">
                                                <Disclosure.Button className="flex ml-[33%] w-2/4 justify-between bg-lg:col-span-3-100  text-sm text-gray-400 hover:text-gray-500">
                                                    <span className=" font-semibold text-md text-gray-900 ">Job Category</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            // <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            <IoIosArrowUp className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            // <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            <IoIosArrowDown className="h-5 w-5 text-gray-700" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6 ml-[33%] w-2/4">
                                                <div className="space-y-4">
                                                    {uniqueCategories.map((category, optionIdx) => (
                                                        <div key={optionIdx} className="flex items-center">
                                                            <input
                                                                id={`filter-category-${optionIdx}`}
                                                                name={`category[]`}
                                                                value={category}
                                                                type="checkbox"
                                                                checked={selectedFilters.includes(category)}
                                                                onChange={() => toggleFilter(category)}
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`filter-category-${optionIdx}`}
                                                                className=" ml-3 text-sm text-gray-800"
                                                            >
                                                                {category}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                {/*  */}
                                <Disclosure as="div" className="border-b border-gray-200 py-2">
                                    {({ open }) => (
                                        <>
                                            <h3 className="flow-root">
                                                <Disclosure.Button className="flex ml-[33%] w-2/4 justify-between bg-lg:col-span-3-100 py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className=" font-semibold text-md text-gray-900">Job Types</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            // <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            <IoIosArrowUp className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            // <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            <IoIosArrowDown className="h-5 w-5 text-gray-700" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6 ml-[33%] w-2/4">
                                                <div className="space-y-4">
                                                    {uniqueWorkTypes.map((workType, optionIdx) => (
                                                        <div key={optionIdx} className="flex items-center">
                                                            <input
                                                                id={`filter-job-type-${optionIdx}`}
                                                                name={`workType[]`}
                                                                value={workType}
                                                                type="checkbox"
                                                                checked={selectedWorkTypes.includes(workType)}
                                                                onChange={() => toggleWorkTypeFilter(workType)}
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`filter-job-type-${optionIdx}`}
                                                                className=" ml-3 text-sm text-gray-800"
                                                            >
                                                                {workType}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>

                                {/* END FILTER POINT */}
                            </form>
                            {/* Jobs grid */}
                            {skelton ? (
                                <>
                                    <div className='lg:mr-[30%] lg:-m-[30%] xl:mr-[30%] xl:-m-[30%]'>

                                        <Spinner />
                                    </div>

                                </>
                            ) : (
                                <div className="lg:col-span-0 lg:ml-[-40%] xl:ml-[-40%]">
                                    {/* 1 */}
                                    {/*  */}
                                    {showSearchResultsCount && (
                                        <div className="lg:text-xl md:text-xl sm:text-lg font-semibold text-green-700 flex justify-center ">
                                            {Jobs.length} Results found
                                        </div>
                                    )}
                                    {/*  */}
                                    <div className={`flex flex-col `}>
                                        {Jobs.length === 0 ? (
                                            <div className="mx-auto w-auto text-center">
                                                <p className="text-lg font-semibold text-gray-600">No results found.</p>
                                                <div className='mt-1 flex justify-center items-center w-90 h-80'>
                                                    <img
                                                        src={NoResultGif}
                                                        alt="No Result"
                                                        className="mx-auto w-full h-full "
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            Jobs.map((job, index) => (
                                                // group-hover:bg-gradient-to-r from-[#AEC3AE] to-[#CEDEBD]
                                                <div key={index} className="lg:w-10/12 xl:w-10/12 p-4 hover:scale-105 duration-300 group">
                                                    <div className=" sm:w-8/12 sm:mx-auto lg:w-11/12 rounded-xl shadow-sm shadow-slate-400 p-4 relative  hover:shadow-md hover:shadow-slate-400 flex items-center">
                                                        <div className="flex-shrink-0">
                                                            <img className="hidden sm:block w-14 h-full rounded-full" src={job.logo} alt={`Logo for ${job.company}`} />

                                                        </div>
                                                        <div className="flex flex-col flex-grow ml-4 ">

                                                            {/* ONLY MOBILE SCREENS */}
                                                            <div className="sm:hidden">
                                                                <div className='flex flex-col items-start'>
                                                                    <div className='flex items-center space-x-4'>
                                                                        <img className="w-14 h-full rounded-full" src={job?.companyId?.profile} alt={`Logo for ${job.company}`} />
                                                                        <Link
                                                                            to={job.appliedStatus ? "#" : `/jobs/jobview/${job._id}`}
                                                                            className={`break-all text-lg font-normal sm:text-xl md:text-xl max-w-full mt-2 ${job.appliedStatus ? 'cursor-not-allowed' : ''}`}
                                                                            style={{ color: 'rgba(0, 4, 74, 1)' }}
                                                                        >
                                                                            {job.jobTitle}
                                                                        </Link>
                                                                    </div>

                                                                    <div className='w-full mt-4 flex justify-between '>
                                                                        <p className="font-medium break-all mb-2" style={{ color: 'rgba(109, 110, 141, 1)' }}>{job?.companyId?.companyName}</p>
                                                                        <p className="mb-2" style={{ color: 'rgba(109, 110, 141, 1)' }}>{job?.workType}</p>
                                                                    </div>

                                                                    <p className="mb-2" style={{ color: 'rgba(109, 110, 141, 1)' }}>Dead line: {formatDate(job?.deadline)}</p>

                                                                    <div className="flex items-center space-x-8 mt-4 ">
                                                                        {job.appliedStatus ? (
                                                                            <span
                                                                                // className="bg-gradient-to-r from-lime-400 to-lime-500(OLD APPLIED BUTTON)"
                                                                                className=" text-lime-600 bg-lime-200 px-3 py-1 font-medium rounded-full text-base">
                                                                                Applied</span>
                                                                        ) : (
                                                                            // <Link to={job.appliedStatus ? "#" : `/jobs/jobview/${job._id}`}
                                                                            //     className=" text-white px-3 py-2 rounded-md" style={{ backgroundColor: 'rgba(0, 211, 99, 1)' }}
                                                                            // >
                                                                            //     Apply now
                                                                            // </Link>
                                                                            // Show more button
                                                                            <Link
                                                                                to={job.appliedStatus ? '#' : `/jobs/jobview/${job._id}`}
                                                                                className={`font-serif inline text-md font-medium mt-0 mr-1 mb-0 ml-1  
                                                                            ${job.appliedStatus ? 'text-lg font-bold' : ''}`}
                                                                                style={{ color: 'rgba(109, 110, 130, 1)' }} >
                                                                                {job.appliedStatus ? null : 'Show More...'}
                                                                            </Link>
                                                                        )}
                                                                        <button onClick={() => createChat(job?.companyId?._id)} className="z-20 text-white flex flex-col rounded-lg">
                                                                            <div className="p-2 rounded-full bg-green-600">
                                                                                <svg
                                                                                    className="w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5"
                                                                                    fill="currentColor"
                                                                                    viewBox="0 0 20 20"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                >
                                                                                    <path
                                                                                        fillRule="evenodd"
                                                                                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                                                        clipRule="evenodd"
                                                                                    ></path>
                                                                                </svg>
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* END MOBILE SCREENS ONLY*/}

                                                            {/* Card start */}
                                                            <div className="w-full lg:h-auto xl:h-auto hidden sm:block">
                                                                <div className="flex justify-between items-center">
                                                                    <div className="hidden md:hidden lg:hidden xl:hidden">
                                                                        <img className="w-14 h-full rounded-full" src={job?.companyId?.profile} alt={`Logo for ${job.company}`} />

                                                                    </div>

                                                                    <Link
                                                                        to={job.appliedStatus ? "#" : `/jobs/jobview/${job._id}`}
                                                                        className={`break-all text-lg font-normal sm:text-xl md:text-xl max-w-full ${job.appliedStatus ? 'cursor-not-allowed' : ''}`}
                                                                        style={{ color: 'rgba(0, 4, 74, 1)' }}
                                                                    >
                                                                        {job.jobTitle}
                                                                    </Link>
                                                                    <div className="flex-row items-center space-x-2">
                                                                        {job.appliedStatus ? (
                                                                            <span className=" text-lime-600 bg-lime-200 px-3 py-1 font-medium rounded-full text-base">
                                                                                Applied</span>
                                                                        ) : (
                                                                            // Apply Now Button
                                                                            <Link to={job.appliedStatus ? "#" : `/jobs/jobview/${job._id}`}
                                                                                className="text-white px-3 py-2 rounded-md" style={{ backgroundColor: 'rgba(0, 211, 99, 1)' }}
                                                                            >
                                                                                Show more
                                                                            </Link>
                                                                            // Show more Button
                                                                            //     <Link
                                                                            //     to={job.appliedStatus ? '#' : `/jobs/jobview/${job._id}`}
                                                                            //     className={`font-serif inline text-md font-medium mt-0 mr-1 mb-0 ml-1  
                                                                            // ${job.appliedStatus ? 'text-lg font-bold' : ''}`}
                                                                            //     style={{ color: 'rgba(109, 110, 130, 1)' }} >
                                                                            //     {job.appliedStatus ? null : 'Show More...'}
                                                                            // </Link>
                                                                        )}
                                                                        {/* <button onClick={() => createChat(job?.companyId?._id)} className="z-20 text-white flex flex-col rounded-lg mt-6">
                                                                            <div className="p-2 rounded-full bg-green-600">
                                                                                <svg
                                                                                    className="w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5"
                                                                                    fill="currentColor"
                                                                                    viewBox="0 0 20 20"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                >
                                                                                    <path
                                                                                        fillRule="evenodd"
                                                                                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                                                        clipRule="evenodd"
                                                                                    ></path>
                                                                                </svg>
                                                                            </div>
                                                                        </button> */}
                                                                    </div>
                                                                </div>

                                                                <div className="flex justify-between items-center mt-4 text-sm mb-2">
                                                                    <p className="font-medium break-all" style={{ color: 'rgba(109, 110, 141, 1)' }}>{job?.companyId?.companyName}</p>
                                                                    {/* {job.status === 'Active' ? (
                                                                    <div className="inline-flex mt-2 items-center rounded-full gap-x-1">
                                                                        <span className="h-2 w-2 rounded-full bg-green-600"></span>
                                                                        <h2 className="text-sm font-medium text-green-600">Actively recruiting</h2>
                                                                    </div>
                                                                ) : (
                                                                    <div className="inline-flex cursor-pointer items-center px-3 py-1 rounded-full gap-x-2">
                                                                        <span className="h-2 w-3 rounded-full bg-yellow-600"></span>
                                                                        <h2 className="text-sm font-medium text-yellow-600">Not Active</h2>
                                                                    </div>
                                                                )} */}

                                                                    <p style={{ color: 'rgba(109, 110, 141, 1)' }}>{job?.workType}</p>
                                                                    <p style={{ color: 'rgba(109, 110, 141, 1)' }}>Dead line:{formatDate(job?.deadline)}</p>

                                                                </div>
                                                                {/* <div className="flex items-center mt-4 text-sm mb-2"> */}
                                                                <button onClick={() => createChat(job?.companyId?._id)} className="text-blue-500 hover:underline">Start Chat</button>
                                                                {/* <p className='text-center flex-grow mx-auto mr-[25%]'>Active</p>
                                                                </div> */}
                                                                <p className="text-right text-green-600 text-sm font-small">
                                                                    {getTimeDifference(job.createdAt)}
                                                                </p>

                                                                {/* <p className="text-right text-green-600 text-sm font-small">
                                                                    {getTimeDifference(job.createdAt)}
                                                                </p> */}
                                                                {/* <p className=" break-all xl:mt-2 text-gray-900 text-lg font-medium">
                                                                    We have <span className="text-blue-800"> {job.vacancy} </span>
                                                                    openings for the position of <span className="text-blue-800"> {job.jobCategory} </span>
                                                                    in <span className="text-blue-800"> {job.workplace} </span>
                                                                    . This <span className="text-blue-800"> {job.workType} </span>
                                                                    role offers great benefits and an opportunity to take on this job. Apply now to join our team!
                                                                </p> */}

                                                                {/* <div className="absolute top-3/3 right-11"> */}
                                                                {/* Chat button */}
                                                                {/* <button onClick={() => createChat(job?.companyId?._id)} className="z-20 text-white flex flex-col rounded-lg">
                                                                        <div className="p-2 rounded-full bg-green-600  ">
                                                                            <svg
                                                                                className="w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5"
                                                                                fill="currentColor"
                                                                                viewBox="0 0 20 20"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                                                    clipRule="evenodd"
                                                                                ></path>
                                                                            </svg>
                                                                        </div>
                                                                    </button> */}
                                                                {/* </div> */}
                                                            </div>
                                                            {/* card end */}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                        {Jobs.length < jobTotalLength && jobTotalLength > limit && Jobs.length === limit && (
                                            <div className='mt-4 mx-auto cursor-pointer' onClick={() => setLimit((prev) => prev + 6)}>
                                                <p className='text-gray-700'>More Jobs</p>
                                                {/* <MdUnfoldMore className='ml-8'/> */}
                                                <MdKeyboardArrowDown className='text-gray-700 h-8 w-8 ml-6' />
                                            </div>
                                        )}

                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div >
        </>
    )
}

export default JobSection