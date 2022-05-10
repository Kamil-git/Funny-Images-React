import React from "react"
import { Link } from "react-router-dom"
function Footer() {
  return (
    <footer className="text-center">
      <div className="container p-4 pb-0">
        <section className="mb-4">
          <Link className="btn  btn-floating m-1" to="#" role="button">
            <i className="fab fa-facebook-f"></i>
          </Link>

          <Link className="btn  btn-floating m-1" to="#" role="button">
            <i className="fab fa-twitter"></i>
          </Link>

          <Link className="btn  btn-floating m-1" to="#" role="button">
            <i className="fab fa-google"></i>
          </Link>

          <Link className="btn  btn-floating m-1" to="#" role="button">
            <i className="fab fa-instagram"></i>
          </Link>

          <Link className="btn  btn-floating m-1" to="#" role="button">
            <i className="fab fa-linkedin-in"></i>
          </Link>

          <Link className="btn  btn-floating m-1" to="" role="button">
            <i className="fab fa-github"></i>
          </Link>
        </section>
      </div>

      <div className="text-center p-3" style={{color:'inherit'}}>© 2022 Copyright: Kamil Kwiatkowski</div>
    </footer>
  )
}

export default Footer
