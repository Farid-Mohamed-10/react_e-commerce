import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, REGISTER } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import Cookie from 'cookie-universal';
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  // States
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Navigate
  const navigate = useNavigate();

  // Error
  const [err, setErr] = useState(""); // To Check If The Email Is Already Been Taken

  // Focus Ref
  const focus = useRef("");

  // Loading
  const [loading, setLoading] = useState(false);

  // Cookies
  const cookie = Cookie(); // To Store The Token On It 

  // Handle Form Change
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      const res = await axios.post(`${baseURL}/${REGISTER}`, form); // To Send User Data To The Database
      setLoading(false);
      const token = res.data.token;
      cookie.set('e-commerce', token);
      navigate("/dashboard/users", {replace: true});
    }
    catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response.status === 422) {
        setErr("Email is already been taken");
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
              <h1 className="mb-3">Register Now</h1>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  ref={focus}
                  type="text"
                  name="name"
                  placeholder="Enter Your Name..."
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
                <Form.Label>Name: </Form.Label>
              </Form.Group>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
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
                controlId="exampleForm.ControlInput3"
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
            <button className="button button-primary">Register</button>
            
            <div className="google-btn mt-3">
              <a href={`http://127.0.0.1:8000/login-google`}>
                <div className="google-icon-wrapper">
                  
                </div>
                <p className="btn-text">
                  <b>Sign up with google</b>
                </p>
              </a>
            </div>
            {err !== "" && <span className="error">{err}</span>}

            <p className="mt-3">Already You Have An Account? <Link to="/login" className="text-black" style={{textDecoration: 'underline'}}>Login Now</Link></p>
          </Form>
        </div>
      </div>
    </>
  );
}