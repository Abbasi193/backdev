import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import './Components/styles/App.css'


function Mirror({ codeView, code }) {
  return (codeView) ? (
    <>
      <div className='code'>
        <CodeMirror
          value={code}
          theme={'light'}
          readOnly={true}
          options={{
            theme: 'monokai',
            keyMap: 'sublime',
            mode: 'jsx',
          }}
          style={{
            fontSize:'16px'
          }
          }
        /></div>
    </>
  ) : ''
}

export default Mirror