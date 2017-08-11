import ShopBox from './ShopBox'
import React, {PropTypes} from 'react'
import Spinner from './ui-kit/Spinner'
import ShopFinder from './ui-kit/ShopFinder'
import SubmitButton from './ui-kit/SubmitButton'
import {Grid, Col, Row} from 'react-bootstrap'
import Logo from './ui-kit/Logo'

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
      {!areShopsLoaded &&
        <Spinner/>
      }
      <Grid>
        <Row>
          {isMobile &&
          <Col md={2}>
            {areShopsLoaded &&
            <ShopFinder
              className="mobile-shop-finder"
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
              contents="ADD TO LIKED STORES"
              onClick={() => {
                onSubmitShops()
                clearShopFinder()
              }}
            />
            }
          </Col>
          }
          <Col
            md={8}>
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
          </Col>
          {!isMobile &&
            <Col md={2}>
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