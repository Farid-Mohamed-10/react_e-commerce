import { Link } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { PRODUCT, PRODUCTS } from "../../../Api/Api";
import { useEffect, useState } from "react";
import TableShow from "../../../Components/Dashboard/Table";

export default function Products() {
  // States
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);


  // Select All Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const header = [
    {
      key: 'images',
      name: 'images',
    },
    {
      key: "title",
      name: "Title"
    },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
    },
    {
      key: "created_at",
      name: "Created"
    },
    {
      key: "updated_at",
      name: "Updated"
    },
  ];


  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${PRODUCT}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products Page</h1>
        <Link className="btn btn-outline-primary mx-2" to="/dashboard/product/add">
          Add Product
        </Link>
      </div>

      <TableShow
        header={header}
        data={products}
        delete={handleDelete}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        loading={loading}
        total={total}
        search="title"
        searchLink={PRODUCT}
      />
    </div>
  );
}