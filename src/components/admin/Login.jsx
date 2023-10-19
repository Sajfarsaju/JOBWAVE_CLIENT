import React,{useState , useEffect} from 'react'
import Grid from '@mui/material/Grid';
import  TextField  from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/Visibility';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Axios_Instance from '../../api/userAxios'
import { adminLogin } from '../../store/slice/adminSlice';
import { useDispatch } from 'react-redux'


function Login() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [showPassword, setShowPassword] = useState(false);
  
    const [FormData, setFormData] = useState({
      email : "",
      password : "",
    });
  
    const inputPasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
  
    const validateFormData = () => {
        const {email , password} = FormData;
        const errors = {}
    
        const emailRegex = /^[a-zA-Z][a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailRegex.test(email)) errors.email = "Enter a valid email address";
        
    
        if(password.trim().length<6) errors.password = "Password must be at least 6 character long";
    
        return errors;
      }

      const handleChange = (ev) => {
        const {name , value} = ev.target;
        setFormData((prev) => ({
          ...prev,
          [name] : value,
        }))
      }

      const handleSubmit = async (e) => {

        const errors = validateFormData()
        e.preventDefault();
    
        if(Object.keys(errors).length === 0){
      
          try {
            
            const response = await  Axios_Instance.post(`/admin/login` , FormData);
    
            if(response.status === 200){
                            
              const name = response?.data?.name  
              const role = response?.data?.role;  
              const token = response?.data?.token;
              
              if(role === 'admin'){
                dispatch(adminLogin({name  , token ,role}) );
                toast.success(`Welcome  to JobWave`);
                navigate('/admin/dashboard');
              }
            }
          } catch (error) {
    
            if(error.response?.status === 401){
              toast.error(error?.response?.data?.errMsg)
            }else{
              toast.error("Something went wrong at Company login");
              console.log(error)
            }
          }
        }else if(Object.keys(errors).length === 2){
          toast.error("Enter all fields");
        }else if(errors.email){
          toast.error(errors.email);
        }else if(errors.password){
          toast.error(errors.password);
        }
      }
    

  return (

    <div className="bg-gradient-to-tr from-[#f1f5f9] to-[#cbd5e1] opacity-100 min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8">
    <div className="mx-auto sm:w-full max-w-md bg-slate-300 rounded-lg shadow-2xl shadow-stone-500 overflow-hidden">
      <div className="py-4">
        <img
          className="mx-auto h-8 w-auto bg-indigo-600"
          src="../public/JobWave2-fotor-bg-remover-20230817153930.png"
          alt="JobWave"
        />
      </div>
      
      <div className="px-10 py-12">
        {/* <h2 className='text-lg font-bold leading-9 text-gray-900 text-center'>Welcome Back, Find your JobSeeker!!</h2> */}
        <h2 className="text-2xl font-bold leading-9 text-gray-900 text-center">
          Admin
        </h2>
        {/* <h2 className="text-xl font-bold leading-9 text-gray-900 text-center">
          Sign in
        </h2> */}
        {/* <div className="mt-7 flex">
            <div className=" pr-2">
            <h1 className='text-center text-lg'><Link to={'/admin/login'}> Admin </Link></h1>

            </div>
            <div className=" pr-2">
            <h1 className={`text-center text-lg ${color === 'Employer' ? 'text-blue-900' : null}`}><Link to={'/company/login'}> Employer </Link> </h1>
  
            </div>
        </div> */}
         <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <Grid className='justify-center' container spacing={2}>
          <Grid item xs={11}>
              <TextField
                id="emailAddress"
                label="Email Address*"
                variant="standard"
                value={FormData.email}
                onChange={handleChange}
                type="email"
                name='email'
                fullWidth
                InputProps={{
                  style: {
                    padding: '4px 3px',
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={11}>
            <TextField
            id="Password"
            label="Password*"
            variant="standard"
            value={FormData.password}
            onChange={handleChange}
            name='password'
            fullWidth
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={inputPasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <AiFillEyeInvisible/> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                padding: '4px 3px',
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          </Grid>
        </Grid>
       
            <div className="mx-3">
              <button
                type="submit"
                className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800 transition duration-150 ease-in-out"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* <p className="mt-6 text-center text-sm leading-5 text-gray-600">
            Not a member? <Link to={"/company/signup"} className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link>
          </p> */}
        </div>
      </div>
    </div>
  )
}

export default Login