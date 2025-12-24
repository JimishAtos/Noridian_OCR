import { useState } from 'react';
import Sidebar from './components/Sidebar';
import CommandCenterTable from './components/CommandCenterTable';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="d-flex" style={{minHeight: '100vh', background: '#f8fafc'}}>
      <Sidebar />
      <main className="flex-grow-1 p-4">
        <div className="container-fluid">
          <div className="mb-4">
            <h5 className="fw-bold text-uppercase text-secondary">Overview</h5>
          </div>
          <CommandCenterTable />
        </div>
      </main>
    </div>
  )
}

export default App
