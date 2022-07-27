
const twoWordCode = ({ name ,value }) => {
    let res = ''
    switch (name) {
        case 'throw': res = `throw ${value};\n`
            break
        case 'return': res = `return ${value};\n`
            break
        case 'typeof': res = `typeof ${value}`
    }
    return res
}

export default twoWordCode