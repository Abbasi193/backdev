import blockTypes from './/BlockTypes.js';
import { dia, elementTools, shapes } from 'jointjs';
import getGraph from '../JointFuncs/getGraph'

function getTools(canvases,setCanvases, type) {
    var boundaryButton = new elementTools.Boundary()
    var removeButton = new elementTools.Remove({
        useModelGeometry: true,
        y: '0%',
        x: '100%',
    });
    var InfoButton = elementTools.Button.extend({
        name: 'info-button',
        options: {
            focusOpacity: 0.5,
            useModelGeometry: true,
            y: '100%',
            x: '100%',
            distance: 180,
            action: function (evt) {
                createNewCanvas(this.model.id,canvases,setCanvases)
                showThisCanvas(this.model.id,setCanvases)

            },
            markup: [{
                tagName: 'circle',
                selector: 'button',
                attributes: {
                    'r': 7,
                    'fill': '#001DFF',
                    'cursor': 'pointer'
                }
            }, {
                tagName: 'path',
                selector: 'icon',
                attributes: {
                    'd': 'M -2 4 2 4 M 0 3 0 0 M -2 -1 1 -1 M -1 -4 1 -4',
                    'fill': 'none',
                    'stroke': '#FFFFFF',
                    'stroke-width': 2,
                    'pointer-events': 'none'
                }
            }]
        }
    });
    var infoButton = new InfoButton();
    var toolsView
    
    if (blockTypes.includes(type.name)) {
        
        toolsView = new dia.ToolsView({
            tools: [
                removeButton,
                infoButton,
                // boundaryButton
            ]
        });
    } else {
        toolsView = new dia.ToolsView({
            tools: [
                removeButton
                // boundaryButton
            ]
        });
    }

    return toolsView
}

function createNewCanvas(id,canvases,setCanvases) {

    setCanvases((state) => {
        let temp = [...state]
        let alreadyPresent = temp.filter(v => {
            return v.parent == id
        })
        if (!alreadyPresent.length) {

            let graph = getGraph(setCanvases)
            let canvas = canvases.filter((canvase) => {
                return canvase.hide == false
            })[0]

            temp.push({ id: Date.now(), parent: id, parentCanvas: canvas.id, hide: true, hideTab: false, graph: graph, variables: [],functions: [] })
        }
        return temp
    })
}
function showThisCanvas(id,setCanvases) {
    setCanvases((state) => {
        let temp = [...state]
        temp = temp.map((v) => {
            if (v.parent == id) {
                return {
                    ...v,
                    hide: false,
                    hideTab: false
                }
            } else {
                return {
                    ...v,
                    hide: true
                }
            }

        })
        return temp
    })
}

export default getTools