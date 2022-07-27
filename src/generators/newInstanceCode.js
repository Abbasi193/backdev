const newInstanceCode = ({ identifier, reference, params }) => {
    let res = ''
    res += `new `
    let paramsString = ''
    for (let i = 0; i < params?.length; i++) {
        paramsString += `'${params[i]}'`
        paramsString += (i != params.length - 1 ) ? ',' : ''
    }

    res += `${identifier}(${paramsString})\n`
    return res
}
export default newInstanceCode