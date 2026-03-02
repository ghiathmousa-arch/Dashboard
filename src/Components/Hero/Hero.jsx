import { GoPlus } from 'react-icons/go'
import './Hero.css'
import { useNavigate } from 'react-router-dom'

const Hero = ({ titelHero, textButton, to }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className='contener'>
        <h1>{titelHero}</h1>
        {textButton && to && (
          <button onClick={() => navigate(to)}><GoPlus />{textButton} </button>
        )}
      </div>
    </>
  )
}

export default Hero
