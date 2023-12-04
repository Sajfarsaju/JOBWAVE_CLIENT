import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import Axios_Instance from '../../../api/userAxios';
import { Link, useNavigate } from 'react-router-dom'
import NoSearchResultImg from '../../../assets/search_no_result.png'
import PlanModal from '../subscriptionPlan/PlanModal'
import Skelton from './Skelton'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { MdUnfoldMore } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { userLogout } from '../../../store/slice/userSlice'


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

    // Filter
    // const uniqueCategories = [...new Set(Jobs?.map((job) => job?.jobCategory))];
    // const uniqueWorkTypes = [...new Set(Jobs?.map((job) => job?.workType))];


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


    // 
    //? FETCH JOBS


    const fetchUserSubscription = async () => {
            try{
            const response = await axios.get(`http://localhost:4005/plan?userId=${userId}`,{
            headers: {
              'Authorization': `Bearer ${token}`
              // Add other headers if needed
            }
          });
            if (response.status === 200) {
                setUserData(response.data.user);
            }

    }catch(error){
        console.log(error);
        
        if (error.response?.status === 401 || error?.response?.data?.errMsg === 'Your account has been blocked') {
            dispatch(userLogout());
            toast.error(error?.response?.data?.errMsg);
        }
    }
}
    useEffect(() => {

    fetchUserSubscription()
    }, [])

    //? FETCH JOBS
    const [uniqueCategories, setUniqueCategories] = useState([])
    const [uniqueWorkTypes, setUniqueWorkTypes] = useState([])
    const [limit, setLimit] = useState(6);
    const [jobTotalLength, setJobTotalLength] = useState();
    async function fetchJobs() {
        try {
            const res = await axios.get(`http://localhost:4005/jobs`, {
                params: {
                    userId,
                    search: searchQuery,                
                    limit,
                    filters: selectedFilters.join(','),
                    worktype: selectedWorkTypes.join(',')
                },
                headers: {
                  'Authorization': `Bearer ${token}`
                  // Add other headers if needed
                }
              });
            setSkelton(false)
            setJobs(res.data.Jobs);
            setUniqueCategories(res.data.uniqueCategories)
            setUniqueWorkTypes(res.data.uniqueWorkTypes)
            setJobTotalLength(res.data.JobsLength)

        } catch (error) {
            console.log(error);
            
            if (error?.res?.status === 401 || error?.res?.data?.errMsg === 'Your account has been blocked') {
                dispatch(userLogout());
                toast.error(error?.res?.data?.errMsg);
            }

        }
    }
    useEffect(() => {
        fetchJobs()
    }, [token, searchQuery, limit, selectedFilters, selectedWorkTypes])

    //     const currentDate = new Date();
    //     const filteredJobsForDateChecking = Jobs.filter((job) => {
    //        const jobDeadline = new Date(job.deadline);
    //        return currentDate <= jobDeadline;
    //    });
    // const reversedJobs = Jobs.slice().reverse();
    //? FETCH JOBS


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
        } else {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }
    };


    //? Create chat user

    const createChat = async (companyId) => {
        if (userData.subscriptionPlan) {

            navigate(`/chats/${companyId}`)

            await Axios_Instance.post(`/chats`, { compId: companyId, senderRole: "users" });


        } else {
            //? Open subscription plan if user haven't plan
            setOpenPlanModal(true)
        }
    }
    //?End Create chat user

    return (
        <>
            <PlanModal setOpenPlanModal={setOpenPlanModal} openPlanModal={openPlanModal} />
            <div className='bg-white'>
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
                                                                    <MinusIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
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
                        <h1 className="font-serif text-2xl font-bold tracking-tight text-gray-900 md:text-2xl lg:text-2xl xl:text-2xl">
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

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>

                                {/* FILTER START POINT */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <Disclosure.Button className="flex w-full items-center justify-between bg-lg:col-span-3-100 py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-serif font-semibold text-md text-gray-900">Job Category</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
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
                                                                className="font-serif ml-3 text-sm text-gray-800"
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
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <Disclosure.Button className="flex w-full items-center justify-between bg-lg:col-span-3-100 py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-serif font-semibold text-md text-gray-900">Job Types</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
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
                                                                className="font-serif ml-3 text-sm text-gray-800"
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
                                    <div className="lg:col-span-3">
                                        <div className="flex flex-wrap">
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <div key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 p-4">
                                                    <Skelton />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="lg:col-span-3">
                                    {/* 1 */}
                                    {/*  */}
                                    {showSearchResultsCount && (
                                        <div className="lg:text-xl md:text-xl sm:text-lg font-semibold text-green-700 flex justify-center ">
                                            {Jobs.length} Results found
                                        </div>
                                    )}
                                    {/*  */}
                                    <div className="flex flex-wrap">
                                        {Jobs.length === 0 ? (
                                            <div className="w-auto text-center">
                                                <p className="text-lg font-semibold text-gray-600">No search results found.</p>
                                                <div className='mt-1 flex justify-center items-center w-full h-auto'>
                                                    <img
                                                        src={NoSearchResultImg}
                                                        alt="No Result"
                                                        className="mx-auto max-w-60 max-h-60 h-auto"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            Jobs.map((job, index) => (
                                                // group-hover:bg-gradient-to-r from-[#AEC3AE] to-[#CEDEBD]
                                                <div key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 p-4 hover:scale-105 duration-300 group">
                                                    <div className="bg-slate-100 rounded-xl shadow-sm shadow-slate-400 p-6 relative group-hover:bg-gradient-to-r from-[#EEF5FF] to-[#FAF1E4] hover:shadow-lg hover:shadow-slate-400 flex h-full">
                                                        <img className="w-10 h-10 rounded-full mr-4" src={job.logo} /> {/* Added margin-right (mr-4) */}
                                                        <div className="flex flex-col flex-grow">
                                                            <div className="w-full h-auto">
                                                                <div className="flex justify-between items-center">
                                                                    <Link
                                                                        to={job.appliedStatus ? "#" : `/jobs/jobview/${job._id}`}
                                                                        className={`break-all font-serif text-lg font-bold sm:text-xl md:text-2xl max-w-full 
                                                                            ${job.appliedStatus ? 'cursor-not-allowed ' : ''}`}
                                                                    >
                                                                        {job.jobTitle}
                                                                    </Link>
                                                                    <div className="flex justify-end font-serif">
                                                                        {job.appliedStatus ? (
                                                                            <span className="bg-gradient-to-r from-lime-500 to-lime-600 text-white px-3 py-1 rounded-full text-sm">Applied</span>
                                                                        ) : null}
                                                                    </div>

                                                                </div>
                                                                <p className="font-serif font-semibold break-all">{job?.companyId?.companyName}</p>
                                                                {job.status === 'Active' ? (
                                                                    <div className="inline-flex mt-2 items-center  rounded-full gap-x-1 ">
                                                                        <span className="h-2 w-2 rounded-full bg-green-600"></span>
                                                                        <h2 className="font-serif text-sm font-medium text-green-600">Actively recruiting</h2>
                                                                    </div>
                                                                ) : (
                                                                    <div className="inline-flex cursor-pointer items-center px-3 py-1 rounded-full gap-x-2 ">
                                                                        <span className="h-2 w-3 rounded-full bg-yellow-600"></span>
                                                                        <h2 className="font-serif text-sm font-medium text-yellow-600">Not Active</h2>
                                                                    </div>
                                                                )}
                                                                <p className="font-serif text-right text-green-600 text-sm font-small">
                                                                    {getTimeDifference(job.createdAt)}
                                                                </p>
                                                                <p className="font-serif break-all xl:mt-2 text-gray-900 text-lg font-medium">
                                                                    We have <span className="text-blue-800"> {job.vacancy} </span>
                                                                    openings for the position of <span className="text-blue-800"> {job.jobCategory} </span>
                                                                    in <span className="text-blue-800"> {job.workplace} </span>
                                                                    . This <span className="text-blue-800"> {job.workType} </span>
                                                                    role offers great benefits and an opportunity to take on this job. Apply now to join our team!
                                                                </p>
                                                                {/* old message icon */}
                                                                {/* <div className='absolute top-57 right-14'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="darkGreen" className="w-8 h-8 cursor-pointer">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                                                </svg>
                                                                </div> */}
                                                                <div className='absolute top-55 right-11'>

                                                                    <button onClick={() => createChat(job?.companyId?._id)} className="z-20 text-white flex flex-col rounded-lg ">
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
                                                                <div className="pt-2 pr-0 pb-0 pl-0">
                                                                    <Link
                                                                        to={job.appliedStatus ? '#' : `/jobs/jobview/${job._id}`}
                                                                        className={`font-serif text-green-600 inline text-md font-medium mt-0 mr-1 mb-0 ml-1  
                                                                            ${job.appliedStatus ? 'text-lg font-bold' : ''}`}
                                                                    >
                                                                        {job.appliedStatus ? '' : 'Show More...'}
                                                                    </Link>
                                                                </div>
                                                            </div>
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