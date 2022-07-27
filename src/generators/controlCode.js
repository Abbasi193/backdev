import {graphToCode} from '../JointFuncs/CodeGenerator'
const ifCode = ({ condition, childern }) => {
    
    let res = `if (${condition}) {\n${graphToCode(childern)}}`;
   
    return res
}

const elseCode = ({ childern }) => {
    
    let res = `else {\n${graphToCode(childern)}}`;
   
    return res
}

const elseIfCode = ({ condition, childern }) => {
    
    let res = `else if (${condition}) {\n${graphToCode(childern)}}`;
   
    return res
}

export {ifCode, elseIfCode,elseCode}