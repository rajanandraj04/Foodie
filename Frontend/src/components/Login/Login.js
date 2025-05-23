import { ErrorMessage, Field, Formik, Form } from 'formik'
import React , {useContext} from 'react'
import './Login.css'
import * as yup from 'yup'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
// import '../../../node_modules/react-toastify/dist'

export default function Login() {

    const navigate = useNavigate();
    const {user , login} = useContext(AuthContext);

    const initialValues = {
        Email: '',
        Password: ''
    }

    const validationSchema = yup.object({
        Email: yup.string().required('Required field.').email('Invalid format'),
        Password: yup.string().required('Required field.')
    })

    //...
const onSubmit = async(values) => {
    const { Email, Password } = values;
    const encodedEmail = encodeURIComponent(Email);
    const encodedPassword = encodeURIComponent(Password);

    const response = await fetch(`http://localhost:5049/api/User/GetUser?Email=${encodedEmail}&password=${encodedPassword}`);
    if (response.status === 404) {
        try {
            const data = await response.json();
            // console.log(data);
            toast.error(data.message, {
                autoClose: 2000
            });
        } catch (error) {
            toast.error('You are not an user, Please Register.', {
                autoClose: 2000
            });
        }
    } else {
        const res = await response.json();
        console.log(res);
        // toast.success('Login successful.', {
        //     autoClose: 2000
        // });
        // sessionStorage.setItem('user',res.userId);
        console.log(res);
        sessionStorage.setItem('user', JSON.stringify(res));
        login(res);

        toast.success('Login successful.', {
            autoClose: 1000,
            onClose: () => {
                if(res.role==='delivery')
                    navigate('/partner-with-us/delivery-dashboard');
                else if(res.role==='owner'){
                    navigate('/partner-with-us/restaurant-dashboard');
                }
                else if(res.role==="customer"){
                    navigate('/search');
                }
            }
        });
       
     

        // if(res.role==='delivery')
        //     window.location.href = '/partner-with-us/delivery-dashboard';
        // else if(res.role==='owner'){
        //     navigate('/partner-with-us/restaurant-dashboard');
        // }
        // else if(res.role==="customer"){
        //     navigate('/search');
            
        // }
    }
}    

    return (
        <>
        <div className='login-div'>
            <div className='login-container'>
                <div className='left-box'>
                    <img src='https://i.pinimg.com/originals/f3/63/e9/f363e969faf6cd5fb5848d3b43697870.jpg' alt="loginImage.jpg" ></img>
                </div>
                <div className='right-box'>
                    <h1>Login</h1>
                    <Formik className='formik-container'
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}>
                        <Form className='form-container'>
                            <div className='form-control'>
                                <label htmlFor='Email'>Email:</label>
                                <Field className='form-input-box' type='text' name='Email' />
                                <ErrorMessage component='div' className='form-error' name='Email'></ErrorMessage>
                            </div>

                            <div className='form-control'>
                                <label htmlFor='Password'>Password:</label>
                                <Field className='form-input-box' type='password' name='Password' />
                                <ErrorMessage component='div' className='form-error' name='Password'></ErrorMessage>
                            </div>
                            <button type='submit'>Login</button>
                            <div className='account-creation'>
                                <p>New to Foodie? <span><a href='/signup'>Create account</a></span></p>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
            <ToastContainer />
        </>
    )
}
