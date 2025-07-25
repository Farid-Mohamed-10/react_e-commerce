import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { LatestSale } from "../../../../Api/Api";
import SaleProducts from './SaleProducts';
import { Container } from "react-bootstrap";
import SkeletonShow from "../../Skeleton/SkeletonShow";

export default function ShowLatestSaleProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${LatestSale}`).then((res) => setProducts(res.data)).finally(() => setLoading(false));
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
    <Container className="mt-5">
      <h1>Latest Sale Products</h1>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 mb-5 row-gap-2 mb-5">
        {loading ? (
          <>
            <SkeletonShow lenght="4" height="300px" classes="col-lg-3 col-md-6 col-12" />
          </>
        ) : (
          showProducts
        )}
      </div>
    </Container>
  );
}