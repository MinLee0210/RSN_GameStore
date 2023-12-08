import React from 'react'
import { usePagination, DOTS } from './usePagination'
import './pagination.scss'

function Pagination(props) {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    })

    if(currentPage === 0 || paginationRange.length < 2) {
        return null
    }

    let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <div>Pagination</div>
  )
}

export default Pagination