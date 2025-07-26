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

  console.log(products);

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
    <div className="">
      <div>
        <h1 className="ms-md-4">Latest Products</h1>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2 mb-5">
          {loading ? (
            <>
              <SkeletonShow lenght="4" height="300px" classes="col-md-6 col-12" />
            </>
          ) : (
            showProducts
          )}
        </div>
      </div>
    </div>
  );

}