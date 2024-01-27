import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Axios_Instance from '../../../api/userAxios';
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { userLogout } from '../../../store/slice/userSlice';



function SingleJob() {

  const [isModalOpen, setModalOpen] = useState(false);
  const { jobId } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.user.id)
  const [singleJob, setSingleJob] = useState({})
  const [CoverLetter, setCoverLetter] = useState('')
  const [CvFile, setCvFile] = useState('');
  const [proccessing, setProccessing] = useState(false);

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

        if (error?.response?.status === 401 || error?.response?.data?.errMsg === 'Your account has been blocked') {
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

  const fetchSingleJob = async () => {
    try {
      const response = await Axios_Instance.get(`/jobview/${jobId}`);
      setSingleJob(response.data.singleJob);
    } catch (error) {
      if (error?.res?.status === 401 || error?.res?.data?.errMsg === 'Your account has been blocked') {
        dispatch(userLogout());
        toast.error(error?.res?.data?.errMsg);
      }
      console.log(error.response.data.errMsg);
    }

  }

  useEffect(() => {
    fetchSingleJob()
  }, [])

  return (
    <div className="mt-1 h-auto">
      <div className="h-auto relative px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 mx-auto">
        <div className="h-auto flex pt-6 flex-col md:flex-row">
          <div className="md:w-1/2">
            <div className="flex justify-center items-center h-full">
              <div className="p-4">
                <div className="mb-6 flex">
                  <img className="w-16 h-16" src={singleJob.logo} alt="" />
                  <div className="ml-4">
                    <h2 className="text-3xl font-semibold">{singleJob.jobTitle}</h2>
                    <div className="flex space-x-2">
                      <p>{singleJob.workplace}</p>
                      <p>,</p>
                      <p>{singleJob.workType} Role</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="leading text-xl font-semibold">Job Category:</h2>
                  <p>
                    <span className="text-indigo-600">{singleJob.jobCategory}:</span> This category defines the specific area of expertise or industry focus for this job. It helps job seekers understand the nature of the role.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Job Description:</h2>
                  <p>
                    <span className="text-indigo-600">{singleJob.jobDescription}:</span> The job description provides a comprehensive overview of the position, including its responsibilities, tasks, and qualifications. It helps candidates assess if they are a good fit for the role.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Qualifications:</h2>
                  <p>
                    <span className="text-indigo-600">{singleJob.qualifications}:</span> These qualifications represent the skills, education, and experience required for the job. Candidates should review these qualifications to ensure they meet the criteria.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Your Responsibilities:</h2>
                  <p>
                    <span className="text-indigo-600">{singleJob.jobResponsibilities}:</span> This section outlines the specific duties and tasks that the selected candidate will be responsible for in this role. It helps candidates understand their day-to-day responsibilities.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">About Company:</h2>
                  <p>
                    <span className="text-indigo-600">{singleJob.companyDescription}:</span> The company description provides insights into the hiring organization, including its mission, values, and company culture. It helps candidates assess if they align with the company's values.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:mt-12 lg:mt-12 xl:mt-12">
            <div className="flex justify-center h-full">
              <div className="p-4">
                <h2 className="text-xl font-semibold">Job Summary</h2>
                <p>
                  We currently have <span className="text-indigo-600">{singleJob.vacancy}</span> job openings for the position of{' '}
                  <span className="text-indigo-600">{singleJob.jobTitle}</span> in <span className="text-indigo-600">{singleJob.workplace}</span>. This <span className="text-indigo-600">{singleJob.workType}</span> role offers excellent benefits and growth opportunities. If you're looking for a fulfilling career opportunity, we encourage you to apply and become a part of our talented team.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/*  */}
        <div className="flex w-full">
          <button
            className="mx-auto  bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-24 rounded-full"
            onClick={() => setModalOpen(true)}
          >
            Apply Now
          </button>
        </div>


        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-sm w-11/12 md:w-1/2 relative">

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
                <h2 className="text-2xl font-semibold mb-4">Apply for the Job</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      CV File
                    </label>
                    <input
                      id="cvFileInput"
                      className="w-full bg-slate-200 text-gray-700 border rounded py-2 px-3"
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
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      className="w-full bg-slate-200 text-gray-700 border rounded py-2 px-3"
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
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full"
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

  )
}

export default SingleJob