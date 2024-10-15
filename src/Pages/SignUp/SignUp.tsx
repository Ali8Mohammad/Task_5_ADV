import './SignUp.css'
import logo from '../.././assets/img/logo2.svg'
import AuthForm from '../../Components/AuthForm/AuthForm'

export default function SignUp() {
    return (
        <section className='SignUp'>
            <div className='containerCard'>
                <AuthForm
                    className='cardSignup'
                    logo={logo}
                    title='SIGN UP'
                    text='Fill in the following fields to create an account.'
                />
            </div>
        </section>
    )
}
