import axios from "axios";
import { dia, ui, shapes, elementTools } from 'jointjs';
import getTools from './getTools'
import getGraph from './getGraph'

function getState(setCanvases,setCode) {

    let graph = getGraph(setCanvases)


    axios.get(`http://localhost:5000/getstate`).then((response) => {
        let state = response.data
        console.log(state)
        state = state.map((v) => {
            let graph = getGraph(setCanvases)
            return {
                ...v,
                hide: false,
                graph: graph.fromJSON(v.graph)
            }
        })
        setCanvases(state)
        setCanvases((state => {
            state = state.map((v) => {
                if (v.parent == null) {
                    return v
                } else {
                    return {
                        ...v,
                        hide: true,
                    }
                }
            })
            return state
        }))
    }).catch((err) => {
        setCanvases([{
            id: Date.now(),
            parent: null,
            parentCanvas: null,
            hide: false,
            hideTab: false,
            graph: graph,
            variables: [],
            functions: []
        }])
        // console.log(err)
    });

    axios.get(`http://localhost:5000/getcode`).then((response) => {
        let code = response.data
        console.log(code)
        setCode(code)
        
    }).catch((err) => {
        
        setCode(`console.log('Hello World')`)
        // console.log(err)
    });


}

export default getState