import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CATEGORIES } from "../../../Api/Api";
import { Container } from "react-bootstrap";
import StringSlice from "../../../Helpers/StringSlice";
import SkeletonShow from "../../../Components/Website/Skeleton/SkeletonShow";

export default function WebsiteCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${CATEGORIES}`).then((res) => setCategories(res.data)).finally(() => setLoading(false));
  }, []);

  const showCategories = categories.map((item) => (
    <div className="col-lg-3 col-md-4 col-6 bg-transparent border-0">
      <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
        <img className="mx-3" width="50px" src={item.image} alt="Just An Img" />
        <p className="m-0">
          {StringSlice(item.title, 12)}
        </p>
      </div>
    </div>
  ));

  return (
    <>
      <div
        style={{ backgroundColor: '#7EF4FF' }}
        className="py-5">
        <Container>
          <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2">
            {loading ? (
              <>
                <SkeletonShow length="15" height="70px" baseColor="white" classes="col-lg-2 col-md-6 col-12" />
              </>
            ) : (
              showCategories
            )}
          </div>
        </Container>
      </div>
    </>
  );
}