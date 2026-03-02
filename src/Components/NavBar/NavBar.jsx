import { NavLink } from 'react-router-dom'
import './NavBar.css'
const NavBar = ({ title, row, logout, titlespan }) => {
  return (
    <nav>
      <div className='nav'>
        <div className='top-section'>
          <span className='title-box'>
            <h1 className='word1'>{titlespan}</h1>
            <h1 className='word2'>{title}</h1>
          </span>

          <div className='contuner'>
            {row.map((item, index) => (
              <NavLink to={item.link} key={index}>
                <div className='row-border'>
                  <div className='nav-item'>
                    <img src={item.image} alt={item.discraption} />
                    <p>{item.discraption}</p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <button className='logout' onClick={logout}>
          <img src='/assets/img/logout.jpg' alt='' />
          Logout
        </button>
      </div>
    </nav>
  )
}
export default NavBar

