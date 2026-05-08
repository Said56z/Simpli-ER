import { useState } from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';


function App() {
  const [regex, setRegex] = useState('');
  return (
    <div className="min-h-screen font-principal bg-page-bg text-text-primary selection:bg-accent-red selection:text-white">
      <Header />
      <div className="flex pt-10 pb-12 max-w-[1600px] mx-auto">
        <LeftSidebar />
        <div className="flex-1 flex gap-8">
          <MainContent regex={regex} setRegex={setRegex} />
          <RightSidebar setRegex={setRegex} />
        </div>
      </div>
    </div>
  );

}



export default App;