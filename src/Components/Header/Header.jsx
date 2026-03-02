import './Header.css'

const Header = ({ titlePath }) => {
  return (
    <header>
      <div className='contuner'>
        <h3>{titlePath}</h3>
        <div className='information'>
          <div className='box'>
            <img
              src={`${import.meta.env.BASE_URL}assets/img/women.png`}
              alt="User"
            />
          </div>
          <div className='textPerson'>
            <h6>Moni Roy</h6>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
