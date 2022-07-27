
import './styles/DefaultFunctionPane.css'
import React from 'react'
import { AppContext } from '../App.js'
import defaultFunctions from '../JointFuncs/defaultFunctions'
import BlockButton from './BlockButton'

function DefaultFunctionPane() {

    return (
        <>
            <div className="Default">
                <h4 className='headi'>Default Function Pane</h4>
                <React.StrictMode>
                    <div>
                        {defaultFunctions.map((defaultFunction, i) => {
                            return (<BlockButton type={defaultFunction} key={i} />)
                        })}
                    </div>
                </React.StrictMode>

            </div>
        </>

    )
}


export default DefaultFunctionPane