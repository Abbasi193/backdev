const arrayCode = ({ name, datatype, data }) => {
    
    var res = `${datatype} ${name} = [`;

    for (let i = 0; i < data.length; i++){
        if(i == data.length-1){
            res += `"${data[i]}"]`;
        }
        else{
            res += `"${data[i]}", `
        }
    }
    return res
}
export default arrayCode