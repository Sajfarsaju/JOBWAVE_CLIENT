import React, { useEffect, useState } from 'react'
import Axios_Instance from '../../api/userAxios'
import { useDispatch } from 'react-redux'
// import { blockUser, unblockUser } from '../../store/slice/userSlice'
import toast from 'react-hot-toast'

function UsersList() {

  const dispatch = useDispatch()

  // const {blockedUserIds} = useSelector((state) => state.user);
  // console.log('user:', blockedUserIds)

  const [usersList, setUsersList] = useState([])
  console.log('list:',usersList)

   // ********************FETCH USER*********************//
  useEffect(() => {

    (async function getUsers() {

      try {
        const response = await Axios_Instance.get('/admin/users')
        setUsersList(response.data.users);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
   // ********************END FETCH USER  *********************//


   // ********************BLOCK USER  *********************//
  const blockedUser = async(id) => {
        try{
          const response = await Axios_Instance.patch('/admin/block-unblockUser', { id, action: "blockUser" });
          
          if (response.data && response.data.userStatus) {

            const userIndex = usersList.findIndex((user) => user._id === id);
      
            const updatedUsersList = [...usersList];
            
            updatedUsersList[userIndex] = response.data.userStatus;
      
            setUsersList(updatedUsersList);
            toast.success('Blocked');
          }
        }catch(error){
          console.log(error)
        }
  };
   // ********************END BLOCK USER  *********************//

  // ******************** UNBLOCK USER  *********************//
  const unBlockedUser = async(id) => {
    try{
      const response = await Axios_Instance.patch('/admin/block-unblockUser', { id, action: "unblockUser" });
      
    if (response.data && response.data.userStatus) {

      const userIndex = usersList.findIndex((user) => user._id === id);

      const updatedUsersList = [...usersList];

      updatedUsersList[userIndex] = response.data.userStatus;

      setUsersList(updatedUsersList);
      toast.success('Unblocked');
    }
    }catch(error){
      console.log(error)
    }
    
  };
  // ********************END UNBLOCK USER  *********************//

  return (
    <div className='min-h-auto'>
      <section className="relative py-8 sm:py-16 px-4 sm:px-10 lg:px-20 xl:px-32">
        <div className="w-full mb-6">
          <div className="relative min-w-0 w-full mb-6 shadow-lg shadow-gray-400 rounded dark:bg-white text-gray-900 overflow-x-auto">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-bold text-lg text-gray-900">Users List</h3>
                </div>
              </div>
            </div>
            <div className="block w-full">
              <div className="sm:overflow-hidden">
                <table className="w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-nowrap font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                        No
                      </th>
                      <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-nowrap font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                        User
                      </th>
                      <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-normal font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                        Email
                      </th>
                      <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-nowrap font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                        Phone
                      </th>
                      <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-normal font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                        Status
                      </th>
                      <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-nowrap font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((user, index) => (
                      <tr key={index}>
                        <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                          {index + 1}
                        </td>
                        <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center flex  items-center">
                          <img
                            src={user?.profile ? user?.profile : null}
                            className="h-10 sm:h-12 lg:h-12 w-10 sm:w-12 lg:w-12 rounded-full border"
                            alt="..."
                          />
                          <p className="ml-2 sm:ml-3 font-bold text-gray-900 text-sm sm:text-sm">
                            {user?.firstName} {user?.lastName}
                          </p>

                        </td>
                        <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-normal p-2 sm:p-3 text-center">
                          {user?.email}
                        </td>
                        <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                          {user?.phone}
                        </td>
                        <td className="text-green-600 px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                        {user?.isActive ? (
                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-green-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-700"></span>
                            <h2 className="text-sm font-normal text-emerald-800">Active</h2>
                            </div>
                            ) :(
                              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-red-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-700"></span>
                            <h2 className="text-sm font-normal text-red-800">Blocked</h2>
                            </div>
                            )}
                          
                        </td>
                        {user?.isActive ? (
                          <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                          <div className="inline-flex cursor-pointer items-center px-5 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-red-300">
                            <h2 onClick={() => blockedUser(user?._id)} className="text-sm font-normal text-red-800">Block</h2>
                          </div>
                        </td>
                         ) : ( 
                          
                          <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                          <div className="inline-flex cursor-pointer items-center px-5 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-green-300">
                          <h2 onClick={()=> unBlockedUser(user?._id)} className="text-sm font-normal text-green-800">Unblock</h2>
                        </div>
                        </td>
                          )} 
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default UsersList