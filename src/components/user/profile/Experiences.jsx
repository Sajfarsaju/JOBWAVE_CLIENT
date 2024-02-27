import { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io"
import { IoIosOptions } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import '../../../assets/css/tooltip.css'

function Experiences({
    userData,
    setOpenAddExperienceModal,
    openAddExperienceModal,
    setExperienceTitle,
    setExpCompany,
    setExpCompLocation,
    setExpStartDate,
    setExpEndDate,
    experienceTitle,
    expCompany,
    expCompLocation,
    expStartDate,
    expEndDate,
    handleAddExperience,
    proccessing,
    handleRemovExperience,
    showEditModal,
    setShowEditModal,
    handleEditExperience
}) {
    // console.log(expObjToEdit)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [expId, setExpId] = useState('')
    const [expLength, setExpLength] = useState('')

    //? Storing the length of the experience array to display a warning message,
    //?   if attempting to delete the last experience.
    useEffect(() => {

        setExpLength(userData?.experienceDetails?.length)
    }, [userData?.experienceDetails])
    //?End 

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    }
    // ? Dropdown started
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const dropdownRefs = useRef([]);

    const toggleMenu = (index) => {
        setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const closeMenu = () => {
        setOpenMenuIndex(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedOutsideAllDropdowns = dropdownRefs.current.every(
                (ref) => ref && !ref.contains(event.target)
            );
            if (clickedOutsideAllDropdowns) {
                closeMenu();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    // ? Dropdown end

    return (
        <>
            {/* Experience Card */}
            <div className="mt-8 dark:bg-green-50 p-4 rounded-xl shadow-lg shadow-slate-300">
                <div className='flex justify-between items-center mx-2 md:mx-[1%] mb-2'>
                    <h2 className="text-md md:text-2xl font-semibold break-all">Experience</h2>
                    {/* Add Experience icon */}
                    <button
                        onClick={() => setOpenAddExperienceModal(true)}
                        className="text-white py-2 px-2 md:py-2 md:px-4 font-normal text-xs md:text-sm rounded-xl flex items-center space-x-1 md:space-x-2" style={{ backgroundColor: 'rgba(0, 13, 255, 1)' }}>
                        <span className='text-white md:font-semibold hidden sm:block lg:block xl:block'>Add Experience</span>
                        <span className='md:hidden lg:hidden xl:hidden sm:block block'>Add New</span>
                        <IoMdAdd className="w-3 h-3 md:w-5 md:h-5" />
                    </button>
                </div>
                {/*  */}
                <div className="border-t border-gray-300 mb-6 mx-2 md:mx-[1%]"></div>


                <div className="mb-4 mx-2 md:mx-[1%]">
                    {userData?.experienceDetails &&
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                            {userData?.experienceDetails.map((experience, index) => (
                                <div key={index} className="border p-4">
                                    <div className="flex justify-between">

                                        <p className="font-semibold mb-2 text-sm md:text-base">
                                            <span className="text-gray-800 font-medium">
                                                Position: </span>{experience?.experienceTitle}
                                        </p>
                                        {/*  */}
                                        <div className="relative inline-block text-left" ref={(el) => (dropdownRefs.current[index] = el)}>
                                            <div className='has-tooltip'>
                                                <span className='tooltip rounded-md shadow-lg p-2 text-gray-800 bg-slate-50 -mt-11 sm:-mt-12 md:-mt-12'>
                                                    Options
                                                </span>
                                                <HiOutlineDotsVertical
                                                    className="w-4 h-4 md:h-5 md:w-5 text-gray-800 cursor-pointer"
                                                    id={`menu-button-${index}`}
                                                    aria-expanded={openMenuIndex === index}
                                                    aria-haspopup="true"
                                                    onClick={() => toggleMenu(index)}
                                                />
                                            </div>
                                            {openMenuIndex === index && (
                                                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby={`menu-button-${index}`} tabIndex="-1">
                                                    <div className="py-1 hover:bg-slate-100" role="none">
                                                        <p
                                                            onClick={() => {
                                                                setShowEditModal(true)
                                                                // 
                                                                setExpId(experience?._id)
                                                                setExperienceTitle(experience?.experienceTitle)
                                                                setExpCompany(experience?.expCompany)
                                                                setExpCompLocation(experience?.expCompLocation)
                                                                setExpStartDate(experience?.expStartDate)
                                                                setExpEndDate(experience?.expEndDate)
                                                            }}
                                                            className="cursor-pointer text-gray-800 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
                                                            Edit</p>
                                                    </div>
                                                    <div className="py-1 hover:bg-slate-100" role="none">
                                                        <p
                                                            onClick={() => {
                                                                setShowDeleteModal(true)
                                                                setExpId(experience?._id)
                                                            }}
                                                            className="cursor-pointer text-gray-800 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-6">
                                                            Delete</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {/*  */}
                                    </div>
                                    {/*Start Mobile screen only  */}
                                    <div className="md:hidden block text-sm break-all font-medium">

                                        <p className="mt-3">
                                            <span className="text-gray-800">
                                                Company: </span>{experience?.expCompany}
                                        </p>
                                        <p className="mt-3">
                                            <span className="text-gray-800">
                                                Place: </span>{experience?.expCompLocation}
                                        </p>
                                        <p className="mt-3">
                                            <span className="text-gray-800">
                                                Started: </span>{`${formatDate(experience?.expStartDate)}`}
                                        </p>
                                        <p className="mt-3">
                                            <span className="text-gray-800">
                                                Ended: </span>{`${formatDate(experience?.expEndDate)}`}
                                        </p>
                                    </div>
                                    {/*End Mobile screen only  */}

                                    <div className="flex flex-row mb-2">
                                        <p className="hidden sm:block mr-2">
                                            <span className="text-gray-800 font-medium md:text-base sm:text-sm">
                                                Company: </span>{experience?.expCompany} -
                                        </p>
                                        <p className="hidden sm:block">{experience?.expCompLocation}</p>
                                    </div>
                                    <p className="hidden sm:block break-all mb-2">
                                        <span className="text-gray-800 font-medium md:text-base sm:text-sm">
                                            Time period: </span>
                                        {`${formatDate(experience?.expStartDate)} - ${formatDate(experience?.expEndDate)}`}
                                    </p>
                                    {/* <div className="border-t border-gray-300"></div> */}
                                </div>
                            ))}
                        </div>
                    }



                </div>
            </div>
            {/* End Experience Card */}

            {/* Start Add Experience */}
            {openAddExperienceModal && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="dark:bg-green-50 shadow-2xl rounded-sm p-6">
                        <h2 className="text-2xl font-semibold mb-4">Add New Experience</h2>
                        <form className="flex flex-col items-center">

                            <div className="mb-4 w-full md:flex md:space-x-2">
                                <div className="w-full md:w-1/2 mb-2 md:mb-0">
                                    <label htmlFor="experienceTitle" className="block text-gray-700 text-sm font-normal mb-2">Experience Job Title</label>
                                    <input
                                        required
                                        type="text"
                                        id="experienceTitle"
                                        name="experienceTitle"
                                        placeholder="Enter Experience Job Title"
                                        onChange={(e) => setExperienceTitle(e.target.value)}
                                        className="w-full border  hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                                    />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <label htmlFor="expCompany" className="block text-gray-700 text-sm font-normal mb-2">Company Name</label>
                                    <input
                                        required
                                        type="text"
                                        id="expCompany"
                                        name="expCompany"
                                        placeholder="Enter Company Name"
                                        onChange={(e) => setExpCompany(e.target.value)}
                                        className="w-full  border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                                    />
                                </div>
                            </div>

                            <div className="mb-4 w-full md:flex md:space-x-2">
                                <div className="w-full md:w-1/2 mb-2 md:mb-0">
                                    <label htmlFor="expLocation" className="block text-gray-700 text-sm font-normal mb-2">Company Location</label>
                                    <input
                                        required
                                        type="text"
                                        id="expLocation"
                                        name="expLocation"
                                        placeholder="Enter Company Location"
                                        onChange={(e) => setExpCompLocation(e.target.value)}
                                        className="w-full  border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                                    />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <label htmlFor="expStartDate" className="block text-gray-700 text-sm font-normal mb-2">Exp-Start Date</label>
                                    <input
                                        required
                                        type="date"
                                        id="expStartDate"
                                        name="expStartDate"
                                        placeholder="Enter Experience Start Date"
                                        onChange={(e) => setExpStartDate(e.target.value)}
                                        className="w-full  border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                                    />
                                </div>
                            </div>

                            <div className="mb-4 w-full md:flex md:space-x-2">
                                <div className="w-full md:w-1/2 mb-2 md:mb-0">
                                    <label htmlFor="expEndDate" className="block text-gray-700 text-sm font-normal mb-2">Exp-End Date</label>
                                    <input
                                        required
                                        type="date"
                                        id="expEndDate"
                                        name="expEndDate"
                                        placeholder="Enter Experience End Date"
                                        onChange={(e) => setExpEndDate(e.target.value)}
                                        className="w-full  border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 flex items-center justify-center mt-[6%]">
                                    <button
                                        type="button"
                                        className="text-white px-5 py-2 rounded-md bg-green-500"
                                        onClick={handleAddExperience}
                                    >
                                        {proccessing ? 'Saving...' : 'Save'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOpenAddExperienceModal(false)
                                            setExperienceTitle('')
                                            setExpCompany('')
                                            setExpCompLocation('')
                                            setExpStartDate('')
                                            setExpEndDate('')
                                        }}
                                        className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none ml-2"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* End Add Experience */}

            {/* Start Ask to delete Experience */}
            {showDeleteModal && (

                <div
                    className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-10 backdrop-blur-sm"
                >
                    <div className="relative mx-3 w-auto my-6 md:mx-auto max-w-sm">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="mx-2 flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                                <h3 className={`text-md md:text-2xl font-semibold ${expLength === 1 ? 'text-red-500' : 'text-gray-800'}`}>
                                    Delete Experience
                                </h3>
                            </div>
                            {/*body*/}
                            <div className="relative p-3 flex-auto mx-3">
                                <p className={`text-lg leading-relaxed ${expLength === 1 ? 'text-red-500' : 'text-gray-800'}`}>
                                    {expLength === 1
                                        ? 'Are you sure you want to delete this Experience? ⚠️ Deleting your last experience will impact your profile and may affect your profile review. Please consider the consequences before proceeding.⚠️'
                                        : 'Are you sure you want to delete this Experience? ⚠️'}
                                </p>

                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                                <button
                                    className=" text-emerald-500  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="text-white bg-red-500 active:bg-red-600 rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => {
                                        handleRemovExperience(expId)
                                        setShowDeleteModal(false)
                                        setExpId('')
                                    }}
                                >
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* End Ask to delete Experience */}

            {/* Start Edit Experience */}
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="dark:bg-green-50 shadow-2xl rounded-sm p-6">
                        <h2 className="text-2xl font-semibold mb-4">Edit Experience</h2>
                        <form className="flex flex-col items-center">

                            <div className="mb-4 w-full md:flex md:space-x-2">
                                <div className="w-full md:w-1/2 mb-2 md:mb-0">
                                    <label htmlFor="experienceTitle" className="block text-gray-700 text-sm font-normal mb-2">Experience Job Title</label>
                                    <input
                                        required
                                        type="text"
                                        id="experienceTitle"
                                        name="experienceTitle"
                                        placeholder="Enter Experience Job Title"
                                        defaultValue={experienceTitle ? experienceTitle : null}
                                        onChange={(e) => setExperienceTitle(e.target.value)}
                                        className="w-full border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                                    />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <label htmlFor="expCompany" className="block text-gray-700 text-sm font-normal mb-2">Company Name</label>
                                    <input
                                        required
                                        type="text"
                                        id="expCompany"
                                        name="expCompany"
                                        defaultValue={expCompany ? expCompany : null}
                                        placeholder="Enter Company Name"
                                        onChange={(e) => setExpCompany(e.target.value)}
                                        className="w-full  border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                                    />
                                </div>
                            </div>

                            <div className="mb-4 w-full md:flex md:space-x-2">
                                <div className="w-full md:w-1/2 mb-2 md:mb-0">
                                    <label htmlFor="expLocation" className="block text-gray-700 text-sm font-normal mb-2">Company Location</label>
                                    <input
                                        required
                                        type="text"
                                        id="expLocation"
                                        name="expLocation"
                                        defaultValue={expCompLocation ? expCompLocation : null}
                                        placeholder="Enter Company Location"
                                        onChange={(e) => setExpCompLocation(e.target.value)}
                                        className="w-full  border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                                    />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <label htmlFor="expStartDate" className="block text-gray-700 text-sm font-normal mb-2">Exp-Start Date</label>
                                    <input
                                        required
                                        type="date"
                                        id="expStartDate"
                                        name="expStartDate"
                                        defaultValue={expStartDate ? expStartDate : null}
                                        placeholder="Enter Experience Start Date"
                                        onChange={(e) => setExpStartDate(e.target.value)}
                                        className="w-full  border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                                    />
                                </div>
                            </div>

                            <div className="mb-4 w-full md:flex md:space-x-2">
                                <div className="w-full md:w-1/2 mb-2 md:mb-0">
                                    <label htmlFor="expEndDate" className="block text-gray-700 text-sm font-normal mb-2">Exp-End Date</label>
                                    <input
                                        required
                                        type="date"
                                        id="expEndDate"
                                        name="expEndDate"
                                        defaultValue={expEndDate ? expEndDate : null}
                                        placeholder="Enter Experience End Date"
                                        onChange={(e) => setExpEndDate(e.target.value)}
                                        className="w-full  border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 flex items-center justify-center mt-[6%]">
                                    <button
                                        type="button"
                                        className="text-white px-5 py-2 rounded-md bg-green-500"
                                        onClick={(e) => handleEditExperience(e, expId)}
                                    >
                                        {proccessing ? 'Saving...' : 'Save'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowEditModal(false)
                                            setExperienceTitle('')
                                            setExpCompany('')
                                            setExpCompLocation('')
                                            setExpStartDate('')
                                            setExpEndDate('')

                                        }}
                                        className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none ml-2"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* End Edit Experience */}
        </>
    )
}

export default Experiences