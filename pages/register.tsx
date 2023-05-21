import React from 'react'
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Roles {
  id : string ,
  name : string,
  normalizedName : string,
  concurrencyStamp : string

}

 interface UserVM {
  username: string ;
  email: string ;
  password: string ;
  firstName: string ;
  lastName: string ;
  mobileNumber: string ;


  roleId: string;
}
export default function Register() {

  const [roles, setRoles] = useState<Roles[]>([]);
  const [formData  , setFormdata ] = useState<UserVM>({username : "" , email : "" , password : "" , firstName : "" , lastName : "" ,
mobileNumber  : ""  , roleId : ""});
  const router  = useRouter();

  useEffect(() => {
    // Fetch the data from the API
    axios
      .get<Roles[]>(process.env.NEXT_PUBLIC_API_ENDPOINT+ "api/Roles/api/roles/getroles" ,  { withCredentials: true })
      .then((response) => {
        // Extract the dropdown options from the API response
        const options = response.data;
        setRoles(options);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function saveUser( event :   React.FormEvent) {
    try {
      event.preventDefault();
      debugger;
      formData.email  = formData.username;
       const result = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT+ "api/Users/auth/save" , formData , { withCredentials: true});
       console.log(result)
      router.push('/listUserRoles')
    } catch (error) {
      console.log(error);
    }
  
  }
  return (
    <div className="mt-36 relative bottom-28">
  <div className="md:grid md:grid-cols-3 md:gap-6">

    <div className="relative left-full">
    <div className="shadow overflow-hidden sm:rounded-md px-4 py-4 bg-blue-500 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-white">Register</h3>
        <p className="mt-1 text-sm text-white">
          Sign Up Information For Users
        </p>
      </div>
      <form onSubmit={saveUser} method="POST">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-4 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-5">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="text" name="username" id="username"  value={formData.username}
  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormdata((formData) => ({
      ...formData,
      [name]: value,
    }));
  }}  autoComplete="given-name" className="mt-1 py-2 px-3 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" name="firstName" id="firstName" value={formData.firstName}
  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormdata((formData) => ({
      ...formData,
      [name]: value,
    }));
  }}  autoComplete="given-name" className="mt-1 py-2 px-3 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" name="lastName" id="lastName" value={formData.lastName}
  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormdata((formData) => ({
      ...formData,
      [name]: value,
    }));
  }}   autoComplete="given-name" className="mt-1 py-2 px-3 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div className="col-span-5">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="text" name="mobileNumber" id="mobileNumber" value={formData.mobileNumber}
  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormdata((formData) => ({
      ...formData,
      [name]: value,
    }));
  }}  autoComplete="given-name" className="mt-1 py-2 px-3 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              {/* <div className="col-span-6 sm:col-span-3">
                  <label  className="block text-sm font-medium text-gray-700">Country / Region</label>
                  <select id="country" name="country" autoComplete="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div> */}
              <div className="col-span-5">
                <label  className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" id="password" value={formData.password}
  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormdata((formData) => ({
      ...formData,
      [name]: value,
    }));
  }} autoComplete="postal-code" className="mt-1 py-2 px-3 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

                <div className="col-span-6 sm:col-span-3">
                  <label  className="block text-sm font-medium text-gray-700">Select Role</label>
                  <select id="roleId" name="roleId" autoComplete="roleId" value={formData.roleId}
  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormdata((formData) => ({
      ...formData,
      [name]: value,
    }));
  }}  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    {/* <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option> */}
                    <option key="-1" value="-1">Select.....</option>
              {roles.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
                  </select>
                </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}
