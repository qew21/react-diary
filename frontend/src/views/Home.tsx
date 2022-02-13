import React, { FC, useState } from 'react';
import { isAuthenticated } from '../utils/auth';
import Diary from './Diary';
import {Login} from './Login';

export const Home: FC = () => {
 

  return (
    <>
      {isAuthenticated() ? (<Diary/>): <Login/>}
    </>
  );
};
