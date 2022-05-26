import * as RTH from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';

const ReactQueryProvider = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

export function renderReactQueryHook(hook, params) {
  return RTH.renderHook(() => hook(params), { wrapper: ReactQueryProvider });
}
