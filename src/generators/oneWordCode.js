
const oneWordCode = ({ name }) => {
    let res = ''
    switch (name) {
        case 'continue': res = 'continue;\n'
            break
        case 'break': res = 'break;\n'
            break
        case 'debugger': res = 'debugger;\n'
            break
    }
    return res
}
export default oneWordCode