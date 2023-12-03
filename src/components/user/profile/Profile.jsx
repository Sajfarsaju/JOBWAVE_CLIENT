import { useEffect, useState } from 'react'
import Axios_Instance from '../../../api/userAxios'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Spinner from '../../Spinner';
import { userLogout } from '../../../store/slice/userSlice';
import { useDispatch } from 'react-redux';

function Profile( {setReRender , reRender} ) {

  const dispatch = useDispatch()

  const [userData, setUserData] = useState([]);
  const [reloadProfile, setReloadProfile] = useState(false);
  const [spinnner, setspinnner] = useState(true);
  const [proccessing, setProccessing] = useState(false);
  let userId = userData._id

  useEffect(() => {

    async function getUser() {
      try{

        const res = await Axios_Instance.get('/profile')
          setspinnner(false)
          setUserData(res.data.user)
      }catch(error){
        console.log(error)
        if (error.res?.status === 401) {
          dispatch(userLogout());
          toast.error(error?.res?.data?.errMsg);
        }
      }
    }

    getUser();
  }, [reloadProfile])


  //**************************UPDATE PROFILE*****************//
  const [profileEditModal, setProfileEditModal] = useState(false);
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
      ...prevData,setUserData,
      [name]: value,
    }));
  };

  const handleProfileSave = async () => {
    try {
      let profile = selectedImage || userData.profile;
      
      console.log('updatedUserData:',updatedUserData)
      setProccessing(true)
      const response = await Axios_Instance.patch(`/profile/${userId}`, { ...updatedUserData, profile })
      if (response.status === 200) {
        setProccessing(false)
        setUserData(updatedUserData);
        // setUserData(response?.data?.updatedUser)
        setReloadProfile(!reloadProfile)
        setReRender(!reRender)
        setProfileEditModal(false);
      } else {
        setProccessing(false)
        console.error('Failed to update user information');
      }
    } catch (error) {
      setProccessing(false)
      if(error?.response?.status===400){
        toast.error(error?.response?.data?.errMsg)
      }else{
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
        setProccessing(true)

        const response = await Axios_Instance.post(`/profile`, {
          action: 'updateBio',
          bio: bio,
        });

        if (response.status === 200) {
          setProccessing(false)
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
    }else if(errors.commen){
      toast.error(errors.commen)
    }else{
      toast.error(errors.bio)
    }
  };
  //*********************END BIO*****************//


  const [isDropdownOpenArray, setIsDropdownOpenArray] = useState([false, false, false]);

  const toggleDropdown = (index) => {
    const updatedArray = [...isDropdownOpenArray];
    updatedArray[index] = !updatedArray[index];
    setIsDropdownOpenArray(updatedArray);
  };

  // const [experience, setExperience] = useState({
  //   role: '',
  //   yearOfExp: '',
  //   compName: '',
  // });
  // console.log("client exp:",experience)

  // const handleExpChange = (e) => {
  //   const { name, value } = e.target;
  //   setExperience({
  //     ...experience,
  //     [name]: value,
  //   });
  // };

  // const handleSaveExperience = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = Axios_Instance.post(`/profile`,{
  //       actionn: 'add-experience',
  //       experience,
  //     }, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setUserData(response.data.user);
  //     setReRender(!reRender)
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // }

  return (
    <>
    {/* Spinner */}
    {spinnner && (
      <Spinner/>
    )}
    {/* Spinner */}
    <div className='h-auto mt-12'>
      <div className=" max-w-xl mx-auto mt-4">
        {/* Profile Card */}
        {/* <div className="bg-white shadow-2xl rounded-lg flex overflow-hidden mb-4">
            <img src="../../../../public/walpaper 1.jpeg" alt=""/>
          <div className="p-4">
            <h2 className="text-2xl font-semibold">{data.firstName} {data.lastName}</h2>
            <p className="text-gray-600">{data.email}</p>
            <p className="text-gray-500 text-sm">{data.phone}</p>
          </div>
        </div> */}
        {/* Profile Card */}
        <div className="bg-slate-200 shadow-slate-200 shadow-2xl rounded-lg flex overflow-hidden mb-4 relative">
          {/*Edit icon*/}
          <button onClick={()=> setProfileEditModal(true)} className="absolute top-2 right-3 text-gray-800 transition-colors duration-200 dark:hover:text-emerald-500 dark:text-gray-900 hover:text-yellow-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </button>
            {/*  */}

          {/* 3 dot  */}
  {isDropdownOpenArray.map((isDropdownOpen, index) => (
    <div key={index}>
      <div
        className={`absolute top-10 right-2 rounded-full w-8 h-7 flex items-center justify-center ${
          isDropdownOpen ? 'bg-gray-200' : ''
        }`}
        onClick={() => toggleDropdown(index)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </div>
      {isDropdownOpen && (
        <div className="absolute top-10 right-8 bg-gray-600 z-50 border-gray-300 rounded-lg py-2 px-4">
          <Link
            to={'/profile/applied_jobs'}
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
          >
            View applied jobs
          </Link>

          {/* <Link
            to={'#'}
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:hover:bg-gray-500 dark:text-gray-100 hover-bg-gray-100 dark:hover-bg-gray-700 dark:hover-text-white"
          >
            Settings
          </Link>

          <Link
            to={'#'}
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:hover:bg-gray-500 dark:text-gray-100 hover-bg-gray-100 dark:hover-bg-gray-700 dark:hover-text-white"
          >
            Keyboard shortcuts
          </Link> */}
        </div>
      )}
    </div>
  ))}
  {/* End 3 dot */}

          {/* Profile Image */}
          {/* <img className='w-20 h-28' accept="image/*" src={selectedImage ? selectedImage : userData?.profile} alt="" /> */}
          <img className='w-20 h-28' accept="image/*" src={ userData?.profile} alt="" />
          {/* User Information */}
          <div className="p-4">
            <h2 className="text-2xl font-semibold">{userData.firstName} {userData.lastName}</h2>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-gray-500 text-sm">{userData.phone}</p>
          </div>
        </div>

        {/* Edit Form of User Information */}
        {profileEditModal && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white shadow-2xl rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-center text-gray-800 text-sm mb-1" htmlFor="profileImage">
                    Profile Image
                  </label>
                  <div className='flex justify-center'>
                  <img className='w-24 h-28' src={selectedImage ? selectedImage : userData?.profile} alt="profile" />
                  </div>
                  <input
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full px-3 py-2 mt-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-900 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-200 dark:file:text-gray-900 dark:text-gray-900 placeholder-gray-400/70 dark:placeholder-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-300 dark:bg-white dark:focus:border-blue-300"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-800 text-sm mb-1" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    placeholder={userData.firstName}
                    onChange={handleProfileInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-800 text-sm mb-1" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    placeholder={userData.lastName}
                    onChange={handleProfileInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-800 text-sm mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    placeholder={userData.email}
                    onChange={handleProfileInputChange}
                  />
                </div>
                {/* <div className="mb-4">
                  <label className="block text-gray-600 text-sm mb-1" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    placeholder={userData.phone}
                    onChange={handleProfileInputChange}
                  />
                </div> */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleProfileSave}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                    disabled={proccessing}
                  >
                     {proccessing ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={()=>setProfileEditModal(false)}
                    className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none ml-2"
                    disabled={proccessing}
                    >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/*  */}
       

        {/* Bio Card */}
        <div className="bg-slate-200 shadow-xl shadow-slate-200 rounded-lg overflow-hidden mb-4">
          <div className="p-4 relative">
            <button
              className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md"
              onClick={() => setBioEditModal(true)}
            >
              Edit
            </button>
            <h3 className="text-lg font-semibold mb-2">Bio</h3>
            <p className="text-gray-600">{userData.bio}</p>
          </div>
        </div>

        {bioEditModal && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white shadow-2xl rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Edit bio</h2>
              <form >
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm mb-1" htmlFor="bio">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 h-40"
                    // placeholder="Enter your bio here"
                    // value={userData.bio}
                    placeholder={userData.bio}
                    onChange={(e) => setBio(e.target.value)}
                  />

                </div>
                <div className="text-center">
                  
                <button
    type="button"
    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
    onClick={handleSaveBio}
    disabled={proccessing}
>
    {proccessing ? "Saving..." : "Save"}
</button>

                  <button
                    type="button"
                    onClick={() => setBioEditModal(false)}
                    className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none ml-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* bio modal end */}
         {/* Skills Card */}
         <div className="bg-slate-200  shadow-xl shadow-slate-200 rounded-lg overflow-hidden mb-4">
          {/* Skills */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {
                skillsArray.map((skill) => (
                  userData.skills?.includes(skill) ? (

                      <span
                        key={skill}
                        className="bg-green-300 text-green-900 px-2 py-1 rounded-full text-xs cursor-pointer"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        {skill}
                        <span key={skill} className='cursor-pointer'>&#45;</span>
                      </span>

                  ) : (
                    <span
                      key={skill}
                      className="bg-red-300 text-red-900 px-2 py-1 rounded-full text-xs cursor-pointer"
                      onClick={() => handleSkill(skill)}
                    >
                      {skill} <span className='cursor-pointer'>&#43;</span>
                    </span>
                  )
                ))
              }
            </div>
          </div>
        </div>

        {/* Experience Card */}
        {/* <div className="bg-slate-200 shadow-2xl shadow-slate-200 rounded-lg overflow-hidden mb-4">
          <div className="p-4 relative">
            <button
              className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md"
              onClick={() => setExpernceEditModal(true)}
            >
              Add
            </button>

            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-600">Web Developer</p>
                <p className="text-gray-500 text-sm">Jan 2020 - Present</p>
              </div>
              <p className="text-gray-600">Company XYZ, New York</p>
            </div>
          </div>
        </div> */}

        {/* <>
        {experncesEditModal && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white shadow-2xl rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Add Experience</h2>
              <form >
              <div className="mb-4">
  <label className="block text-gray-600 text-sm mb-1" htmlFor="jobTitle">
        Role
  </label>
  <input
    name="role"
    type='text'
    id="role"
    className="w-full border border-gray-300 rounded-md py-2 px-3"
    value={experience.role}
    onChange={handleExpChange}
  />
  
</div>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm mb-1" htmlFor="startDate">
                    Years of experience
                  </label>
                  <input
                    type="text"
                    name="yearOfExp"
                    id="yearOfExp"
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    value={experience.yearOfExp}
                    onChange={handleExpChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm mb-1" htmlFor="company">
                    Company name
                  </label>
                  <input
                    type="text"
                    name="compName"
                    id="compName"
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    value={experience.compName}
                    onChange={handleExpChange}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleSaveExperience}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setExpernceEditModal(false)
                      setExperience('')
                    }}
                    className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none ml-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        </> */}

        {/* Education Card */}
        {/* <div className="bg-white shadow-2xl rounded-lg overflow-hidden mb-4">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-600">Bachelor's Degree in Computer Science</p>
                <p className="text-gray-500 text-sm">2016 - 2020</p>
              </div>
              <p className="text-gray-600">University of ABC, New York</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
    </>
  )
}

export default Profile