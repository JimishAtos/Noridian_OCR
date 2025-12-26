import { useState } from 'react';
import Sidebar from './components/Sidebar';
import CommandCenterTable from './components/CommandCenterTable';
import HeaderPage from './components/HeaderPage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container-fluid my-5 clearfix">
        <HeaderPage />
        <Sidebar />
        <CommandCenterTable />
      </div>
      {/* END container-fluid */}
    </>
  )
}

export default App
