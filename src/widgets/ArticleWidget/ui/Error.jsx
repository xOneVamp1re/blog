import { useEffect } from 'react'

import { useModal } from '@shared/hooks/useModal'
import { Modal } from '@shared/ui/modal/Modal'

export const Error = () => {
  const { isVisible, show, hide, modalRef } = useModal(true)
  useEffect(() => {
    show()
  }, [])

  return (
    <Modal
      title="Error"
      onOk={() => {
        hide()
      }}
      isVisible={isVisible}
      onCancel={hide}
      modalRef={modalRef}
      customClassName="error">
      <>
        <p>There was a problem connecting to the server.</p>
        <p>Please check your internet connection and try again.</p>
        <p>If the problem persists, contact support for assistance.</p>
      </>
    </Modal>
  )
}
