import { useState, useEffect } from 'react'
import Axios_Instance from '../../api/userAxios'
import { toast } from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import AddNewCategory from './AddNewCategory';
import EditCategory from './EditCategory';

function Categories() {


  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [spinner, setSpinner] = useState(false)

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
    const errors = validateCategory()

    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        const response = await Axios_Instance.post('/admin/category', { name });
        if (response.status === 200) {

          setCategoryList([...categoryList, response.data.newCategory]);
          setIsOpen(false);
          setLoading(false);
          setName('')
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
    setSpinner(true)
    const response = await Axios_Instance.get('/admin/category');
    setSpinner(false)
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
        setLoading(true);
        console.log(selected.categoryName, "edited")
        const response = await Axios_Instance.patch('/admin/category', selected);

        if (response.status == 200) {
          setLoading(false);
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
        setLoading(false);
        setEditOpen(false)
      } catch (error) {
        setLoading(false);
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
    <>

      {spinner ? (
        <Spinner />
      ) : (

        
        <div className='min-h-auto font-dm-sans font-normal'>
          <AddNewCategory
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            loading={loading}
          />

          <EditCategory
            editOpen={editOpen}
            setEditOpen={setEditOpen}
            handleEditSubmit={handleEditSubmit}
            selected={selected}
            handleInputChange={handleInputChange}
            loading={loading}
          />

          <section className="relative py-8 sm:py-16 px-4 sm:px-10 lg:px-20 xl:px-32">
            <div className="w-full mb-6">
              <div className="relative min-w-0 w-full mb-6 shadow-sm shadow-gray-300 rounded dark:bg-white text-gray-900 overflow-x-auto">
                <div className="rounded-t mb-0 px-4 py-3 border-0 flex justify-between items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-bold text-lg text-gray-900">Category List</h3>
                  </div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md "
                  >
                    Add new
                  </button>
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
                            Category name
                          </th>
                          <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-nowrap font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                            Edit
                          </th>
                        </tr>
                      </thead>
                      {categoryList && categoryList.map((category, indx) => (
                        <tbody key={category._id}>
                          {/* Placeholder rows */}
                          <tr>
                            <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                              {indx + 1}
                            </td>
                            <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                              {category.categoryName}
                            </td>
                            <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-normal p-2 sm:p-3 text-center">

                                <button onClick={(() => handleEdit(category))} className="text-gray-800 transition-colors duration-200 dark:hover:text-green-500 dark:text-gray-800 focus:outline-none">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                  </svg>
                                </button>
                            </td>
                          </tr>
                          {/* Add more placeholder rows as needed */}
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>



      )}
    </>
  )
}

export default Categories