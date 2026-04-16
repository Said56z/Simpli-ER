import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';

function App() {
  return (
    <div className="min-h-screen font-principal bg-page-bg text-text-primary selection:bg-accent-red selection:text-white">
      <Header />
      
      {/* pt-36 asegura que el contenido baje lo suficiente para que la barra de arriba no lo tape */}
      <div className="flex pt-10 pb-12 max-w-[1600px] mx-auto">
        <LeftSidebar />
        <div className="flex-1 flex gap-8">
          <MainContent />
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default App;