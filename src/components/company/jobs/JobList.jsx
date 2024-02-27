import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Axios_Instance from '../../../api/userAxios';
import { useSelector } from 'react-redux'
import SingleJobView from './SingleJobView';
import { FaEye } from 'react-icons/fa'
import Spinner from '../../Spinner';
import Select from 'react-select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AddPostModal from './AddPostModal';

function JobList() {
  const [isOpenView, setIsOpenView] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [spinnner, setspinnner] = useState(true);

  const [jobTitle, setJobTitle] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [workType, setWorkType] = useState('');
  const [vacancy, setVacancy] = useState();
  const [workplace, setWorkplace] = useState('');
  const [salaryRange, setSalaryRange] = useState('');

  const [deadline, setDeadline] = useState(new Date());
  const [qualifications, setQualifications] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [jobResponsibilities, setJobResponsibilities] = useState('');
  const [benefits, setBenefits] = useState('');

  const [JobList, setJobList] = useState([])
  const [CategoryList, setCategoryList] = useState([]);

  const [subscriptionPlan, setSubscriptionPlan] = useState([])
  const [proccessing, setProccessing] = useState(false);

  const companyId = useSelector((state) => state.company.id)


  //? *********************LOGO SETUP **********************
  //* remove logo 
  // const removeLogo = () => {
  //   const logoInput = document.getElementById('logo');
  //   if (logoInput) {
  //     logoInput.value = '';
  //   }
  //   setLogo('');
  // };

  //* validate logo
  // function isValidLogo(logo) {
  //   const validExtensions = ['.jpg', '.jpeg', '.png'];
  //   const logoName = logo.name.toLowerCase();
  //   const extension = logoName.substr(logoName.lastIndexOf('.'));
  //   return validExtensions.includes(extension);
  // }

  //* Logo storing
  // const handleLogoChange = (e) => {
  //   const logoFile = e.target.files[0];

  //   if (isValidLogo(logoFile)) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setLogo(reader.result);
  //     };
  //     reader.readAsDataURL(logoFile);
  //   } else {
  //     toast.error('Invalid file type. Please upload a JPEG, PNG, or WEBP image file.')
  //     removeLogo()
  //   }
  // };
  //? *********************END LOGO SETUP **********************

  const resetForm = () => {
    setOpenModal(false)
    setJobTitle('');
    setJobCategory('');
    setWorkType('');
    setVacancy();
    setWorkplace('');
    setSalaryRange('');
    setDeadline(new Date());
    setQualifications('');
    setJobDescription('');
    setCompanyDescription('');
    setJobResponsibilities('');
    setBenefits('');
  }

  const fetchSubscriptionPlan = async () => {

    try {
      const response = await Axios_Instance.get('/company/fetch_subscription_plan')

      if (response.status === 200) {
        setSubscriptionPlan(response.data.company)
      }

    } catch (error) {
      console.log(error)
    }
  }
  //? Start Custom styles for select field
  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: '51px',
      minHeight: '51px',
      borderRadius: '0.375rem',
      borderColor: '#d1d5db',
      boxShadow: 'none',
      backgroundColor: 'rgba(240,  253,  244,  1)',
      '&:hover': {
        borderColor: '#000000',
      },
      '&:focus': {
        borderColor: '#3182ce',
        boxShadow: '0   0   0   1px #3182ce',
      },
    }),
  };
  //? End Custom styles for select field

  const workTypeList = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Freelance",
  ]
  const salaryList = [
    '10k-20k',
    '20k-30k',
    '30k-40k',
    '40k-50k',
  ];
  const [workTypeOptions, setWorkTypeOptions] = useState(
    workTypeList.map(type => ({
      label: type,
      value: type.toLowerCase().replace(/\s+/g, '-'),
    }))
  );

  const [salaryOptions, setSalaryOptions] = useState(
    salaryList.map(option => ({
      label: option,
      value: option.replace('-', ' to '),
    }))
  );


  const fetchCategories = async () => {
    try {
      const response = await Axios_Instance.get('/company/category')
      if (response.status === 200) {
        // setCategoryList(response.data.category);
        const transformedCategories = response.data.category.map(category => ({
          label: category.categoryName,
          value: category._id,
        }));
        // Update the state with the transformed categories
        setCategoryList(transformedCategories);

      }
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const fetchJobPosts = async () => {
    try {
      const response = await Axios_Instance.get(`/company/jobs/${companyId}`)
      if (response.status === 200) {
        setspinnner(false)
        setJobList(response?.data?.Jobs);
      }
    } catch (error) {
      console.log(error.response.data.errMsg);

    }
  }

  useEffect(() => {
    fetchJobPosts();
    fetchCategories();
    fetchSubscriptionPlan()
  }, [])

  const validateFormData = () => {

    let errors = {};
    const alphabetRegex = /^[a-zA-Z]+$/;

    if (
      !jobTitle &&
      !jobCategory &&
      !workType &&
      !vacancy &&
      !workplace &&
      !salaryRange &&
      !qualifications.trim() &&
      !jobDescription.trim() &&
      !companyDescription.trim() &&
      !jobResponsibilities.trim() &&
      !benefits.trim()
    ) {
      errors.allFields = 'All fields must be filled';
    }

    // Individual field validations
    if (!jobTitle) {
      errors.jobTitle = 'Job title is required';
    }

    if (!jobCategory) {
      errors.jobCategory = 'Job category is required';
    }

    if (!workType) {
      errors.workType = 'Work type is required';
    }

    if (!salaryRange) {
      errors.salaryRange = 'Salary range is required';
    }

    if (!workplace || workplace.trim().length === 0) {
      errors.workplace = 'Workplace is required';
    } else if (!alphabetRegex.test(workplace)) {
      errors.workplace = 'Workplace must contain only alphabetic characters';
    }

    if (!vacancy) {
      errors.vacancy = 'Vacancy is required';
    } else if (isNaN(vacancy) || vacancy <= 0) {
      errors.vacancy = 'Vacancy must be a positive number';
    }


    if (!qualifications) {
      errors.qualifications = 'Qualifications are required';
    }

    if (!jobDescription) {
      errors.jobDescription = 'Job description is required';
    } else if (jobDescription.length < 20) {
      errors.jobDescription = 'Job description must be at least  20 characters long';
    }

    if (!companyDescription) {
      errors.companyDescription = 'Company description is required';
    } else if (companyDescription.length < 20) {
      errors.companyDescription = 'Company description must be at least  20 characters long';
    }

    if (!jobResponsibilities) {
      errors.jobResponsibilities = 'Job responsibilities are required';
    } else if (jobResponsibilities.length < 20) {
      errors.jobResponsibilities = 'Job responsibilities must be at least  20 characters long';
    }

    if (!benefits) {
      errors.benefits = 'Job benefits are required';
    } else if (benefits.length < 20) {
      errors.benefits = 'Job benefits must be at least  20 characters long';
    }


    if (!deadline) {
      errors.deadline = 'Deadline is required';
    }
    const currentDate = new Date();
    if (deadline < currentDate) {
      errors.deadline = 'Deadline must be a future date';
    }

    return errors;
  };


  // Handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();
    const errors = validateFormData();

    if (Object.keys(errors).length === 0) {
      try {
        setProccessing(true)

        const response = await Axios_Instance.post('/company/jobs', {
          jobTitle,
          jobCategory,
          workType,
          workplace,
          salaryRange,
          deadline,
          qualifications,
          jobDescription,
          companyDescription,
          jobResponsibilities,
          benefits,
          vacancy,
          companyId,
        },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (response.status === 200) {
          setProccessing(false)

          // setJobList((prevJobList) => [...prevJobList, newJob]);
          setJobList([...JobList, response.data.newJob]);

          setOpenModal(false);
          resetForm();
          toast.success("Saved job details");
        }

      } catch (error) {
        console.log(error);
        setProccessing(false)
        if (error.response.status === 400) {
          setProccessing(false)
          toast.error(error.response.data.errMsg);
        } else if (error.response.status === 500) {
          toast.error('Something went wrong, please try again')
        }
      }

    } else if (errors.allFields) {
      toast.error(errors.allFields);
    } else if (errors.jobTitle) {
      toast.error(errors.jobTitle);
    } else if (errors.jobCategory) {
      toast.error(errors.jobCategory);
    } else if (errors.workType) {
      toast.error(errors.workType);
    } else if (errors.salaryRange) {
      toast.error(errors.salaryRange);
    } else if (errors.workplace) {
      toast.error(errors.workplace);
    } else if (errors.vacancy) {
      toast.error(errors.vacancy);
    } else if (errors.qualifications) {
      toast.error(errors.qualifications);
    } else if (errors.jobDescription) {
      toast.error(errors.jobDescription);
    } else if (errors.companyDescription) {
      toast.error(errors.companyDescription);
    } else if (errors.jobResponsibilities) {
      toast.error(errors.jobResponsibilities);
    } else if (errors.benefits) {
      toast.error(errors.benefits);
    } else if (errors.deadline) {
      toast.error(errors.deadline);
    }
  };


  //? Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const jobsToShow = JobList.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const viewSingleJob = (id) => {
    const job = JobList.find(job => job._id === id);
    setSelectedJob(job);
    setIsOpenView(true)
  };

  const isDeadlineExpired = (deadline) => new Date(deadline) < new Date();

  //? Start Handle desable job
  const [openDisableModal, setOpenDisableModal] = useState(false)
  console.log(openDisableModal)
  const [openEnableModal, setOpenEnableModal] = useState(false)
  const [jobPostId, setJobPostId] = useState('')

  async function handleDisableJob(jobPostId) {
    try {
      setProccessing(true)
      const res = await Axios_Instance.patch('/company/enable_disable_job', { jobPostId, action: 'disableJob' })

      if (res.status === 200) {
        setProccessing(false)
        setJobList(res.data.updatedJobPost)
        setOpenDisableModal(false)
        toast.success('Post desabled')
      }
    } catch (error) {
      console.log(error)
    }
  }
  //? End Handle desable job

  async function handleEnableJob(jobPostId) {
    try {
      setProccessing(true)
      const res = await Axios_Instance.patch('/company/enable_disable_job', { jobPostId, action: 'enableJob' })

      if (res.status === 200) {
        setProccessing(false)
        setJobList(res.data.updatedJobPost)
        setOpenEnableModal(false)
        toast.success('Post enabled')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {spinnner ? (
        <Spinner />
      ) : (

        <>
          <SingleJobView job={selectedJob} setSelectedJob={setSelectedJob} isOpenView={isOpenView} setIsOpenView={setIsOpenView} />

          <div className="min-h-screen mt-28 md:min-h-fit sm:min-h-fit font-dm-sans font-normal">
            <div className="pb-12 overflow-x-auto bg-white m-3 sm:m-10">

              {subscriptionPlan.subscriptionPlan ? (
                <>
                  <div className="flex justify-end mb-2">
                    <Link
                      onClick={() => setOpenModal(true)}

                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                    >
                      Post Job
                    </Link>
                  </div>

                  <div className="w-full overflow-x-scroll">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-9 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                            No
                          </th>
                          <th className="px-9 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                            Job Title
                          </th>
                          <th className="px-9 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                            Work Type
                          </th>
                          <th className="px-9 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                            Salary Range
                          </th>
                          <th className="px-9 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                            Vacancy
                          </th>
                          {/* <th className="px-9 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                    Posted On
                  </th> */}
                          <th className="px-9 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                            Deadline
                          </th>
                          {/* <th className="px-9 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                            Qualifications
                          </th> */}
                          <th className="px-9 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                            View
                          </th>
                          <th className="px-9 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                            Approval status
                          </th>
                          <th className="px-9 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                            Job status
                          </th>
                          <th className="px-9 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                            Disable/Enable
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {jobsToShow.map((job, index) => (
                          <tr key={job._id}>
                            <td className="px-2 break-all py-4 text-center ">
                              {index + 1 + itemsPerPage * (currentPage - 1)}
                            </td>
                            <td className="px-2 break-all py-4 text-center ">{job.jobTitle}</td>
                            <td className="px-2 break-all py-4 text-center ">{job.workType}</td>
                            <td className="px-2 break-all py-4 text-center ">{job.salaryRange}</td>
                            <td className="px-2 break-all py-4 text-center ">{job.vacancy}</td>
                            {/* <td className="px-2 break-all py-4 text-center ">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td> */}
                            <td className="px-2 break-all py-4 text-center ">
                              {new Date(job.deadline).toLocaleDateString()}
                            </td>

                            {/* <td className="px-2 break-all py-4 text-center ">{job.qualifications}</td> */}
                            <td className="text-green-600 px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">

                              <div className="inline-flex items-center px-3 py-1 cursor-pointer rounded-full gap-x-2 bg-emerald-100/60 dark:text-gray-700">
                                <FaEye onClick={() => viewSingleJob(job._id)} className=" w-6 h-6" />
                              </div>
                            </td>

                            {job.isPostAccepted && job.status === 'Active' ? (
                              <>
                                <td className="px-2 break-all py-4 text-center ">
                                  <div className="inline-flex cursor-pointer items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-green-100">
                                    {/* <span className="h-2 w-2 rounded-full bg-green-600"></span> */}
                                    <h2 className="text-sm font-medium text-green-700">Approved</h2>
                                  </div>
                                </td>

                                <td className="px-2 break-all py-4 text-center ">
                                  {job?.isJobDisabled ? (
                                    <div className={`inline-flex cursor-pointer items-center px-2 py-1 rounded-full gap-x-2 bg-yellow-100/80 text-white`}>
                                      {/* <span className={`h-2 w-2 rounded-full bg-red-600`}></span> */}
                                      <h2 className={`text-sm font-medium text-red-600`}>
                                        {isDeadlineExpired(job.deadline) ? 'Expired' : 'Disabled'}
                                      </h2>
                                    </div>

                                  ) : (

                                    <div className={`inline-flex cursor-pointer items-center px-2 py-1 rounded-full gap-x-2 ${isDeadlineExpired(job.deadline) ? 'bg-yellow-100/80 text-white' : 'bg-green-100 dark:bg-green-100 text-green-600'}`}>
                                      {/* <span className={`h-2 w-2 rounded-full ${isDeadlineExpired(job.deadline) ? 'bg-yellow-100/80' : 'bg-green-600'}`}></span> */}
                                      <h2 className={`text-sm font-medium ${isDeadlineExpired(job.deadline) ? 'text-red-600' : 'text-green-600'}`}>
                                        {isDeadlineExpired(job.deadline) ? 'Expired' : 'Active'}
                                      </h2>
                                    </div>
                                  )}
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="px-2 break-all py-4 text-center ">
                                  <div className="inline-flex cursor-pointer items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/80">
                                    {/* <span className="h-2 w-2 rounded-full bg-yellow-600"></span> */}
                                    <h2 className="text-sm font-medium text-yellow-500">Pending</h2>
                                  </div>
                                </td>
                                <td className="px-2 break-all py-4 text-center ">
                                  <div className="inline-flex cursor-pointer items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/80">
                                    {/* <span className="h-2 w-2 rounded-full bg-yellow-600"></span> */}
                                    <h2 className={`text-sm font-medium ${job?.isJobDisabled ? 'text-red-500' : 'text-yellow-500'}`}>{job?.isJobDisabled ? 'Disabled' : (
                                      <>
                                        Approval <br /> Pending
                                      </>
                                    )}</h2>
                                  </div>
                                </td>
                              </>
                            )}
                            {job.isJobDisabled ? (
                              <td className="px-2 break-all py-4 text-center">
                                <button
                                  onClick={() => {
                                    setJobPostId(job._id);
                                    setOpenEnableModal(true);
                                  }}
                                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-5 text-sm rounded"
                                >
                                  Enable?
                                </button>
                              </td>
                            ) : (
                              <td className="px-2 break-all py-4 text-center">
                                <button
                                  onClick={() => {
                                    setJobPostId(job._id);
                                    setOpenDisableModal(true);
                                  }}
                                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 text-sm rounded"
                                >
                                  Disable Job?
                                </button>
                              </td>
                            )}

                            {/* <td className="px-2 break-all py-4 whitespace-no-wrap">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md mr-1">
                        Details
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md mr-1">
                        Remove
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-md">
                        Edit
                      </button>
                    </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {openDisableModal && (
                      <div
                        className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-10 backdrop-blur-sm"
                      >
                        <div className="relative mx-3 w-auto my-6 md:mx-auto max-w-sm">
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="mx-2 flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                              <h3 className="text-md md:text-2xl font-semibold">
                                Disable Job
                              </h3>
                            </div>
                            {/*body*/}
                            <div className="relative p-3 flex-auto mx-3">
                              <p className="text-gray-800 text-lg leading-relaxed">
                                Are you sure you want to disable the job, making it hidden from job seekers? ⚠️
                              </p>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                              <button
                                className=" text-emerald-500  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setOpenDisableModal(false)}
                              >
                                Close
                              </button>
                              <button
                                className="text-white bg-red-500 active:bg-red-600 rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                  handleDisableJob(jobPostId)
                                }}
                              >
                                {proccessing ? 'Loading...' : 'Ok'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {openEnableModal && (
                      <div
                        className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-10 backdrop-blur-sm"
                      >
                        <div className="relative mx-3 w-auto my-6 md:mx-auto max-w-sm">
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="mx-2 flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                              <h3 className="text-md md:text-2xl font-semibold">
                                Enable Job
                              </h3>
                            </div>
                            {/*body*/}
                            <div className="relative p-3 flex-auto mx-3">
                              <p className="text-gray-800 text-lg leading-relaxed">
                                Are you sure you want to enable the job?
                              </p>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                              <button
                                className=" text-emerald-500  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setOpenEnableModal(false)}
                              >
                                Close
                              </button>
                              <button
                                className="text-white bg-red-500 active:bg-red-600 rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                  handleEnableJob(jobPostId)
                                }}
                              >
                                {proccessing ? 'Loading...' : 'Ok'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Pagination */}
                    {JobList.length > 10 && (
                      <div className="mt-4 flex justify-center">
                        <ul className="flex">
                          {Array.from({ length: Math.ceil(JobList.length / itemsPerPage) }, (_, index) => (
                            <li key={index}>
                              <button
                                onClick={() => paginate(index + 1)}
                                className={`${currentPage === index + 1
                                  ? 'bg-sky-500 hover:bg-sky-600 text-white'
                                  : 'bg-white hover:bg-gray-100 text-gray-800'
                                  }  font-semibold py-1 px-2 rounded-md mr-1`}
                              >
                                {index + 1}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center min-h-screen">
                    {/* Centered UI */}
                    <div className="dark:bg-slate-100 p-4 rounded shadow-md shadow-gray-300 text-center">
                      <h1 className="lg:text-3xl xl:text-3xl text-xl font-semibold font-serif text-blue-700 mb-4">
                        Explore Our Subscription Plans
                      </h1>
                      <p className="text-gray-700 font-semibold xl:text-xl text-md lg:text-xl font-serif mb-4">
                        Enhance your job posting and unlock powerful features with our subscription plans.
                      </p>
                    </div>
                    <Link to={'/company/home'}>
                      <button
                        className="mt-4 font-serif bg-blue-500 text-white shadow-lg shadow-gray-400 rounded px-4 py-2 hover:bg-blue-600">
                        Get Started
                      </button>
                    </Link>
                  </div>

                </>
              )}
            </div>
          </div>
        </>
      )
      }

      {/*  */}
      {
        openModal && (
          <AddPostModal
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            jobCategory={jobCategory}
            setJobCategory={setJobCategory}
            workType={workType}
            setWorkType={setWorkType}
            salaryRange={salaryRange}
            setSalaryRange={setSalaryRange}
            workplace={workplace}
            setWorkplace={setWorkplace}
            vacancy={vacancy}
            setVacancy={setVacancy}
            qualifications={qualifications}
            setQualifications={setQualifications}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            companyDescription={companyDescription}
            setCompanyDescription={setCompanyDescription}
            jobResponsibilities={jobResponsibilities}
            setJobResponsibilities={setJobResponsibilities}
            benefits={benefits}
            setBenefits={setBenefits}
            deadline={deadline}
            setDeadline={setDeadline}
            proccessing={proccessing}
            handleSubmit={handleSubmit}
            CategoryList={CategoryList}
            workTypeOptions={workTypeOptions}
            salaryOptions={salaryOptions}
            customStyles={customStyles}
            resetForm={resetForm}
          />

        )
      }


      {/*  */}

    </>
  )
}

export default JobList