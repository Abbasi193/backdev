import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App.js'
import './styles/BlockButton.css'
import buildBlock from '../JointFuncs/BlockBuilder'
import getTools from '../JointFuncs/getTools'
import { dia, elementTools, shapes } from 'jointjs';

function BlockButton({ type }) {
    // console.log(type)
    const { varCounter, setVarCounter } = useContext(AppContext)
    const { canvases, setCanvases } = useContext(AppContext)

    function addToGraph() {
        let toolsView = getTools(canvases,setCanvases, type)

        let graph = canvases.filter((canvase) => {
            return canvase.hide == false
        })[0].graph

        let paper = canvases.filter((canvase) => {
            return canvase.hide == false
        })[0].paper

        let element = buildBlock(type, setVarCounter, varCounter)

        element.addTo(graph)
        if (type.name == 'declareVariable') {
            addVariable(element.attributes)
        }
        if (type.name == 'declareFunction') {
            addFunction(element.attributes)
        }
        var elementView = element.findView(paper);
        elementView.addTools(toolsView);

    }
    function addVariable(element) {
        setCanvases(state => {
            let temp = [...state]

            temp = temp.map((v) => {
                if (v.hide == false) {
                    let a = [...v.variables]
                    a.push(element)
                    return {
                        ...v,
                        variables: a
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

    function addFunction(element) {
        setCanvases(state => {
            let temp = [...state]

            temp = temp.map((v) => {
                // if (v.hide == false) {
                    let a = [...v.functions]
                    a.push(element)
                    return {
                        ...v,
                        functions: a
                    }
                // } else {
                //     return {
                //         ...v
                //     }
                // }

            })
            return temp
        })
    }

    let x
    if (type.name == 'variableInstance') {
        x = <button className={'blockButton'} onClick={addToGraph}>{type.obj.inputs[1]}</button>

    } else if (type.name == 'functionInstance') {
        x = <button className={'blockButton'} onClick={addToGraph}>{type.obj.inputs[0]}</button>

    } else {
        x = <button className={'blockButton'} onClick={addToGraph}>{type.name}</button>
    }
    return x
}

export default BlockButton

