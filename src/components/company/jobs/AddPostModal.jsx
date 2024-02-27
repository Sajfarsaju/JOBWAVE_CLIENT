import Select from 'react-select';

function AddPostModal({
    jobTitle,
    setJobTitle,
    jobCategory,
    setJobCategory,
    workType,
    setWorkType,
    salaryRange,
    setSalaryRange,
    workplace,
    setWorkplace,
    vacancy,
    setVacancy,
    qualifications,
    setQualifications,
    jobDescription,
    setJobDescription,
    companyDescription,
    setCompanyDescription,
    jobResponsibilities,
    setJobResponsibilities,
    benefits,
    setBenefits,
    deadline,
    setDeadline,
    proccessing,
    handleSubmit,
    CategoryList,
    workTypeOptions,
    salaryOptions,
    customStyles,
    resetForm
    
  }) {
  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="dark:bg-green-50 shadow-2xl rounded-sm p-7 w-12/12 sm:w-9/12  h-full overflow-scroll">
              <h2 className="text-2xl font-semibold mb-5">Fill new Job details</h2>
              <form className="flex flex-col items-center " onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="mb-5 w-full md:flex md:space-x-2 " >
                  <div className="mt-3 sm:mt-0 w-full md:w-1/3 ">
                    <label htmlFor="jobtitle" className="block text-gray-800 text-sm font-normal mb-2">Job Title*</label>
                    <input
                      type="text"
                      id="jobtitle"
                      name="jobTitle"
                      placeholder="Enter Job Title"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                    />
                  </div>

                  <div className="mt-3 sm:mt-0 w-full md:w-1/3 ">
                    <label htmlFor="combo-box-demo " className="block text-gray-800 text-sm font-normal mb-2">Job Category*</label>
                    <Select
                      type="text"
                      name="jobCategory"
                      value={jobCategory}
                      onChange={(selectedOption) => setJobCategory(selectedOption)}
                      options={CategoryList}
                      placeholder="Select Category"
                      className="react-select-container "
                      styles={customStyles}
                    />
                  </div>

                  <div className="mt-3 sm:mt-0 w-full md:w-1/3 ">
                    <label htmlFor="workType" className="block text-gray-800 text-sm font-normal mb-2">Work Type*</label>
                    <Select
                      id="workType"
                      type="text"
                      name='workType'
                      value={workType.label}
                      onChange={(selectedOption) => setWorkType(selectedOption?.label)}
                      options={workTypeOptions}
                      className="w-full"
                      placeholder="Select Type"
                      styles={customStyles}
                    />
                  </div>
                </div>

                <div className="mb-5 w-full md:flex md:space-x-2">
                  <div className="w-full md:w-1/3 ">
                    <label htmlFor="salaryRange" className="block text-gray-800 text-sm font-normal mb-2">Salary Range*</label>
                    <Select
                      id="salaryRange"
                      type="text"
                      name='salaryRange'
                      options={salaryOptions}
                      value={salaryRange.label}
                      onChange={(selectedOption) => setSalaryRange(selectedOption?.label)}
                      className="w-full"
                      placeholder="Select Salary"
                      styles={customStyles}
                    />
                  </div>

                  <div className="mt-3 sm:mt-0 w-full md:w-1/3 ">
                    <label htmlFor="workplace" className="block text-gray-800 text-sm font-normal mb-2">Work Place*</label>
                    <input
                      type="text"
                      id="workplace"
                      name="workplace"
                      placeholder="Enter Work Place"
                      value={workplace}
                      onChange={(e) => setWorkplace(e.target.value)}
                      className="w-full border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                    />
                  </div>

                  <div className="mt-3 sm:mt-0 w-full md:w-1/3 ">
                    <label htmlFor="vacancy" className="block text-gray-800 text-sm font-normal mb-2">Vacancy*</label>
                    <input
                      type="text"
                      id="vacancy"
                      name="vacancy"
                      placeholder="Fill Vacancy"
                      value={vacancy}
                      onChange={(e) => setVacancy(e.target.value)}
                      className="w-full border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                    />
                  </div>


                </div>

                <div className="mb-5 w-full md:flex md:space-x-2">
                  <div className="w-full md:w-1/2 ">
                    <label htmlFor="jobQualification" className="block text-gray-800 text-sm font-normal mb-2">Job Qualification*</label>
                    <textarea
                      id="jobQualification"
                      type="text"
                      name='qualifications'
                      placeholder="Fill Job Qualification"
                      value={qualifications}
                      onChange={(e) => setQualifications(e.target.value)}
                      className="resize-none w-full border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                    />


                  </div>
                  <div className="w-full md:w-1/2 mt-3 sm:mt-0">

                    <label htmlFor="jobDescription" className="block text-gray-800 text-sm font-normal mb-2">Job Description*</label>
                    <textarea
                      id="jobDescription"
                      type="text"
                      name='jobDescription'
                      placeholder="Fill Job Description"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="resize-none w-full border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                    />
                  </div>

                </div>

                <div className="mb-5 w-full md:flex md:space-x-2">
                  <div className="w-full md:w-1/2">
                    <label htmlFor="companyDescription" className="block text-gray-800 text-sm font-normal mb-2">Company Description*</label>
                    <textarea
                      id="companyDescription"
                      type="text"
                      name='companyDescription'
                      placeholder="Fill Company Description"
                      value={companyDescription}
                      onChange={(e) => setCompanyDescription(e.target.value)}
                      className="resize-none w-full border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                    />
                  </div>
                  <div className="w-full md:w-1/2 mt-3 sm:mt-0">

                    <label htmlFor="jobResponsibilities" className="block text-gray-800 text-sm font-normal mb-2">Job Responsibilities*</label>
                    <textarea
                      id="jobResponsibilities"
                      type="text"
                      name='jobResponsibilities'
                      placeholder="Fill Job Responsibilities"
                      value={jobResponsibilities}
                      onChange={(e) => setJobResponsibilities(e.target.value)}
                      className="resize-none w-full border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                    />
                  </div>
                </div>

                <div className="mb-5 w-full md:flex md:space-x-2">
                  <div className="w-full md:w-1/2">
                    <label htmlFor="benefits" className="block text-gray-800 text-sm font-normal mb-2">Benefits*</label>
                    <textarea
                      id="benefits"
                      type="text"
                      name='benefits'
                      placeholder="Fill Benefits"
                      value={benefits}
                      onChange={(e) => setBenefits(e.target.value)}
                      className="resize-none w-full border hover:border-black bg-green-50 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-sky-600"
                    />
                  </div>
                  <div className="mt-3 sm:mt-0 w-full md:w-1/2">
                  <label htmlFor="deadline" className="block text-gray-800 text-sm font-normal mb-2">Select deadline</label>
                  <input
                    type="date"
                    id="applicationDeadline"
                    name="deadline"
                    value={deadline instanceof Date ? deadline.toISOString().split('T')[0] : ''}
                    
                    onChange={(e) => {
                      const inputDate = new Date(e.target.value);
                      if (!isNaN(inputDate.getTime())) {
                        setDeadline(inputDate);
                      }
                    }}
                    className="w-full border hover:border-black bg-green-50 border-gray-300 rounded sm:py-6 py-3 px-3 focus:outline-none focus:border-sky-600"
                  />

                  </div>
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center mt-[3%]">
                  <button
                    type="submit"
                    className="text-white px-8 py-2 rounded-md bg-green-500"
                    disabled={proccessing}
                  >
                    {proccessing ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    disabled={proccessing}
                    onClick={() => {
                      resetForm()
                    }}
                    className="bg-gray-400 text-white py-2 px-8 rounded-md hover:bg-gray-500 focus:outline-none ml-2"
                  >
                    Cancel
                  </button>

                </div>
              </form>
            </div>
          </div>
    </>
  )
}

export default AddPostModal