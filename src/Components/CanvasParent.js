import JointCanvas from './JointCanvas'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import './styles/CanvasParent.css'
import { useState, useContext } from 'react'
import { AppContext } from '../App.js'
import testCode from '../JointFuncs/CodeGenerator';
import saveState from '../JointFuncs/saveState';
import { dia, ui, shapes, } from 'jointjs';

function CanvasParent() {
    const { canvases, setCanvases ,setCode} = useContext(AppContext)

    function openTab(id) {
        setCanvases((state) => {
            let temp = [...state]
            temp = temp.map((v) => {
                if (v.id == id) {
                    return {
                        ...v,
                        hide: false
                    }
                } else {
                    return {
                        ...v,
                        hide: true
                    }
                }

            })
            return temp
        })
    }

    function closeTab(id) {
        setCanvases((state) => {
            let temp = [...state]
            temp = temp.map((v) => {
                if (v.id == id) {
                    return {
                        ...v,
                        hideTab: true,
                        hide: true
                    }
                } else if (v.parent == null) {
                    return {
                        ...v,
                        hide: false
                    }
                } else {
                    return {
                        ...v
                    }
                }

            })
            return temp
        })
    }

    return (
        <>
            <div className={'columnCenter main'}>
                <div className={'tab'}>
                    {canvases.map((canvas,i) => {
                        return <>
                            <button style={{ display: canvas.hideTab ? 'none' : '' }} className={canvas.hide ? '' : 'active'} onClick={() => { openTab(canvas.id) }}>
                                Canvas {i}
                                {canvas.parent != null && <span className='closeBtn' onClick={(e) => { e.stopPropagation(); closeTab(canvas.id) }}>x</span>}
                            </button>

                        </>
                    })}
                </div>
                <div>
                    {canvases.map((canvas) => {
                        return (<div style={{ display: canvas.hide ? 'none' : '' }}>
                            <JointCanvas id={canvas.id} graph={canvas.graph} changes={canvas.hide} />
                        </div>)
                    })}
                </div>
                {/* <input type='button' value={'Run'} onClick={() => { testCode(canvases,setCode);saveState(canvases) }} /> */}
            </div>
        </>
    )
}

export default CanvasParent