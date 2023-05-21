import React from "react";
import { useState , useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";



axios.defaults.withCredentials = true;

interface Users {
    applicationId : number
    id : number;
    name : string,
    surname : string,
    email : string,
    roleName : string,
    roleId : string,
    mobile : string
}


interface Props {
    users  : Users[]
}


export async function getServerSideProps() {
    try {

        const result = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT+ "api/ApplicationUserRole/appuser/getlist" , { withCredentials : true});
       debugger;
       console.log(result.data);
        if (result.status === 200) {
            return {
                props : {
                    users : result.data,
                }
            }
        }else{
         return {
            props : {
                users : [],
            }
         }
        }
        
    } catch (error) {
        return {
            props : {
                users : [],
            }
         }
    }
}


export default function ListUsers( { users } : Props)
{
    const [listusers, setUsersList] = useState(users);
    const router  = useRouter();



    async function PushtoRegister() {
       
        router.push("/register");
    }
    const DeleteUser  = async  (event: React.FormEvent , id : number) : Promise<void> => {
        debugger;
        
          event.preventDefault();
          debugger;
          try {
            debugger;
              
      
              const response = await axios.delete(process.env.NEXT_PUBLIC_API_ENDPOINT+ "api/Users/auth/deleteuser?id=" + id  ,    { withCredentials: true });
              console.log("Response:", response.data);
              debugger;
              if (response.status === 200) {
                debugger;
                setUsersList(users.filter((userslist) => userslist.id !== id));
              }
              // setFormdata({
              //     Description: "",
                
              //   });
          } catch (error : any) {
              console.error("Error submitting form:", error.message);
          }
      }


    return (
        <>
              <button type="button" onClick={PushtoRegister} className="relative top-24 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Register
            </button>
           
          <div className="relative   sm:rounded-lg w-full top-[125px]">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white-700 uppercase bg-gray-50 dark:bg-blue-400 dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                   Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                   Surname
                  </th>
                  <th scope="col" className="px-6 py-3">
                   Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                   Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {users && Array.isArray(users) && users.length === 0 ? (
                   <tr>
                   <td colSpan={4} className="text-center py-4">
                     Loading...
                   </td>
                 </tr>
                ) : (
                    users &&
                  Array.isArray(users) &&
                  users.map((listitems) => {
                    return (
                      <tr
                        key={listitems.id}
                        className="bg-white border-b dark:bg-white dark:border-gray-700"
                      >
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          {listitems.name}
                        </td>

                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          {listitems.surname}
                        </td>


                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          {listitems.email}
                        </td>


                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          {listitems.roleName}
                        </td>
                        {
                            listitems.roleName.includes("super") ? 
                            (
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                <button
                                 disabled  type="submit"  onClick={e => DeleteUser(e , listitems.id)}
                                  className="bg-gray-400 cursor-not-allowed text-white  hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-400 dark:hover:bg-gray-400 dark:focus:ring-red-800"
                                >
                                  Delete
                                </button>
                              </td>
                            ):
                            (
                                (
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                    <button
                                     type="submit"  onClick={e => DeleteUser(e , listitems.id)}
                                      className="bg-red-700 cursor-auto text-white  hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                    >
                                      Delete
                                    </button>
                                  </td>
                                )
                            )
                        }
                       
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </>
      );
}