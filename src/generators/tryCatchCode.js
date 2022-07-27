import {graphToCode} from '../JointFuncs/CodeGenerator'

const tryCode = ({  childern }) => {
    
    let res = `try {\n${graphToCode(childern)}}`;
   
    return res
}
const catchCode = ({ exception, childern }) => {
    
    let res = `catch (${exception}) {\n${graphToCode(childern)}}`;
   
    return res
}
const finallyCode = ({  childern }) => {
    
    let res = `finally {\n${graphToCode(childern)}}`;
   
    return res
}

export {tryCode,catchCode,finallyCode};
