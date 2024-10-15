import logo from '../.././assets/img/logo2.svg'
import MainForm from '../../Components/AuthForm/AuthForm'
import './SignIn.css'
import './../SignUp/SignUp.css'
const SignIn = () => {
  return (
    <section className='SignIn'>
      <div className='containerCard'>
        <MainForm
          className='cardSignIn'
          logo={logo}
          title='SIGN IN'
          text='Enter your credentials to access your account'
        />
      </div>
    </section>
  )
}

export default SignIn