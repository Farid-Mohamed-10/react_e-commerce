import './HomePage.css';
import Landing from "../../../Components/Website/Landing/Landing";
import ShowTopRated from '../../../Components/Website/Product/TopRated/ShowTopRated';
import ShowLatestSaleProducts from '../../../Components/Website/Product/SaleProducts/ShowLatestSaleProducts';
import LatestProducts from '../../../Components/Website/Product/LatestProducts/ShowLatestProducts';
import Footer from '../Footer/Footer';

export default function HomePage() {
  return (
    <div>
      <Landing />
      <ShowLatestSaleProducts />
      <ShowTopRated />
      <LatestProducts />
      <Footer />
    </div>
  );
}