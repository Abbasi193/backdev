import { windowsStore } from 'process'
import './styles/Top1.css'

function Top1({ setCanv, setNewProject, setCodeView, top, setCanvases, canvases }) {

    function showHome() {
        document.location = '/'
    }
    function showWorkspace() {
        setCanv(true)
        refreshCanvas()
        
        setNewProject(false)
        setCodeView(false)
    }
    function showTools() {
        setCanv(false)
        setNewProject(true)
        setCodeView(false)
    }
    function showCode() {
        setCanv(false)
        setNewProject(false)
        setCodeView(true)
    }
    async function refreshCanvas() {
        let state = [...canvases]
        state = state.map((v) => {

            return {
                ...v,
                hide: false,
            }

        })
        await setCanvases(state)
        
        setCanvases((state => {
            state = state.map((v) => {
                if (v.parent == null) {
                    return v
                } else {
                    return {
                        ...v,
                        hide: true,
                    }
                }
            })
            return state
        }))



    }
    return (top) ? (
        <div className="top1">
            <input className='topButton' type={'button'} onClick={showHome} value={'Home'} />
            <input className='topButton' type={'button'} onClick={showWorkspace} value={'Workspace'} />
            <input className='topButton' type={'button'} onClick={showTools} value={'Tools'} />
            <input className='topButton' type={'button'} onClick={showCode} value={'Code'} />

        </div>

    ) : ''
}

export default Top1