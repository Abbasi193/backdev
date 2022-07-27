
const functionCallCode = ({ identifier, reference, params }) => {
    let res = ''

    if (reference) {
        res += `${reference}.`
    }

    let paramsString = ''
    for (let i = 0; i < params?.length; i++) {
        paramsString += `${params[i]}`
        paramsString += (i != params.length - 1) ? ',' : ''
    }

    res += `${identifier}(${paramsString})`

    return res
}

export default functionCallCode