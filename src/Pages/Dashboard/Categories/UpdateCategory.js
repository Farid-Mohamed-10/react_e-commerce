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
      <Form className='bg-white p-3 w-100' onSubmit={handleSubmit}>
        <Form.Group className="mb-4" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            type="text"
            placeholder="Title..."
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            onChange={(e) => setImage(e.target.files.item(0))}
            type="file"
            multiple
          />
        </Form.Group>
        <button
          disabled={title.length > 1 ? false : true}
          className='btn btn-primary'>
          Save
        </button>
      </Form>
    </>
  );
}