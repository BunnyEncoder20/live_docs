import React from 'react'

const Document = ({ params: { id }}: { params: { id: string }}) => {
  return (
    <div>Document: {id}</div>
  )
}

export default Document