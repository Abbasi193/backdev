import {graphToCode} from '../JointFuncs/CodeGenerator'

const routeCode = ({ method, url, childern }) => {
    
    let res = `\napp.${method}('${url}', (req, res) => {\n${graphToCode(childern)}})`;
   
    return res
}

const expressSetupCode = () => {
    
    let res = `const express = require('express');const app = express();const cors = require("cors");app.use(cors());`;
   
    return res
}
const dbSetupCode = () => {
    
    let res = `const mongoose = require('mongoose');`;
   
    return res
}
const createServerCode = ({ port, successMsg }) => {
    
    let res = `\napp.listen(${port}, async () => {console.log('${successMsg}');})`;
   
    return res
}
const connectDBCode = ({ successMsg ,errorMsg }) => {
    
    let res = `\n(async function() {try {
        await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        });
        console.log('${successMsg}');
    } catch (e) {
        console.log('${errorMsg}');
    }})();`


   
    return res
}
export {routeCode,expressSetupCode,createServerCode,dbSetupCode,connectDBCode};


