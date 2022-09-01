
import thunk from 'redux-thunk';	
import { logger } from 'redux-logger';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const store = createStore(rootReducer, applyMiddleware(thunk, logger))