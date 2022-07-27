import { createContext, useEffect, useState } from "react";
import './styles/NewFolderPop.css'
import $ from 'jquery';
import axios from "axios";
import ApiClient from "./ApiClient";
import HerokuDeployment from "./HerokuDeployment";
import './styles/BlockButton.css'
import socketClient from "socket.io-client";
import Top from "./Top";
import Top1 from "./Top1";
import ClipLoader from "react-spinners/ClipLoader";
import getState from '../JointFuncs/getState';

//import {load} from "all-package-names";


function NewFolderPop(props) {

  const [inp, setInp] = useState("");
  const [commitMsg, setCommitMsg] = useState("");
  const [npmModule, setNpmModule] = useState("")
  const [already, setAlready] = useState("")


  const [response, setResponse] = useState(true)
  const [gitInitResponse, setGitInitResponse] = useState(true)
  const [gitAddResponse, setGitAddResponse] = useState(true)
  const [gitCommitResponse, setGitCommitResponse] = useState(true)
  const [gitPushResponse, setGitPushResponse] = useState(true)
  const [gitPullResponse, setGitPullResponse] = useState(true)

  const [success, setSuccess] = useState("Success");
  const [failure, setFailure] = useState("Failed");
  const [successBin, setSuccessBin] = useState(false);
  const [failBin, setFailBin] = useState(false);
  const [successBinInit, setSuccessBinInit] = useState(false);
  const [failBinInit, setFailBinInit] = useState(false);
  const [successBinAdd, setSuccessBinAdd] = useState(false);
  const [failBinAdd, setFailBinAdd] = useState(false);
  const [successBinCommit, setSuccessBinCommit] = useState(false);
  const [failBinCommit, setFailBinCommit] = useState(false);
  const [successBinPush, setSuccessBinPush] = useState(false);
  const [failBinPush, setFailBinPush] = useState(false);
  const [successBinPull, setSuccessBinPull] = useState(false);
  const [failBinPull, setFailBinPull] = useState(false);





  const CreateNew = async (e) => {
    e.preventDefault();
  
    try {

      axios
        .post('http://localhost:5000/project', {
          title: 'Create New Project',
          folderName: `${inp}`
        })
        .then((response) => {
          console.log(response);
          if (response.data != "Project Name Already Present") {
            getState(props.setCanvases,props.setCode)
            props.setFir(false);
            props.setCanv(true)
            props.setTop(true)

            $(".popup").css("display", "none");
            $(".commands").css("display", "block");
          }
          else {
            setAlready(response.data);
          }
        });

    } catch (err) {
      console.error(`Error: ${err}`);
    }

  }

  const OpenProject = async (e,name) => {
    e.preventDefault();
    
    try {

      axios
        .post('http://localhost:5000/changeProject', {
          folderName: name
        })
        .then((response) => {
          console.log(response);
          if (response.data != "bad") {
            getState(props.setCanvases,props.setCode)
            props.setFir(false);
            props.setCanv(true)
            props.setTop(true)
            

            $(".popup").css("display", "none");
            $(".commands").css("display", "block");
          }
          else {
            setAlready(response.data);
          }
        });

    } catch (err) {
      console.error(`Error: ${err}`);
    }

  }

  const GitInit = async (e) => {
    e.preventDefault()
    setGitInitResponse(false);

    axios
      .post('http://localhost:5000/gitinit', {
        title: 'Git init post request'
      })
      .then((response) => {
        console.log(response);
        setGitInitResponse(true);
        if (response.data == "Failed") {
          setFailBinInit(true);
          setTimeout(() => {
            setFailBinInit(false);
          }, 5000);
        }
        else if (response.data == "Success") {

          setSuccessBinInit(true);

          setTimeout(() => {
            setSuccessBinInit(false);
          }, 5000);
        }
      });

  }

  const GitAdd = async (e) => {
    e.preventDefault()
    setGitAddResponse(false)
    axios
      .post('http://localhost:5000/gitadd', {
        title: 'Git add post request'
      })
      .then((response) => {
        console.log(response);
        setGitAddResponse(true);
        if (response.data == "Failed") {
          setFailBinAdd(true);
          setTimeout(() => {
            setFailBinAdd(false);
          }, 5000);
        }
        else if (response.data == "Success") {

          setSuccessBinAdd(true);

          setTimeout(() => {
            setSuccessBinAdd(false);
          }, 5000);
        }
      });
  }

  const GitCommit = async (e) => {
    e.preventDefault()
    setGitCommitResponse(false)
    axios
      .post('http://localhost:5000/gitcommit', {
        title: 'Git commit post request',
        commitMessage: `${commitMsg}`
      })
      .then((response) => {
        console.log(response);
        setGitCommitResponse(true);
        if (response.data == "Failed") {
          setFailBinCommit(true);
          setTimeout(() => {
            setFailBinCommit(false);
          }, 5000);
        }
        else if (response.data == "Success") {

          setSuccessBinCommit(true);

          setTimeout(() => {
            setSuccessBinCommit(false);
          }, 5000);
        }
        setCommitMsg("")
      });
  }



  const GitPush = async (e) => {
    e.preventDefault()
    setGitPushResponse(false)

    axios
      .post('http://localhost:5000/gitpush', {
        title: 'Git push post request'
      })
      .then((response) => {
        setGitPushResponse(true)
        console.log(response);

        if (response.data == "Failed") {
          setFailBinPush(true);
          setTimeout(() => {
            setFailBinPush(false);
          }, 5000);
        }
        else if (response.data == "Success") {

          setSuccessBinPush(true);

          setTimeout(() => {
            setSuccessBinPush(false);
          }, 5000);
        }


      });

  }

  const GitPull = async (e) => {
    e.preventDefault()
    setGitPullResponse(false)


    axios
      .post('http://localhost:5000/gitpull', {
        title: 'Git pull post request'
      })
      .then((response) => {
        setGitPullResponse(true);
        if (response.data == "Failed") {
          setFailBinPull(true);
          setTimeout(() => {
            setFailBinPull(false);
          }, 5000);
        }
        else if (response.data == "Success") {

          setSuccessBinPull(true);

          setTimeout(() => {
            setSuccessBinPull(false);
          }, 5000);
        }
        

      });

  }

  const NpmData = async (e) => {
    e.preventDefault()
    setResponse(false)

    axios
      .post('http://localhost:5000/npmmodule', {
        title: 'NPM Module',
        npmModule: `${npmModule}`
      })
      .then((response) => {
        setResponse(true)

        console.log(response.data)
        if (response.data == "Failed") {
          setFailBin(true);
          setTimeout(() => {
            setFailBin(false);
          }, 5000);
        }
        else if (response.data == "Success") {

          setSuccessBin(true);

          setTimeout(() => {
            setSuccessBin(false);
          }, 5000);
        }

        setNpmModule("")
      });

  }

  const RunProject = async (e) => {
    e.preventDefault()

    axios.post('http://localhost:5000/runProject').then((response) => {
        console.log(response.data)
      });

  }

  return (props.trigger) ? (
    <>
      <hr />
      <div className='popup'>
        <div className='popup-inner'>
          
      <button className='closeBtnM' onClick={()=>{props.setNewProject(false)}}>x</button>
          {props.option=='create'
          ?<><label className='lab'>Enter folder Name</label>
          <input className='tex' type={"text"} id="newproject" name="newproject" value={inp} placeholder='Enter folder name' onChange={event => setInp(event.target.value)} />
          <button className='bt' onClick={CreateNew}>Create</button>
          <div className="already">{already}</div>
          </>
        :
        <>
        {props.data.map((project) => (
          <>
        <button onClick={(e)=>{OpenProject(e,project)}} className="project blockButton">{project}</button>
        <br></br>
        </>
      ))}
        </>
        }
        </div>
      </div>
      {props.trigger2&&(
      <div>
      <div className="leftdiv">
        <div className="commands box box1">
          <h2>Git Section</h2>
          <input type="button" className="buu" value="Git Initialize" onClick={GitInit} />{!gitInitResponse && <ClipLoader size={15} />}{successBinInit && <span className="success">{success}</span>}{failBinInit && <span className="fail">{failure}</span>}
          <input type="button" className="buu" value="Git Add" onClick={GitAdd} /> {!gitAddResponse && <ClipLoader size={15} />}{successBinAdd && <span className="success">{success}</span>}{failBinAdd && <span className="fail">{failure}</span>}
          <br /><input className="tex" type="text" value={commitMsg} placeholder="Enter message to commit" onChange={event => setCommitMsg(event.target.value)} />{!gitCommitResponse && <ClipLoader size={15} />}{successBinCommit && <span className="success">{success}</span>}{failBinCommit && <span className="fail">{failure}</span>}
          <input type="button" className="buu" value="Git Commit" onClick={GitCommit} /><br />

          <input type="button" className="buu" value="Git Push" onClick={GitPush} />{!gitPushResponse && <ClipLoader size={15} />}{successBinPush && <span className="success">{success}</span>}{failBinPush && <span className="fail">{failure}</span>}
          <input type="button" className="buu" value="Git Pull" onClick={GitPull} />{!gitPullResponse && <ClipLoader size={15} />}{successBinPull && <span className="success">{success}</span>}{failBinPull && <span className="fail">{failure}</span>}<br />


        </div>
        <div className="box her">
          <HerokuDeployment />
        </div>
      </div>
      <div className="centerdiv box">
        <ApiClient />
      </div>
      <div className="rightdiv box">
        <h2>NPM SECTION</h2>
        <input className="tex" value={npmModule} type="text" placeholder="Enter Module Name" onChange={event => setNpmModule(event.target.value)} />{!response && <ClipLoader size={15} />}{successBin && <span className="success">{success}</span>}{failBin && <span className="fail">{failure}</span>}
        <input className="buu" type="button" value="Install" onClick={NpmData} />
        </div>
        <div className="rightdiv box">
        <h2>Project</h2>
        <input className="buu" type="button" value="Run Project" onClick={RunProject} />
      </div>
        </div>)}

    </>
  ) : ""
}

export default NewFolderPop