import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "./Pagination/Pagination";
import { useEffect, useState } from "react";
import { Axios } from './../../Api/axios';
import TransfromDate from "../../Helpers/TransformDate";

export default function TableShow(props) {
  const currentUser = props.currentUser || {
    name: "",
  };
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filteredDataByDate =
    date.length !== 0
      ? props.data.filter(item => TransfromDate(item.created_at) === date)
      : props.data;

  const filteredSearchByDate =
    date.length !== 0 ?
      filteredData.filter(item => TransfromDate(item.created_at) === date)
      : filteredData;

  const showWhichData = search.length > 0 ? filteredSearchByDate : filteredDataByDate;

  async function getSearchData() {
    try {
      const res = await Axios.post(`${props.searchLink}/search?title=${search}`);
      setFilteredData(res.data);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setSearchLoading(false);
    }
  }
  
  useEffect(() => {
    const delaySeacrh = setTimeout(() => {
      search.length > 0 ? getSearchData() : setSearchLoading(false);
    }, 500);
  
    return () => clearTimeout(delaySeacrh);
  }, [search]);


  // Header Show
  const headerShow = props.header.map((item, index) => <th key={index}>{item.name}</th>);

  // Body Show
  const dataShow = showWhichData.map((item, key) => (
    <tr key={key} className="text-center">
      <td>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {
            item2.key === "image" ? (
              <img src={item[item2.key]} alt="Product" width="30px" />
            ) : item2.key === 'images' ? (
              <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
                {item[item2.key].map((img) => (
                  <img src={img.image} width="50px" alt="" />
                ))}
              </div>
            ) : item2.key === 'created_at' || item2.key === 'updated_at' ? (
              TransfromDate(item[item2.key])
            ) : item[item2.key] === '1995' ? (
              'Admin'
            ) : item[item2.key] === "2001" ? (
              "User"
            ) : item[item2.key] === '1996' ? (
              'Writer'
            ) : item[item2.key] === '1999' ? (
              'Product Manager'
            ) : (
              item[item2.key]
            )}
          {currentUser && item[item2.key] === currentUser.name && " (You)"}
        </td>
      ))}
      <td>
        <div className="d-flex align-items-center gap-3">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon
              fontSize={'19px'}
              icon={faPenToSquare}
            />
          </Link>
          {
            (currentUser.name !== item.name) && (
              <FontAwesomeIcon
                onClick={() => props.delete(item.id)}
                fontSize={'19px'}
                color="red"
                cursor={"pointer"}
                icon={faTrash}
              />
            )}
        </div>
      </td>
    </tr>
  ));


  // Return Data
  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap mt-2 mb-4 box-shadow rounded">
        <div
          className="d-flex align-items-start flex-column"
          
        >
          <h6 style={{ margin: '0' }}>Search By Title: </h6>
          <Form.Control
            className="my-2"
            type="search"
            aria-label="input example"
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchLoading("Searching...");
            }}
            style={{
              width: '250px',
            }}
          />
        </div>
        <div className=" d-flex align-items-start flex-column">
          <h6 style={{ margin: '0' }}>Search By Date: </h6>
          <Form.Control
            className="my-2"
            type="date"
            aria-label="input example"
            placeholder="Search..."
            onChange={(e) => {
              setDate(e.target.value);
              setSearchLoading(true);
            }}
            style={{ width: '350px' }}
          />
        </div>
      </div>
      <div className="box-shadow rounded">
        <Table
          className="rounded overflow-hidden text-white"
          striped
          hover
        >
          <thead>
            <tr className="text-center">
              <th>ID</th>
              {headerShow}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.loading ? (
              <tr className="text-center">
                <td colSpan={12}>Loading...</td>
              </tr>
            ) : searchLoading ? (
              <tr className="text-center">
                <td colSpan={12}>Searching...</td>
              </tr>
            ) : (
              dataShow
            )}
          </tbody>
        </Table>
        <div className="d-flex align-items-center justify-content-end flex-wrap">
          <div>
            <Form.Select onChange={(e) => props.setLimit(e.target.value)} aria-label="Default select example">
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </Form.Select>
          </div>
          <div>
            <PaginatedItems
              setPage={props.setPage}
              itemsPerPage={props.limit}
              data={props.data}
              total={props.total}
            />
          </div>
        </div>
      </div>
    </>
  );
}