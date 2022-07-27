import { createContext, useEffect, useState, useLayoutEffect } from "react";
import './Components/styles/App.css'
import axios from "axios";

import NewFolderPop from "./Components/NewFolderPop";

import SplashScreen from "./Components/SplashScreen";
import Top1 from "./Components/Top1";
import Workspace from "./Workspace";
import Mirror from "./Mirror";

const AppContext = createContext();

function App() {
  const [variables, setVariables] = useState([]);
  const [highlight, setHighlight] = useState(null);
  const [varCounter, setVarCounter] = useState(0);

  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(true);
  const [option, setOption] = useState('');
  const [newProject, setNewProject] = useState(false);
  const [prevProject, setPrevProject] = useState(false);
  const [prevProjectData, setPrevProjectData] = useState([]);
  const [canv, setCanv] = useState(false);
  const [canvases, setCanvases] = useState()
  const [codeView, setCodeView] = useState(false);
  const [code, setCode] = useState('codeseref');
  const [top, setTop] = useState(false);
  const [trigger2, setTrigger2] = useState(false);
  
  useEffect(() => {
    axios.post('http://localhost:5000/reset')
  }, []);


  return (
    <>
      <SplashScreen setCanvases={setCanvases} setOption={setOption} loading={loading} setLoading={setLoading} first={first} setFirst={setFirst} setCanv={setCanv} setNewProject={setNewProject} setPrevProjectData={setPrevProjectData} />
      <Top1 top={top} canvases={canvases} setCanvases={setCanvases} setCanv={setCanv} setNewProject={setTrigger2} setCodeView={setCodeView} setFirst={setFirst} setTop={setTop}/>
      {canv &&
      
      <AppContext.Provider value={{
        variables, setVariables,
        canvases, setCanvases,
        highlight, setHighlight,
        varCounter, setVarCounter,
        setCode
      }}>
        
        <Workspace/>
      </AppContext.Provider>

      }
      <NewFolderPop setCode={setCode} setTop={setTop} setNewProject={setNewProject} setCanvases={setCanvases} data={prevProjectData} option={option} setTrigger2={setTrigger2} trigger2={trigger2} trigger={newProject} setTrigger={setNewProject} setFir={setFirst}  setCanv={setCanv}></NewFolderPop>
      <Mirror codeView={codeView} code={code}/>
    </>
  );
}
export { AppContext }
export default App;
