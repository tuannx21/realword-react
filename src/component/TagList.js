import React from 'react'
import { Link } from 'react-router-dom'

const TagList = props => {
  const { tags, isOutline, style } = props
  if (!tags) return null

  return (
    <ul className="tag-list" style={style}>
      {
        tags.map(tag => (
          <Link key={tag} to={`/explore/tags/${tag}`} className={`tag-pill tag-default ${isOutline && 'tag-outline'}`}>{tag}</Link>
        ))
      }
    </ul>
  )
}

export default TagList