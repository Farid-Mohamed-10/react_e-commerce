import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../../Api/axios';
import { CATEGORIES, PRODUCT } from '../../../Api/Api';
import Loading from '../../../Components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function AddProduct() {
  const [form, setForm] = useState({
    category: "Select Category", // To Make This The Defualt Value Of The Select Category Option
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });

  const dumyForm = {
    category: null, 
    title: "dumy",
    description: "dumy",
    price: 222,
    discount: 0,
    About: "About",
    stock: 0,
  }

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState()
  const nav = useNavigate();

  // Ref
  const focus = useRef("");
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);

  console.log(ids);

  // Handle Ref
  useEffect(() => {
    focus.current.focus();
  }, []);

  function handleOpenImage() {
    openImage.current.click();
  }

  // Select All Categories
    useEffect(() => {
      Axios.get(`/${CATEGORIES}`)
        .then((data) => setCategories(data.data))
        .catch((err) => console.log(err));
    }, []);
  

  // Handle Edit
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${PRODUCT}/edit/${id}`, form);
      nav('/dashboard/products');
    }
    catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  // Handle Submit Form
  async function handleSubmitForm() {
    try {
      const res = await Axios.post(`${PRODUCT}/add`, dumyForm);
      setId(res.data.id);
    }
    catch (error) {
      console.log(error);
    }
  }

  // Handle Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(1);
    if (sent !== 1) {
      handleSubmitForm();
    }
  }

  // Handle Images Change

  let j = useRef(-1);

  async function handleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFlies = e.target.files;
    const data = new FormData();
    for (let i = 0; i < imagesAsFlies.length; i++) {
      j.current++;
      data.append('image', imagesAsFlies[i]);
      data.append('product_id', id);
      try {
        const res = await Axios.post('/product-img/add', data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute('percent', `${percent}%`);
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  // Handle Image Delete
  async function handleImageDelete(id, image) {
    const imageId = ids.current[id];
    try {
      const res = await Axios.delete(`product-img/${imageId}`);
      setImages(prev => prev.filter(img => img !== image));
      ids.current = ids.current.filter(id => id !== imageId);
      --j.current;
    } catch (error) {
      console.log(error);
    }
  }

  // Mapping
  const categoriesShow = categories.map((item, key) =>
    <option key={key} value={item.id}>{item.title}</option>
  );


  const imagesShow = images.map((image, key) => (
    <div key={key} className='border p-2 w-100'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center justify-content-start gap-2'>
          <img src={URL.createObjectURL(image)} width="80px" alt="Product"></img>
          <div>
            <p className='mb-1'>{image.name}</p>
            <p>
              {((image.size / 1024) < 999
                ? ((image.size / 1024).toFixed(2) + ' KB')
                : (image.size / (1024 * 1024)).toFixed(2) + ' MB')
              }
            </p>
          </div>
        </div>
        <Button onClick={() => handleImageDelete(key, image)} variant='danger'>Delete</Button>
      </div>
      <div className='custom-progress mt-3'>
        <span
          ref={(e) => (progress.current[key] = e)}
          className='inner-progress'
        ></span>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <Loading />}
      <Form className='bg-white p-3 w-100' onSubmit={handleEdit} >
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select
            ref={focus}
            value={form.category}
            onChange={handleChange}
            name='category'
            placeholder="Category..."
          >
            <option disabled>Select Category</option>
            {categoriesShow}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={form.title}
            onChange={handleChange}
            name='title'
            required
            type="text"
            placeholder="Title..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={form.description}
            onChange={handleChange}
            name='description'
            required
            type="text"
            placeholder="Description..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={form.price}
            onChange={handleChange}
            name='price'
            required
            type="text"
            placeholder="Price..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Price After Discount</Form.Label>
          <Form.Control
            value={form.discount}
            onChange={handleChange}
            name='discount'
            required
            type="text"
            placeholder="Discount..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="about">
          <Form.Label>About</Form.Label>
          <Form.Control
            value={form.About}
            onChange={handleChange}
            name='About'
            required
            type="text"
            placeholder="About..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            value={form.stock}
            onChange={handleChange}
            name='stock'
            required
            type="number"
            placeholder="Stock..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control
            ref={openImage}
            hidden
            multiple
            onChange={handleImagesChange}
            type="file"
            disabled={!sent}
          />
        </Form.Group>

        <div
          onClick={handleOpenImage}
          className='d-flex align-items-center justify-content-center gap-2 w-100 py-3 rounded mb-2 flex-column'
          style={{
            border: !sent ? '2px dashed gray' : '2px dashed #0086fe',
            cursor: sent && 'pointer'
          }}>
          <img
            src={require('./../../../Assets/Images/upload.png')}
            alt='Upload Here'
            width="100px"
            style={{filter: !sent && "grayscale(1)"}}
          />
          <p className='fw-bold mb-0' style={{color: !sent ? "gray" : '#0086fe'}}>Upload Images</p>
        </div>

        <div className='d-flex align-items-start flex-column gap-2'>
          {imagesShow}
        </div>

        <button className='btn btn-primary mt-2'>Save</button>
      </Form>
    </>
  );
}