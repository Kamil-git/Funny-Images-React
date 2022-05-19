
import React from "react"
import { Link } from "react-router-dom"

function Footer() {
  return (
   
      <div id="Footer" className="container p-4 pb-0">
        <section className="mb-4 text-center">
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
        <div className="text-center p-3" style={{ color: "inherit" }}>
          © 2022 Copyright: Kamil Kwiatkowski
        </div>
      </div>
    
  )
}

export default Footer
