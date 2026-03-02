import axios from 'axios'
import { useEffect, useState } from 'react'
import './ListItiem.css'
import { useNavigate } from 'react-router-dom'
import DeleteModal from '../Components/DeleteModal/DeleteModal'

const ListItem = () => {
  const [items, setItems] = useState([])
  const [popDelete, setPopDelete] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('https://vica.website/api/items', {
        headers: {
          Accept: 'application/json',
          Authorization: localStorage.getItem('token')
        }
      })
      .then((res) => {
        setItems(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleEdit = (id) => {
    navigate(`/dashboard/products/edit/${id}`)
  }

  const showDeleteModal = (id) => {
    setSelectedItemId(id)
    setPopDelete(true)
  }

  const confirmDelete = () => {
    axios
      .delete(`https://vica.website/api/items/${selectedItemId}`, {
        headers: {
          Accept: 'application/json',
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => {
        setItems(items.filter((item) => item.id !== selectedItemId))
        setPopDelete(false)
        setSelectedItemId(null)
      })
      .catch((err) => {
        console.log(err)
        setPopDelete(false)
      })
  }

  const cancelDelete = () => {
    setPopDelete(false)
    setSelectedItemId(null)
  }

  return (
    <>
      {popDelete && (
        <DeleteModal
          titlePop='Are you sure you want to delete this product?'
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <div className='table-wrapper'>
        <table className='items-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <img src={item.image_url} alt={item.name} className='item-img' />
                </td>
                <td>
                  <div className='action-buttons'>
                    <button
                      className='edit-btn'
                      onClick={() => handleEdit(item.id)}
                      title='Edit'
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}assets/img/pencil-write.png`}
                        alt='Edit'
                      />
                    </button>

                    <button
                      className='delete-btn'
                      onClick={() => showDeleteModal(item.id)}
                      title='Delete'
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}assets/img/bin.png`}
                        alt='Delete'
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ListItem
