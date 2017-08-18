import ShopBox from './ShopBox'
import React, {PropTypes} from 'react'
import Spinner from './ui-kit/Spinner'
import ShopFinder from './ui-kit/ShopFinder'
import SubmitButton from './ui-kit/SubmitButton'
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

     shops,
     onAddNewShop,
     onSubmitShops,
     onAddShopFinderRef,
     clearShopFinder
   }) => (
    <div>
      <h1 className={isMobile?"mobile-h1":"desktop-h1"}>
        My Shops
      </h1>
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
                  <ShopFinder
                    className={isMobile?"mobile-shop-finder":""}
                    shops={shops}
                    onAddNewShop={(shop) => {
                      onAddNewShop(shop)
                    }}
                    onAddShopFinderRef={ref => onAddShopFinderRef(ref)}
                    placeholder="search for a shop..."
                  />
                  <SubmitButton
                    contents="ADD TO LIKED SHOPS"
                    onClick={() => {
                      onSubmitShops()
                      clearShopFinder()
                    }}
                  />
                </div>
                <hr className="post-line-break"/>
              </div>
            }
          </Col>
          }
          <Col md={6}>
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
              {areShopsLoaded &&
              <ShopFinder
                shops={shops}
                onAddNewShop={(shop) => {
                  onAddNewShop(shop)
                }}
                onAddShopFinderRef={ref => onAddShopFinderRef(ref)}
                placeholder="search for a shop..."
              />
              }
              {areShopsLoaded &&
              <SubmitButton
                contents="ADD TO LIKED SHOPS"
                onClick={
                  () => {
                    onSubmitShops()
                    clearShopFinder()
                  }
                }
              />
              }
            </Col>
          }
        </Row>
      </Grid>
      <Logo/>
    </div>
  )

MyShopsPage.propTypes = {
  shops: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    key: PropTypes.string.isRequired
  })).isRequired,
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