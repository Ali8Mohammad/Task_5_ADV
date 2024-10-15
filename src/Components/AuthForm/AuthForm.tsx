import { useLocation } from 'react-router-dom';
import FormLogin from '../FormLogin/FormLogin';
import FormSignUp from '../FormSignUp/FormSignUp';
import QuestionAuth from '../QuestionAuth/QuestionAuth';
import './AuthForm.css';

interface Content {
  logo: string;
  title: string;
  text: string;
  className?: string;
  classNameLogo?: string;
  classNameText?: string;
}

export default function AuthForm({ logo, title, text, className, classNameLogo, classNameText }: Content) {
  const location = useLocation();

  const renderAuthForm = () => {
    if (location.pathname === '/signup') {
      return (
        <>
          <FormSignUp />
          <QuestionAuth para='Do you have an account?' link='/' textLink='Sign in' />
        </>
      );
    } else {
      return (
        <>
          <FormLogin />
          <QuestionAuth para="Don’t have an account?" link='/signup' textLink='Create one' />
        </>
      );
    }
  };

  return (
    <div className={` ${className}`}>
      <img className={`logoSignUp ${classNameLogo}`} src={logo} alt="logo" />
      <h1 className='SignUpTitle'>{title}</h1>
      <p className={`parSignUp ${classNameText}`}>{text}</p>
      {renderAuthForm()}
    </div>
  );
}
