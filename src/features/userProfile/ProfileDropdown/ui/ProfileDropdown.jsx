import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query'
import { Link } from 'react-router'

import { useOutsideClick } from '@shared/hooks/useOutsideClick'
import { useGetUserQuery, selectApiToken, userAvatarIsLoading } from '@entities/User'

import styles from './dropdown.module.scss'

export const ProfileDropdown = () => {
  const token = useSelector(selectApiToken)
  const { data } = useGetUserQuery(token || skipToken)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  useOutsideClick(dropdownRef, () => {
    setIsOpen(false)
  })
  const test = () => {
    dispatch(userAvatarIsLoading(false))
  }
  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button className={styles.header} onClick={toggleDropdown}>
        <span className={styles.userName}>{data?.username}</span>
        <img
          src={data?.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
          alt="Profile"
          className={styles.profileIcon}
          onLoad={test}
        />
      </button>

      {isOpen && (
        <nav className={styles.dropdownMenu}>
          <Link to="/profile" className={styles.menuItem}>
            View
          </Link>
          <Link to="/editProfile" className={styles.menuItem}>
            Edit
          </Link>
          <Link
            to="https://t.me/xOneVamp1re"
            className={styles.menuItem}
            target="_blank"
            rel="noopener noreferrer external">
            Support
          </Link>
        </nav>
      )}
    </div>
  )
}
