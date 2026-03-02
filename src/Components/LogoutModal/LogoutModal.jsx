import './LogoutModal.css'

const LogoutModal = ({ titlePop, onConfirm, onCancel }) => {
  return (
    <>
      <div className='modal-overlay'>
        <div className='pop'>
          <h3>{titlePop}</h3>
          <div className='btn-pop'>
            <button className='yes' onClick={onConfirm}>
              yes
            </button>
            <button className='no' onClick={onCancel}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogoutModal
