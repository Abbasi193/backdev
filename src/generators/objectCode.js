const arrayCode = ({ name, datatype, keys, values }) => {
    
    var res = `${datatype} ${name} = {`;

    for (let i = 0; i < keys.length; i++){
        if(i == keys.length-1){
            res += `${keys[i]}:"${values[i]}"}`;
        }
        else{
            res += `${keys[i]}:"${values[i]}", `;
        }
    }
    return res
}
export default arrayCode