import React from 'react'
import axios from 'axios';
import { useState  , useEffect} from 'react';
import { useGlobalContext } from '@/context/userContext';
import { useRouter } from 'next/router';
import {useForm}  from  'react-hook-form';




axios.defaults.withCredentials = true;



interface FormData{
  UserName : string,
  Password :string
}

export default function Login() {


  const router  = useRouter();
  // const [formData  , setFormdata ] = useState<FormData>({UserName : "" , Password : ""});
  const {userid , setUserId , loggedIn , setLoggedIn , RoleName  , setRoleName} = useGlobalContext(); 
  const [localStorage, setLocalStorage] = useState<Storage | null>(null);
 
 const form = useForm<FormData>();
const { register , handleSubmit , formState }  = form;
const { errors  } = formState;


  useEffect(() => {
    if (typeof window !== undefined) {
      setLocalStorage(window.localStorage);
    }
  }, []);

  

  async function loginPost(  data : FormData ) {

   console.log(data)
    try {
      debugger;
        const response = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT  +"api/Users/auth/login", data , { withCredentials: true });
        if (response.status === 200) {
         debugger;
            setLoggedIn(true)
            setRoleName(response.data.role);
    
            const headers = {
              'Content-Type': 'application/json',
              jwt: response.data.jwt,
            };
            const response2 = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + "api/Users/auth/verify" , {headers});
      
            // setLoggedIn(response2.data.loggedIn);
            // setUserId(response2.data.loggedIn)
            // setRoleName(response2.data.rolename)
            // setLocalStorage(response2.data.jwt);
            localStorage?.setItem('jwt' , response.data.jwt);
            localStorage?.setItem('loggedIn' , response2.data.loggedIn);
            localStorage?.setItem('rolename' , response2.data.rolename);
            router.push('/');
        }
        console.log("Response:", response.data);
    } catch (error : any) {
        console.error("Error submitting form:", error.message);
    }
  }


  return (
   <div className="mt-36">
  <div className="md:grid md:grid-cols-3 md:gap-6">

    <div className="relative left-full">
    <div className="shadow overflow-hidden sm:rounded-md px-4 py-4 bg-blue-500  sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-white">Login</h3>
        <p className="mt-1 text-sm text-white">
        Please Login with your UserName (Email) and Password that you signed up with
        
        </p>
      </div>
      <form onSubmit={handleSubmit(loginPost)} method="POST"  noValidate>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-4 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-5">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="text"  id="UserName" 
              {...register("UserName" ,{
          required : {value : true ,
          message : "UserName is Required"},
          
          
              } , )}
              autoComplete="given-name" className="mt-1 py-2 px-3 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
             
              </div>
              <p className='text-left  text-red-500'>{errors.UserName?.message}</p>

              <div className="col-span-5">
                <label  className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password"  id="Password"  {...register("Password")} autoComplete="Password" className="mt-1 py-2 px-3  border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}
