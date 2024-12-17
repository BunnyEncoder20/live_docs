import React from 'react'


// components imports 
import { Editor } from '@/components/editor/Editor'


// current Page 📄
const Document = ({ params: { id }}: { params: { id: string }}) => {
  return (
    <div>
      <Editor />
    </div>
  )
}

export default Document