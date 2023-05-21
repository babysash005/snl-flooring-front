'use client'

import {  createContext , useContext , Dispatch , SetStateAction , useState , useEffect} from "react";
import axios  from 'axios'


axios.defaults.withCredentials = true;




type DataType ={
    userrole : String
}

interface ContextProps {
    userid : string,
    setUserId : Dispatch<SetStateAction<string>>,
    data : DataType[],
    setData : Dispatch<SetStateAction<DataType[]>>,
    loggedIn : boolean
    setLoggedIn :Dispatch<SetStateAction<boolean>>,
    RoleName : string,
    setRoleName : Dispatch<SetStateAction<string>>

}

const GlobalContext = createContext<ContextProps>(
    {
        userid : '',
        setUserId: (): string => '',
        data : [] ,
        setData : (): DataType[] => [],
        loggedIn : false,
        setLoggedIn: (): boolean => false,
        RoleName : '',
        setRoleName : () : string => ''
    }
)

export const GlobalContextProvide = ({children}) =>{
    const [userid , setUserId] = useState('')
    const [data , setData] = useState<[] | DataType[]>([]);
    const [loggedIn , setLoggedIn] = useState(false)
    const [RoleName , setRoleName] = useState('')
    
    useEffect(() => {
        const fetchData = async () => {
       debugger;
       console.log(process.env.NEXT_PUBLIC_API_ENDPOINT);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + "api/Users/auth/verify");
      
            setLoggedIn(response.data.loggedIn);
            setUserId(response.data.loggedIn)
            setRoleName(response.data.rolename)
         
        };
        fetchData();
    }, []);

 
    

    return (
        <GlobalContext.Provider value={{userid , setUserId,data , setData , loggedIn , setLoggedIn , RoleName , setRoleName}}>
            {children}
        </GlobalContext.Provider>
    )
}



export const useGlobalContext = () => useContext(GlobalContext);
