import { useEffect, useRef, useState, useContext } from 'react'
import _ from 'lodash'
import './styles/JointCanvas.css'
// import "./libs/joint.js";
import { dia, ui, shapes, elementTools } from 'jointjs';
import buildBlock from '../JointFuncs/BlockBuilder'
import toolApply from '../JointFuncs/toolApply';

import { AppContext } from '../App.js'
function JointCanvas({ id, graph, changes }) {
    // console.log('JointCanvas')

    const { canvases, setCanvases } = useContext(AppContext)
    const { varCounter, setVarCounter } = useContext(AppContext)
    const { highlight, setHighlight } = useContext(AppContext)

    const htmlRoot = useRef(null)

    useEffect(() => {
        if (!changes) {
            let isChild = canvases.filter(v => {
                return v.id == id
            })[0].parentCanvas

            if (isChild) {
                let inheritedVariables = inheritVariables()
                console.log(inheritedVariables)
                concatVariables(inheritedVariables)
            }
        }

    }, [changes]);

    useEffect(() => {
        renderPaper()
    }, []);

    function inheritVariables() {
        let parentId = canvases.filter(v => {
            return v.id == id
        })[0].parentCanvas

        let temp = canvases.filter(v => {
            return v.id == parentId
        })
        let variables = temp[0].variables
        return variables

    }

    function concatVariables(variables) {
        setCanvases(state => {
            let temp = [...state]

            temp = temp.map((v) => {
                if (v.hide == false) {
                    let a = [...v.variables]
                    variables.forEach((v) => {
                        if (!a.includes(v)) {
                            a.push(v)
                        }
                    })
                    return {
                        ...v,
                        variables: a
                    }
                } else {
                    return {
                        ...v
                    }
                }

            })
            return temp
        })
    }

    function renderPaper() {
        // console.log(htmlRoot.current.parentNode.clientWidth)
        var paper = new dia.Paper({
            el: htmlRoot.current,
            model: graph,
            width: 900,
            height: 500,
            gridSize: 1,
            cellViewNamespace: shapes,
            background: { color: '#ffffff' },
            defaultLink: new shapes.standard.Link(),
            markAvailable: true,
            validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                // Prevent linking from input ports
                if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
                
                // Prevent linking from output ports to input ports within one element
                if (cellViewS === cellViewT) return false;
                // Prevent linking to output ports
                return magnetT && magnetT.getAttribute('port-group') === 'in';
            },
            validateMagnet: function (cellView, magnet) {
                // Prevent links from ports that already have a link
                var port = magnet.getAttribute('port');
                var links = graph.getConnectedLinks(cellView.model, { outbound: true });
                var portLinks = _.filter(links, function (o) {
                    return o.get('source').port == port;
                });
                if (portLinks.length > 0) return false;

                // Note that this is the default behaviour. It is shown for reference purposes.
                // Disable linking interaction for magnets marked as passive
                return magnet.getAttribute('magnet') !== 'passive';
            },
            elementView: dia.ElementView.extend({
                pointerdblclick: function (evt, x, y) {
                    // this.model.remove();
                }
            }),
            // elementView: dia.ElementView.extend({
            //     pointerclick: function(evt, x, y) {
            //         console.log(this.model)
            //         // this.model.hideTool();
            //     }
            // }),
            linkView: dia.LinkView.extend({
                pointerdblclick: function (evt, x, y) {
                    this.model.remove();
                }
            })
        });

        if(graph.attributes.cells.models.length == 0) {
            let startBlock = buildBlock({ name: 'start' }, setVarCounter, varCounter)
            startBlock.position(10, 10);
            startBlock.addTo(graph)
    
            let endBlock = buildBlock({ name: 'end' }, setVarCounter, varCounter)
            endBlock.position(paper.options.width - endBlock.attributes.size.width - 10, paper.options.height - endBlock.attributes.size.height - 10);
            endBlock.addTo(graph)
        }


        paper.on('element:pointerclick', function (elementView) {

            var currentElement = elementView.model;

            paper.findViewsInArea(paper.getArea()).forEach(cell => {
                cell.unhighlight();
            });
            setHighlight(null)
            elementView.highlight();
            setHighlight(state => {
                return currentElement

            })
        });

        paper.on('blank:pointerdown', (evt, x, y) => {
            paper.findViewsInArea(paper.getArea()).forEach(cell => {
                cell.unhighlight();
            });
            setHighlight(null)
        });

        setCanvases((state) => {
            let temp = [...state]
            temp = temp.map((v) => {
                if (v.id == id) {
                    return {
                        ...v,
                        paper
                    }
                } else {
                    return {
                        ...v
                    }
                }

            })
            return temp
        })
        setCanvases((state) => {
            let temp = [...state]
            toolApply(state,setCanvases)
            return temp
        })
        
    }

    return (
        <>
            <div className='can'>
                <div ref={htmlRoot}></div>
            </div>
        </>
    )
}

export default JointCanvas