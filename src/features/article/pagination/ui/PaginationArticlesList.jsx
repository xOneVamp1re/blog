import PropTypes from 'prop-types'
import { Pagination } from 'antd'

export const PaginationArticlesList = ({ currentPage, totalPages, handlePageChange, pageSize }) => {
  return (
    <Pagination
      total={totalPages}
      defaultCurrent={currentPage}
      hideOnSinglePage={true}
      pageSize={pageSize}
      current={currentPage}
      showSizeChanger={false}
      onChange={handlePageChange}
      showTitle={false}
      style={{
        marginTop: '26px',
      }}
    />
  )
}

PaginationArticlesList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
}
