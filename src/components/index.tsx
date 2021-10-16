import { Container, List } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Assets from '../interfaces/assets';
import { getAssets } from '../services/assetsService';
import Asset from './ListItem/Asset';

import Navbar from './Navbar/Navbar';

function Home() {
  const [assets, setAssets] = useState<Assets[]>([]);
  const [model, setModel] = useState<Assets>(assets[0]);
  
  const init = async () => {
    const x: any = await getAssets();
    setAssets(x);
  }

  const setFirstAsset = () => {
    setModel(assets[0]);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setFirstAsset();
  }, [assets]);

  return (
    <>
      <Navbar />
      <List style={{ 
        width: 300, 
        marginTop: 90, 
        position: 'relative',
        overflow: 'auto', 
        padding: 10,
        height: 850
        }}>
        {
          assets.map(asset => {
            return (
              <Asset asset={asset} />
            )
          })
        }
      </List>
    </>
  );
};

export default Home;