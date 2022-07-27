import axios from "axios";
function saveState(state) {
    
    state = state.map((v) => {
        return {...v,
                graph:v.graph.toJSON(),
                paper:null
        }
    })
    
    state = JSON.stringify(state)
    
    
    axios.post(`http://localhost:5000/savestate`, {state}).then((response) => {
        // console.log(response)
    });
}

export default saveState