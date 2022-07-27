
const variableCode = ({ type, identifier, value, declare = false }) => {
    let res = ''
    if (declare && value) {
        res += `${type} ${identifier} = ${value};`
    } else if (declare) {
        res += `${type} ${identifier};`
    } else if (value) {
        res += `${identifier} = ${value};`

    }

    return res
}
export default variableCode