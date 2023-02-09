import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import App from 'App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

Sentry.init({
  dsn: 'https://746b1d875a844295a3d0e32fcc7bab09@o4504531020677120.ingest.sentry.io/4504531031359488',
  integrations: [
    new BrowserTracing({
      tracePropagationTargets: ['https://teacher-platform.onrender.com/'],
    }),
  ],
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
});

import store from 'store';

// Context
import AppProvider from 'context/AppProvider';
import CalendarProvider from 'context/CalendarProvider';
import ApprovedSubscriptionsProvider from 'context/ApprovedSubscriptionsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Provider store={store}>
      <AppProvider>
        <ApprovedSubscriptionsProvider>
          <CalendarProvider>
            <App />
          </CalendarProvider>
        </ApprovedSubscriptionsProvider>
      </AppProvider>
    </Provider>
  </Router>,
);
