'use client'

import {  createContext , useContext , Dispatch , SetStateAction , useState , useEffect , ReactNode} from "react";
import axios  from 'axios'


axios.defaults.withCredentials = true;

interface Props{
    children? : ReactNode
}


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
    jwtpass : string | null,
    setJWTPass : Dispatch<SetStateAction<string>>

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
        setRoleName : () : string => '',
        jwtpass : '',
        setJWTPass : () : string => ''
    }
)


export const GlobalContextProvide = ({children} : Props) =>{
    const [userid , setUserId] = useState('')
    const [data , setData] = useState<[] | DataType[]>([]);
    const [loggedIn , setLoggedIn] = useState(false)
    const [RoleName , setRoleName] = useState('')
    const [jwtpass , setJWTPass] = useState('')
    const [localStorage, setLocalStorage] = useState<Storage | null>(null);
 
 
    // Set item in localStorage
    //localStorage.setItem('key', 'value');
     let items : string | null  ='';

  

    useEffect(() => {

        if (typeof window !== undefined) {
            debugger;
          const storage = window.localStorage;
          items = storage?.getItem('jwt');
          setLocalStorage(storage);
          setJWTPass(items || '');
        }



        const fetchData = async () => {
       debugger;
       console.log(process.env.NEXT_PUBLIC_API_ENDPOINT);
       const headers = {
        'Content-Type': 'application/json',
        jwt: items,
      };
      
            const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + "api/Users/auth/verify" , {headers});
      
            setLoggedIn(response.data.loggedIn);
            setUserId(response.data.loggedIn)
            setRoleName(response.data.rolename)
            setLocalStorage(response.data.jwt);
         
        };
        fetchData();
    }, []);

 
    

    return (
        <GlobalContext.Provider value={{userid , setUserId,data , setData , loggedIn , setLoggedIn , RoleName , setRoleName , jwtpass , setJWTPass}}>
            {children}
        </GlobalContext.Provider>
    )
}



export const useGlobalContext = () => useContext(GlobalContext);
