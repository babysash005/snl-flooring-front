import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './layout'
import { useRouter } from 'next/router';
import Home from './home';
import { useState , useEffect } from 'react';
import axios from 'axios';

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
      // ... other image objects
    ],
  });

  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <>
      <Layout>
        {isHomePage && <Home />}
        {/* ... other components */}
        <Loading>
          <Component {...pageProps} />
        </Loading>
      </Layout>
    </>
  );
}

function Loading({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) => url !== router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);


  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      setLoading(true);
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
  </div>
  ) : (
    <>{children}</>
  );
}
