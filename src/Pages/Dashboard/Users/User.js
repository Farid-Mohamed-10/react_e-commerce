import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../../Api/axios';
import { USER } from '../../../Api/Api';
import Loading from '../../../Components/Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  // User ID
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Axios.get(`${USER}/${id}`).then((data) => {
      setName(data.data.name);
      setEmail(data.data.email);
      setRole(data.data.role);
      setLoading(false);
    }).then(() => setDisable(false)).catch(() => navigate("/dashboard/users/page/404"));
  }, [id, navigate]);

  // Handle Submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      });
      window.location.pathname = "/dashboard/users";
    }
    catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className='bg-white  w-100 d-flex align-items-center flex-column'>
        <Form className='bg-white p-3 w-100 my-3' onSubmit={handleSubmit}>
          <h1 className='mb-5 text-center'>Update Now</h1>
          <Form.Group className="mb-4 " controlId="exampleForm.ControlInput1">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
              placeholder="Name..."
            />
          </Form.Group>
          <Form.Group className="mb-3 " controlId="exampleForm.ControlInput2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-3 " controlId="exampleForm.ControlInput3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option disabled value={""}>Select Role</option>
              <option value='1995'>Admin</option>
              <option value='2001'>User</option>
              <option value='1996'>Writer</option>
            </Form.Select>
          </Form.Group>
          <button disabled={disable} className='btn btn-primary'>Save</button>
        </Form>
      </div>
    </>
  );
}