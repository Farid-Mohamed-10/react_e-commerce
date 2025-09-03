import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../../Api/axios';
import { CATEGORIES, PRODUCT } from '../../../Api/Api';
import Loading from '../../../Components/Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function UpdateProduct() {
  const [form, setForm] = useState({
    category: "Select Category", // To Make This The Defualt Value Of The Select Category Option
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock: "",
  });

  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idsFromServer, setIDsFromServer] = useState([]);
  const { id } = useParams();
  const nav = useNavigate();


  console.log(idsFromServer);

  // Ref
  const focus = useRef("");
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);


  // Handle Ref
  useEffect(() => {
    focus.current.focus();
  }, []);

  function handleOpenImage() {
    openImage.current.click();
  }

  // Get All Categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Get Product Data
  useEffect(() => {
    Axios.get(`/${PRODUCT}/${id}`)
      .then(data => {
        setForm(data.data[0]);
        setImagesFromServer(data.data[0].images);
      })
      .catch(err => console.log(err));
  }, [])

  // Handle Edit
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      for (let i = 0; i < idsFromServer.length; i++) {
        await Axios.delete(`product-img/${idsFromServer[i]}`).then((data) => console.log(data));        
      }
      const res = await Axios.post(`${PRODUCT}/edit/${id}`, form);
      console.log(res);
      nav('/dashboard/products');
    }
    catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  // Handle Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });    
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
      await Axios.delete(`product-img/${imageId}`);
      setImages(prev => prev.filter(img => img !== image));
      ids.current = ids.current.filter(id => id !== imageId);
      --j.current;
    } catch (error) {
      console.log(error);
    }
  }
  
  // Handle Image Delete
  async function handleDeleteImageFromServer(id) {
    setImagesFromServer((prev) => prev.filter(img => img.id !== id));
    setIDsFromServer((prev) => { return [...prev, id]; });
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

  const imagesFromServerShow = imagesFromServer.map((image, key) => (
    <div key={key} className='border p-2 col-2 mb-2 position-relative'>
      <div className='d-flex align-items-center justify-content-start gap-2'>
        <img src={image.image} className='w-100' alt="Product"></img>
      </div>
      <div
        style={{ cursor: 'pointer' }}
        className='position-absolute top-0 end-0 bg-danger rounded text-white'
      >
        <p className='py-1 px-2 m-0' onClick={() => handleDeleteImageFromServer(image.id)}>x</p>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <Loading />}
      <Form
        className='bg-white p-5 w-100 my-5 mx-4 d-flex align-items-center justify-content-center flex-column box-shadow rounded'
        onSubmit={handleEdit}
      >
        <h1 className='mb-3 text-center'>Update Product</h1>
        <Form.Group className="mb-3 px-5 w-100 d-flex flex-column" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select
            ref={focus}
            value={form.category}
            onChange={handleChange}
            name='category'
            placeholder="Category..."
            style={{
              border: 'none',
              outline: 'none',
              boxShadow: '10px 10px 20px #babecc, -10px -10px 20px #ffffff',
              padding: '10px 15px'
            }}
          >
            <option disabled>Select Category</option>
            {categoriesShow}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 px-5 w-100 d-flex flex-column" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={form.title}
            onChange={handleChange}
            name='title'
            required
            type="text"
            placeholder="Title..."
            style={{
              border: 'none',
              outline: 'none',
              boxShadow: '10px 10px 20px #babecc, -10px -10px 20px #ffffff',
              padding: '10px 15px'
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 px-5 w-100 d-flex flex-column" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={form.description}
            onChange={handleChange}
            name='description'
            required
            type="text"
            placeholder="Description..."
            style={{
              border: 'none',
              outline: 'none',
              boxShadow: '10px 10px 20px #babecc, -10px -10px 20px #ffffff',
              padding: '10px 15px'
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 px-5 w-100 d-flex flex-column" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={form.price}
            onChange={handleChange}
            name='price'
            required
            type="text"
            placeholder="Price..."
            style={{
              border: 'none',
              outline: 'none',
              boxShadow: '10px 10px 20px #babecc, -10px -10px 20px #ffffff',
              padding: '10px 15px'
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 px-5 w-100 d-flex flex-column" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            value={form.discount}
            onChange={handleChange}
            name='discount'
            required
            type="text"
            placeholder="Discount..."
            style={{
              border: 'none',
              outline: 'none',
              boxShadow: '10px 10px 20px #babecc, -10px -10px 20px #ffffff',
              padding: '10px 15px'
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 px-5 w-100 d-flex flex-column" controlId="about">
          <Form.Label>About</Form.Label>
          <Form.Control
            value={form.About}
            onChange={handleChange}
            name='About'
            required
            type="text"
            placeholder="About..."
            style={{
              border: 'none',
              outline: 'none',
              boxShadow: '10px 10px 20px #babecc, -10px -10px 20px #ffffff',
              padding: '10px 15px'
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 px-5 w-100 d-flex flex-column" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            value={form.stock}
            onChange={handleChange}
            name='stock'
            required
            type="text"
            placeholder="Stock..."
            style={{
              border: 'none',
              outline: 'none',
              boxShadow: '10px 10px 20px #babecc, -10px -10px 20px #ffffff',
              padding: '10px 15px'
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 px-5 w-100 d-flex flex-column" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control
            ref={openImage}
            hidden
            multiple
            onChange={handleImagesChange}
            type="file"
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          className='d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 flex-column'
          style={{
            border: '2px dashed #0086fe',
            cursor: 'pointer',
            width: '90%'
          }}>
          <img
            src={require('./../../../Assets/Images/upload.png')}
            alt='Upload Here'
            width="100px"
          />
          <p className='fw-bold mb-0' style={{color: '#0086fe'}}>Upload Images</p>
        </div>

        <div className='d-flex align-items-start flex-wrap gap-2 my-3' style={{width: '90%'}}>
          {imagesFromServerShow}
        </div>
        <div className='d-flex align-items-start flex-column gap-3 rounded mb-3' style={{width: '90%'}}>
          {imagesShow}
        </div>
        <button className='btn btn-primary mt-2' style={{width: '90%'}}>Save</button>
      </Form>
    </>
  );
}