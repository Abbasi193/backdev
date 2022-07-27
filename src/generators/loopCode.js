import {graphToCode} from '../JointFuncs/CodeGenerator'

const forCode = ({ initialization, condition,mutation, childern }) => {
    
    let res = `for (${initialization}; ${condition}; ${mutation}) {\n${graphToCode(childern)}}`;
   
    return res
}
const whileCode = ({ condition, childern }) => {
    
    let res = `while (${condition}) {\n${graphToCode(childern)}}`;
   
    return res
}
const forInCode = ({ condition, childern }) => {
    
    let res = `for (${condition}) {\n${graphToCode(childern)}}`;
   
    return res
}
const forOfCode = ({ condition, childern }) => {
    
    let res = `for (${condition}) {\n${graphToCode(childern)}}`;
   
    return res
}

export {forCode,forInCode,forOfCode,whileCode};
