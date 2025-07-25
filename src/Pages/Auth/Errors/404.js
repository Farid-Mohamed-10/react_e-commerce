import { Link } from "react-router-dom";
import './404.css';

export default function Error404() {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-12 text-center">
              <div className="four_zero_four_bg">
                <h1 className="tetx-center">404 - Not Found</h1>
              </div>
              <div className="content_box_404">
                <h3 className="h3">Look like you're lost</h3>
                <p>The page you are looking for not available!</p>
                <Link to={"/"} className="link_404">
                  Go To Home 
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}