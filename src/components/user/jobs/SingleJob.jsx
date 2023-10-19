import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios_Instance from '../../../api/userAxios';
import { useSelector, useDispatch } from 'react-redux'
// import { applyJob, blockApplication } from '../../../store/slice/jobApplicationSlice';
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';


function SingleJob() {

  // const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const { jobId } = useParams();
  const userId = useSelector((state) => state.user.id)
  const [singleJob, setSingleJob] = useState({})
  const [CoverLetter, setCoverLetter] = useState('')
  const [CvFile, setCvFile] = useState('');
  // const [cvFileType, setcvFileType] = useState(null)
  const [Applied, setApplied] = useState([])
  // 
  // const isJobApplied = useSelector((state) => state.jobApplications[jobId]);
  // console.log(isJobApplied)

  // localstorage
  // const [jobApplicationStates, setJobApplicationStates] = useState(() => {
  //   const storedStates = localStorage.getItem('jobApplicationStates');
  //   return storedStates ? JSON.parse(storedStates) : {};
  // });
  // const isJobApplied = jobApplicationStates[jobId];

  const validateApplyFormData = () => {
    const errors = {};
    // const allowedFileTypes = ["image/jpeg", "image/png", "image/webp"];
    const coverLetterRegex = /^[A-Za-z\s]+$/;
    const maxSize = 2 * 1024 * 1024;

    if (!CvFile && CvFile.trim().length === 0 && !CoverLetter && CoverLetter.trim().length === 0) {
      errors.common = "Please fill all the fields.";
    }
    if (!CvFile || CvFile.trim().length === 0) {
      errors.CvFile = "Please upload your CV"
    }
    // else if (!allowedFileTypes.includes(cvFileType.type)) {
    //   errors.CvFile = "Invalid file type. Please upload a JPEG, PNG, or WEBP image file.";
    // }
    if (CvFile.size > maxSize) {
      errors.CvFile = "File size exceeds the maximum allowed (2MB).";
    }

    if (!CoverLetter || CoverLetter.trim().length === 0) {
      errors.CvFile = "Cover letter is required"
    }
    if (!coverLetterRegex.test(CoverLetter)) {
      errors.CoverLetter = 'Cover letter should only contain alphabets and spaces.';
    }
    if (CoverLetter.length > 1000) {
      errors.CoverLetter = "Cover letter exceeds the maximum length of 1000 characters.";
    }
    if (CoverLetter.length < 20) {
      errors.CoverLetter = "Cover letter should be at least 20 characters long.";
    }


    return errors;
  };

  // useEffect(() => {
  //   localStorage.setItem('jobApplicationStates', JSON.stringify(jobApplicationStates));
  // }, [jobApplicationStates]);


  //   function isValidImage(logo) {
  //     const validExtensions = ['.jpg', '.jpeg', '.png'];

  //     const extension = logo.substr(logo.lastIndexOf('.')).toLowerCase();

  //     return validExtensions.includes(extension);
  //   }
  //   const handleCvUpload = (e) => {
  //     if (isValidImage(e?.target?.files[0].name)) {
  //     const cvFile = e.target.files[0]
  //     // setcvFileType(e.target.files[0])

  //     // transformFile(cvFile);
  //   // }
  //   // const transformFile = (cvFile) => {
  //     const reader = new FileReader();

  //     if (cvFile) {
  //       reader.readAsDataURL(cvFile)
  //       reader.onloadend = () => {
  //         setCvFile(reader.result)
  //       }
  //     } else {
  //       setCvFile('')
  //     }
  //   }else {
  //     toast.error('Invalid file type. Please upload a JPEG, PNG, or WEBP image file.')
  //     removeCvFile()
  //   }
  // }

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
    const validExtensions = ['.pdf'];
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
      toast.error('Invalid file type. Please upload a PDF document for your CV.');
      removeCvFile();
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // const cvFile = CvFile;
    // const coverLetter = CoverLetter;
    const errors = validateApplyFormData()


    const formData = new FormData();
    formData.append('CvFile', CvFile);
    formData.append('CoverLetter', CoverLetter);
    formData.append('jobId', jobId);
    formData.append('userId', userId)

    if (Object.keys(errors).length === 0) {
      try {
        const response = await Axios_Instance.post('/applyJob', formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        if (response.status === 200) {
          setApplied(response.data.application)
          console.log("Success on client ")
          toast.success("Application successful")
          closeModal()
          // Making job id as true on localstorage, for avoid action after the apply
          // if (!isJobApplied) {
          //   dispatch(applyJob({ userId, jobId }));
          // }
          // setJobApplicationStates((prevState) => ({
          //   ...prevState,
          //   [jobId]: true,
          // }));


        }

      } catch (error) {
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
  // const handleCancelApplication = () => {
  //   if (isJobApplied) {
  //     dispatch(blockApplication({ jobId }));
  //   }
  // };

  const fetchSingleJob = async () => {
    try {
      const response = await Axios_Instance.get(`/jobview/${jobId}`);
      setSingleJob(response.data.singleJob);
    } catch (error) {
      console.log(error.response.data.errMsg);
    }

  }

  useEffect(() => {
    fetchSingleJob()
  }, [])

  return (
    <div className="mt-1 h-auto">
      <div className="h-auto relative px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 mx-auto">
        {/*  Original*/}
        {/* <div className="h-auto flex pt-6 flex-col md:flex-row">
          <div className="md:w-1/2">
            <div className=" flex justify-center bg-green-300 items-center h-full">
              <div className="p-4">
                <div className='mb-6 flex'>
                  <img className='w-16 h-16' src="data:image/jpeg;base64,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" alt="" />
                  <div className="ml-4">
                    <h2 className="text-3xl font-semibold">{singleJob.jobTitle}</h2>
                    <div className="flex space-x-2">
                      <p>{singleJob.workplace}</p>
                      <p>,</p>
                      <p>{singleJob.workType}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="leading text-xl font-semibold">Job Category:</h2>
                  <p>{singleJob.jobCategory}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Job Description:</h2>
                  <p>{singleJob.jobDescription}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Qualifications:</h2>
                  <p>{singleJob.qualifications}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Responsibilities:</h2>
                  <p>{singleJob.jobResponsibilities}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Company Description:</h2>
                  <p>{singleJob.companyDescription}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:mt-0 ">
            <div className="text-center ">
              <h2 className="text-xl font-semibold">Job summery</h2>
              <p>Job Category: {singleJob.jobCategory}</p>
              <p>Job Type: {singleJob.workType}</p>
            </div>
          </div>
        </div> */}
        {/*  */}
        {/* 2nd */}
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
                  {/* <div className="mb-4 flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Your Name
          </label>
          <input
            className="w-full bg-slate-200 text-gray-700 border rounded py-2 px-3"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone
          </label>
          <input
            className="w-full bg-slate-200 text-gray-700 border rounded py-2 px-3"
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div> */}

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      CV File
                    </label>
                    <input
                      id="cvFileInput" // Add an ID for easier access
                      className="w-full bg-slate-200 text-gray-700 border rounded py-2 px-3"
                      type="file"
                      name="CvFile"
                      // accept=".pdf,.doc,.docx"
                      onChange={handleCvUpload}
                    />
                    {CvFile && (
                      <div className="mt-1">
                        {/* <p>Selected File: {CvFile.name}</p> */}
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
                      // value={CoverLetter}
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
                    >
                      Submit
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