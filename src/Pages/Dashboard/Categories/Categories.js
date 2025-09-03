import { Link } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { CATEGORIES, CATEGORY } from "../../../Api/Api";
import { useEffect, useState } from "react";
import TableShow from "../../../Components/Dashboard/Table";

export default function Categories() {
  // States
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Select All Categories
  useEffect(() => {
    setLoading(true)
    Axios.get(`/${CATEGORIES}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const header = [
    {
      key: "title",
      name: "Title"
    },
    {
      key: "image",
      name: "Image"
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
      const res = await Axios.delete(`${CATEGORY}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white w-100 px-4 py-3 rounded low-shadow">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Categories</h1>
        <Link className="btn btn-outline-primary mx-2" to="/dashboard/category/add">
          Add Category
        </Link>
      </div>
      
      <TableShow
        header={header}
        data={categories}
        delete={handleDelete}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        loading={loading}
        total={total}
        search="title"
        searchLink={CATEGORY}
      />
    </div>
  );
}

