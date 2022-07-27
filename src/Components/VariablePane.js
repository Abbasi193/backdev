import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App.js'
import BlockButton from './BlockButton'

function VariablePane() {

    const {canvases, setCanvases} = useContext(AppContext)
    let canvas = canvases.filter((canvase) => {
        return canvase.hide == false
    })[0]
    return (
        <div className={'column var'}>
            <h4 className='headi'>Variables</h4>
            {canvas&&canvas.variables.map((variable) => {
                return (<BlockButton type={{
                    name:'variableInstance',
                    inputs:variable.data.inputs,
                    obj:variable.data
                }} />)
            })
            }
        </div>

    )
}

export default VariablePane