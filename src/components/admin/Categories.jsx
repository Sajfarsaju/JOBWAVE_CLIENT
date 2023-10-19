import { useState, useEffect } from 'react'
import Axios_Instance from '../../api/userAxios'
import { toast } from 'react-hot-toast';

function Categories() {


  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);


  const validateCategory = () => {
    const errors = {};
    const categoryName = name
    const categoryNameRegex = /^[A-Za-z\s]+$/;

    if (!categoryNameRegex.test(categoryName)) errors.categoryName = 'Category name should be alphabets only';
    if (!categoryName && categoryName.trim().length === 0) errors.categoryName = 'Category name is required';
    if (categoryName.trim().length < 8) errors.categoryName = 'Enter valid category';

    return errors;
  }

  const validateEditCategory = () => {
    const editErrors = {};
    const editCategoryName = selected.categoryName;
    const categoryNameRegex = /^[A-Za-z\s]+$/;

    if (!categoryNameRegex.test(editCategoryName)) editErrors.editCategoryName = 'Category name should be alphabets only';
    if (!editCategoryName || editCategoryName.trim().length === 0) editErrors.editCategoryName = 'Category name is required';
    if (editCategoryName.trim().length < 8) editErrors.editCategoryName = 'Enter valid category';

    return editErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const errors = validateCategory()

    if (Object.keys(errors).length === 0) {
      try {
        const response = await Axios_Instance.post('/admin/category', { name });
        if (response.status === 200) {
          setCategoryList([...categoryList, response.data.newCategory]);
          setIsOpen(false);
          // setLoading(!loading)
          setName('')
        }
      } catch (error) {
        console.log(error)
        if (error.response.status === 400) {
          toast.error(error.response.data.errMsg);
        } else {
          toast.error('Something went wrong at category adding')
        }
      }

    } else if (Object.keys(errors).length > 0) {
      toast.error(errors.categoryName);
    }

  }

  const fetchCategories = async () => {

    const response = await Axios_Instance.get('/admin/category');
    setCategoryList(response.data.category)
  }

  const handleInputChange = (e) => {
    const newName = e.target.value;
    setSelected({ ...selected, categoryName: newName });
  };

  const handleEdit = (category) => {
    setSelected(category)
    setEditOpen(true)
  }


  const handleEditSubmit = async (e) => {
    e.preventDefault()
    const editErrors = validateEditCategory()

    if (Object.keys(editErrors).length === 0) {
      try {
        console.log(selected.categoryName, "edited")
        const response = await Axios_Instance.patch('/admin/category', selected);

        if (response.status == 200) {
          setCategoryList(prevList => {
            const updatedList = prevList.map(category => {
              if (category._id === selected._id) {
                return {
                  ...category,
                  categoryName: response?.data?.category?.categoryName,
                }
              }
              return category;
            });
            return updatedList;
          })
        }
        setEditOpen(false)
      } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
          toast.error(error.response.data.errMsg);
        } else {
          toast.error('Something went wrong at category editing')
        }
      }
    }
    else if (Object.keys(editErrors).length > 0) {
      toast.error(editErrors.editCategoryName);
    }

  }


  useEffect(() => {
    fetchCategories()
  }, [])

  return (

    <div className='min-h-screen'>
      <button onClick={() => setIsOpen(true)} className='btn btn-md bg-indigo-500 rounded-lg text-white ml-48 w-36 mt-3'>
        Add
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-slate-100 shadow-2xl shadow-slate-500 sm:max-w-sm rounded-xl -bg-gray-900 sm:my-8 sm:w-full sm:p-6">


              <form onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                  <input
                    type="text"
                    id="name" name="name" placeholder="Service name here" value={name} onChange={(e) => setName(e.target.value)}
                    className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-slate-100 border border-gray-200 rounded-md -bg-gray-900 -text-gray-300 -border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 -focus:border-blue-300 focus:outline-none focus:ring"
                  />


                </div>


                <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                  <button
                    onClick={() => { setIsOpen(false); setName('') }}
                    className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium -text-gray-200 -border-gray-700 -hover:bg-gray-800 tracking-wide text-gray-900 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-grey-300 focus:ring-opacity-40"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit" className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-black capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    {loading ? <span className="loading loading-dots loading-xs">Submit</span> : 'Confirm'}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}
      <section className="container px-32 mx-auto items-center justify-center w-full mt-2 ">


        <div className="flex flex-col mt-6 items-center justify-center min-w-full ">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 w-full">
              {/*  */}
              <div className="overflow-hidden border border-slate-300 md:rounded-lg shadow-lg shadow-gray-400">
                <table className="min-w-min-w-max divide-y divide-gray-200 dark:divide-gray-700 w-full">
                  <thead className="dark:bg-slate-100 ">
                    <tr>
                      <th scope="col" className="py-3.5 px-4 text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-x-2">
                          {/* <input
                    type="checkbox"
                    className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                  /> */}
                          <span className='dark:text-gray-900'>Category</span>
                        </div>
                      </th>

                      <th scope="col" className="px-16 py-3.5 text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-x-2">
                          <span className='dark:text-gray-900'>Status</span>
                          {/* <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                            <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                            <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                          </svg> */}
                        </div>
                      </th>

                      {/* <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <button className="flex items-center gap-x-2">
                        <span>Role</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                      </button>
                    </th> */}

                      {/* <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email address</th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Teams</th> */}

                      <th scope="col" className=" py-4 px-3 ">
                        <div className="flex items-center gap-x-2">
                          <span className="dark:text-gray-800">Edit</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody key={"hello"} className="bg-bg-slate-300 divide-y  divide-gray-200 dark:divide-gray-700 ">

                    {
                      categoryList.map((category) => {
                        return (
                          <tr key={category.id}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="inline-flex items-center gap-x-3">
                                {/* <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" /> */}

                                <div className="flex items-center gap-x-2">
                                  {/* <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" /> */}
                                  <div>
                                    <h2 className="font-medium dark:text-gray-900">{category?.categoryName}</h2>
                                    {/* <p className="text-sm font-normal text-gray-600 dark:text-gray-400">@authurmelo</p> */}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-12 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                <h2 className="text-sm font-normal text-emerald-500">Active</h2>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6">


                                <button onClick={(() => handleEdit(category))} className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>

                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {editOpen && (
          <div
            className="fixed inset-0 z-10 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>

              <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-slate-100 shadow-2xl shadow-slate-500 sm:max-w-sm rounded-xl -bg-gray-900 sm:my-8 sm:w-full sm:p-6">


                <form onSubmit={handleEditSubmit} encType="multipart/form-data">

                  <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                    <input
                      type="text"
                      id="name" name="name" placeholder="Service name here" value={selected?.categoryName || ''}
                      onChange={handleInputChange}
                      className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-slate-100 border border-gray-200 rounded-md -bg-gray-900 -text-gray-300 -border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 -focus:border-blue-300 focus:outline-none focus:ring"
                    />


                  </div>


                  <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                    <button
                      onClick={() => setEditOpen(false)}
                      className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium -text-gray-200 -border-gray-700 -hover:bg-gray-800 tracking-wide text-gray-900 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-grey-300 focus:ring-opacity-40"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit" className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-gray-900 capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    >
                      {loading ? <span className="loading loading-dots loading-xs">Submit</span> : 'Confirm'}
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        )}
        {/* <div className="flex items-center justify-between mt-6">
        <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>

            <span>
                previous
            </span>
        </a>

        <div className="items-center hidden lg:flex gap-x-3">
            <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
        </div>

        <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <span>
                Next
            </span>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
        </a>
    </div> */}
      </section>
    </div>
  )
}

export default Categories