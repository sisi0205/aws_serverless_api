import React from 'react'

export default function HomeContent() {
  return (
    <section className="container">
        <div className="columns features">
              <div className="column is-4">
                <div className="card is-shady">
                     <div className="card-image has-text-centered">
                        <i className="fa fa-empire"></i>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            <h4>Big Data Program</h4>
                            <p>
                            NOAA generates tens of terabytes of data a day from satellites, radars, ships, weather models, and other sources. While these data are available to the public, it can be difficult to download and work with such large data volumes. NOAA’s vast wealth of data therefore represents a substantial untapped economic opportunity.
                            </p>
                            <p><a href="https://www.noaa.gov/organization/information-technology/big-data-program">Learn more</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
                <div className="card is-shady">
                    <div className="card-image has-text-centered">
                        <i className="fa fa-paw"></i>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            <h4>List of Big Data Program Datasets</h4>
                            <p>There are over 130+ NOAA datasets on the Cloud Service Providers (CSPs) platforms.  The datasets are organized by NOAA organization who hosts the original dataset </p>
                            <p><a href="https://www.noaa.gov/organization/information-technology/list-of-big-data-program-datasets">Learn more</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="column is-4">
                <div className="card is-shady">
                    <div className="card-image has-text-centered">
                        <i className="fa fa-apple"></i>
                    </div>
                     <div className="card-content">
                        <div className="content">
                            <h4>Data Community Resources</h4>
                            <p>The NOAA Big Data Program is predicated on improving the accessibility while also maintaining a fair and level playing field for everyone.</p>
                            <p><a href="https://www.noaa.gov/organization/information-technology/data-community-resources">Learn more</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
