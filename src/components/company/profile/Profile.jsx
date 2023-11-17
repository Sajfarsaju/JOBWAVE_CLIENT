import { useEffect, useState } from 'react'
import Axios_Instance from '../../../api/userAxios';
import { FaPlus } from 'react-icons/fa6'
import { MdDownloadDone } from 'react-icons/md'
import { IoLocationSharp } from 'react-icons/io5';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast';

export default function Profile() {

  const [companyData, setCompanyData] = useState([]);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [viewImage, setViewImage] = useState(false)
  const [reload, setReload] = useState(false)
  const [bio, setBio] = useState("");
  const [spinnner, setspinnner] = useState(true);
  

  useEffect(() => {

    (async function getCompanyData() {

      try {
        const response = await Axios_Instance.get('/company/profile');

        if (response.status === 200) {
          setspinnner(false)
          setCompanyData(response.data.company)
        }

      } catch (error) {
        console.log(error);
      }

    })();

  }, [reload]);



  const closeModal = () => {
    setEditIsOpen(false)
    setImage(null)
  }

  function isValidImage(img) {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

    const extension = img.substr(img.lastIndexOf('.')).toLowerCase();

    return validExtensions.includes(extension);
  }

  const handleImageChange = (img) => {
    const inputElement = img.target;

    if (isValidImage(img?.target?.files[0].name)) {
      let reader = new FileReader()
      reader.readAsDataURL(img.target.files[0])
      reader.onload = () => {
        setImage(reader.result)
      }
      reader.onerror = (err) => {
        console.log(err);
      }
    } else {
      toast.error('Invalid file type. Please upload a JPEG, PNG, or WEBP image file.')
      inputElement.value = '';
    }
  };

  const validateImage = (image) => {
    const errors = {}
    const maxSize = 5 * 1024 * 1024;

    if (!image) {
      if (!companyData?.profile) {
        errors.image = 'Please select an image.';
      }

    } else if (image.size > maxSize) {
      errors.image = 'Please choose a smaller one (max 5MB).';
    }
    return errors;
  }

  const handleProfileSave = async (e) => {
    e.preventDefault();

    const errors = validateImage(image);

    if(!companyData.bio){

      if (!bio || bio.trim().length === 0) {
        return toast.error("Bio is required");
      }
    }

    if (Object.keys(errors).length === 0) {
      try {
        
        const updatedProfileData = {
          profile: image || companyData.profile,
          bio: bio,
        };

        const response = await Axios_Instance.patch(`/company/profile`, updatedProfileData)

        if (response.status === 200) {
          setCompanyData(response.data.updatedCompany);
          
          setEditIsOpen(false)
          toast.success('Profile updated successfuly')
        } else {
          console.error('Failed to add skill');
        }

      } catch (error) {
        if (error.response?.status === 404) {
          toast.error(error?.response?.data?.errMsg)
        } else {
          console.error('An error occurred:', error);
        }
      }
    } else {
      toast.error(errors.image);
    }

  }
  return (

    <>
    {/* Spinner */}
    {spinnner && (
      <div className='space-x-4 flex items-center justify-center min-h-screen' >
        <span className='sr-only'>Loading...</span>
        <div className='h-8 w-8 border-t-4 border-b-4 border-t-green-500 border-b-green-700 rounded-full animate-bounce' style={{ animationDelay: '-0.3s' }}></div>
        <div className='h-8 w-8 border-t-4 border-b-4 border-t-green-500 border-b-green-700 rounded-full animate-bounce' style={{ animationDelay: '-0.15s' }}></div>
        <div className='h-8 w-8 border-t-4 border-b-4 border-t-green-500 border-b-green-700 rounded-full animate-bounce'></div>
      </div>
    )}
    {/* Spinner */}
    <div className="min-h-fit bg-white flex flex-col items-center relative">
      <div className="min-w-full mt-24  lg:h-60 xl:h-60 md:h-40 h-40 relative">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          alt=""
          className="w-full h-full object-cover transition-transform transform hover:brightness-75"
        />
      </div>

      <div className="w-full lg:flex justify-between relative">
        <div className="bg-slate-100 shadow-sm shadow-gray-400 p-4 m-2 lg:w-full xl:w-full md:w-full rounded-lg relative py-10">
          <div className={`relative ${companyData?.profile ? "absolute shadow-md items-center shadow-gray-400 left-1/2 transform -translate-x-1/2 top-0 lg:-mt-20 xl:-mt-20 -mt-12 md:-mt-12 sm:-mt-8 w-28 h-28 lg:w-36 lg:h-36 xl:w-36 xl:h-36 rounded-full" : "bg-white absolute shadow-md shadow-gray-400 left-1/2 transform -translate-x-1/2 top-0 lg:-mt-20 xl:-mt-20 -mt-12 md:-mt-12 sm:-mt-8 w-28 h-28 lg:w-36 lg:h-36 xl:w-36 xl:h-36 rounded-full"}`}>
            <img onClick={() => setViewImage(true)} src={companyData?.profile} alt="" className="cursor-pointer rounded-full w-28 h-28 lg:w-36 lg:h-36 xl:w-36 xl:h-36 hover:brightness-75" />
          </div>

          {companyData?.profile ? (
            <button
              onClick={() => setEditIsOpen(true)}
              className="absolute top-1 left-1/2 ml-20 text-gray-800 transition-colors duration-200 dark:hover:text-emerald-500 dark:text-gray-900 hover:text-yellow-500 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          ) : (
            <FaPlus
              onClick={() => setEditIsOpen(true)}
              className="cursor-pointer w-5 h-5 absolute left-1/2 ml-20 dark:hover:text-emerald-500 top-1"
            />
          )}


          <div className="text-center mt-4">
            {/* Card Text Content */}
            <h2 className="text-2xl lg:text-3xl xl:text-3xl font-semibold font-serif">{companyData.companyName}</h2>
            <p className='mt-2 font-serif text-lg lg:text-xl xl:text-xl'>{companyData?.email}</p>
            <div className="flex items-center justify-center ">
              <IoLocationSharp className='w-5 h-5 mt-2' />

              <p className='mt-2 text-lg lg:text-xl xl:text-xl font-serif'>
                {companyData?.companyAddress?.district}, {companyData?.companyAddress?.state}
              </p>
            </div>
            <p className='mt-2 text-lg lg:text-xl xl:text-xl font-serif'>Bio: <span className='font-normal lg:text-xl xl:text-xl'>{companyData?.bio}</span></p>
            {/* <p className="text-lg lg:text-lg xl:text-lg">Phone: {companyData.phone}</p> */}
          </div>

        </div>
        {/* 2nd right card */}
        {/* <div className="bg-slate-100 shadow-md shadow-gray-400 p-4 m-2 lg:w-1/2 xl:w-full md:w-full rounded-lg relative py-10">
        
        <h1 className="text-2xl lg:text-2xl xl:text-2xl font-semibold">Company Details</h1>
        <hr className="my-2 border-gray-300 mr-10" />
        <h2 className="text-lg lg:text-xl xl:text-xl font-semibold">{companyData.companyName}</h2>
        <p className="text-lg lg:text-lg xl:text-lg">
          Location: {companyData?.companyAddress?.address} , {companyData?.companyAddress?.district} , {companyData?.companyAddress?.state}
        </p>
      </div> */}
        {/*  */}

        {isEditOpen && (
          <div className={`${isEditOpen ? 'fixed backdrop-blur-sm inset-0 flex items-center justify-center z-10 transition-opacity duration-300' : 'hidden'}`}>
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-10 overflow-y-auto relative">
              {/* Modal content */}
              <button
                type="button"
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                onClick={closeModal}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="modal-content py-4 text-left px-6">
                <h2 className="text-xl font-serif font-semibold mb-4">Profile Image</h2>
                <div className="mb-6">
                  <div className="w-24 h-24 border lg:w-36 lg:h-36 xl:w-36 xl:h-36 rounded-full mx-auto mb-2 overflow-hidden">
                    <img
                      src={image ? image : companyData?.profile}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <input
                    type="file"
                    accept=""
                    onChange={handleImageChange}
                    className="block w-full px-3 py-2 mt-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-900 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-200 dark:file:text-gray-900 dark:text-gray-900 placeholder-gray-400/70 dark:placeholder-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-300 dark:bg-white dark:focus:border-blue-300"
                    placeholder="Upload Profile Image"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold font-serif text-gray-800 text-xl mb-1" htmlFor="bio">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 h-20"
                    // placeholder="Enter your bio here"
                    // value={userData.bio}
                    placeholder={companyData?.bio}
                    onChange={(e) => setBio(e.target.value)}
                  />

                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleProfileSave}
                    className="bg-green-500 text-white py-2 px-3 rounded-md flex items-center">
                    <MdDownloadDone className="w-6 h-6 text-white-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>


        )}
        {viewImage && (
          <div className={`${viewImage ? 'fixed backdrop-blur-sm inset-0 flex items-center justify-center z-10 transition-opacity duration-300' : 'hidden'}`}>
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-10 overflow-y-auto relative">
              {/* Modal content */}
              <button
                type="button"
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                onClick={() => setViewImage(false)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="modal-content py-16 text-left">
                <div className="mb-8">
                  <div className="w-48 h-48 border lg:w-64 lg:h-64 xl:w-64 xl:h-64 mx-auto mb-2 overflow-hidden">
                    <img
                      src={companyData?.profile}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
    </>



  )
}