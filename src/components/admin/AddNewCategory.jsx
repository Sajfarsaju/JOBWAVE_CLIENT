import React from 'react'

function AddNewCategory({
  isOpen,
  setIsOpen,
  handleSubmit,
  name,
  setName,
  loading
}) {
  return (
    <>
      {isOpen && (
        <div
          // onClick={() => setIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-10 backdrop-blur-sm">
          <div className="relative mx-3 w-auto my-6 md:mx-auto max-w-sm">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-white outline-none focus:outline-none">
              {/* Header */}
              <div className="mx-2 flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                <h3 className="text-md md:text-2xl font-semibold">
                  Add Category
                </h3>
              </div>
              {/* Body */}
              <div className="relative p-3 flex-auto mx-3">
                <form >
                  <div className="w-full ">
                    <input
                      type="text"
                      id="categoryName"
                      name="name"
                      placeholder="Enter category name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="resize-none w-full border hover:border-black bg-green-50 border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-sky-600"
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                    <button
                      className="text-emerald-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </button>
                    <button
                      className={`text-white bg-blue-500 active:bg-blue-600 rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      // type="submit"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'Add Category'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AddNewCategory