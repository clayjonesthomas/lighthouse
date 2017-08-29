import ShopBox from './ShopBox'
import React, {PropTypes} from 'react'
import Spinner from './ui-kit/Spinner'
import ShopFinder, {FINDER_SEARCH} from './ui-kit/ShopFinder/ShopFinder'
import {Grid, Col, Row} from 'react-bootstrap'
import Logo from './ui-kit/Logo'

import "./FrontPage.css"
import "./PostBox.css"
import "./MyShopsPage.css"
const MyShopsPage =
  ({
     myShops,
     onLike,
     areShopsLoaded,
     isMobile,
   }) => (
    <div>
      {!areShopsLoaded &&
        <Spinner/>
      }
      <Grid>
        <Row>
          {isMobile &&
          <Col md={2}>
            {areShopsLoaded &&
              <div>
                <div className={isMobile?"mobile-shop-finder-container":""}>
                  <ShopFinder finderType={FINDER_SEARCH}/>
                </div>
                <hr className="post-line-break"/>
              </div>
            }
          </Col>
          }
          <Col md={6} className={isMobile?"":"mid-block-desktop"}>
            <Row>
              <h1 className={isMobile?"mobile-h1":"desktop-h1"}>
                My Shops
              </h1>
            </Row>
            <div className={isMobile ? "" : "desktop-content-box"}>
              {areShopsLoaded && myShops &&
              myShops.map(shop => {
                return <Row key={shop.key}><ShopBox
                  shop={shop}
                  onLike={() => onLike(shop.key)}
                  /></Row>
                })
              }
              {areShopsLoaded && !myShops &&
                "You're currently not following any shops. Go add some! -->"
              }
            </div>
          </Col>
          {!isMobile &&
            <Col md={4}>
              <div className="shop-finder-container">
                <ShopFinder finderType={FINDER_SEARCH}/>
              </div>
            </Col>
          }
        </Row>
      </Grid>
      <Logo/>
    </div>
  )

MyShopsPage.propTypes = {
  myShops: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    key: PropTypes.string.isRequired
  })).isRequired,
  areShopsLoaded: PropTypes.bool.isRequired
}

export default MyShopsPage