
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Axios_Instance from '../../../api/userAxios';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function ShortListCandidate({ isOpenShortlistModal, setIsOpenShortlistModal, userId, applicationId, jobId, jobTitle, relaod, setRelaod }) {

  const [selectedOption, setSelectedOption] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [proccessing, setProccessing] = useState(false);

  const companyId = useSelector((state) => state.company.id);
  const { token } = useSelector((state) => state.company)

  const validateFormData = () => {
    const errors = {};

    if (!selectedOption && !interviewTime) {
      errors.common = 'Please enter the fields';
    }
    if (!selectedOption) {
      errors.selectedOption = 'Please select an option (Shortlist or Reject)';
    }

    // Validate interviewTime
    if (!interviewTime) {
      errors.interviewTime = 'Please enter the interview time';
    }

    const currentDate = new Date();

    const interviewTimeDate = new Date(interviewTime);

    if (interviewTimeDate < currentDate) {
      errors.interviewTime = 'Deadline must be a future date';
    }

    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const errors = validateFormData()

    if (Object.keys(errors).length === 0) {
      try {
        setProccessing(true)

        const res = await Axios_Instance.post('/company/shortlist', { selectedOption, interviewTime, userId, companyId, applicationId, jobId, jobTitle });
        if (res.data.success) {
          setProccessing(false)
          toast.success('Shortlisted and Mail sented successfully')
          setRelaod(!relaod)
          setIsOpenShortlistModal(false)
        } else {
          setProccessing(false)
          toast.error(res.data.errMsg)
          setIsOpenShortlistModal(false)
        }

      } catch (error) {
        setProccessing(false)
        console.log(error)
      }
    } else if (errors.common) {
      toast.error(errors.common);
    } else if (errors.selectedOption) {
      toast.error(errors.selectedOption);
    } else if (errors.interviewTime) {
      toast.error(errors.interviewTime);
    }
  };

  return (
    <>
      <Transition.Root show={isOpenShortlistModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpenShortlistModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed flex items-center justify-center inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm">
            <div className="mx-auto text-center flex justify-center md:px-2 lg:px-4"> {/* Center the modal */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative overflow-hidden dark:bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-700 hover:text-gray-800 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setIsOpenShortlistModal(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="mt-4 sm:w-full lg:w-96">
                      <h1 className="lg:text-2xl xl:text-2xl text-xl font-semibold mb-6 mt-6">Selection Process</h1>

                      <FormControl fullWidth variant="outlined" style={{ marginBottom: '16px' }}>
                        <InputLabel id="selection-option-label">Select Option</InputLabel>
                        <Select
                          labelId="selection-option-label"
                          id="selection-option"
                          value={selectedOption}
                          onChange={(event) => setSelectedOption(event.target.value)}
                          label="Select Option"
                        >
                          <MenuItem value={'shortlisted'}>Shortlist</MenuItem>
                          {/* <MenuItem value={'reject'}>Reject</MenuItem> */}
                        </Select>
                      </FormControl>

                      {selectedOption === 'shortlisted' && (
                        <div className="mb-4 ">
                          <p className="text-sm font-semibold mb-2">Interview Time</p>
                          <TextField
                            fullWidth
                            id="interview-time"
                            type="datetime-local"
                            value={interviewTime}
                            onChange={(event) => setInterviewTime(event.target.value)}
                            variant="outlined"
                          />
                          <p className="text-sm mt-2 sm:w-full lg:w-96 text-yellow-600">
                            This will send an email to the candidate about the shortlisting, including the interview time.
                          </p>
                        </div>
                      )}

                      <div className="flex justify-center">
                        <Button variant="contained" onClick={handleFormSubmit}>
                          {proccessing ? 'Processing...' : 'Send Mail'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

    </>
  )
}