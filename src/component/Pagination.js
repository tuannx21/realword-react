import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Pagination = props => {
  const { totalItems } = props
  const location = useSelector(state => state.router.location)

  const ACTIVE_CLASS = 'active'

  const buildPageNumbers = totalItem => {
    let paginList = []
    for (let i = 1; i <= Math.ceil(totalItem / 10); i++) {
      paginList.push(i)
    }
    return paginList
  }

  const isPageActive = pageNumber => parseInt(location.query.offset) / 10 + 1 === pageNumber ? ACTIVE_CLASS : ''

  return (
    <nav>
      <ul className="pagination">
        {
          buildPageNumbers(totalItems).map(page => (
            <li key={page} className={`page-item ${!location.query.offset && page === 1 ? ACTIVE_CLASS : isPageActive(page)}`}>
              <Link to={`${location.pathname}?offset=${(page - 1) * 10}`} className="page-link">{page}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Pagination