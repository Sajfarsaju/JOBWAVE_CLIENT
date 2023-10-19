import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/Visibility';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Autocomplete from '@mui/material/Autocomplete';
import Axios_Instance from '../../api/userAxios';
import { useSelector } from 'react-redux'
import SingleJobView from './home/SingleJobView';
import { FaEye } from 'react-icons/fa'

function JobList() {
  const { token } = useSelector((state) => state.company);
  const [isOpenView, setIsOpenView] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  console.log('selectedJob;', selectedJob)

  // const [JobData, setJobData] = useState(
  //   {

  //   }
  //   )
  const [jobTitle, setJobTitle] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [workType, setWorkType] = useState("");
  const [vacancy, setVacancy] = useState();
  const [workplace, setWorkplace] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [logo, setLogo] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [jobResponsibilities, setJobResponsibilities] = useState('');
  const [benefits, setBenefits] = useState('');

  const [JobList, setJobList] = useState([])
  const [CategoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState([])
  console.log('subscriptionPlan;', subscriptionPlan)

  const companyId = useSelector((state) => state.company.id)

  //? *********************LOGO SETUP **********************
  //* remove logo 
  const removeLogo = () => {
    const logoInput = document.getElementById('logo');
    if (logoInput) {
      logoInput.value = '';
    }
    setLogo('');
  };

  //* validate logo
  function isValidLogo(logo) {
    const validExtensions = ['.jpg', '.jpeg', '.png'];
    const logoName = logo.name.toLowerCase();
    const extension = logoName.substr(logoName.lastIndexOf('.'));
    return validExtensions.includes(extension);
  }

  //* Logo storing
  const handleLogoChange = (e) => {
    const logoFile = e.target.files[0];

    if (isValidLogo(logoFile)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(logoFile);
    } else {
      toast.error('Invalid file type. Please upload a JPEG, PNG, or WEBP image file.')
      removeLogo()
    }
  };
  //? *********************END LOGO SETUP **********************

  // vacancy
  // const handleVacancyChange = (e) => {
  //   console.log("prrr")
  //   setVacancy(e.target.value);
  // const inputValue = e.target.value;
  // const parsedValue = parseInt(inputValue, 10);
  // console.log('Parsed vacancy:', parsedValue);
  // if (!isNaN(parsedValue)) {
  //   setVacancy(parsedValue);
  //   console.log('Parsed vacancy:', parsedValue); // Add this line for debugging
  // } else {
  //   console.log('Invalid vacancy input:', inputValue); // Add this line for debugging
  // }
  // };
  // const formData = new FormData();
  // formData.append('logo', logo);

  const resetForm = () => {
    setOpenModal(false)
    setJobTitle('');
    setJobCategory('');
    setWorkType('');
    setVacancy();
    setWorkplace('');
    setSalaryRange('');
    setDeadline(new Date());
    setLogo('');
    setQualifications('');
    setJobDescription('');
    setCompanyDescription('');
    setJobResponsibilities('');
    setBenefits('');
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

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


  const fetchCategories = async () => {
    try {
      const response = await Axios_Instance.get('/company/category')
      if (response.status === 200) {
        setCategoryList(response.data.category);
      }
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const fetchJobPosts = async () => {
    try {
      const response = await Axios_Instance.get(`/company/jobs/${companyId}`)
      if (response.status === 200) {
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


  // const validateFormData = () => {
  //   const nameRegex = /^[A-Za-z\s]+$/;

  //   if (!jobTitle || jobTitle.trim().length === 0 && 
  //       !jobCategory || jobCategory.trim().length === 0 &&
  //       !workType || workType.trim().length === 0 &&
  //       !workplace || workplace.trim().length === 0 &&
  //       !salaryRange || salaryRange.trim().length === 0 
  //       ) {
  //     errors.common = "Please fill all the fields.";
  //   }





  //   if (!jobTitle || jobTitle.trim().length === 0) {
  //     errors.jobTitle = "CV file is required"
  //   }

  //   if (!jobCategory || jobCategory.trim().length === 0) {
  //     errors.jobCategory = "Cover letter is required"
  //   }
  //   if (!coverLetterRegex.test(CoverLetter)) {
  //     errors.CoverLetter = 'Cover letter should only contain alphabets and spaces.';
  //   }
  //   if (CoverLetter.length > 1000) {
  //     errors.CoverLetter = "Cover letter exceeds the maximum length of 1000 characters.";
  //   }
  //   if (CoverLetter.length < 20) {
  //     errors.CoverLetter = "Cover letter should be at least 20 characters long.";
  //   }


  //   return errors;

  // }
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios_Instance.post('/company/jobs', {
        jobTitle,
        jobCategory,
        workType,
        workplace,
        salaryRange,
        deadline,
        logo,
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


        // setJobList((prevJobList) => [...prevJobList, newJob]);
        setJobList([...JobList, response.data.newJob]);

        setOpenModal(false);
        resetForm();
        toast.success("Saved job details");
      } else if (error.response.status === 400) {
        toast.error(error.response.data.errMsg);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error(error.response.data.errMsg);
      } else if (error.response.status === 500) {
        console.log(error.response.data.errMsg)
      }
    }
  };



  const [workTypeList, setWorkTypeList] = useState([
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Freelance",
  ]);
  const salaryOptions = [
    '10k-20k',
    '20k-30k',
    '30k-40k',
    '40k-50k',
  ];
  const [movieOptions, setMovieOptions] = useState([
    'The Shawshank Redemption',
    'The Godfather',
    'The Dark Knight',
    'Pulp Fiction',
    'Schindler\'s List',
    'Forrest Gump',
    'The Matrix',
    'Goodfellas',
    'Inception',
    'The Lord of the Rings: The Fellowship of the Ring',
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const jobsToShow = JobList.slice(indexOfFirstItem, indexOfLastItem);
  console.log('jobsToShow:', jobsToShow)

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const viewSingleJob = (id) => {
    const job = JobList.find(job => job._id === id);
    setSelectedJob(job);
    setIsOpenView(true)
  };


  return (
    <>
      <SingleJobView job={selectedJob} isOpenView={isOpenView} setIsOpenView={setIsOpenView} />
      <div className="min-h-screen mt-28">
        <div className="pb-12 overflow-x-auto bg-white shadow-xl m-10 shadow-gray-400">
          <div className="flex justify-end mb-2">
            {subscriptionPlan.subscriptionPlan ? (
              <button
                onClick={() => setOpenModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Post Job
              </button>
            ) : (
              <Link to={'/company/home'}>
                <button

                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                  Take plan
                </button>
              </Link>
            )}
          </div>
          <div className="w-full overflow-x-scroll">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                    Work Type
                  </th>
                  <th className="px-6 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                    Salary Range
                  </th>
                  <th className="px-6 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                    Vacancy
                  </th>
                  {/* <th className="px-6 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                    Posted On
                  </th> */}
                  <th className="px-6 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-6 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                    Qualifications
                  </th>
                  <th className="px-6 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                   View
                  </th>
                  <th className="px-6 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                    Approval status
                  </th>
                  <th className="px-6 py-3 bg-slate-100 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                    Job status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobsToShow.map((job, index) => (
                  <tr key={job._id}>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {index + 1 + itemsPerPage * (currentPage - 1)}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">{job.jobTitle}</td>
                    <td className="px-6 py-4 whitespace-no-wrap">{job.workType}</td>
                    <td className="px-6 py-4 whitespace-no-wrap">{job.salaryRange}</td>
                    <td className="px-6 py-4 whitespace-no-wrap">{job.vacancy}</td>
                    {/* <td className="px-6 py-4 whitespace-no-wrap">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td> */}
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {new Date(job.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <img
                        className='rounded-full'
                        src={job.logo}
                        alt="Job Logo"
                        width="50"
                        height="50"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">{job.qualifications}</td>
                    <td className="text-green-600 px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">

                      <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:text-gray-700">
                        <FaEye onClick={() => viewSingleJob(job._id)} className="w-6 h-6" />
                      </div>
                    </td>

                    {job.isPostAccepted && job.status === 'Active' ? (
                      <>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="inline-flex cursor-pointer items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-green-200">
                            <span className="h-1.5 w-1.5 bg-green-600"></span>
                            <h2 className="text-sm font-medium text-green-700">Approved</h2>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="inline-flex cursor-pointer items-center px-3 py-1 rounded-full gap-x-2 ">
                            <span className="h-2 w-3 rounded-full bg-green-600"></span>
                            <h2 className="text-sm font-medium text-green-600">Actively recruting</h2>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-no-wrap text-center">
                          <div className="inline-flex cursor-pointer items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-yellow-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-600"></span>
                            <h2 className="text-sm font-medium text-yellow-600">Pending</h2>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center">
                          <div className="inline-flex cursor-pointer items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/70 ">
                            <span className="h-1.5 w-1.5 rounded-full"></span>
                            <h2 className="text-sm font-medium text-yellow-600">Approval Pending</h2>
                          </div>
                        </td>
                      </>
                    )}

                    {/* <td className="px-6 py-4 whitespace-no-wrap">
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
        </div>
      </div>


      {/*  */}
      {openModal && (
        <div className="max-w-2xl mx-auto">

          <div
            id="authentication-modal"
            aria-hidden="true"
            className="fixed inset-0 overflow-x-hidden overflow-y-auto h-modal md:h-full top-0 left-0 flex justify-center items-center z-50"
          >
            <div className="relative w-96 md:w-auto md:max-h-full ">
              <div className="rounded-lg shadow relative bg-slate-300">
                <div className="flex justify-end p-2">
                  <button
                    type="button"
                    className="text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={resetForm}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* Modal 2nd original form */}
                {/* <form
                  className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
                  action="#"
                >
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Sign in to our platform
                  </h3>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required=""
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                          required=""
                        />
                      </div>
                      <div className="text-sm ml-3">
                        <label
                          htmlFor="remember"
                          className="font-medium text-gray-900 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                    >
                      Lost Password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Login to your account
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?{' '}
                    <a
                      href="#"
                      className="text-blue-700 hover:underline dark:text-blue-500"
                    >
                      Create account
                    </a>
                  </div>
                </form> */}
                {/* Modal original form end */}


                {/* register form */}
                <div className="mx-auto sm:w-full max-w-2xl rounded-lg px-6  lg:px-8 overflow-hidden">
                  <div>
                    <h2 className="text-2xl font-bold leading-9 text-blue-600 text-center">
                      Job Details
                    </h2>
                  </div>

                  <div className="px-1 py-8">

                    <form className="mt-10 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                      <Grid className='justify-center' container spacing={2}>
                        <Grid item xs={5}>
                          <TextField
                            id="jobtitle"
                            label="Job Title*"
                            variant="filled"
                            type="text"
                            name='jobTitle'
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            fullWidth
                            // onChange={handleChange}
                            // value={formData.concernName}
                            InputProps={{
                              style: {
                                padding: '1px 3px',
                                color: 'black',
                              },
                            }}
                            InputLabelProps={{
                              style: {
                                color: 'black',
                                fontSize: '18px',
                              },
                              shrink: true,
                            }}
                          />
                        </Grid>



                        <Grid item xs={5}>

                          {/* ook */}
                          {/* <FormControl variant="filled" sx={{ minWidth: 240 }}>
                            <InputLabel
                              id="demo-simple-select-filled-label"
                              style={{
                                color: 'white',
                                fontSize: '18px',
                              }}
                              shrink={true}
                            >
                              Job Category
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-filled-label"
                              id="demo-simple-select-filled"
                              value={age}
                              onChange={handleChange}
                              style={{
                                color: 'white',
                              }}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Sajfar</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl> */}

                          {/* <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={movieOptions}
                            sx={{ width: 241 }}
                            value={jobCategory}
                            onChange={(e, newValue) => setJobCategory(newValue)}
                            renderInput={(params) =>
                              <TextField variant="filled" {...params}
                                label="Job Category"
                                type="text"
                                name='jobCategory'
                                InputLabelProps={{
                                  style: {
                                    color: 'black',
                                    fontSize: '18px',
                                  },
                                  shrink: true,
                                }}

                              />}
                          /> */}
                          {/* <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            sx={{ width: 241 }}
                            options={CategoryList}
                            // getOptionLabel={(option) => option.categoryName}
                            value={jobCategory}
                            onChange={(event, newValue) => {
                              setJobCategory(newValue);
                            }}
                            renderInput={(params) =>
                              <TextField {...params}
                              type="text"
                              name='jobCategory'
                                label="Job Category"
                                variant="filled"
                                InputLabelProps={{
                                  style: {
                                    color: 'black',
                                    fontSize: '18px',
                                  },
                                  shrink: true,
                                }}
                              />}
                            
                          /> */}
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            sx={{ width: 241 }}
                            options={CategoryList}
                            // value={jobCategory}
                            // value={jobCategory === undefined || 
                            //        jobCategory === '' || jobCategory === null ? '' : jobCategory}
                            onChange={(event, newValue) => {
                              console.log(newValue.categoryName, ":categoryyy nameclient")
                              // const newval = newValue.categoryName
                              // console.log(newval,"????"
                              setJobCategory(newValue);
                            }}
                            getOptionLabel={(option) => option.categoryName}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                type="text"
                                name="jobCategory"
                                label="Job Category"
                                variant="filled"
                                InputLabelProps={{
                                  style: {
                                    color: 'black',
                                    fontSize: '18px',
                                  },
                                  shrink: true,
                                }}

                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={workTypeList}
                            sx={{ width: 241 }}
                            value={workType}
                            onChange={(e, newValue) => setWorkType(newValue)}
                            renderInput={(params) =>
                              <TextField variant="filled" {...params}
                                label="Work Type"
                                type="text"
                                name='workType'
                                InputLabelProps={{
                                  style: {
                                    color: 'black',
                                    fontSize: '18px',
                                  },
                                  shrink: true,
                                }}

                              />}
                          />
                        </Grid>

                        <Grid item xs={5}>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            sx={{ width: 241 }}
                            options={salaryOptions}
                            value={salaryRange}
                            onChange={(event, newValue) => {
                              setSalaryRange(newValue);
                            }}
                            renderInput={(params) =>
                              <TextField {...params}
                                label="Salary Range*"
                                variant="filled"
                                type="text"
                                name='salaryRange'
                                fullWidth
                                // onChange={handleChange}
                                // value={companyAddress.city}
                                InputLabelProps={{
                                  style: {
                                    color: 'black',
                                    fontSize: '18px',
                                  },
                                  shrink: true,
                                }}
                              />}

                          />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            id="workplace"
                            label="Work Place*"
                            variant="filled"
                            type="text"
                            name='workplace'
                            value={workplace}
                            onChange={(e) => setWorkplace(e.target.value)}
                            fullWidth
                            // onChange={handleChange}
                            // value={formData.phone}
                            InputProps={{
                              style: {
                                padding: '1px 3px',
                                color: 'gray',
                              },
                            }}
                            InputLabelProps={{
                              style: {
                                color: 'black',
                                fontSize: '18px',
                              },
                              shrink: true,
                            }}
                          />
                        </Grid>

                        <Grid item xs={5}>
                          <TextField
                            id="vacancy"
                            label="Vacancy*"
                            variant="filled"
                            type="text"
                            name='vacancy'
                            value={vacancy}
                            onChange={(e) => setVacancy(e.target.value)}
                            fullWidth
                            // onChange={handleChange}
                            // value={formData.companyName}
                            InputProps={{
                              style: {
                                padding: '1px 3px',
                                color: 'gray',
                              },
                            }}
                            InputLabelProps={{
                              style: {
                                color: 'black',
                                fontSize: '18px',
                              },
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            id="applicationDeadline"
                            label="Application Deadline*"
                            variant="filled"
                            type="date"
                            name='deadline'
                            value={deadline.toISOString().split('T')[0]}
                            onChange={(e) => setDeadline(new Date(e.target.value))}
                            fullWidth
                            // onChange={handleChange}
                            // value={companyAddress.zip}
                            InputProps={{
                              style: {
                                padding: '1px 3px',
                                color: 'black',
                              },
                            }}
                            InputLabelProps={{
                              style: {
                                color: 'black',
                                fontSize: '18px',
                              },
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            id="logo"
                            label="Your Logo*"
                            variant="filled"
                            type="file"
                            name='logo'
                            accept="image/*"
                            onChange={handleLogoChange}

                            fullWidth
                            // onChange={handleChange}
                            // value={companyAddress.zip}
                            InputProps={{
                              style: {
                                padding: '1px 3px',
                                color: 'black',
                              },
                            }}
                            InputLabelProps={{
                              style: {
                                color: 'black',
                                fontSize: '18px',
                              },
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <TextField
                            id="Jobqualification"
                            label="Job Qualification*"
                            variant="filled"
                            type="text"
                            name='qualifications'
                            value={qualifications}
                            onChange={(e) => setQualifications(e.target.value)}
                            fullWidth
                            multiline
                            maxRows={4}
                            // onChange={handleChange}
                            // value={formData.GSTNumber}
                            InputProps={{
                              classes: {
                                root: 'py-6 px-6',
                              },
                              style: {
                                color: "black"
                              }
                            }}
                            InputLabelProps={{
                              style: {
                                color: 'black',
                                fontSize: '18px',
                              },
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <TextField
                            id="Jobdescription"
                            label="Job Description*"
                            variant="filled"
                            type="text"
                            name='jobDescription'
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            fullWidth
                            multiline
                            maxRows={4}
                            // onChange={handleChange}
                            // value={formData.GSTNumber}
                            InputProps={{
                              classes: {
                                root: 'py-6 px-6', // Apply background color, text color, and padding
                              },
                              style: {
                                color: "black"
                              }
                            }}
                            InputLabelProps={{
                              style: {
                                color: 'black',
                                fontSize: '18px',
                              },
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <TextField
                            id="companydescription"
                            label="Company Description*"
                            variant="filled"
                            type="text"
                            name='companyDescription'
                            value={companyDescription}
                            onChange={(e) => setCompanyDescription(e.target.value)}
                            fullWidth
                            multiline
                            maxRows={4}
                            // onChange={handleChange}
                            // value={formData.GSTNumber}
                            InputProps={{
                              classes: {
                                root: 'py-6 px-6', // Apply background color, text color, and padding
                              },
                              style: {
                                color: "black"
                              }
                            }}
                            InputLabelProps={{
                              style: {
                                color: 'black',
                                fontSize: '18px',
                              },
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <TextField
                            id="Jobresponsibilities"
                            label="Job Responsibilities*"
                            variant="filled"
                            type="text"
                            name='jobResponsibilities'
                            value={jobResponsibilities}
                            onChange={(e) => setJobResponsibilities(e.target.value)}
                            fullWidth
                            multiline
                            maxRows={10}
                            // onChange={handleChange}
                            // value={formData.GSTNumber}
                            InputProps={{
                              classes: {
                                root: 'py-6 px-6', // Apply background color, text color, and padding
                              },
                              style: {
                                color: "black"
                              }
                            }}
                            InputLabelProps={{
                              style: {
                                color: 'black',
                                fontSize: '18px',
                              },
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <TextField
                            id="benefits"
                            label="Benefits*"
                            variant="filled"
                            type="text"
                            name='benefits'
                            value={benefits}
                            onChange={(e) => setBenefits(e.target.value)}
                            fullWidth
                            multiline
                            maxRows={10}
                            // onChange={handleChange}
                            // value={formData.GSTNumber}
                            InputProps={{
                              classes: {
                                root: 'py-6 px-6', // Apply background color, text color, and padding
                              },
                              style: {
                                color: "black"
                              }
                            }}
                            InputLabelProps={{
                              style: {
                                color: 'black',
                                fontSize: '18px',
                              },
                              shrink: true,
                            }}
                          />
                        </Grid>
                      </Grid>

                      <div className="mx-12">
                        <button
                          type="submit"
                          className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800 transition duration-150 ease-in-out"
                        >
                          Post Job
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



      {/*First modal original table*/}
      {/* <div className=' min-h-screen'>
      <button className='btn btn-md px-6 hover:bg-sky-400 bg-blue-600'>
        Add Job
      </button>
      
      <div className="pb-12 overflow-x-auto bg-white shadow-2xl m-10  shadow-gray-500">

        <table className="table w-full ">
          
          <thead>
            <tr>
              <th>
                No
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            
            <tr>
              <th>
                
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
              </td>
              <td>Purple</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
           
            <tr>
              <th>
               
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src="/tailwind-css-component-profile-3@56w.png" alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Brice Swyre</div>
                    <div className="text-sm opacity-50">China</div>
                  </div>
                </div>
              </td>
              <td>
                Carroll Group
                <br />
                <span className="badge badge-ghost badge-sm">Tax Accountant</span>
              </td>
              <td>Red</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            
            <tr>
              <th>
               
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src="/tailwind-css-component-profile-4@56w.png" alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Marjy Ferencz</div>
                    <div className="text-sm opacity-50">Russia</div>
                  </div>
                </div>
              </td>
              <td>
                Rowe-Schoen
                <br />
                <span className="badge badge-ghost badge-sm">Office Assistant I</span>
              </td>
              <td>Crimson</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            
            <tr>
              <th>
               
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src="/tailwind-css-component-profile-5@56w.png" alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Yancy Tear</div>
                    <div className="text-sm opacity-50">Brazil</div>
                  </div>
                </div>
              </td>
              <td>
                Wyman-Ledner
                <br />
                <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
              </td>
              <td>Indigo</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>

        </table>
      </div>
      </div> */}
      {/*  */}
    </>
  )
}

export default JobList