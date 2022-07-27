import functionCallCode from './functionCallCode'
import {graphToCode} from '../JointFuncs/CodeGenerator'

const functionBodyCode = ({ identifier, params, childern }) => {

    let res = `function ${functionCallCode({ identifier, params })} {\n${graphToCode(childern)}}`;

    return res
}


export default functionBodyCode;
