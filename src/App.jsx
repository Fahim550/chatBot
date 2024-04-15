import "regenerator-runtime";
import LeftSectio from "./components/LeftSectio";
import RightSection from "./components/RightSection";


const App = () => {


  return (
    <div className="w-screen h-screen flex flex-row ">
      <div className=" w-1/5  overflow-hidden">
        <LeftSectio />
      </div>
      <div className="w-4/5  overflow-hidden">
        <RightSection />
      </div>
    </div>
    
  );
};

export default App;


