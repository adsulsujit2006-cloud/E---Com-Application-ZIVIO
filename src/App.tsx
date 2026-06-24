import React from 'react';
import logo from './logo.svg';
// @ts-ignore: Allow side-effect import of CSS without type declarations
import './App.css';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AddShoppingCart } from '@mui/icons-material';

function App() {
  return (
    <div className="">
     <h1 className="font-bold text-5xl">Hello Sujit</h1>

     <Button variant='contained'>sujit zivio bajar</Button>
     <AddShoppingCart/>
    </div>
  );
}

export default App;
