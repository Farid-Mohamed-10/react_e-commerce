import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../../Api/axios';
import { USER } from '../../../Api/Api';
import Loading from '../../../Components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import './AddUser.css';

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // Focus Ref
  const focus = useRef("");

  // Handle Focus Ref
  useEffect(() => {
    focus.current.focus();
  }, []);

  // Handle Submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      nav("/dashboard/users");
    }
    catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className='container'>
        <div className='row'>
          <Form className='bg-white parent p-3 w-100 form' onSubmit={handleSubmit}>
            <div className='custom-form'>
              <h1 className='mb-3'>Add User</h1>
              <Form.Group className="mb-4 form-custom" controlId="exampleForm.ControlInput1">
                <Form.Control
                  ref={focus}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  type="text"
                  placeholder="Name..."
                />
                <Form.Label>User Name</Form.Label>
              </Form.Group>
              <Form.Group className="mb-4 form-custom" controlId="exampleForm.ControlInput2">
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  placeholder="name@example.com"
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>
              <Form.Group className="mb-4 form-custom" controlId="exampleForm.ControlInput3">
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  placeholder="Password..."
                />
                <Form.Label>Password</Form.Label>
              </Form.Group>
              <Form.Group className="mb-4 form-custom" controlId="exampleForm.ControlInput4">
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option disabled value={""}>Select Role</option>
                  <option value='1995'>Admin</option>
                  <option value='2001'>User</option>
                  <option value='1999'>Product Maneger</option>
                </Form.Select>
                <Form.Label>Role</Form.Label>
              </Form.Group>
              <button disabled={
                name.length > 1 &&
                  email.length > 1 &&
                  password.length > 8 &&
                  role !== "" ?
                  false : true
              }
                className='btn btn-primary'>Save</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}