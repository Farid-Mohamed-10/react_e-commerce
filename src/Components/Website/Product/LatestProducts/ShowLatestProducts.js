import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { LATEST } from "../../../../Api/Api";
import SaleProducts from '../SaleProducts/SaleProducts';
import SkeletonShow from "../../Skeleton/SkeletonShow";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${LATEST}`).then((res) => setProducts(res.data)).finally(() => setLoading(false));
  }, []);

  const showProducts = products.map((product, index) =>
    <SaleProducts
      key={index}
      title={product.title}
      description={product.description}
      img={product.images[0].image}
      sale
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
      col="3"
    />
  )

  return (
    <div className="my-5 box-shadow rounded d-flex align-items-center justify-content-center flex-column">
      <h1
        className="mx-2 mt-4 px-4 py-2 rounded text-white"
        style={{ backgroundColor: '#0D6EFD', width: 'fit-content' }}
      >Latest Products</h1>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 mb-5 mx-2 row-gap-3 mb-5">
        {loading ? (
          <>
            <SkeletonShow lenght="4" height="300px" classes="col-lg-3 col-md-6 col-12" />
          </>
        ) : (
          showProducts
        )}
      </div>
    </div>
  );
}