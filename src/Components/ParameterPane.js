import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App.js'
import BlockButton from './BlockButton'


import VariableParameters from '../JointFuncs/VariableParameters'

function ParameterPane() {

    const {highlight, setHighlight } = useContext(AppContext)
    // const { variables, setVariables} = useContext(AppContext)
    
    let x
    if(highlight&&highlight.attributes?.data?.inputs) {
        x = <VariableParameters/>
    } else {
        x = ''
    }

    return (
        <div className={'column para'}>
            <h4 className='headi'>Parameter</h4>
            {x}
        </div>

    )
}

export default ParameterPane