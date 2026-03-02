import './DeleteModal.css'

const DeleteModal = ({ titlePop, onConfirm, onCancel }) => {
  return (
    <div className='modal-overlay'>
      <div className='pop'>
        <h3>{titlePop}</h3>
        <div className='btn-pop'>
          <button className='yes' onClick={onConfirm}>
            Yes
          </button>
          <button className='no' onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
