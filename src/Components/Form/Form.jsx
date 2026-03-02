import { Link } from 'react-router-dom'

const Form = ({ title, inputs, submit, formFooter, setData, discraption, className }) => {
  let data = {}

  const datahandlw = (event) => {
    event.preventDefault()
    setData(data)
  }

  return (
    <form onSubmit={datahandlw} className={className}>
      <div className='text-form'>
        <h1>{title}</h1>
        <p>{discraption}</p>
      </div>
      <div className='input-form'>
        {inputs.map((input, index) => (
          <div className={`field ${input.type === 'file' ? 'file-field' : ''}`} key={index}>
            <label className='label' htmlFor={input.name}>
              {input.label}
            </label>
            <input
              id={input.name}
              type={input.type}
              placeholder={input.placeholder}
              onChange={(event) => {
                data = {
                  ...data,
                  [input.name]: input.type === 'file' ? event.target.files[0] : event.target.value
                }
              }}
            />
          </div>
        ))}
      </div>
      <div className='footer-form'>
        <input type='submit' value={submit} />
        {formFooter ? (
          <p>
            {formFooter?.content} <Link to={formFooter.url}>{formFooter?.LinkContent}</Link>
          </p>
        ) : (
          ''
        )}
      </div>
    </form>
  )
}

export default Form
