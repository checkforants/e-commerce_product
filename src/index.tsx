import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { rootReducer } from './redux/rootReducer';
import { logger } from 'redux-logger';
import { store } from './redux/store';
import {
	ReactReduxFirebaseProvider
  } from 'react-redux-firebase'
import { rrfProps } from './redux/firebase';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ReactReduxFirebaseProvider>
	</Provider>
);

