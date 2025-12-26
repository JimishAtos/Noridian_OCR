import { useState } from 'react';
import HeaderPage from './components/HeaderPage';
import Sidebar from './components/Sidebar';
import CommandCenterTable from './components/CommandCenterTable';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <>
      <HeaderPage onToggleSidebar={
        () => setSidebarCollapsed((prev) => !prev)} />
      <div className="wrapper">
        <Sidebar collapsed={sidebarCollapsed} />
        <CommandCenterTable />
      </div>
    </>
  );
}

export default App;
