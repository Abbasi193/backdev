
let constantBlock = {
    name:'constantBlock',
    inputs:[
        'value'
    ]
}
let functionBlock = {
    name:'functionBlock',
    inputs:[
        'parameters' //parameters used inside funtion
    ]
    
}
let declareFunction = {
    name:'declareFunction',
    inputs:[
        'Name',
        'Params'
    ],
    params:[]
}
let declareVariable = {
    name:'declareVariable',
    inputs:[
        'Declare Type',
        'Name',
        'Value'
    ]
}
let ifBlock = {
    name:'if',
    inputs:[
        'Condition' //condition for if 
    ]
}
let elseBlock = {
    name:'else',
    inputs:[]
}
let elseIfBlock = {
    name:'elseIf',
    inputs:[
        'Condition' //condition for if 
    ]
}
let forBlock = {
    name:'for',
    inputs:[
        'Initialization',
        'Condition',
        'Mutation'
    ]
}
let forInBlock = {
    name:'forIn',
    inputs:[]
}
let forOfBlock = {
    name:'forOf',
    inputs:[]
}
let whileBlock = {
    name:'while',
    inputs:[
        'Condition' // value or condition until where the loop should run
    ]
}
let switchBlock = {
    name:'switchBlock',
    inputs:[
        'condition' //condition for if 
    ]
}
let tryBlock = {
    name:'try',
    inputs:[]
}
let catchBlock = {
    name:'catch',
    inputs:['Exception']
}
let finallyBlock = {
    name:'finally',
    inputs:[]
}

let continueBlock = {
    name:'continue',
    inputs:[]
}
let breakBlock = {
    name:'break',
    inputs:[]
}
let debuggerBlock = {
    name:'debugger',
    inputs:[]
}
let throwBlock = {
    name:'throw',
    inputs:['Error']
}
let returnBlock = {
    name:'return',
    inputs:['Response']
}
let typeofBlock = {
    name:'typeof',
    inputs:['Object']
}
let routeBlock = {
    name:'route',
    inputs:[
        'Method',
        'Url'
    ]
}
let expressSetupBlock = {
    name:'expressSetup',
    inputs:[]
}
let createServerBlock = {
    name:'createServer',
    inputs:['Port','Success Msg']
}
let dbSetupBlock = {
    name:'dbSetup',
    inputs:[]
}
let connectDBBlock = {
    name:'connectDB',
    inputs:['Success Msg','Error Msg']
}
let types = [
    declareFunction,
    declareVariable,
    ifBlock,
    elseBlock,
    elseIfBlock,
    forBlock,
    forInBlock,
    forOfBlock,
    whileBlock,
    tryBlock,
    catchBlock,
    finallyBlock,
    continueBlock,
    breakBlock,
    debuggerBlock,
    throwBlock,
    returnBlock,
    typeofBlock,
    routeBlock,
    expressSetupBlock,
    createServerBlock,
    dbSetupBlock,
    connectDBBlock
    // switchBlock,
    // functionBlock,
]


export default types