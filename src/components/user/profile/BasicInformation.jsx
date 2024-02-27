import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"

function BasicInformation({ clickedBasicEditButton, userData, UpdateBasicDataModal,
    setFirstName, setLastName, setEmail,
    setPhone, setLocation, setCtc, setAge,
    handlePersonalData, proccessing, setUpdateBasicDataModal }) {

    const Locations = [
        "Alappuzha, Kerala",
        "Ernakulam, Kerala",
        "Idukki, Kerala",
        "Kannur, Kerala",
        "Kasaragod, Kerala",
        "Kollam, Kerala",
        "Kottayam, Kerala",
        "Kozhikode, Kerala",
        "Malappuram, Kerala",
        "Palakkad, Kerala",
        "Pathanamthitta, Kerala",
        "Thiruvananthapuram, Kerala",
        "Thrissur, Kerala",
        "Wayanad, Kerala",
    ];
    return (
        <>
            <div className="dark:bg-green-50 rounded-xl shadow-lg shadow-slate-300 p-6 relative">
                <h2 className="text-md md:text-2xl font-semibold mb-4">Basic Information</h2>
                {/* Edit icon */}
                <button
                    onClick={clickedBasicEditButton}
                    className="absolute top-6 right-5 transition-colors duration-200 dark:hover:text-emerald-500
                     dark:text-gray-900 hover:text-yellow-500 focus:outline-none"
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
                {/*  */}

                <div className="border-t border-gray-300 mb-4"></div>

                {/* Years of experience, Email, Phone, Location, CTC, Age */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">

                    <div className='mt-4' >
                        {/* <p className="text-md font-normal text-black mb-1">
        Years of Experience
      </p> */}
                        <p className="text-sm md:text-base font-normal text-black mb-1">
                            Name
                        </p>
                        <p className="text-black text-sm md:text-base md:font-semibold break-all">{userData.firstName} {userData.lastName}</p>
                    </div>
                    <div className='mt-4' >
                        <p className="text-sm md:text-base font-normal text-black mb-1">Email</p>
                        <p className="text-black text-sm md:text-base md:font-semibold break-all">{userData.email}</p>
                    </div>
                    <div className='mt-4' >
                        <p className="text-sm md:text-base font-normal text-black mb-1">Phone</p>
                        <p className={`text-black break-all ${userData?.phone ? 'text-sm md:text-base md:font-semibold' : 'text-sm md:text-base font-normal'}`}>{userData.phone ? userData.phone : 'Not provided'}</p>
                    </div>

                    {/* Location, CTC, Age */}
                    <div className='mt-4'>
                        <p className="text-sm md:text-base font-normal text-black mb-1">Location</p>
                        <p className={`text-black ${userData.location ? 'text-sm md:text-base md:font-semibold' : 'text-sm md:text-base font-normal'} break-all mb-3`}>
                            {userData.location ? userData.location : 'Not provided'}
                        </p>
                    </div>

                    <div className='mt-4'>
                        <p className="text-sm md:text-base font-normal text-black mb-1">Current CTC</p>
                        <p className={`text-black ${userData?.currentCTC ? 'text-sm md:text-base md:font-semibold' : 'text-sm md:text-base font-normal'} break-all mb-3`}>
                            {userData?.currentCTC ? `${userData?.currentCTC} LPA` : 'Not provided'}
                        </p>
                    </div>

                    <div className='mt-4'>
                        <p className="text-sm md:text-base font-normal text-black mb-1">Age</p>
                        <p className={`text-black ${userData.age ? 'text-sm md:text-base md:font-semibold' : 'text-sm md:text-base font-normal'} break-all mb-3`}>
                            {userData.age ? `${userData.age} Years` : 'Not provided'}
                        </p>
                    </div>

                </div>
            </div>

            {UpdateBasicDataModal && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="dark:bg-green-50 shadow-2xl rounded-sm p-6">
                        <h2 className="text-2xl font-semibold mb-4">Edit Personal Details</h2>
                        <form className="flex flex-col items-center">

                            <div className="mb-4 w-full md:flex md:space-x-2">
                                <div className="w-full md:w-2/2 mb-2 md:mb-0">
                                    <TextField
                                        required
                                        id="outlined-required"
                                        name="firstName"
                                        label="First name"
                                        defaultValue={userData.firstName ? userData.firstName : ''}
                                        placeholder="Enter your first name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="w-full md:w-2/2">
                                    <TextField
                                        required
                                        id="outlined-required"
                                        name="lastName"
                                        label="Last name"
                                        defaultValue={userData.lastName ? userData.lastName : ''}
                                        placeholder="Enter your last name"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-4 w-full md:flex md:space-x-2">
                                <div className="w-full md:w-2/2 mb-2 md:mb-0">
                                    <TextField
                                        required
                                        id="outlined-required"
                                        name="email"
                                        label="Email"
                                        defaultValue={userData.email ? userData.email : ''}
                                        placeholder="Enter your email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={userData?.isEmailVerified}
                                    />
                                </div>
                                <div className="w-full md:w-2/2">
                                    <TextField
                                        required
                                        id="outlined-required"
                                        name="phone"
                                        label="Phone"
                                        defaultValue={userData.phone ? userData.phone : ''}
                                        placeholder="Enter your phone"
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-4 w-full md:flex md:space-x-2">
                                <div className="w-full md:w-2/2 mb-2 md:mb-0">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Location</InputLabel>
                                        <Select
                                            required
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={userData.location ? userData.location : ''}
                                            label="Location"
                                            placeholder="Enter your location"
                                            onChange={(e) => setLocation(e.target.value)}
                                        >
                                            {Locations.map((loc, index) => (
                                                <MenuItem key={index} value={loc}>
                                                    {loc}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <div className="mb-4 w-full md:flex md:space-x-2">
                                <div className="w-full md:w-1/2 mb-2 md:mb-0">
                                    <TextField
                                        
                                        id="outlined-required"
                                        name="currentCTC"
                                        label="Current CTC(LPA)optional"
                                        defaultValue={userData.currentCTC ? userData.currentCTC : ''}
                                        placeholder="eg:4"
                                        onChange={(e) => setCtc(e.target.value)}
                                    />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <TextField
                                        required
                                        id="outlined-required"
                                        name="age"
                                        label="Age"
                                        defaultValue={userData.age ? userData.age : ''}
                                        placeholder="Enter your age"
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    type="button"
                                    className="text-white px-5 py-2 rounded-md hover:bg-green-600 bg-green-500" 
                                    // style={{ backgroundColor: 'rgba(0, 211, 99, 1)' }}
                                    onClick={handlePersonalData}
                                >
                                    {proccessing ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUpdateBasicDataModal(false)}
                                    className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none ml-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default BasicInformation