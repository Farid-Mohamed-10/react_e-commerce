import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../../Api/axios';
import { CATEGORY } from '../../../Api/Api';
import Loading from '../../../Components/Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';

export default function User() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  // Category ID
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Axios.get(`${CATEGORY}/${id}`).then((data) => {
      console.log(data);
      setTitle(data.data.title);
      setLoading(false);
    }).then(() => setDisable(false)).catch(() => navigate("/dashboard/categories/page/404"))
  }, [id, navigate])

  // Handle Submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    try {
      const res = await Axios.post(`${CATEGORY}/edit/${id}`, formData);
      window.location.pathname = "/dashboard/categories";
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
          <Form className='bg-white p-5 d-flex align-items-center justify-content-center flex-column box-shadow rounded'
            onSubmit={handleSubmit}
            style={{
              width: '90%',
            }}>
            <h1 className='mb-3'>Update Category</h1>
            <Form.Group className="mb-4" style={{ width: '90%' }} controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                type="text"
                placeholder="Title..."
                style={{
                  padding: '15px 20px'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.border = 'none';
                }}
              />
            </Form.Group>
            <Form.Group className="mb-4" style={{ width: '90%' }} controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                onChange={(e) => setImage(e.target.files.item(0))}
                type="file"
                multiple
                style={{
                  padding: '15px 20px',
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'
                }}
              />
            </Form.Group>
            <button
              disabled={title.length > 1 ? false : true}
              className='btn btn-primary'
              style={{
                width: '90%',
                transition: 'transform 0.3s ease',
                fontSize: '20px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.outlineColor = '#0d6efd';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#0d6efd';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.outlineColor = 'transparent';
                e.currentTarget.style.backgroundColor = '#0d6efd';
                e.currentTarget.style.color = 'white';
              }}
            >
              Save
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}