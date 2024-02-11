import { useEffect, useState } from 'react'
import Footer from '../../company/home/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Axios_Instance from '../../../api/userAxios';
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { IoIosArrowDropright } from "react-icons/io";
import Spinner from '../../Spinner';
import { userLogout } from '../../../store/slice/userSlice';
import ProfileImgBio from './ProfileImgBio';
import SkillsPart from './SkillsPart';
import BasicInformation from './BasicInformation';
import Experiences from './Experiences';


function Profile() {

  const dispatch = useDispatch()
  const [userData, setUserData] = useState([]);
  const [proccessing, setProccessing] = useState(false);
  const [spinnner, setspinnner] = useState(true);
  const userId = useSelector((state) => state.user.id)

  useEffect(() => {
    async function getUser() {
      try {

        const res = await Axios_Instance.get('/profile');
        if (res.status === 200) {
          setspinnner(false)
          setUserData(res.data.user);
        }
      } catch (error) {
        console.log(error)

        //? If blocked user 
        if (error?.response?.data?.isBlocked) {
          dispatch(userLogout());
          toast.error(error?.response?.data?.errMsg);
        }
      }
    }

    getUser();
  }, [])


  //**************************UPDATE PROFILE*****************//
  const [profileEditModal, setProfileEditModal] = useState(false);
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


  //******************** PROFILE & BIO   ****************
  const [bio, setBio] = useState("");
  const handleProfileSave = async (e) => {
    e.preventDefault()
    try {
      setProccessing(true)

      const updatedProfileData = {
        profileImage: selectedImage || userData.profile,
        bio: bio,
        action: 'updateProfile&Bio'
      };

      const response = await Axios_Instance.patch(`/profile/${userId}`, updatedProfileData)
      if (response.status === 200) {
        toast.success("Updated successful")
        setProccessing(false)
        //? Updating State after update response
        setUserData(response?.data?.updatedUser);
        setProfileEditModal(false);
      } else {
        console.error('Failed to update user information');
      }
    } catch (error) {
      setProccessing(false)
      if (error?.response?.status === 400 || error?.response?.status === 404) {
        toast.error(error?.response?.data?.errMsg)
      } else {
        console.log("An error occurred")
      }
      //? If blocked user 
      if (error?.response?.data?.isBlocked) {
        dispatch(userLogout());
        toast.error(error?.response?.data?.errMsg);
      }
      console.error('An error occurred:', error);
    }
  };



  //********************UPDATE PERSONAL DETAILS****************//
  const [UpdateBasicDataModal, setUpdateBasicDataModal] = useState(false);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState()
  const [location, setLocation] = useState('')
  const [ctc, setCtc] = useState('')
  const [age, setAge] = useState('')



  const clickedBasicEditButton = () => {
    // *Storing previous value into updating state as initial value
    setFirstName(userData.firstName)
    setLastName(userData.lastName)
    setEmail(userData.email)
    setPhone(userData.phone)
    setLocation(userData.location)
    setCtc(userData.currentCTC)
    setAge(userData.age)
    setUpdateBasicDataModal(true)
  }


  const validateBasicData = () => {
    const errors = {}
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;
    const emailRegex = /^[a-z]{3}[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const ctcRegex = /^[0-9]+(\.[0-9]+)?$/;
    const ageRegex = /^\d+$/;
    const maxAge = 99;

    if (firstName.trim().length === 0 &&
      lastName.trim().length < 1 &&
      email.trim().length < 1 &&
      String(phone).trim().length === 0 &&
      location.trim().length === 0 &&
      ctc.trim().length === 0 &&
      String(age).trim().length === 0
    ) {
      errors.common = "All fields must be required";
    }


    if (firstName.trim() === '' || firstName.length === 0) {
      errors.firstName = "Enter a valid First name";
    }

    if (firstName.trim().length < 4) {
      errors.firstName = "Enter a valid First name";

    } else if (!nameRegex.test(firstName.trim())) {
      errors.firstName = "Enter a valid name";
    }

    if (lastName.trim().length < 1) {
      errors.lastName = "Enter a valid Last name";
    } else if (!nameRegex.test(lastName.trim())) {
      errors.lastName = "Enter a valid name";
    }

    if (!emailRegex.test(email)) errors.email = "Enter a valid email address";

    if (!phoneRegex.test(String(phone).trim()) || String(phone).trim().length !== 10) {
      errors.phone = "Enter a valid 10-digit phone number";
    }

    if (location.trim().length === 0 || location.trim().length < 4) {
      errors.location = "Enter a valid location";
    }

    // if (ctc.trim().length === 0) {
    //   errors.ctc = "Enter a valid ctc";
    // } else if (!ctcRegex.test(ctc.trim())) {
    //   errors.ctc = "Enter a valid numeric value for ctc";
    // }


    if (String(age).trim().length === 0) {
      errors.age = "Enter a valid age";
    } else if (!ageRegex.test(String(age).trim())) {
      errors.age = "Age must be a whole number";
    } else {
      const numericAge = parseInt(String(age).trim(), 10);

      if (numericAge > maxAge) {
        errors.age = `Enter a valid age`;
      }
    }


    return errors;
  }

  const handlePersonalData = async (e) => {
    e.preventDefault()

    const errors = validateBasicData()


    if (Object.keys(errors).length === 0) {
      try {
        setProccessing(true)

        await Axios_Instance.patch(`/profile/${userId}`, { firstName, lastName, email, phone, location, ctc, age, action: 'updatePersonal' }).then((response) => {

          if (response.status === 200) {

            setProccessing(false)

            toast.success("Updated your informations")
            //? Updating State after update response
            setUserData(response?.data?.updatedUser)
          }
          setUpdateBasicDataModal(false)
          setProccessing(false)
        })
      } catch (error) {
        setProccessing(false)

        if (error?.response?.status === 400 || error?.response?.data?.alreadyExistEmailOrPass) {
          toast.error(error?.response?.data?.errMsg);
        }
        //? If blocked user 
        if (error?.response?.data?.isBlocked) {
          dispatch(userLogout());
          toast.error(error?.response?.data?.errMsg);
        }

        console.log(error)

      }

    } else if (errors.common) {
      toast.error("All fields must be required");
    } else if (errors.firstName) {
      toast.error(errors.firstName);
    } else if (errors.lastName) {
      toast.error(errors.lastName);
    } else if (errors.email) {
      toast.error(errors.email);
    } else if (errors.phone) {
      toast.error(errors.phone);
    } else if (errors.location) {
      toast.error(errors.location);
    }
    // else if (errors.ctc) {
    //   toast.error(errors.ctc);
    // }
    else if (errors.age) {
      toast.error(errors.age);
    }
  }


  //********************END UPDATE PROFILE***************//

  //*********SKILLS********** *//
  const [newSkill, setNewSkill] = useState('');
  const [skillAddModal, setSkillAddModal] = useState(false)




  const handleAddSkill = async (e) => {
    e.preventDefault()
    try {
      setProccessing(true)
      if (String(newSkill).trim().length === 0 || String(newSkill).trim().length === 0) {
        setProccessing(false)
        return toast.error('Fill a skill')
      }

      const response = await Axios_Instance.patch(`/skills`, {
        skill: newSkill,
        action: 'add_skill'
      });

      if (response.status === 200) {
        setProccessing(false)
        setSkillAddModal(false)
        toast.success(`Added ${newSkill}`)
        setUserData(response.data.user)
        setNewSkill('');

      } else {
        setProccessing(false)
        console.error('Failed to add skill');
      }
    } catch (error) {
      setProccessing(false)
      //? If blocked user 
      if (error?.response?.data?.isBlocked) {
        dispatch(userLogout());
        toast.error(error?.response?.data?.errMsg);
      }

      if (error.response?.status === 404 || error.response?.status === 402) {
        toast.error(error?.response?.data?.errMsg)
      } else {
        console.error('An error occurred:', error);
      }
    }
  };

  const handleRemoveSkill = async (skillToRemove) => {
    console.log(skillToRemove)
    try {

      const res = await Axios_Instance.patch(`/skills`, {
        skill: skillToRemove,
        action: 'remove'
      })
      if (res.status === 200) {
        toast.success(`Removed ${skillToRemove}`)
        setUserData(res.data.user)
      }
    } catch (error) {
      //? If blocked user 
      if (error?.response?.data?.isBlocked) {
        dispatch(userLogout());
        toast.error(error?.response?.data?.errMsg);
      }
      console.log(error)
    }
  }
  //*********END SKILLS********** *//

  //***********************BIO*****************//


  //? ******************** STARTED EXPERIENCE RELATED   ****************
  //******************** ADD EXPERIENCE   ****************

  const [openAddExperienceModal, setOpenAddExperienceModal] = useState(false)
  const [experienceTitle, setExperienceTitle] = useState('')
  const [expCompany, setExpCompany] = useState('')
  const [expCompLocation, setExpCompLocation] = useState('')
  const [expStartDate, setExpStartDate] = useState('')
  const [expEndDate, setExpEndDate] = useState('')

  const validateExperienceData = () => {
    const errors = {}
    const nameRegex = /^[A-Za-z\s.,-]+$/;

    if (experienceTitle.trim().length === 0 &&
      expCompany.trim().length === 0 &&
      expCompLocation.trim().length === 0 &&
      expStartDate.trim().length === 0 &&
      expEndDate.trim().length === 0
    ) {
      errors.common = "All fields must be required";
    }

    if (experienceTitle.trim() === '' || experienceTitle.length === 0) {
      errors.experienceTitle = "Please fill a Job title";
    } else if (!nameRegex.test(experienceTitle.trim())) {
      errors.experienceTitle = "Non-alphabetic characters are not allowed for Job title";
    } else if (experienceTitle.trim().length < 4) {
      errors.experienceTitle = "Please fill a valid Job title";
    }

    if (expCompany.trim() === '' || expCompany.length === 0) {
      errors.expCompany = "Please fill a company";
    } else if (!nameRegex.test(expCompany.trim())) {
      errors.expCompany = "Non-alphabetic characters are not allowed for Company name";
    } else if (expCompany.trim().length < 4) {
      errors.expCompany = "Please fill a valid company";
    }

    if (expCompLocation.trim() === '' || expCompLocation.length === 0) {
      errors.expCompLocation = "Please fill a company location";
    } else if (!nameRegex.test(expCompLocation.trim())) {
      errors.expCompLocation = "Non-alphabetic characters are not allowed for location";
    } else if (expCompLocation.trim().length < 4) {
      errors.expCompLocation = "Please fill a valid company";
    }

    if (expStartDate.trim() === '' || expStartDate.length === 0) {
      errors.expStartDate = "Please fill a date";
    }

    if (expEndDate.trim() === '' || expEndDate.length === 0) {
      errors.expEndDate = "Please fill a date";
    }
    return errors
  }

  const handleAddExperience = async (e) => {

    e.preventDefault();
    const errors = validateExperienceData()

    if (Object.keys(errors).length === 0) {
      try {
        setProccessing(true)

        const res = await Axios_Instance.patch('/experience', { action: 'add_exp', experienceTitle, expCompany, expCompLocation, expStartDate, expEndDate })

        if (res.status === 200) {

          setUserData(res?.data?.updatedUser)
          setProccessing(false)
          setOpenAddExperienceModal(false)
          toast.success('New experience added')
        } else {
          setProccessing(false)
        }
      } catch (error) {
        console.log(error)
        setProccessing(false)

        //? If blocked user 
        if (error?.response?.data?.isBlocked) {
          dispatch(userLogout());
          toast.error(error?.response?.data?.errMsg);
        }

      }
    } else if (errors.common) {
      toast.error(errors.common);
    } else if (errors.experienceTitle) {
      toast.error(errors.experienceTitle);
    } else if (errors.expCompany) {
      toast.error(errors.expCompany);
    } else if (errors.expCompLocation) {
      toast.error(errors.expCompLocation);
    } else if (errors.expStartDate) {
      toast.error(errors.expStartDate);
    } else if (errors.expEndDate) {
      toast.error(errors.expEndDate);
    }
  }

  //******************** ADD EXPERIENCE   ****************
  console.log(experienceTitle, expCompany, expCompLocation, expStartDate, expEndDate)
  //******************** EDIT EXPERIENCE   ****************
  const [showEditModal, setShowEditModal] = useState(false)
  // const [expObjToEdit, setExpObjToEdit] = useState({})

  const handleEditExperience = async (e, expIdToEdit) => {

    e.preventDefault();

    const errors = validateExperienceData()

    if (Object.keys(errors).length === 0) {
      try {
        setProccessing(true)

        const res = await Axios_Instance.patch('/experience', { action: 'edit_exp', experienceTitle, expCompany, expCompLocation, expStartDate, expEndDate, expIdToEdit })

        if (res.status === 200) {

          setUserData(res?.data?.updatedUser)
          setProccessing(false)
          setShowEditModal(false)
          toast.success('Saved your experience')
        } else {
          setProccessing(false)
        }
      } catch (error) {
        console.log(error)
        setProccessing(false)

        //? If blocked user 
        if (error?.response?.data?.isBlocked) {
          dispatch(userLogout());
          toast.error(error?.response?.data?.errMsg);
        }

      }
    } else if (errors.common) {
      toast.error(errors.common);
    } else if (errors.experienceTitle) {
      toast.error(errors.experienceTitle);
    } else if (errors.expCompany) {
      toast.error(errors.expCompany);
    } else if (errors.expCompLocation) {
      toast.error(errors.expCompLocation);
    } else if (errors.expStartDate) {
      toast.error(errors.expStartDate);
    } else if (errors.expEndDate) {
      toast.error(errors.expEndDate);
    }
  }
  //******************** EDIT EXPERIENCE   ****************

  //******************** REMOVE EXPERIENCE   ****************
  const handleRemovExperience = async (expIdToRemove) => {

    try {

      const res = await Axios_Instance.patch(`/experience`, { expIdToRemove, action: 'remove_exp' })
      if (res.status === 200) {
        toast.success(`Removed your experience`)
        setUserData(res.data?.updatedUser)
      }
    } catch (error) {
       //? If blocked user 
       if (error?.response?.data?.isBlocked) {
        dispatch(userLogout());
        toast.error(error?.response?.data?.errMsg);
      }
      console.log(error)
    }
  }
  //******************** REMOVE EXPERIENCE   ****************
  //? ******************** END EXPERIENCE RELATED   ****************




  return (

    <>

      {/* Spinner */}
      {spinnner ? (
        <Spinner />
      ) : (


        <div className="md:p-4 flex flex-wrap font-normal font-dm-sans bg-slate-100 " >
          {/* Left Side - User Profile & Bio & Skills*/}
          <div className="w-full lg:w-2/6 p-4 md:ml-[5%]">
            <div className="dark:bg-green-50 p-4 relative rounded-xl shadow-lg shadow-slate-300">
              {/* */}
              <ProfileImgBio
                setBio={setBio}
                handleProfileSave={handleProfileSave}
                proccessing={proccessing}
                profileEditModal={profileEditModal}
                selectedImage={selectedImage}
                handleImageChange={handleImageChange}
                userData={userData}
                setProfileEditModal={setProfileEditModal}
              />

              {/* Skills start */}
              <SkillsPart
                setSkillAddModal={setSkillAddModal}
                userData={userData}
                handleRemoveSkill={handleRemoveSkill}
                skillAddModal={skillAddModal}
                newSkill={newSkill}
                setNewSkill={setNewSkill}
                handleAddSkill={handleAddSkill}
                proccessing={proccessing}
              />
              {/* Skills End */}
              {/* End Left Side - User Profile & Bio & Skills*/}

            </div>
          </div>


          {/* Right Side - User Information */}
          <div className="w-full lg:w-3/5 p-4">
            {/* Job Seeker Information */}
            <BasicInformation
              clickedBasicEditButton={clickedBasicEditButton}
              userData={userData}
              UpdateBasicDataModal={UpdateBasicDataModal}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setEmail={setEmail}
              setPhone={setPhone}
              setLocation={setLocation}
              setCtc={setCtc}
              setAge={setAge}
              handlePersonalData={handlePersonalData}
              proccessing={proccessing}
              setUpdateBasicDataModal={setUpdateBasicDataModal}
            />

            {/* View applied & Favourite jobs */}
            <div className='flex space-x-5 mt-8'>
              <div className="w-1/2 dark:bg-green-50 hover:bg-green-100 p-1 pl-2 md:p-4 rounded-xl shadow-lg shadow-slate-300">
                <Link className='flex items-center justify-between' to={'/profile/applied_jobs'}>
                  <h2 className="ml-3 text-sm md:text-lg font-semibold">Favourite Jobs</h2>
                  <IoIosArrowDropright className="ml-4 h-5 w-5 md:w-6 md:h-6 text-green-600" />
                </Link>
              </div>
              {/*  */}
              {/*  */}
              <div className="w-1/2 dark:bg-green-50 hover:bg-green-100 p-1 pl-2 md:p-4 rounded-xl shadow-lg shadow-slate-300">
                <Link className='flex items-center justify-between' to={'/profile/applied_jobs'}>
                  <h2 className="text-sm md:text-lg font-semibold">Applied Jobs</h2>
                  <IoIosArrowDropright className="ml-4 h-5 w-5 md:w-6 md:h-6 text-green-600" />
                </Link>
              </div>
            </div>
            {/*End View applied & Favourite jobs */}

            {/* Experience Card */}
            <Experiences
              userData={userData}
              setOpenAddExperienceModal={setOpenAddExperienceModal}
              openAddExperienceModal={openAddExperienceModal}
              setExperienceTitle={setExperienceTitle}
              setExpCompany={setExpCompany}
              setExpCompLocation={setExpCompLocation}
              setExpStartDate={setExpStartDate}
              setExpEndDate={setExpEndDate}
              experienceTitle={experienceTitle}
              expCompany={expCompany}
              expCompLocation={expCompLocation}
              expStartDate={expStartDate}
              expEndDate={expEndDate}
              handleAddExperience={handleAddExperience}
              proccessing={proccessing}
              handleRemovExperience={handleRemovExperience}
              showEditModal={showEditModal}
              setShowEditModal={setShowEditModal}
              // setExpObjToEdit={setExpObjToEdit}
              // expObjToEdit={expObjToEdit}
              handleEditExperience={handleEditExperience}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Profile