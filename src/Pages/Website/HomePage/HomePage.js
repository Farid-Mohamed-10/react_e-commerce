import './HomePage.css';
import Landing from "../../../Components/Website/Landing/Landing";
import ShowTopRated from '../../../Components/Website/Product/TopRated/ShowTopRated';
import ShowLatestSaleProducts from '../../../Components/Website/Product/SaleProducts/ShowLatestSaleProducts';
import { Container } from 'react-bootstrap';
import LatestProducts from '../../../Components/Website/Product/LatestProducts/ShowLatestProducts';

export default function HomePage() {
  return (
    <div>
      {/* <Landing /> */}
      <ShowLatestSaleProducts />
      <Container>
        <div className='d-flex align-items-stretch flex-wrap mt-5'>
          <ShowTopRated />
          <LatestProducts />
        </div>
      </Container>
    </div>
  );
}
