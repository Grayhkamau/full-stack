import ReactDOM from 'react-dom/client'
import App from './App'
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NotificationProviderContext from './context';

let client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
    <NotificationProviderContext>
      <App />
    </NotificationProviderContext>
  </QueryClientProvider>
)