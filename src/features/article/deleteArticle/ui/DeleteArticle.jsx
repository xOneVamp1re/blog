import { useParams, useNavigate } from 'react-router'
import { useRef } from 'react'

import { ModifyButton } from '@shared/ui/button/ModifyButton'
import { useModal } from '@shared/hooks/useModal'
import { usePosition } from '@shared/hooks/usePosition'
import { PopupPortal } from '@shared/ui/popup'

import { useDeleteArticleMutation } from '../api/deleteArticleApi'

export const DeleteArticle = () => {
  const { slug } = useParams()
  const [deleteArticle] = useDeleteArticleMutation()
  const navigate = useNavigate()
  const { isVisible, show, hide, modalRef, buttonRef } = useModal()
  const triggerRef = useRef(null)
  const position = usePosition(triggerRef, { left: 84, top: 37 })
  const handleClick = () => {
    isVisible ? hide() : show()
  }

  const handleDelete = () => {
    deleteArticle(slug)
    navigate('/', { replace: true })
    hide()
  }
  return (
    <>
      <div ref={triggerRef}>
        <ModifyButton action="delete-article" buttonRef={buttonRef} buttonText="Delete" cb={handleClick} />
      </div>
      <PopupPortal isVisible={isVisible} modalRef={modalRef} onCancel={hide} onOk={handleDelete} position={position}>
        <p>Are you sure to delete this article?</p>
      </PopupPortal>
    </>
  )
}
