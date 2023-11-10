import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import './login.css';
import './util.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  var handleRegistration = async (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      email: email,
      password: password,
      user: 'admin'
    };
    if((username != '') && (email != '') && (password != '')) {
      console.log(userData);
      try {
        await axios.post('http://localhost:5000/register', userData).then((res) => {
          console.log('Response from backend:', res.data);
          navigate('/dashboard');
        });
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  };


  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form validate-form">
            <span className="login100-form-title p-b-43">
              Hi! Sign Up Here
            </span>

            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
              <input className="input100" type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} name="username" />
              <span className="focus-input100"></span>
              <span className="label-input100">Username</span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
              <input className="input100" type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} name="email" />
              <span className="focus-input100"></span>
              <span className="label-input100">Email</span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input className="input100" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} name="pass" />
              <span className="focus-input100"></span>
              <span className="label-input100">Password</span>
            </div>

            <div className="flex-sb-m w-full p-t-3 p-b-32">
              <div className="contact100-form-checkbox">
                <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                <label className="label-checkbox100" htmlFor="ckb1">
                  Remember me
                </label>
              </div>

              <div>
                <a href="#" className="txt1">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="container-login100-form-btn">
              <button onClick={handleRegistration} className="login100-form-btn">
                Sign Up
              </button>
            </div>

            <div className="text-center p-t-46 p-b-20">
              <span className="txt2">
                or continue with
              </span>
            </div>

            <div className="login100-form-social flex-c-m">
              <a href="#" className="login100-form-social-item flex-c-m bg1 m-r-5">
                <i className="fa fa-google" aria-hidden="true"></i>
              </a>

              <a href="#" className="login100-form-social-item flex-c-m bg2 m-r-5">
                <i className="fa fa-facebook-f" aria-hidden="true"></i>
              </a>

              <a href="#" className="login100-form-social-item flex-c-m bg3 m-r-5">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </div>
          </form>

          <div className="login100-more"></div>
        </div>
      </div>
    </div>
  );
}

export default Register;
