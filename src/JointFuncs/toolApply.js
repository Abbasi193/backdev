import getTools from "./getTools"

function toolApply(state, setCanvases) {

    state.forEach((v) => {
        let graph = v.graph
        let paper = v.paper
        graph.getElements().forEach((e) => {
            let type = e.attributes.data
            if (type.name != 'start' && type.name != 'end') {
                let toolsView = getTools(state, setCanvases, type)
                if (paper) {
                    var elementView = e.findView(paper);
                    elementView.addTools(toolsView);
                }
            }


        })
    })
    return state
}

export default toolApply