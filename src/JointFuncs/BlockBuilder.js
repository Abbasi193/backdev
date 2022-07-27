import shaper from './Shaper'
import defaultFunctions from './defaultFunctions'
import types from './types'
function buildBlock(type, setVarCounter, varCounter) {
    let temp = defaultFunctions.map(v => v.name)
    let element
    console.log(type)
    if (temp.includes(type.name)) {
        return buildDefaultFunctionBlock(type)
    } else {
        return buildJsStatementBlock(type, setVarCounter, varCounter)
    }

}
function buildDefaultFunctionBlock(type) {
    let element = shaper(1 + type.inputs.length, 1 + type.output.length, '#13ebff', type.name.toUpperCase(), 150, type.inputs.length != 0 ? type.inputs.length * 50 : 50, type.inputs, type.output)
    element.prop({ data: { name: type.name, inputs: type.inputs, type: 'function', code: type.code } })
    return element
}

function buildJsStatementBlock(type, setVarCounter, varCounter) {
    let element
    switch (type.name) {
        case 'declareVariable':
            element = shaper(1, 1, '#e3eaa7', `\nDeclare\nvar_${varCounter}`, 80, 50)
            element.prop({ data: { name: type.name, inputs: ['let', `var_${varCounter}`, '0'], type: 'variable' } })
            setVarCounter(val => val + 1)
            return element
        case 'declareFunction':
            element = shaper(1, 1, '#e3eaa7', `\nDeclare\nfunc_${varCounter}`, 80, 50)
            element.prop({ data: { name: type.name, inputs: [`func_${varCounter}`,''],params:[] } })
            setVarCounter(val => val + 1)
            return element
        case 'variableInstance':
            element = shaper(1, 1, '#13af7b', type.obj.inputs[1], 80, 50)
            element.prop({ data: { name: type.name, inputs: [type.obj.inputs[0], type.obj.inputs[1], type.obj.inputs[2]], type: 'variable' } })
            return element
        case 'functionInstance':
            let params = type.inputs[1].split(',')
            params = params[0]==''?[]:params
            element = buildDefaultFunctionBlock({
                name:type.inputs[0],
                inputs:params,
                output:['output'],
                code:type.inputs[0]
            })   
            return element
        case 'if':
            element = shaper(1, 1, '#13ebff', 'IF', 80, 50)
            element.prop({ data: { name: type.name, inputs: ['true'] } })
            return element
        case 'else':
            element = shaper(1, 1, '#ffeaa7', 'ELSE', 80, 50)
            element.prop({ data: { name: type.name, inputs: [] } })
            return element
        case 'elseIf':
            element = shaper(1, 1, '#13ff77', 'ELIF', 80, 50)
            element.prop({ data: { name: type.name, inputs: ['true'] } })
            return element
        case 'for':
            element = shaper(1, 1, '#13ff77', 'FOR', 80, 50)
            element.prop({ data: { name: type.name, inputs: ['i=0', 'i<10', 'i++'] } })
            return element
        case 'forIn':
            element = shaper(1, 1, '#a3ff77', 'FOR IN', 80, 50)
            element.prop({ data: { name: type.name, inputs: [] } })
            return element
        case 'forOf':
            element = shaper(1, 1, '#13ff7a', 'FOR OF', 80, 50)
            element.prop({ data: { name: type.name, inputs: [] } })
            return element
        case 'while':
            element = shaper(1, 1, '#b3af77', 'WHILE', 80, 50)
            element.prop({ data: { name: type.name, inputs: ['true'] } })
            return element
        case 'try':
            element = shaper(1, 1, '#1baf77', 'TRY', 80, 50)
            element.prop({ data: { name: type.name, inputs: [] } })
            return element
        case 'catch':
            element = shaper(1, 1, '#13ab77', 'CATCH', 80, 50)
            element.prop({ data: { name: type.name, inputs: ['exception'] } })
            return element
        case 'finally':
            element = shaper(1, 1, '#13af7b', 'FINALLY', 80, 50)
            element.prop({ data: { name: type.name, inputs: [] } })
            return element
        case 'continue':
            element = shaper(1, 1, '#13ff77', 'CONTINUE', 80, 50)
            element.prop({ data: { name: type.name, inputs: [] } })
            return element
        case 'break':
            element = shaper(1, 1, '#13ff77', 'BREAK', 80, 50)
            element.prop({ data: { name: type.name, inputs: [] } })
            return element
        case 'debugger':
            element = shaper(1, 1, '#13ff77', 'DEBUGGER', 80, 50)
            element.prop({ data: { name: type.name, inputs: [] } })
            return element
        case 'throw':
            element = shaper(1, 1, '#13ff77', 'Throw', 80, 50)
            element.prop({ data: { name: type.name, inputs: ['err'] } })
            return element
        case 'return':
            element = shaper(1, 1, '#13ff77', 'Return', 80, 50)
            element.prop({ data: { name: type.name, inputs: ['res'] } })
            return element
        case 'typeof':
            element = shaper(1, 1, '#13ff77', 'Typeof', 80, 50)
            element.prop({ data: { name: type.name, inputs: ['obj'] } })
            return element
        case 'start':
            element = shaper(0, 1, '#13af7b', 'START', 80, 50)
            element.prop({ data: { name: type.name, inputs: [] } })
            return element
        case 'end':
            element = shaper(1, 0, '#13af7b', 'END', 80, 50)
            element.prop({ data: { name: type.name, inputs: [] } })
            return element
        case 'route':
            element = shaper(1, 1, '#b3af77', 'Route', 80, 50)
            element.prop({ data: { name: type.name, inputs: ['get','/index'] } })
            return element
        case 'expressSetup':
            element = shaper(1, 1, '#b3af77', 'ExpressSetup', 100, 50)
            element.prop({ data: { name: type.name, inputs: [] } })
            return element
        case 'createServer':
            element = shaper(1, 1, '#b3af77', 'CreateServer', 100, 50)
            element.prop({ data: { name: type.name, inputs: ['8000','Server Started'] } })
            return element
        case 'dbSetup':
            element = shaper(1, 1, '#b3af77', 'DBSetup', 100, 50)
            element.prop({ data: { name: type.name, inputs: [] } })
            return element
        case 'connectDB':
            element = shaper(1, 1, '#b3af77', 'ConnectDB', 100, 50)
            element.prop({ data: { name: type.name, inputs: ['DB connected','Connection failed'] } })
            return element
        default:
            return shaper(2, 1, '#dac292', 'block')
    }
}

export default buildBlock