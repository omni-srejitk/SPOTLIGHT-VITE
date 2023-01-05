import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
const Home = () => {
  let navigate = useNavigate();
  const { pathname } = useLocation();
  let randomBrandsArray = ['bowlcurry', 'homemadelove', 'trickortreat'];
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min) + min);
  }
  let randomnumber = getRandomInt(0, 3);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(encodeURI(`/${pathname.slice(1)}`));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      key='splash'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='flex h-screen w-screen flex-col items-center justify-center gap-10 bg-white'
    >
      <img
        src='/Main Screen svg.svg'
        className='h-20 w-20'
        alt='loading-animation'
      />
      <button
        className='rounded-xl bg-black p-2 text-xl text-white'
        onClick={() => {
          navigate(`${randomBrandsArray[randomnumber]}`);
        }}
      >
        Search for a random brand
      </button>
    </motion.div>
  );
};
export default Home;
