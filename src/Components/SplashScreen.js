import React, { useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import logoss from "../logos/back5.png";
import $ from 'jquery';
import blank from "../logos/blank.png"
import axios from "axios";

export default function SplashScreen(props) {



  useEffect(() => {
    props.setLoading(true);

    setTimeout(() => {
      //setLoading(false);

      $(".whole").slideUp("slow", () => {
        $(".whole").css("display", "none");
        $(".fir").css("display", "block");

      });

    }, 500)

  }, [])

  const canvas = async (e) => {
    e.preventDefault();
    props.setCanv(true)
    props.setFirst(false)

  }

  const Create = async (e) => {
    e.preventDefault();
    props.setNewProject(true);
    // props.setCanv(true)
    props.setOption('create')
    // setFirst(false);
    // try {     
    //   const response = await fetch('/project', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       folderName: "Folder 1"
    //   })
    //   });

    // } catch(err) {
    //   console.error(`Error: ${err}`);
    // }
  }


  const Open = async (e) => {
    e.preventDefault();
    axios.get('http://localhost:5000/openPro')
      .then((response) => {
        console.log(response.data)
        props.setPrevProjectData(response.data);
      });
    props.setNewProject(true);
    // props.setCanv(true)
    
    props.setOption('open')
    //   e.preventDefault();

    // props.setPrevProject(true)
    // props.setFirst(false);



  }


  return (
    <>
      <div className="whole">
        <div className="loader">
          <img src={logoss} alt="logo" width={"200px"} />
          <h1>BackDev</h1>
          <PulseLoader
            className="load"
            color={"rgb(255, 255, 255)"}
            loading={props.loading}
            size={10}
            speedMultiplier={0.6}
          />
        </div>
      </div>

      {props.first && (
        <div className="fir">
          <h1 className="heading">Welcome to BackDev</h1>
          <div className="big">

            <div className="btn" onClick={Create}>
              <div className="in">
                <img src={blank} alt="blank" className="blank" />
              </div>
              <div className="in">
                <h3>Create Project</h3>
                <p>Start a new process from scratch</p>
              </div>
            </div>
            <div className="btn" onClick={Open}>
              <div className="in">
                <img src={blank} alt="blank" className="blank" />
              </div>
              <div className="in">
                <h3>Open Existing Project</h3>
                <p>Open previously Existing Project</p>
              </div>
            </div>

            <div className="btn">
              <div className="in">
                <img src={blank} alt="blank" className="blank" />
              </div>
              <div className="in">
                <h3>User Guide</h3>
                <p>Open User Manual for Walkthrough of IDE</p>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}
