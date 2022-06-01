import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';

const ReactQueryProvider = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

export function renderReactQueryHook(hook, options = {}) {
  return renderHook(hook, { ...options, wrapper: ReactQueryProvider });
}
