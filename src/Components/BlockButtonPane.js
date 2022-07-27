import types from '../JointFuncs/types.js'
import './styles/BlockButtonPane.css'
import BlockButton from './BlockButton'

function BlockButtonPane() {

    return (
       
        <div className={'columnLeft blockButtonPane'}>
         <h4 className='headi'>JavaScript Statements</h4>
            {types.map((type,i) => {
                return (<BlockButton type={type} key={i} />)
            })
            }
        
        </div>

    )
}

export default BlockButtonPane