import React from 'react'

function TagList(props) {
  return (
    <div className="tag-list">
      {
        props.tags.map(tag => (
          <a key={tag} href="/" className="tag-pill tag-default">{tag}</a>
        ))
      }
    </div>
  )
}

export default TagList