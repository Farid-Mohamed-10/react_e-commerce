import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, LOGIN } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import Cookie from 'cookie-universal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

export default function Login() {
  // States
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // Navigate
  const navigate = useNavigate();

  // Error
  const [err, setErr] = useState("");

  // Focus Ref
  const focus = useRef("");

  // Loading
  const [loading, setLoading] = useState(false);

  // Cookies
  const cookie = Cookie();

  // Handle Form Change
  function handleFormChange(e) {
    setForm({...form, [e.target.name]: e.target.value})
  }

  // Handle Focus Ref
  useEffect(() => {
    focus.current.focus();
  }, []);

  // Handle Form Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, form);
      setLoading(false);
      const token = res.data.token;
      const role = res.data.user.role;
      // console.log(role);
      const go = role === '1995' ? 'users' : '/';
      cookie.set('e-commerce', token);
      window.location.pathname = `/dashboard/${go}`;
    }
    catch (error) {
      setLoading(false);
      if (error.response.status === 401) {
        setErr("The email or password is wrong");
      } else {
        setErr("Internal Server Error");
      }
    }
  }


  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="row">
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1 className="mb-4">Login Now</h1>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  ref={focus}
                  type="email"
                  name="email"
                  placeholder="Enter Your Email..."
                  value={form.email}
                  onChange={handleFormChange}
                  required
                />
                <Form.Label>Email: </Form.Label>
              </Form.Group>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter Your Password..."
                  value={form.password}
                  onChange={handleFormChange}
                  required
                  minLength={8}
                />
                <Form.Label>Password: </Form.Label>
              </Form.Group>
            </div>
            <button className="button button-primary">Login</button>
              
            <div className="google-btn">
              <a href={`http://127.0.0.1:8000/login-google`}>
                <div className="google-icon-wrapper">
                  
                </div>
                <p className="btn-text">
                  <b>Sign in with google</b>
                </p>
              </a>
            </div>
            {err !== "" && <span className="error">{err}</span>}
          </Form>
        </div>
      </div>
    </>
  );
}