import { createContext } from 'react';
import { initialState } from './config';
import { AppState } from './types';

export const AppContext = createContext<AppState>(initialState);
