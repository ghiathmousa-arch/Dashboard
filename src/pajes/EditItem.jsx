import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import './EditItem.css'

const EditItem = () => {
  const [data, setData] = useState({
    name: '',
    price: '',
    image: null
  })
  const [currentImage, setCurrentImage] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { id } = useParams()
  const fileInputRef = useRef(null)

  // جيب بيانات المنتج الحالية
  useEffect(() => {
    axios
      .get(`https://vica.website/api/items/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: localStorage.getItem('token')
        }
      })
      .then((res) => {
        setData({
          name: res.data.name,
          price: res.data.price,
          image: null
        })
        setCurrentImage(res.data.image_url)
        setLoading(false)
      })
      .catch((err) => {
        console.error('خطأ في جلب البيانات:', err)
        setLoading(false)
      })
  }, [id])

  // تحديث المنتج
  useEffect(() => {
    // تأكد إنه المستخدم عدّل شي (مش أول render)
    if (data.name && data.price && !loading) {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('price', Number(data.price))
      if (data.image) {
        formData.append('image', data.image)
      }
      formData.append('_method', 'PUT')

      // بس بدنا نبعث لما المستخدم يضغط submit
      // عشان هيك بنحط flag
    }
  }, [data])

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('price', Number(data.price))
    if (data.image) {
      formData.append('image', data.image)
    }
    formData.append('_method', 'PUT')

    axios
      .post(`https://vica.website/api/items/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: localStorage.getItem('token')
        }
      })
      .then((res) => {
        console.log('تم التحديث بنجاح:', res.data)
        navigate('/dashboard/products')
      })
      .catch((err) => {
        console.error('خطأ:', err.response?.data || err.message)
      })
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (e, input) => {
    const value = input.type === 'file' ? e.target.files[0] : e.target.value

    if (input.type === 'file' && e.target.files[0]) {
      setCurrentImage(URL.createObjectURL(e.target.files[0]))
    }

    setData((prev) => ({ ...prev, [input.name]: value }))
  }

  // تعريف الـ inputs كـ array
  const inputs = [
    { type: 'text', placeholder: 'Product Name', name: 'name', label: 'Product Name' },
    { type: 'number', placeholder: 'Price', name: 'price', label: 'Price' },
    { type: 'file', name: 'image', label: 'Product Image' }
  ]

  if (loading) {
    return <div className='loading'>Loading...</div>
  }

  return (
    <div className='edit-product-page'>
      <div className='form-card'>
        <h2 className='form-title'>Edit Product</h2>
        <div className='product-form'>
          {inputs.map((input, index) => {
            // لو الـ input نوعه file، اخفيه واعرض البوكس بدله
            if (input.type === 'file') {
              return (
                <input
                  key={index}
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleInputChange(e, input)}
                  style={{ display: 'none' }}
                />
              )
            }

            return (
              <div className='form-group' key={index}>
                <label htmlFor={input.name}>{input.label}</label>
                <input
                  type={input.type}
                  id={input.name}
                  placeholder={input.placeholder}
                  value={data[input.name] || ''}
                  onChange={(e) => handleInputChange(e, input)}
                  required
                />
              </div>
            )
          })}

          <div className='button-group'>
            <button type='button' className='btn-save' onClick={handleSubmit}>
              Update
            </button>
            <button
              type='button'
              className='btn-cancel'
              onClick={() => navigate('/dashboard/products')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className='img-box' onClick={handleFileClick}>
        {currentImage ? (
          <img src={currentImage} alt='Product' className='preview-img' />
        ) : (
          <img src='/Upload.png' alt='Upload' />
        )}
      </div>
    </div>
  )
}

export default EditItem
