import { TextField } from "@mui/material"

function ProfileImgBio({ setBio, handleProfileSave, proccessing, profileEditModal, selectedImage, handleImageChange, userData, setProfileEditModal }) {
    return (
        <>
            {/*Edit icon*/}
            <button onClick={() => setProfileEditModal(true)} className="absolute top-12 right-3  transition-colors duration-200 dark:hover:text-emerald-500 dark:text-gray-900 hover:text-yellow-500 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </button>
            {/*  */}
            <img
                src={userData?.profile}
                alt="User Profile"
                className="w-32 h-32 mx-auto rounded-full hover:brightness-75"
            />
            <p className="text-center mt-4 text-lg md:text-xl font-bold text-black">
                {userData?.firstName} {userData?.lastName}
            </p>
            <p className="text-center mt-4 text-sm md:text-base font-normal mx-[5%]">
                {userData?.bio}
            </p>

            {profileEditModal && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="dark:bg-green-50 shadow-2xl rounded-sm p-6">
                        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-center text-sm mb-1" htmlFor="profileImage">
                                    Profile Image
                                </label>
                                <div className='flex justify-center'>
                                    <img className='w-24 h-24 rounded-full ' src={selectedImage ? selectedImage : userData?.profile} alt="" />
                                </div>
                                <input
                                    type="file"
                                    name="profileImage"
                                    id="profileImage"
                                    onChange={handleImageChange}
                                    className="block w-full px-3 py-2 mt-2 text-sm text-gray-800 bg-white border
                                        border-gray-200 file:bg-gray-200 file:text-gray-900 file:text-sm file:px-4 
                                        file:py-1 file:border-none file:rounded-full dark:file:bg-gray-200 dark:file:text-gray-900
                                        dark:text-gray-900 placeholder-gray-400/70 dark:placeholder-gray-700 focus:border-blue-400 
                                        focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-300 
                                        dark:bg-white dark:focus:border-blue-300" />
                            </div>


                            <div className="mb-4">
                                <TextField
                                    className='w-full'
                                    id="outlined-multiline-static"
                                    label="Bio"
                                    multiline
                                    rows={6}
                                    defaultValue={userData?.bio ? userData?.bio : ''}
                                    onChange={(e) => setBio(e.target.value)}
                                />

                            </div>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={handleProfileSave}
                                    className="text-white px-5 py-2 rounded-md" style={{ backgroundColor: 'rgba(0, 211, 99, 1)' }}
                                >
                                    {proccessing ? 'Saving...' : 'Save'}
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
        </>
    )
}

export default ProfileImgBio