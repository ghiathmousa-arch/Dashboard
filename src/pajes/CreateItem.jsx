import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './CreateItem.css'

const CreateItem = () => {
  const [data, setData] = useState({})
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (data.name && data.price && data.image) {
      axios
        .post('https://vica.website/api/items', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((res) => {
          console.log('تم الإضافة بنجاح:', res.data)
          setData({})
          navigate('/dashboard')
        })
        .catch((err) => {
          console.error('خطأ:', err.response?.data || err.message)
        })
    }
  }, [data, navigate])

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='add-product-page'>
      <div className='form-card'>
        <h2 className='form-title'>Add Product</h2>
        <form className='product-form'>
          <div className='form-group'>
            <label htmlFor='name'>Product Name</label>
            <input
              type='text'
              id='name'
              placeholder='Product Name'
              onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              id='price'
              placeholder='Price'
              onChange={(e) => setData((prev) => ({ ...prev, price: e.target.value }))}
            />
          </div>

          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={(e) => setData((prev) => ({ ...prev, image: e.target.files[0] }))}
            style={{ display: 'none' }}
          />

          <button
            type='button'
            className='btn-save'
            onClick={() => {
              if (data.name && data.price && data.image) {
                setData({ ...data })
              }
            }}
          >
            Save
          </button>
        </form>
      </div>

      <div className='img-box' onClick={handleFileClick}>
        <img
          src={`${import.meta.env.BASE_URL}assets/img/Upload icon.png`}
          alt='Upload'
        />
      </div>
    </div>
  )
}

export default CreateItem
