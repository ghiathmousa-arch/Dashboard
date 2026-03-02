import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import NavBar from '../Components/NavBar/NavBar'
import '/src/index.css'
import Header from '../Components/Header/Header'
import Hero from '../Components/Hero/Hero'
import { useState } from 'react'
import LogoutModal from '../Components/LogoutModal/LogoutModal'

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [popLogout, setpopLogout] = useState(false)

  const show = () => {
    setpopLogout(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const Navitem = [
    {
      discraption: 'Dashboard',
      image: `${import.meta.env.BASE_URL}assets/img/dash.jpg`,
      link: '/dashboard'
    },
    {
      discraption: 'Products',
      image: `${import.meta.env.BASE_URL}assets/img/product.png`,
      link: '/dashboard/products'
    }
  ]

  const isAddProductPage = location.pathname === '/dashboard/products/add'

  return (
    <div className='layout'>
      <NavBar titlespan='Dash' title='Stack' row={Navitem} logout={show} />

      {popLogout && (
        <LogoutModal
          titlePop='Are you sure you want to Logout?'
          onConfirm={logout}
          onCancel={() => setpopLogout(false)}
        />
      )}

      <div className='content'>
        <Header titlePath={isAddProductPage ? 'Add Product' : 'Products'} />

        {!isAddProductPage && (
          <Hero titelHero='Manage Products' textButton='Add Product' to='products/add' />
        )}

        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
