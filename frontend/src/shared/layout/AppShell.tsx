import { Outlet } from 'react-router';

import { BottomTabs } from './BottomTabs';
import { Sidebar } from './Sidebar';

export function AppShell() {
  return (
    <div className="app">
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <BottomTabs />
    </div>
  );
}
