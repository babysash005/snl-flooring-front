
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './layout'
import { useRouter } from 'next/router';
import Home from './home';
import { useState } from 'react';


interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface CarouselProps {
  images: ImageProps[];
}


export default function App({ Component, pageProps }: AppProps) {
  const [carouselProps, setCarouselProps] = useState<CarouselProps>({
    images: [
      {
        src: '/public/floor 1.jpg',
        alt: 'Image 1',
        width: 800,
        height: 600,
      },
      {
        src: '/public/floor 2.jpg',
        alt: 'Image 2',
        width: 800,
        height: 600,
      },
      {
        src: '/public/floor 3.jpg',
        alt: 'Image 3',
        width: 800,
        height: 600,
      },
      {
        src: '/public/floor 4.jpg',
        alt: 'Image 4',
        width: 800,
        height: 600,
      },
    ],
  });

  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <>
      <Layout>
        {isHomePage && <Home  />}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}