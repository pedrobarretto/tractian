import ListItem from '@material-ui/core/ListItem';
import React, { useEffect, useState } from 'react';
import Assets from '../../interfaces/assets';
import './style.css'

interface AssetProps {
  asset: Assets;
  setModel(model: Assets): void;
}

function Asset(props: AssetProps) {
  const [background, setBackground] = useState<string>('#fff');
  const colorStatus = () => {
    if (props.asset.healthscore >= 70)
      return '#00FF57';

    if (props.asset.healthscore <= 59)
      return '#FF5050';

    if (props.asset.healthscore <= 69)
      return '#FFA800';

    return '#fff';
  };

  const handleAsset = () => {
    props.setModel(props.asset);
  };

  useEffect(() => {
    const color = colorStatus();
    setBackground(color);
  }, []);

  return (
    <ListItem className='asset' style={{ backgroundColor: background }} onClick={handleAsset}>
      <h1 className='asset-name'>{props.asset.model}</h1>
      <h1 className='asset-name'>{props.asset.name}</h1>
      <h1 className='asset-name'>{props.asset.healthscore}%</h1>
    </ListItem>
  )
}

export default Asset;