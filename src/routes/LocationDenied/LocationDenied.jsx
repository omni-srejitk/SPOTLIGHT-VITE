import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { LocationDeniedInfo } from '../../components/NewModalLocationDeny';

export const LocationDenied = () => {
  let brand = useParams();
  function setTitle() {
    document.title = `Spotlight x ${brand?.brand} | Store Not Found`;
  }
  useEffect(() => {
    setTitle();
  }, []);
  return (
    <div className='mx-auto h-fit min-h-screen bg-black p-6 lg:max-w-[60vw]'>
      <Header />
      <LocationDeniedInfo />
      <Footer />
    </div>
  );
};
