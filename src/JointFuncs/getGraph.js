import { dia, elementTools, shapes } from 'jointjs';

function getGraph(setCanvases) {
    let graph = new dia.Graph({}, { cellNamespace: shapes })
    graph.on('remove', function (cell) {

        setCanvases(state => {
            let temp = [...state]

            temp = temp.map((v) => {
                if (v.hide == false) {
                    let a = [...v.variables]
                    a = a.filter(v => {
                        return v.id != cell.id
                    })
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
    });
    return graph
}

export default getGraph