import { useState } from "react"
import { Autocomplete, TextField } from "@mui/material"
import { IoMdAdd } from "react-icons/io"
import { MdClose } from "react-icons/md"
import '../../../assets/css/tooltip.css'

function SkillsPart({ setSkillAddModal, userData, handleRemoveSkill, skillAddModal, newSkill, setNewSkill, handleAddSkill, proccessing }) {

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [skillToRemove, setSkillToRemove] = useState('')
  

  const allSkills = [
    { id: 1, label: "HTML5" },
    { id: 2, label: "CSS3" },
    { id: 3, label: "JavaScript (ES6+)" },
    { id: 4, label: "React.js" },
    { id: 5, label: "Angular" },
    { id: 6, label: "Vue.js" },
    { id: 7, label: "Node.js" },
    { id: 8, label: "Express.js" },
    { id: 9, label: "Django" },
    { id: 10, label: "Flask" },
    { id: 11, label: "Ruby on Rails" },
    { id: 12, label: "PHP" },
    { id: 13, label: "Java" },
    { id: 14, label: "Python" },
    { id: 15, label: "C#" },
    { id: 16, label: ".NET" },
    { id: 17, label: "SQL" },
    { id: 18, label: "MongoDB" },
    { id: 19, label: "MySQL" },
    { id: 20, label: "PostgreSQL" },
    { id: 21, label: "Firebase" },
    { id: 22, label: "GraphQL" },
    { id: 23, label: "RESTful API Development" },
    { id: 24, label: "Redux" },
    { id: 25, label: "Vuex" },
    { id: 26, label: "State Management" },
    { id: 27, label: "Responsive Web Design" },
    { id: 28, label: "Sass/SCSS" },
    { id: 29, label: "Bootstrap" },
    { id: 30, label: "Tailwind CSS" },
    { id: 31, label: "Webpack" },
    { id: 32, label: "Git" },
    { id: 33, label: "Unit Testing (Jest, Mocha, Chai)" },
    { id: 34, label: "Docker" },
    { id: 35, label: "Continuous Integration/Continuous Deployment (CI/CD)" },
    { id: 36, label: "Agile/Scrum Methodologies" },
    { id: 37, label: "Project Management" },
    { id: 38, label: "Critical Thinking" },
    { id: 39, label: "Leadership" },
    { id: 40, label: "Problem Solving" },
    { id: 41, label: "Communication Skills" },
    { id: 42, label: "Teamwork" },
    { id: 43, label: "Time Management" },
    { id: 44, label: "Adaptability" },
    { id: 45, label: "Creativity" },
    { id: 46, label: "Negotiation Skills" },
    { id: 47, label: "Emotional Intelligence" },
    { id: 48, label: "Public Speaking" },
    { id: 49, label: "Customer Service" },
    { id: 50, label: "Sales" },
    { id: 51, label: "Marketing" },
    { id: 52, label: "Financial Planning" },
    { id: 53, label: "Data Analysis" },
    { id: 54, label: "Research" },
    { id: 55, label: "Content Writing" },
    { id: 56, label: "Graphic Design" },
    { id: 57, label: "Video Editing" },
    { id: 58, label: "Photography" },
    { id: 59, label: "Digital Marketing" },
    { id: 60, label: "Search Engine Optimization (SEO)" },
    { id: 61, label: "Social Media Management" },
    { id: 62, label: "Event Planning" },
    { id: 63, label: "Foreign Languages (e.g., Spanish, French)" },
    { id: 64, label: "Cooking" },
    { id: 65, label: "Gardening" },
    { id: 66, label: "Fitness Training" },
    { id: 67, label: "Yoga" },
    { id: 68, label: "Music Production" },
    { id: 69, label: "Drawing/Painting" },
    { id: 70, label: "Writing" },
    { id: 71, label: "Public Relations" },
    { id: 72, label: "Leadership Development" },
    { id: 73, label: "Business Strategy" },
    { id: 74, label: "Salesforce" },
    { id: 75, label: "Quality Assurance" },
    { id: 76, label: "Technical Writing" },
    { id: 77, label: "Medical Coding" },
    { id: 78, label: "Legal Research" },
    { id: 79, label: "Teaching" },
    { id: 80, label: "Customer Relationship Management (CRM)" },
    { id: 81, label: "Retail Management" },
    { id: 82, label: "Entrepreneurship" },
    { id: 83, label: "Financial Analysis" },
    { id: 84, label: "Human Resources Management" },
    { id: 85, label: "Conflict Resolution" },
    { id: 86, label: "Event Coordination" },
    { id: 87, label: "Fashion Design" },
    { id: 88, label: "Interior Design" },
    { id: 89, label: "Culinary Arts" },
    { id: 90, label: "Blogging" },
    { id: 91, label: "Copywriting" },
    { id: 92, label: "Foreign Exchange Trading (Forex)" },
    { id: 93, label: "E-commerce" },
    { id: 94, label: "Data Entry" },
    { id: 95, label: "Bookkeeping" },
    { id: 96, label: "Car Repair" },
    { id: 97, label: "Home Improvement" },
    { id: 98, label: "Photography" },
    { id: 99, label: "Foreign Policy Analysis" },
    { id: 100, label: "Public Health" },
    { id: 101, label: "Environmental Science" },
    { id: 102, label: "Creative Writing" },
    { id: 103, label: "Carpentry" },
    { id: 104, label: "Counseling" },
    { id: 105, label: "Artificial Intelligence Ethics" },
    { id: 106, label: "Sustainability Practices" },
    { id: 107, label: "Project Planning" },
    { id: 108, label: "Data Security" },
    { id: 109, label: "Risk Management" },
    { id: 110, label: "Legal Writing" },
    { id: 111, label: "Supply Chain Management" },
    { id: 112, label: "Quality Control" },
    { id: 113, label: "Public Safety" },
    { id: 114, label: "Emergency Response" },
    { id: 115, label: "Environmental Conservation" },
    { id: 116, label: "Nonprofit Management" },
    { id: 117, label: "Volunteer Coordination" },
    { id: 118, label: "Animal Care" },
    { id: 119, label: "Dance" },
    { id: 120, label: "Theater Production" },
    { id: 121, label: "Film Criticism" },
    { id: 122, label: "Astronomy" },
    { id: 123, label: "Political Science" },
    { id: 124, label: "Philosophy" },
    { id: 125, label: "Cultural Anthropology" },
    { id: 126, label: "Creative Problem Solving" },
    { id: 127, label: "Cross-Cultural Communication" },
    { id: 128, label: "Conflict Resolution" },
    { id: 129, label: "Mindfulness Meditation" },
  ];

  return (
    <>
      {/* Skills start */}
      <div className='flex justify-between items-center mt-10 mx-[5%]'>
        <h2 className='text-md md:text-2xl font-semibold'>Skills</h2>

        <button
          onClick={() => setSkillAddModal(true)}
          className="text-white py-2 px-2 md:py-2 md:px-4 font-normal text-xs md:text-sm rounded-xl flex items-center space-x-1 md:space-x-2" style={{ backgroundColor: 'rgba(0, 13, 255, 1)' }}>
          <span className="md:font-semibold">Add Skill</span>
          <IoMdAdd className="w-3 h-3 md:w-5 md:h-5 " />
        </button>
      </div>

      <div className="flex flex-wrap mt-6 mx-[5%]">
        {userData?.skills &&
          userData?.skills.map((skill, index) => (
            <div
              key={index} // Ensure each skill has a unique key
              className="flex items-center justify-between bg-green-500 text-white px-3 py-2 md:px-4 rounded-lg mb-2 mr-1"
            >
              <span className="text-xs md:text-base font-normal">{skill}</span>
              <div className='has-tooltip'>
                <span className='tooltip rounded-md shadow-lg p-2 text-gray-800 bg-slate-50  -mt-11 sm:-mt-12 md:-mt-12'>
                  Remove</span>
                <MdClose
                  onClick={() => {
                    setShowDeleteModal(true)
                    setSkillToRemove(skill)

                  }}
                  className='text-gray-600 h-4 w-4 ml-1 cursor-pointer' />

              </div>
            </div>
          ))}
      </div>


      {skillAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="dark:bg-green-50 shadow-2xl rounded-sm p-6 w-4/5 sm:w-3/5 md:w-1/3 lg:w-1/4 xl:w-1/4">
            {/* Responsive width */}
            <h2 className="text-2xl font-semibold mb-4">Add New Skill</h2>
            <form>
              <div className="mb-4">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={allSkills}
                  sx={{ width: 241 }}
                  value={newSkill}
                  onChange={(e, newValue) => setNewSkill(newValue?.label)}
                  renderInput={(params) =>
                    <TextField  {...params}
                      label="Skill"
                      type="text"
                      name='skill'
                    />}
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  onClick={handleAddSkill}
                  className="text-white px-5 py-2 rounded-md" style={{ backgroundColor: 'rgba(0, 211, 99, 1)' }}
                >
                  {proccessing ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSkillAddModal(false)
                    setNewSkill('')
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


      {showDeleteModal && (
        
          <div
            className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-10 backdrop-blur-sm"
          >
            <div className="relative mx-3 w-auto my-6 md:mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="mx-2 flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                  <h3 className="text-md md:text-2xl font-semibold">
                    Delete Skill
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-3 flex-auto mx-3">
                  <p className="text-gray-500 text-lg leading-relaxed">
                    Are you sure you want to delete the "{skillToRemove}" skill? ⚠️
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                  <button
                    className=" text-emerald-500  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-red-500 active:bg-red-600 rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleRemoveSkill(skillToRemove)
                      setShowDeleteModal(false)
                      setSkillToRemove('')
                    }}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
      )}


    </>
  )
}

export default SkillsPart