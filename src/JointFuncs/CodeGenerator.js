import functionCallCode from '../generators/functionCallCode'
import { ifCode, elseIfCode, elseCode } from '../generators/controlCode'
import { forCode, forInCode, forOfCode, whileCode } from '../generators/loopCode'
import oneWordCode from '../generators/oneWordCode'
import twoWordCode from '../generators/twoWordCode'
import variableCode from '../generators/variableCode'
import functionBodyCode from '../generators/functionBodyCode'
import { tryCode, catchCode, finallyCode } from '../generators/tryCatchCode'
import {routeCode,expressSetupCode,createServerCode,dbSetupCode,connectDBCode} from '../generators/snippets'
import blockTypes from './BlockTypes'
import beautify from 'js-beautify';
import axios from 'axios'


let CANVASES
function testCode(canvases,setCode) {
    CANVASES = canvases
    let graph = CANVASES.filter((val) => {
        return val.parent === null
    })[0].graph
    // console.log(graph)
    let code = graphToCode(graph)
    console.log(code)
    setCode(code)
    saveCode(code)
}

function graphToCode(graph) {
    if (graph == null) return ''
    let connections = getConnections(graph)
    let code = generateCode(connections)
    code = beautify.js(code)
    return code
}

function saveCode(code) {
    axios.post(`http://localhost:5000/savecode`, { code }).then((response) => {
        // console.log(response)
    });
}

function getChild(id) {
    let child = CANVASES.filter(v => {
        return v.parent === id
    })[0]?.graph
    return child
}

function getConnections(graph) {

    let connections = []
    let elements = graph.attributes.cells.models
    
    let newElements = [...elements]
    // printList(newElements)
    for (let i = 0; i < elements.length; i++) {
        let v = newElements[i]
        if (v.attributes.type === 'standard.Rectangle') {
            // console.log(v.attributes.data.name)
            let element = graph.getSuccessors(v)
            element = element.filter(e => {
                return graph.isNeighbor(v, e)
            })[0]
            let obj

            if (element) {
                if (v.attributes.data.name == 'variableInstance') {
                    let port = getPort(graph, element, v)
                    if (port != 0) {
                        continue
                    }
                }

                obj = {
                    element: element.attributes.data,
                    id: element.id
                }
                if (element?.attributes.data.type === 'function') {
                    let predecessors = graph.getPredecessors(element)

                    predecessors = predecessors.filter(v => {
                        return graph.isNeighbor(element, v)
                    })

                    predecessors = predecessors.sort((a, b) => {
                        let c = getPort(graph, element, a)
                        let d = getPort(graph, element, b)
                        return c - d
                    });
                    predecessors = predecessors.filter(v => {
                        return getPort(graph, element, v) != 0
                    })
                    predecessors = predecessors.map(v => {
                        return v.attributes.data
                    })
                    predecessors = predecessors.filter(v => {
                        return v.name === 'variableInstance'
                    })

                    let successors = graph.getSuccessors(element)

                    successors = successors.filter(v => {
                        return graph.isNeighbor(element, v)
                    })
                    successors = successors.filter(v => {
                        return getPortSuccessor(graph, element, v) != 0
                    })

                    successors = successors.map(v => {
                        return v.attributes.data
                    })
                    successors = successors.filter(v => {
                        return v.name === 'variableInstance'
                    })

                    obj = { ...obj, predecessors, successors }
                    // console.log(obj)
                }
                console.log(element.attributes.data.name, ' pushed by ', v.attributes.data.name)
                newElements = prioritize(newElements,i,element)
                connections.push(obj)

            }

        }

    }
    // printList(newElements)
    connections = connections.filter(v => {
        return v.element.name !== 'end'
    })
    // connections = connections.slice(0, connections.length - 1);
    console.log(connections)
    return connections
    // console.log(temp[0].graph.attributes.cells.models)
    // console.log(temp[0].graph) 
}

function printList(elements) {
    console.log('\n')
    elements.forEach(v => {

        if (v.attributes.type === 'standard.Rectangle') {
            console.log(v.attributes.data.name)
        }
    })
    console.log('\n')
}

function prioritize(elements,currentIndex,element) {
    // printList(elements)
    let prev = elements.slice(0,currentIndex+1)
    let temp = elements.slice(currentIndex + 1);
    temp = temp.filter(v=>{
        return v!=element
    })
    temp.unshift(element)
    temp = prev.concat(temp)
    // printList(temp)
    return temp
}

//get element port connected with predecessor
function getPort(G, element, predecessor) {

    let IN = Object.keys(G._in[`${element.id}`]);
    let OUT = Object.keys(G._out[`${predecessor.id}`]);
    let common = IN.filter(value => OUT.includes(value))[0]
    let LINK = G.attributes.cells._byId[`${common}`];
    let port = LINK.attributes.target.port
    let portObj = element.attributes.ports.items.filter(v => v.id == port)[0].no
    return portObj
}
//get element port connected with successor
function getPortSuccessor(G, element, successors) {

    let IN = Object.keys(G._in[`${successors.id}`]);
    let OUT = Object.keys(G._out[`${element.id}`]);
    let common = IN.filter(value => OUT.includes(value))[0]
    let LINK = G.attributes.cells._byId[`${common}`];
    let port = LINK.attributes.source.port
    let portObj = element.attributes.ports.items.filter(v => v.id == port)[0].no
    return portObj
}

function generateCode(connections) {
    let code = []
    let nodes = connections

    nodes.forEach((node) => {
        let element = node.element
        let childern

        if (blockTypes.includes(element.name)) {
            childern = getChild(node.id)
        }
        switch (element.name) {
            case 'declareVariable': {
                let type = element.inputs[0]
                let identifier = element.inputs[1]
                let value = element.inputs[2]
                code.push(variableCode({ type, identifier, value, declare: true }))
                break;
            }
            case 'declareFunction': {
                let identifier = element.inputs[0]
                let params = element.inputs[1].split(',')
                code.push(functionBodyCode({ identifier, params,childern }))
                break;
            }
            case 'variableInstance': {
                let identifier = element.inputs[1]
                let value = element.inputs[2]
                code.push(variableCode({ identifier, value }))
                break;
            }
            case 'if': {
                let condition = element.inputs[0]
                code.push(ifCode({ condition, childern }))
                break;
            }
            case 'else': {
                code.push(elseCode({ childern }))
                break;
            }
            case 'elseIf': {
                let condition = element.inputs[0]
                code.push(elseIfCode({ condition, childern }))
                break;
            }
            case 'for': {
                let initialization = element.inputs[0]
                let condition = element.inputs[1]
                let mutation = element.inputs[2]
                code.push(forCode({ initialization, condition, mutation, childern }))
                break;
            }
            case 'while': {
                let condition = element.inputs[0]
                code.push(whileCode({ condition, childern }))
                break;
            }
            case 'try': {
                code.push(tryCode({ childern }))
                break;
            }
            case 'catch': {
                let exception = element.inputs[0]
                code.push(catchCode({ exception, childern }))
                break;
            }
            case 'finally': {
                code.push(finallyCode({ childern }))
                break;
            }
            case 'continue': {
                let name = element.name
                code.push(oneWordCode({ name }))
                break;
            }
            case 'break': {
                let name = element.name
                code.push(oneWordCode({ name }))
                break;
            }
            case 'debugger': {
                let name = element.name
                code.push(oneWordCode({ name }))
                break;
            }
            case 'throw': {
                let name = element.name
                let value = element.inputs[0]
                code.push(twoWordCode({ name, value }))
                break;
            }
            case 'return': {
                let name = element.name
                let value = element.inputs[0]
                code.push(twoWordCode({ name, value }))
                break;
            }
            case 'typeof': {
                let name = element.name
                let value = element.inputs[0]
                code.push(twoWordCode({ name, value }))
                break;
            }
            case 'route': {
                let method = element.inputs[0]
                let url = element.inputs[1]
                code.push(routeCode({ method, url, childern }))
                break;
            }
            case 'expressSetup': {
                code.push(expressSetupCode())
                break;
            }
            case 'createServer': {
                let port = element.inputs[0]
                let successMsg = element.inputs[1]
                code.push(createServerCode({ port, successMsg }))
                break;
            }
            case 'dbSetup': {
                code.push(dbSetupCode())
                break;
            }
            case 'connectDB': {
                let successMsg = element.inputs[0]
                let errorMsg = element.inputs[1]
                code.push(connectDBCode({ successMsg ,errorMsg}))
                break;
            }
            default: {
                switch (element.type) {

                    case 'function': {
                        let identifier = element.code;
                        let params = []
                        node.predecessors.forEach(v => {
                            params.push(v.inputs[1])
                        })

                        if (node.successors.length > 0) {
                            code.push(variableCode({
                                identifier: node.successors[0].inputs[1],
                                value: functionCallCode({ identifier, params })
                            }))
                        } else {
                            code.push(functionCallCode({ identifier, params }))
                        }

                        break;
                    }
                    default: {
                        break;
                    }
                }

            }

        }
    })
    return code.join('\n')
}

export default testCode
export { graphToCode }