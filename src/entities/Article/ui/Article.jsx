import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Article.module.scss'

export const Article = ({ preview, ...props }) => {
  const { author = {}, title = '', tagList, updatedAt, body, description } = props || {}

  const transformDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('en-US', options)
  }

  return (
    <article className={styles.article}>
      <Article.Header
        title={title}
        username={author?.username}
        userAvatar={author?.image}
        datatime={transformDate(updatedAt)}
        shortDesc={description}
        tagList={tagList}
        preview={preview}
      />
      {!preview && <Article.Body desc={body} />}
      {!preview && <Article.Footer />}
    </article>
  )
}

Article.Header = function ArticleHeader({
  title,
  tagList = [],
  username,
  userAvatar,
  datatime,
  shortDesc,
  preview,
  className = '',
}) {
  const headerClasses = classNames(styles['article-header'], className, {
    [styles['article-header--preview']]: preview,
  })
  const tagsClasses = classNames(styles['article-tags'], className, {
    [styles['article-tags--preview']]: preview,
  })
  return (
    <div className={headerClasses}>
      <h3 className={styles['article-title']}>{title}</h3>
      <ul className={tagsClasses}>
        {Array.from(tagList).map((el) => (
          <li key={el} className={styles['article-tag']}>
            {el}
          </li>
        ))}
      </ul>
      <div className={styles['article-info']}>
        <span className={styles['article-info-author']}>{username}</span>
        <img className={styles['article-info-author-avatar']} src={userAvatar} alt="" />
        <time className={styles['article-info-datatime']} dateTime="2023-10-01">
          {datatime}
        </time>
      </div>
      <p className={styles['article-short-desc']}>{shortDesc}</p>
    </div>
  )
}
Article.Body = function ArticleBody({ desc, className = '' }) {
  const bodyClasses = classNames(styles['article-body'], className)
  return (
    <div className={bodyClasses}>
      <p className={styles['article-desc']}>{desc}</p>
    </div>
  )
}
Article.Footer = function ArticleFooter({ className = '' }) {
  const footerClasses = classNames(styles.footer, className)
  return <div className={footerClasses}></div>
}

Article.propTypes = {
  preview: PropTypes.bool,
}
Article.Header.propTypes = {
  preview: PropTypes.bool,
  title: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  username: PropTypes.string.isRequired,
  shortDesc: PropTypes.string.isRequired,
  datatime: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  className: PropTypes.string,
}
Article.Body.propTypes = {
  desc: PropTypes.string.isRequired,
  className: PropTypes.string,
}
Article.Footer.propTypes = {
  className: PropTypes.string,
}
