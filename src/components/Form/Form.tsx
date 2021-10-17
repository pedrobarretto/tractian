import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@material-ui/core';
import Companies from '../../interfaces/companies';
import Units from '../../interfaces/units';
import Users from '../../interfaces/users';

import './style.css';

interface MaintanceFormProps {
  companies: Companies[];
  users: Users[];
  units: Units[];
}

function MaintanceForm(props: MaintanceFormProps) {
  const [compValue, setCompValue] = useState<string>('');
  const [userValue, setUserValue] = useState<string>('');
  const [unitValue, setUnitValue] = useState<string>('');

  const handleMaintance = () => {
    setCompValue('');
    setUserValue('');
    setUnitValue('');
  };
  
  return (
    <div className='form'>
      <FormControl sx={{ m: 1, width: 300, marginTop: 15 }}>
        <InputLabel>Empresa</InputLabel>
        <Select
          value={compValue}
          onChange={event => setCompValue(event.target.value)}
          input={<OutlinedInput label="Empresa" />}
        >
          {props.companies.map(companie => (
            <MenuItem
              key={companie.id}
              value={companie.name}
            >
              {companie.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300, marginTop: 15 }}>
        <InputLabel>Unidade</InputLabel>
        <Select
          value={unitValue}
          onChange={event => setUnitValue(event.target.value)}
          input={<OutlinedInput label="Empresa" />}
        >
          {props.units.map(unit => (
            <MenuItem
              key={unit.id}
              value={unit.name}
            >
              {unit.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300, marginTop: 15 }}>
        <InputLabel>Usuário</InputLabel>
        <Select
          value={userValue}
          onChange={event => setUserValue(event.target.value)}
          input={<OutlinedInput label="Empresa" />}
        >
          {props.users.map(user => (
            <MenuItem
              key={user.id}
              value={user.name}
            >
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant='contained'
        style={{ 
          backgroundColor: '#1F3577',
          marginTop: 110,
          padding: 15
         }}
        onClick={handleMaintance}
      >
        Solicitar Manuntenção
      </Button>
    </div>
  )
}

export default MaintanceForm;