import './styles/CustomFunctionPane.css'

//             <div className='custom'>
//             <h4 className='headi'>Custom Function Pane</h4>

import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App.js'
import BlockButton from './BlockButton'

function CustomFunctionPane() {

    const {canvases, setCanvases} = useContext(AppContext)
    console.log(canvases)
    let canvas = canvases.filter((canvase) => {
        return canvase.parent == null
    })[0]
    return (
        <div className={'column var custom'}>
            <h4 className='headi'>Functions</h4>
            {canvas&&canvas.functions.map((f) => {
                return (<BlockButton type={{
                    name:'functionInstance',
                    inputs:f.data.inputs,
                    obj:f.data
                }} />)
            })
            }
        </div>

    )
}

export default CustomFunctionPane