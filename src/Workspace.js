import { createContext, useEffect, useState, useLayoutEffect,useContext } from "react";
import BlockButtonPane from './Components/BlockButtonPane'
import VariablePane from './Components/VariablePane'
import './Components/styles/App.css'
import { AppContext } from './App.js'

import CanvasParent from './Components/CanvasParent'
import ParameterPane from './Components/ParameterPane'
import Top from './Components/Top'
import CustomFunctionPane from "./Components/CustomFunctionPane";
import DefaultFunctionPane from "./Components/DefaultFunctionPane";
import Top1 from "./Components/Top1";
import { Route, Switch, Routes, Link } from 'react-router-dom'

export default function Workspace() {
  const { canvases, setCanvases } = useContext(AppContext)
  return (
    <>
    <hr />
    <Top /><hr />
    <div className={'row'}>
      <BlockButtonPane />
      <DefaultFunctionPane />
      {canvases &&<CustomFunctionPane />}
      {/* <BlockPane /> */}

      {canvases &&
        <>
          <CanvasParent />
          <ParameterPane />
          <VariablePane />
        </>
      }
    </div></>
  )
}
