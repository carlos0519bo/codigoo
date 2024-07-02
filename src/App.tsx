import { Router } from '@/router';
import { RootProvider } from '@/providers';

export const App = () => {
  return (
    <RootProvider>
      <Router />
    </RootProvider>
  );
};
