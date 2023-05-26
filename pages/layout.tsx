

import NavBar from "@/components/navbar";
import next from "next";
import type { AppProps } from 'next/app'
import React ,{ReactNode } from 'react'
// import styles from '../styles/Home.module.css'
import { GlobalContextProvide } from "@/context/userContext";




interface Props {
    children?: ReactNode,
   
    // any props that come into the component
}


 const Layout   = ({ children   } : Props ) =>
 {
    return (
<>
<GlobalContextProvide>

<NavBar />
        <div >
            <main >
                {/* <Header /> */}
            {children}
            </main>
        </div>
       
</GlobalContextProvide>
    
        </>
    )
 }


 export default Layout