import React, { useEffect, useState } from 'react';
import Assets from '../interfaces/assets';
import { getAssets } from '../services/assetsService';

import Navbar from './Navbar/Navbar';

function Home() {
  const [assets, setAssets] = useState<Assets[]>([]);
  const init = async () => {
    const x: any = await getAssets();
    setAssets(x);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
};

export default Home;