import React, { useEffect, useState } from 'react'
import Navbar from '../home/Navbar';
import Footer from '../../company/home/Footer';
import { useSelector } from 'react-redux';
import Axios_Instance from '../../../api/userAxios';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreVertIcon from '@mui/icons-material/MoreVertOutlined';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'


function userpro() {

  const { token } = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  const [reloadProfile, setReloadProfile] = useState(false);
  let userId = userData._id

  useEffect(() => {
    async function getUser() {
      const res = await Axios_Instance.get('/profile')
      setUserData(res.data.user)
    }

    getUser();
  }, [reloadProfile])


  //**************************UPDATE PROFILE*****************//
  const [profileEditModal, setProfileEditModal] = useState(false);
  const [experncesEditModal, setExpernceEditModal] = useState(false)
  const [updatedUserData, setUpdatedUserData] = useState({ ...userData });
  const [selectedImage, setSelectedImage] = useState(null);

  function isValidImage(logo) {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

    const extension = logo.substr(logo.lastIndexOf('.')).toLowerCase();

    return validExtensions.includes(extension);
  }

  const handleImageChange = (img) => {
    if (isValidImage(img?.target?.files[0].name)) {
      let reader = new FileReader()
      reader.readAsDataURL(img.target.files[0])
      reader.onload = () => {
        setSelectedImage(reader.result)
      }
      reader.onerror = (err) => {
        console.log(err);
      }
    } else {
      toast.error('Invalid file type. Please upload a JPEG, PNG, or WEBP image file.')
    }
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData, setUserData,
      [name]: value,
    }));
  };

  const handleProfileSave = async () => {
    try {
      let profile = selectedImage || userData.profile;

      console.log('updatedUserData:', updatedUserData)
      const response = await Axios_Instance.patch(`/profile/${userId}`, { ...updatedUserData, profile })
      if (response.status === 200) {
        setUserData(updatedUserData);
        // setUserData(response?.data?.updatedUser)
        setReloadProfile(!reloadProfile)
        setReRender(!reRender)
        setProfileEditModal(false);
      } else {
        console.error('Failed to update user information');
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        toast.error(error?.response?.data?.errMsg)
      } else {
        toast.error("An error occurred")
      }
      console.error('An error occurred:', error);
    }
  };
  //********************END UPDATE PROFILE***************//

  //*********SKILLS********** *//
  const skillsArray = ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Python',
    'Redux', 'HTML-CSS', 'SQL', 'Git-GitHub', 'Express.js',
    'Angular', 'Vue.js', 'TypeScript', 'AWS', 'Firebase',
    'RESTful API Design', 'Java', 'Flutter'];

  const handleSkill = async (skill) => {
    try {

      const res = await Axios_Instance.post(`/profile/${skill}`, {})
      setUserData(res.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveSkill = async (skill) => {
    try {

      const res = await Axios_Instance.post(`/profile/${skill}`, { action: 'remove' })

      setUserData(res.data.user)
    } catch (error) {
      console.log(error)
    }
  }
  //*********END SKILLS********** *//

  //***********************BIO*****************//
  const [bioEditModal, setBioEditModal] = useState(false);
  const [bio, setBio] = useState("");

  const validateBioForm = () => {
    const errors = {};
    const bioRegex = /^[A-Za-z\s.,'-]+$/;

    if (!bio || bio.trim().length === 0) {
      errors.commen = "Bio is required"
    }
    if (!bioRegex.test(bio)) {
      errors.bio = 'Bio should only contain alphabets.';
    }
    return errors;
  }


  const handleSaveBio = async (e) => {
    e.preventDefault();
    const errors = validateBioForm()

    if (Object.keys(errors).length === 0) {
      try {

        const response = await Axios_Instance.post(`/profile`, {
          action: 'updateBio',
          bio: bio,
        });

        if (response.status === 200) {
          console.log(response.data.user, "bio data");
          setUserData((prevData) => ({
            ...prevData,
            bio: bio,
          }));

          setBioEditModal(false);
        }
      } catch (error) {
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error(error?.response?.data?.errMsg)
        }
        console.error("Error saving bio:", error);
      }
    } else if (errors.commen) {
      toast.error(errors.commen)
    } else {
      toast.error(errors.bio)
    }
  };
  //*********************END BIO*****************//

  const [skills, setSkills] = useState(['Skill 1', 'Skill 2', 'Skill 3']);
  const [experience, setExperience] = useState('');


  const handleAddSkill = () => {
    if (experience.trim() === '') return;
    if (!skills.includes(experience)) {
      setSkills([...skills, experience]);
      setExperience('');
    }
  };

  // const handleRemoveSkill = (skill) => {
  //   const updatedSkills = skills.filter((s) => s !== skill);
  //   setSkills(updatedSkills);
  // };

  const [isDropdownOpenArray, setIsDropdownOpenArray] = useState([false, false, false]);

  const toggleDropdown = (index) => {
    const updatedArray = [...isDropdownOpenArray];
    updatedArray[index] = !updatedArray[index];
    setIsDropdownOpenArray(updatedArray);
  };

  const handleOptionClick = () => {

  }

  return (
    <>
      <Navbar />
      <div className="p-4 flex flex-wrap">
        {/* Left Side - User Profile */}
        <div className="w-full lg:w-1/4 p-4">
          <div className="bg-slate-100 p-4 relative rounded-lg shadow-lg shadow-gray-300">
            {/* 3 dot  */}
            {isDropdownOpenArray.map((isDropdownOpen, index) => (
              <div key={index}>
                <div
                  className={`absolute top-3 right-2 rounded-full w-8 h-7 flex items-center justify-center ${isDropdownOpen ? 'bg-gray-200' : ''}`}
                  onClick={() => toggleDropdown(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </div>
                {isDropdownOpen && (
                  <div className="absolute top-6 right-2  border-gray-300 rounded-lg py-2 px-4">
                    {/* <div className="flex flex-col"> */}
                    <div
                      className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-700"
                    >
                      <Link to={'#'} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white">
                        View applied jobs
                      </Link>

                      <Link to={'#'} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:hover:bg-gray-500 dark:text-gray-100 hover-bg-gray-100 dark:hover-bg-gray-700 dark:hover-text-white">
                        Settings
                      </Link>

                      <Link to={'#'} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:hover:bg-gray-500 dark:text-gray-100 hover-bg-gray-100 dark:hover-bg-gray-700 dark:hover-text-white">
                        Keyboard shortcuts
                      </Link>
                      {/* </div> */}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* End 3 dot */}
            {/*Edit icon*/}
            <button onClick={() => setProfileEditModal(true)} className="absolute top-12 right-3 text-gray-800 transition-colors duration-200 dark:hover:text-emerald-500 dark:text-gray-900 hover:text-yellow-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </button>
            {/*  */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="User Profile"
              className="w-32 h-32 mx-auto rounded-full"
            />
            <p className="text-center mt-4">
              Passionate and highly motivated jobseeker with a strong background
              in technology and a thirst for innovation. I thrive in fast-paced
              environments and have a proven track record of problem-solving and
              delivering results. My diverse skill set includes software
              development, project management, and data analysis. I am constantly
              seeking new challenges and opportunities to learn and grow in the
              ever-evolving tech industry. Let's connect and explore how I can
              contribute to your team's success.
            </p>
          </div>
        </div>
        {profileEditModal && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white shadow-2xl rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-800 text-sm mb-1" htmlFor="profileImage">
                    Profile Image
                  </label>
                  <img className='w-20 h-28' src='' alt="" />
                  {/* <input
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    accept="image/*"
                  // onChange={handleImageChange}
                  /> */}
                  <input
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    className="cursor-pointer block w-full px-2 py-1 mt-2 text-sm text-gray-600 bg-white border border-gray-100 rounded-lg file:bg-gray-200 file:text-white file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-300 dark:file:text-gray-700 dark:text-gray-700 placeholder-gray-400/70 dark:placeholder-gray-500  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-white dark:focus:border-blue-300" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm mb-1" htmlFor="bio">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 h-32"
                  // placeholder="Enter your bio here"
                  // value={userData.bio}
                  // placeholder={userData.bio}
                  // onChange={(e) => setBio(e.target.value)}
                  />

                </div>

                <div className="text-center">
                  <button
                    type="button"
                    // onClick={handleProfileSave}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfileEditModal(false)}
                    className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none ml-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


        {/* Right Side - User Information */}
        <div className="w-full lg:w-3/4 p-4">
          {/* Job Seeker Information */}
          <div className="bg-slate-100 rounded-lg shadow-lg shadow-gray-300 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Seeker Information</h2>

            <div className="border-t border-gray-300 mb-4"></div>

            <div className="flex items-center space-x-4">
              <div className="w-2/3">
                <p className="text-xl font-semibold text-gray-700">
                  {userData.firstName} {userData.lastName}
                </p>
                <p className="text-gray-600">Email: {userData.email}</p>
                <p className="text-gray-600">Phone: {userData.phone}</p>
              </div>
              <div className="w-1/3">
                {/* You can add an avatar or profile picture here */}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile Avatar"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Skills Card */}
          <div className="mt-4 bg-slate-100 p-4 rounded-lg shadow-lg shadow-gray-300">
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <div className="bg-gray-100 p-4 rounded">
              <input
                type="text"
                placeholder="Add Skill"
                className="w-2/3 p-2 border rounded-l"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 rounded-r"
                onClick={handleAddSkill}
              >
                Add
              </button>
            </div>
            {/* <ul className="mt-4">
            {skills.map((skill, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b py-2"
              >
                {skill}
                <button
                  className="text-red-600"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul> */}
            <div className="flex flex-wrap gap-2">
              {
                skills.map((skill) => (
                  <>
                    <span
                      key={skill}
                      className="bg-green-300 text-green-900 px-2 py-1 rounded-full text-xs cursor-pointer"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      {skill}
                      <span key={skill} className='cursor-pointer'>&#45;</span>
                    </span>

                  </>
                ))
              }
            </div>
          </div>

          {/* Experience Card */}
          <div className="mt-4 bg-slate-100 p-4 rounded-lg shadow-lg shadow-gray-300">
            <h2 className="text-lg font-semibold">Experience</h2>
            {/* Experience details */}
            <div className="mb-4">
              <div className="flex justify-between">
                <p className="font-semibold">Job Title 1</p>
                <p>Company Name 1</p>
                <p>Location 1</p>
                <p>Start Date - End Date</p>
              </div>
              <p className="mt-2">
                Description of responsibilities and achievements in this role.
              </p>
            </div>

            <div className="mb-4">
              <div className="flex justify-between">
                <p className="font-semibold">Job Title 2</p>
                <p>Company Name 2</p>
                <p>Location 2</p>
                <p>Start Date - End Date</p>
              </div>
              <p className="mt-2">
                Description of responsibilities and achievements in this role.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default userpro