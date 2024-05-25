// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'; // Import QueryClient and QueryClientProvider

import 'leaflet/dist/leaflet.css';

const queryClient = new QueryClient(); // Create a new QueryClient instance

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <QueryClientProvider client={queryClient}> {/* Wrap your App with QueryClientProvider */}
          <App />
        </QueryClientProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
