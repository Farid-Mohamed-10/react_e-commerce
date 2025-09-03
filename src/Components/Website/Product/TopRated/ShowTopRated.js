import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import TopRated from "./TopRated";
import { TOP_RATED } from "../../../../Api/Api";
import SkeletonShow from "../../Skeleton/SkeletonShow";

export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${TOP_RATED}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const showProducts = products.map((product, index) =>
    <TopRated
      key={index}
      title={product.title} 
      description={product.description}
      img={product.images[0].image}
      sale
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
    />
  )

  return (
  
      <div className="mx-3 rounded" style={{ border: '2px solid #0D6EFD' }}>
        <h1 className="text-center m-0 p-3 bg-primary text-white">Top Rated</h1>
        <div className="py-4 rounded d-flex align-items-center justify-content-evenly flex-wrap row-gap-3">
          {loading ? (
            <>
              <SkeletonShow lenght="1" height="800px" baseColor="white" classes="col-12" />
            </>
          ) : (
            showProducts
          )}
        </div>
      </div>
  );
}