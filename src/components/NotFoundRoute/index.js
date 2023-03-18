import Header from '../Header'
import './index.css'

const NotFoundRoute = () => (
  <>
    <Header />
    <div className="notfound-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="notfound-img"
      />
      <h1 className="page-notfound-heading">Page Not Found</h1>
      <p className="desc-notfound-subhead">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFoundRoute
