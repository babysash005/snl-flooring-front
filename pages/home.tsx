import React from 'react'
import Image from 'next/image'
import { useState , useEffect } from 'react';
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useRouter } from 'next/router';
import Typewriter from 'typewriter-effect';
import Footer from '@/components/Footer';
import { useGlobalContext } from '@/context/userContext';

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface CarouselProps {
  images: ImageProps[];
}


export default function Home() {
  const { userid, setUserId, loggedIn, setLoggedIn, RoleName, setRoleName , jwtpass , setJWTPass } =
    useGlobalContext();
    debugger;
  const router  = useRouter();
  function PushToLogin()
  {
    router.push('/login');
  }

  return (
    <div>
   
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20">
    <p  rel="noreferrer"
        className="border rounded-2xl py-1 px-4 text-slate-500 text-sm mb-5 hover:scale-105 transition duration-300 ease-in-out">Flooring For The Best
        <span className="font-semibold"></span> </p>
        
    <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl">
    <Typewriter
  onInit={(typewriter) => {
    typewriter
      .typeString('Make your Place Perfect')
      .callFunction(() => {
        console.log('Feel Like Home');
      })
      .pauseFor(250)
      .deleteAll()
      .callFunction(() => {
      
      })
      .start();
  }}
/>


        <span className="relative whitespace-nowrap text-blue-400">
            <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70" preserveAspectRatio="none"><path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path></svg>
            <span className="relative">SNL Flooring</span>
        </span>
    </h1>
    <p className="mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7">Want to style up your home / place of work? Maybe get that
        perfect feel? </p>

        {loggedIn === false ? (<>  <a className="bg-blue-500 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-blue-600" onClick={PushToLogin}>Login→
    </a></>): (<></>)}
  
</main>
    

<br/>
  

<br />
<div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">

<a className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
Store
</a>

<div className="flex items-center" id="store-nav-content">

    {/* <a className="pl-3 inline-block no-underline hover:text-black" href="#">
        <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
        </svg>
    </a>

    <a className="pl-3 inline-block no-underline hover:text-black" href="#">
        <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
        </svg>
    </a> */}

</div>
</div>
<br /> 
{/*  Cards  */}
<div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">

<div className="rounded overflow-hidden shadow-lg">
<Image src='/images/pexels-freemockupsorg-775219.jpg' width={800} height={600} alt="Wodden" />

  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Mountain</div>
    <p className="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  </div>
</div>

<div className="rounded overflow-hidden shadow-lg">
<Image src='/images/pexels-jill-wellington-39853.jpg' width={800} height={600} alt="Wooden" />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">River</div>
    <p className="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#summer</span>
  </div>
</div>


<div className="rounded overflow-hidden shadow-lg">
<Image src='/images/pexels-pixabay-259962.jpg' width={800} height={600} alt="Floor" />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Forest</div>
    <p className="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fall</span>
  </div>
</div>
</div>

<section className="bg-white py-8">

<div className="container py-8 px-6 mx-auto">

    <a className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8" href="#">
About
</a>

    <p className="mt-8 mb-8">This template is inspired by the stunning nordic minamalist design - in particular:
        <br />
        <a className="text-gray-800 underline hover:text-gray-900" href="http://savoy.nordicmade.com/" target="_blank">Savoy Theme</a> created by <a className="text-gray-800 underline hover:text-gray-900" href="https://nordicmade.com/">https://nordicmade.com/</a> and <a className="text-gray-800 underline hover:text-gray-900" href="https://www.metricdesign.no/" target="_blank">https://www.metricdesign.no/</a></p>

    <p className="mb-8">Lorem ipsum dolor sit amet, consectetur <a href="#">random link</a> adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Vitae aliquet nec ullamcorper sit. Nullam eget felis eget nunc lobortis mattis aliquam. In est ante in nibh mauris. Egestas congue quisque egestas diam in. Facilisi nullam vehicula ipsum a arcu. Nec nam aliquam sem et tortor consequat. Eget mi proin sed libero enim sed faucibus turpis in. Hac habitasse platea dictumst quisque. In aliquam sem fringilla ut. Gravida rutrum quisque non tellus orci ac auctor augue mauris. Accumsan lacus vel facilisis volutpat est velit egestas dui id. At tempor commodo ullamcorper a. Volutpat commodo sed egestas egestas fringilla. Vitae congue eu consequat ac.</p>

</div>

</section>

<footer className="container mx-auto bg-white py-8 border-t border-gray-400">
<div className="container flex px-3 py-8 ">
    <div className="w-full mx-auto flex flex-wrap">
        <div className="flex w-full lg:w-1/2 ">
            <div className="px-3 md:px-0">
                <h3 className="font-bold text-gray-900">Additional</h3>
                <p className="py-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel mi ut felis tempus commodo nec id erat. Suspendisse consectetur dapibus velit ut lacinia.
                </p>
            </div>
        </div>
        <div className="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
            <div className="px-3 md:px-0">
                <h3 className="font-bold text-gray-900">Social</h3>
                <ul className="list-reset items-center pt-3">
                    <li>
                        <a className="inline-block no-underline hover:text-black hover:underline py-1" href="#">Will be filled with SNLs Links</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</footer>

    </div>
   

  )
}



