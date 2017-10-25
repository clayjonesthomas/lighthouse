import React, {PropTypes} from 'react'
import SubmitButton from 'ui-kit/SubmitButton'
import LikeButton from 'ui-kit/LikeButton/LikeButton'
import Spinner from 'ui-kit/Spinner'
import MoreContentButton from 'ui-kit/MoreContentButton'
import {Grid, Col, Row} from 'react-bootstrap'
import PostBox from 'features/PostBox/PostBox'
import ShopFinder, {FINDER_SEARCH}
  from 'features/ShopFinder/ShopFinder'
import EditShop from '../../features/EditShop/EditShop'

import './ShopPage.css'
const ShopPage =
  ({
    name,
    website,
    iconUrl,
    likes,
    onLike, 
    isLiked,

    username,
    deletePost,
    shopPosts,
    onLikePost,
    arePostsLoaded,
    displayDummyShopSpinner,
    startDummySpinnerTimer,
    onMorePosts,
    areMorePostsLoaded,
    areMorePosts,
    fireMustSignIn,

    isMobile,
    isModerator,
    toggleEditShop,
    isEditShop,
    onSaveShopNameRef,
    onSaveShopWebsiteRef,
    onSaveShopIconUrlRef,
    onSubmitEditShop,
    onCancelEditShop
  }) => (
    <Grid>
      <Row>
        <Col md={6} className={isMobile?"":"mid-block-desktop"}>
          <Row>
            <div className={isMobile?"":"desktop-shop-header"}>
              <h1>
                {name}
              </h1>
              {isModerator && 
                <div className="admin-tools">
                  <SubmitButton
                    className="admin-button"
                    onClick={() => toggleEditShop()}
                    contents="Edit Shop"
                  />
                </div>}
              {isModerator && isEditShop &&
                <EditShop 
                  onSaveNameRef={onSaveShopNameRef}
                  onSaveWebsiteRef={onSaveShopWebsiteRef}
                  onSaveIconUrlRef={onSaveShopIconUrlRef}
                  onCancel={onCancelEditShop}
                  onSubmit={onSubmitEditShop}
                  shopName={name}
                  shopWebsite={website}
                  shopIconUrl={iconUrl}
                />
              }
              <LikeButton
                onClick={() => {
                  if (username)
                    onLike()
                  else
                    fireMustSignIn()
                }}
                isPressed={isLiked}
                likes={likes}
              />
            </div>
          </Row>
          {(!arePostsLoaded || displayDummyShopSpinner) &&
            <Spinner/>
          }
          {arePostsLoaded && shopPosts &&
            shopPosts.map(post => {
              return <Row key={post.key}><PostBox
                post={post}
                post_key={post.key}
                onLike={() => onLikePost(post.key)}
                canDelete={post.canDelete}
                onDelete={deletePost}
                startDummySpinnerTimer={startDummySpinnerTimer}
              /></Row>
            })
          }
          <Row>
            {areMorePostsLoaded && areMorePosts &&
              <MoreContentButton
                onClick={onMorePosts}
                words="MORE POSTS"
              />
            }
            {!areMorePostsLoaded && areMorePosts &&
              <Spinner/>
            }
            {!areMorePosts &&
              <div>
                no more posts, come back later!
              </div>
            }
          </Row>
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
  )

ShopPage.propTypes = {
  name: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  iconUrl: PropTypes.string,
  likes: PropTypes.number.isRequired,
  onLike: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired
}

export default ShopPage
