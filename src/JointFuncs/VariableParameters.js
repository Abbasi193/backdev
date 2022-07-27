
import React, { useContext, useState } from 'react';
import { AppContext } from '../App'
import typesI from './types';
import defaultFunctions from './defaultFunctions';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

let types = [...typesI]
types.push({
    name: 'variableInstance',
    inputs: [
        'Type',
        'Identifier',
        'Value'
    ]
})
function VariableParameters() {
    const { highlight, setHighlight } = useContext(AppContext)
    const { canvases } = useContext(AppContext)
    let name = highlight.attributes.data.name
    let storedInputs = highlight.attributes.data.inputs
    let type = highlight.attributes.data.type
    let currentFunction;
    if(type == 'function') {
        currentFunction = defaultFunctions.filter((v) => {
            return v.name == name
        })[0]
    }

    let template = types.filter(v => {
        return v.name == name
    })[0]?.inputs

    if (!template) {
        let temp = defaultFunctions.map(v => v.name)
        if (temp.includes(name)) {
            template = defaultFunctions.filter(v => {
                return v.name == name
            })[0]?.inputs
        }
    }

    const changeParameter = (val, index) => {

        let data = highlight.attributes.data
        // console.log(val)
        data.inputs[index] = val
        highlight.prop({ data }, true)
    }

    const getVariableNames = () => {
        let variables = canvases.filter((canvase) => {
            return canvase.hide == false
        })[0].variables
        variables = variables.map(v => {
            return v.data.inputs[1]
        })
        // console.log(variables)
        return variables
    }

    return (
        <div>
            <p>{name.toUpperCase()}</p><hr className='pa' />
            <br />
            {template && storedInputs.map((v, i) => {
                return <>
                    <div className='contain'><label key={i} htmlFor="fname">{template[i]}</label>
                        <TextInput className="textarea" defaultValue={v} onChange={(val) => { changeParameter(val, i) }} trigger={['', ' ']} options={{ "": getVariableNames(), " ": getVariableNames() }} />
                    </div>
                    <br /><hr className='pa' />
                </>
            })}
            {(currentFunction&&type == 'function') &&
                <>
                <br/><b>Name: </b>{currentFunction.name}
                <br/><b>Description: </b>{currentFunction.description}
                <br/><b>Parameters</b>
                <br/>{currentFunction.inputs.map((v,i)=>{
                    return (<><b>{v}</b> :{currentFunction.inputsDoc[i]}<br/></>)
                })}
                <br/><b>Output: </b>{currentFunction.output}
                </>
            }
        </div>
    )
}


export default VariableParameters