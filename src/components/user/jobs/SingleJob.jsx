import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Axios_Instance from '../../../api/userAxios';
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { userLogout } from '../../../store/slice/userSlice';
import '../../../assets/css/tooltip.css'
import Spinner from '../../Spinner';


function SingleJob() {

  const [isModalOpen, setModalOpen] = useState(false);
  const { jobId } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.user.id)
  const [singleJob, setSingleJob] = useState({})
  console.log('singleJob;', singleJob)
  const [CoverLetter, setCoverLetter] = useState('')
  const [CvFile, setCvFile] = useState('');
  const [proccessing, setProccessing] = useState(false);
  const [jobTitleForApplying, setJobTitleForApplying] = useState('')

  const validateApplyFormData = () => {
    const errors = {};

    const maxSize = 2 * 1024 * 1024;

    if (!CvFile && CvFile.trim().length === 0 && !CoverLetter && CoverLetter.trim().length === 0) {
      errors.common = "Please fill all the fields.";
    }
    if (!CvFile || CvFile.trim().length === 0) {
      errors.CvFile = "Please upload your CV"
    }
    if (CvFile.size > maxSize) {
      errors.CvFile = "File size exceeds the maximum allowed (2MB).";
    }

    if (!CoverLetter || CoverLetter.trim().length === 0) {
      errors.CvFile = "Cover letter is required"
    }
    if (CoverLetter.length > 1000) {
      errors.CoverLetter = "Cover letter exceeds the maximum length of 1000 characters.";
    }
    if (CoverLetter.length < 20) {
      errors.CoverLetter = "Cover letter should be at least 20 characters long.";
    }
    return errors;
  };

  const closeModal = () => {
    setModalOpen(false)
    setCvFile('');
    setCoverLetter('')
  }

  const removeCvFile = () => {
    const cvInput = document.getElementById('cvFileInput');
    if (cvInput) {
      cvInput.value = '';
    }
    setCvFile('');
  };

  function isValidCv(file) {
    const validExtensions = ['.jpeg', '.jpg', '.png'];
    const fileName = file.name.toLowerCase();
    const extension = fileName.substr(fileName.lastIndexOf('.'));
    return validExtensions.includes(extension);
  }

  const handleCvUpload = (e) => {
    const cvFile = e.target.files[0];

    if (isValidCv(cvFile)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvFile(reader.result);
      };

      reader.readAsDataURL(cvFile);
    } else {
      toast.error('Invalid file type. Please upload a jpeg, jpg, png document for your CV.');
      removeCvFile();
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateApplyFormData()

    const formData = new FormData();
    formData.append('CvFile', CvFile);
    formData.append('CoverLetter', CoverLetter);
    formData.append('jobId', jobId);
    formData.append('userId', userId)

    if (Object.keys(errors).length === 0) {
      try {
        setProccessing(true)
        const response = await Axios_Instance.post('/applyJob', formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        if (response.status === 200) {
          setProccessing(false)
          toast.success("Your application has been successful")
          closeModal()
          navigate('/jobs')
        }

      } catch (error) {
        setProccessing(false)

        //? If blocked user 
        if (error?.response?.data?.isBlocked) {
          dispatch(userLogout());
          toast.error(error?.response?.data?.errMsg);
        }

        if (error.response.status === 400) {
          return toast.error(error?.response?.data?.errMsg)
        } else {
          console.log(error?.response?.data?.errMsg)
        }
      }

    } else if (errors.common) {
      toast.error("Please fill all the fields");
    } else if (errors.CvFile) {
      toast.error(errors.CvFile);
    } else if (errors.CoverLetter) {
      toast.error(errors.CoverLetter);
    }

  };

  const [spinner, setSpinner] = useState(true)
  const fetchSingleJob = async () => {
    try {
      const response = await Axios_Instance.get(`/jobview/${jobId}`);
      setSingleJob(response.data.singleJob);
      setSpinner(false)
    } catch (error) {
      //? If blocked user 
      if (error?.response?.data?.isBlocked) {
        dispatch(userLogout());
        toast.error(error?.response?.data?.errMsg);
      }
      console.log(error.response.data.errMsg);
    }

  }

  useEffect(() => {
    fetchSingleJob()
  }, [])


  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (

    <>

      {spinner ? (
        <Spinner />
      ) : (
        <>

          <div className="mt-1 h-auto font-dm-sans font-normal">
            <div className="h-auto relative px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 mx-auto">
              <div className="h-auto flex pt-6 flex-col md:flex-row">
                {/* 1st half */}
                <div className="md:w-3/4 md:pl-40">
                  <div className="flex justify-center items-center h-full">
                    <div className="m-10 md:m-0">
                      <div className="mb-6 flex">
                        {/* Start Tooltip for company detail */}
                        <div className='has-tooltip'>
                          <span className='tooltip rounded-md shadow-lg p-1 text-gray-800 -mt-5'>
                            about company</span>
                          <Link to={`/about_company/${singleJob?.companyId?._id}`}>
                            <img className="w-16 h-16" src={singleJob?.companyId?.profile} alt="" />
                          </Link>
                        </div>
                        {/* End Tooltip for company detail */}

                        <div className="ml-4">
                          <h2 className="text-2xl font-semibold">{singleJob.jobTitle}</h2>
                          <h2 className="text-lg font-medium mt-1">
                            <Link to={`/about_company/${singleJob?.companyId?._id}`} >{singleJob?.companyId?.companyName}</Link>
                          </h2>

                          <div className="text-gray-800 text-base md:flex md:space-x-2 md:justify-between mt-1">
                            <p>{singleJob.workplace} </p>
                            <p>{singleJob.workType} Role</p>
                          </div>
                        </div>
                      </div>

                      <div className='flex items-center space-x-4 mt-6'>
                        <h2 className="text-lg font-medium">Job Category:</h2>
                        <p className='text-base '>
                          <span className="text-gray-800">{singleJob.jobCategory}</span>
                        </p>
                      </div>
                      <div>
                        <h2 className="text-lg mt-6 font-medium">Job Description:</h2>
                        <p className='text-base mt-5'>
                          <span className="text-gray-800">{singleJob.jobDescription}:</span>
                        </p>
                      </div>
                      <div>
                        <h2 className="text-lg mt-6 font-medium">Qualifications:</h2>
                        <p className='text-base mt-5'>
                          <span className="text-gray-800">{singleJob.qualifications}:</span>
                        </p>
                      </div>
                      <div>
                        <h2 className="text-lg mt-6 font-medium">Your Responsibilities:</h2>
                        <p className='text-base mt-5'>
                          <span className="text-gray-800">{singleJob.jobResponsibilities}:</span>
                        </p>
                      </div>
                      <div>
                        <h2 className="text-lg mt-6 font-medium">About Company:</h2>
                        <p className='text-base mt-5'>
                          <span className="text-gray-800">{singleJob.companyDescription}:</span>
                        </p>
                      </div>

                      {/* Apply Now Button */}
                      <div className="mt-16 mb-28 flex w-full">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 w-full rounded-xl"
                          onClick={() => {
                            setModalOpen(true)
                            setJobTitleForApplying(singleJob.jobTitle)
                          }}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>


                {/* 2nd half */}
                <div className="md:w-1/2 md:mt-12 lg:mt-12 xl:mt-12">
                  <div className="flex justify-start h-full">
                    <div className="m-12">
                      <h2 className="text-lg mt-6 font-medium">Job Summary</h2>
                      <div className='flex items-center space-x-4'>
                        <p className='text-base mt-5 '>
                          Work place: <span className='text-gray-800'>{singleJob.workplace}</span>
                          {/* We currently have <span>{singleJob.vacancy}</span> job openings for the position of{' '}
                        <span>{singleJob.jobTitle}</span> in <span>{singleJob.workplace}</span>. This <span>{singleJob.workType}</span> role offers excellent benefits and growth opportunities. If you're looking for a fulfilling career opportunity, we encourage you to apply and become a part of our talented team. */}
                        </p>
                      </div>
                      <div className='flex items-center space-x-4'>
                        <p className='text-base mt-3 '>
                          Work type: <span className='text-gray-800'>{singleJob.workType}</span>
                        </p>
                      </div>
                      <div className='flex items-center space-x-4'>
                        <p className='text-base mt-3 '>
                          Status: <span className='text-gray-800'>Actively recruiting</span>
                        </p>
                      </div>
                      <div className='flex items-center space-x-4'>
                        <p className='text-base mt-3 '>
                          Vacancy: <span className='text-gray-800'>{singleJob.vacancy}</span>
                        </p>
                      </div>
                      <div className='flex items-center space-x-4'>
                        <p className='text-base mt-3 '>
                          Salary range: <span className='text-gray-800'>{singleJob.salaryRange}</span>
                        </p>
                      </div>
                      <div className='flex items-center space-x-4'>
                        <p className='text-base mt-3 '>
                          Dead line: <span className='text-gray-800'>{formatDate(singleJob?.deadline)}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 backdrop-blur-sm">
                  <div className="dark:bg-green-50 rounded-sm w-11/12 md:w-1/2 relative">

                    <div className="absolute top-3 right-3">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={closeModal}
                      >
                        <span className="sr-only"></span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="p-6">
                      <h2 className="text-2xl font-semibold mb-4">Apply for the {jobTitleForApplying}</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-gray-800 text-sm font-bold mb-2">
                            CV File
                          </label>
                          <input
                            id="cvFileInput"
                            className="w-full bg-slate-100 text-gray-800 border rounded py-2 px-3"
                            type="file"
                            name="CvFile"
                            onChange={handleCvUpload}
                          />
                          {CvFile && (
                            <div className="mt-1">
                              <button
                                className="text-red-500 hover:text-red-700"
                                onClick={removeCvFile}
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <label className="block text-gray-800 text-sm font-bold mb-2">
                            Cover Letter
                          </label>
                          <textarea
                            className="w-full bg-slate-100 text-gray-800 border rounded py-2 px-3"
                            name="CoverLetter"
                            placeholder="Type your cover letter here"
                            rows="4"
                            onChange={(e) => {
                              setCoverLetter(e.target.value);
                            }}
                          ></textarea>
                          <p className="text-yellow-600 text-sm mt-2">
                            Include a cover letter explaining why you are interested in this position and any additional information you'd like to provide.
                          </p>
                        </div>
                        <div className="text-center">
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-12 rounded-md"
                            type="submit"
                            disabled={proccessing}
                          >
                            {proccessing ? 'Processing...' : 'Submit'}
                          </button>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>
              )}


              <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                <div
                  className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default SingleJob