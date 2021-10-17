import { List } from '@material-ui/core';
import Box from '@material-ui/system/Box';
import React, { useEffect, useState } from 'react';
import Assets from '../interfaces/assets';
import Companies from '../interfaces/companies';
import Units from '../interfaces/units';
import Users from '../interfaces/users';
import { getAssets } from '../services/assetsService';
import { getCompanies } from '../services/companiesService';
import { getUnits } from '../services/unitsService';
import { getUsers } from '../services/usersService';
import AssetData from './AssetData/AssetData';
import Asset from './ListItem/Asset';
import MaintanceForm from './Form/Form';

import Navbar from './Navbar/Navbar';

const enum filterOptions {
  danger,
  warning,
  success,
  all
};

function Home() {
  const [assets, setAssets] = useState<Assets[]>([]);
  const [auxAssets, setAuxAssets] = useState<Assets[]>([]);
  const [model, setModel] = useState<Assets>({} as Assets);

  const [companies, setCompanies] = useState<Companies[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const [units, setUnits] = useState<Units[]>([]);

  const init = async () => {
    const assetsRes: any = await getAssets();
    const companiesRes: any = await getCompanies();
    const usersRes: any = await getUsers();
    const unitsRes: any = await getUnits();

    const assets: Assets[] = [...assetsRes];
    assets.sort((a, b) => a.healthscore - b.healthscore);
    setAuxAssets(assets);
    setAssets(assets);

    setCompanies(companiesRes);
    setUsers(usersRes);
    setUnits(unitsRes);
  };

  const handleFilter = (option: filterOptions) => {
    const tempAssets: Assets[] = [...assets];
    if (option === filterOptions.danger) {
      const filteredAssets = tempAssets.filter(x => x.healthscore <= 59);
      setAuxAssets(filteredAssets);
      return;
    };

    if (option === filterOptions.warning) {
      const filteredAssets = tempAssets.filter(x => (x.healthscore <= 69 && x.healthscore >= 60));
      setAuxAssets(filteredAssets);
      return;
    };

    if (option === filterOptions.success) {
      const filteredAssets = tempAssets.filter(x => x.healthscore >= 70);
      setAuxAssets(filteredAssets);
      return;
    };

    setAuxAssets(assets);
  }

  const StatusFilter = () => {
    let buttons = [
      {statusName: 'Todos', color: '#1F3577', background: 'white', status: filterOptions.all},
      {statusName: 'Normal', color: '#00FF57', background: 'white', status: filterOptions.success},
      {statusName: 'Atenção', color: '#FFA800', background: 'white', status: filterOptions.warning},
      {statusName: 'Perigo', color: '#FF5050', background: 'white', status: filterOptions.danger}
    ];

    return(
      <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        {buttons.map((button: any, index: number) => (
          <button 
            key={index}
            style={{ 
              border: `solid 1px ${button.color}`,
              backgroundColor: '#fff',
              // marginRight: 8,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              padding: 5
           }}
           onClick={() => handleFilter(button.status)}
          >
            {<svg width="15" height="15" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="11" cy="10.5" rx="11" ry="10.5" fill={button.color}/></svg>}
            <span style={{ marginLeft: 5 }}>{button.statusName}</span>
          </button>
        ))}
      </div>
    )
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
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Box style={{
          width: 300,
          height: '84vh'
        }}>
          <div style={{ marginTop: 90 }}>
            {StatusFilter()}
          </div>
          <List style={{ 
            width: '100%',
            position: 'relative',
            overflow: 'auto', 
            padding: 10,
            height: '100%'
            }}>
            {
              auxAssets.map(asset => {
                return (
                  <Asset asset={asset} setModel={setModel} />
                )
              })
            }
          </List>
        </Box>

        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          marginLeft: '100px'
         }}>
          <MaintanceForm companies={companies} users={users} units={units} />
          <AssetData asset={model} />
        </div>
      </div>
    </>
  );
};

export default Home;