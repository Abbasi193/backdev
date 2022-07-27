
import {  shapes } from 'jointjs';
function shaper(input,output,color,name,w=60,h=60,inputs,outputs) {

    var portsIn = {
        position: {
            name: 'left'
        },
        attrs: {
            portBody: { 
                magnet: 'passive',
                r: 8,
                fill: '#023047',
                stroke: '#023047'
            }
        },
        label: {
            position: {
                name: 'left',
                args: { y: 6 } 
            },
            markup: [{
                tagName: 'text',
                selector: 'label',
                className: 'label-text'
            }]
        },
        markup: [{
            tagName: 'circle',
            selector: 'portBody'
        }]
    };
    
    var portsOut = {
        position: {
            name: 'right'
        },
        attrs: {
            portBody: {
                magnet: true,
                r: 8,
                fill: '#E6A502',
                stroke:'#023047'
            }
        },
        label: {
            position: {
                name: 'right',
                args: { y: 6 }
            },
            markup: [{
                tagName: 'text',
                selector: 'label',
                className: 'label-text'
            }]
        },
        markup: [{
            tagName: 'circle',
            selector: 'portBody'
        }]
    };
    
    var model = new shapes.standard.Rectangle({
        position: { x: 275, y: 50 },
        size: { width: w, height: h },
        attrs: {
            body: {
                fill: color,
            },
            label: { 
                text: name,
                fontSize: 16,
                y: -10
            }
        },
        ports: {
            groups: {
                'in': portsIn,
                'out': portsOut
            }
        }
    });
    const portArray = []
    for (let i = 0; i < input; i++) {
        if(inputs) {
            portArray.push({ 
                group: 'in',
                attrs: { label: { text: i == 0?'prv':inputs[i - 1] }},
                no:i
            })
        } else {
            portArray.push({ 
                group: 'in',
                attrs: { label: { text: i == 0?'prv':`in${i}` }},
                no:i
            })
        }
    }
    for (let i = 0; i < output; i++) {
        if(outputs) {
            portArray.push({ 
                group: 'out',
                attrs: { label: { text: i == 0?'nxt':outputs[i - 1] }},
                no:i
            })
        } else {
            portArray.push({ 
                group: 'out',
                attrs: { label: { text: i == 0?'nxt':`out${i}` }},
                no:i
            })
        }
    }
    
    model.addPorts(portArray);
    return model

}


export default shaper