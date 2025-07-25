import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../../Api/axios';
import { CATEGORY } from '../../../Api/Api';
import Loading from '../../../Components/Loading/Loading';

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

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
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    console.log(formData);
    try {
      const res = await Axios.post(`${CATEGORY}/add`, formData);
      window.location.pathname = "/dashboard/categories";
      console.log(res);
    }
    catch (error) {
      setLoading(false);
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
            ref={focus}
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