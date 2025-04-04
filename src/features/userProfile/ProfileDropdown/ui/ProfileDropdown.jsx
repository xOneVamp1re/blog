import { useState, useRef } from 'react'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router'

import { useOutsideClick } from '@shared/hooks/useOutsideClick'
import styles from '@features/userProfile/ProfileDropdown/ui/ProfileDropdown.module.scss'

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  useOutsideClick(dropdownRef, () => {
    setIsOpen(false)
  })
  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button className={styles.header} onClick={toggleDropdown}>
        <span className={styles.userName}>John Doe</span>
        <img
          src="https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"
          alt="Profile"
          className={styles.profileIcon}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <Link to="/profile" className={styles.menuItem}>
            View Profile
          </Link>
          <Link to="/settings" className={styles.menuItem}>
            Edit Profile
          </Link>
          <Link to="/settings" className={styles.menuItem}>
            Support
          </Link>
        </div>
      )}
    </div>
  )
}
