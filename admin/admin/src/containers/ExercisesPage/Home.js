import React, { Component } from "react"
import { Link } from "react-router-dom"
import styles from "./styles.scss"
import Helmet from "react-helmet"

class Home extends Component {
  render() {
    return (
      <div>
        <Helmet title="Create Exercise Page" />
        <div>
          <div className={`container-fluid ${styles.containerFluid}`}>
            <div className="row" style={{ marginBottom: 30 }}>
              <div className="col-lg-12">
                <h1>Choose Exercise Type</h1>

                <div className={styles.buttonWrapperCenter}>
                  <Link
                    to="/plugins/content-manager/exercise/create/chapter"
                    className={styles.saveBtn}
                  >
                    Chapter
                  </Link>
                  <Link
                    to="/plugins/content-manager/exercise/create/lesson"
                    className={styles.saveBtn}
                  >
                    Lesson
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
