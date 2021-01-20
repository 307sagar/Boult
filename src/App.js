import React, { useReducer, useRef } from 'react';

import { useFetch, useInfiniteScroll, useLazyLoading } from './customHooks'
import './index.css';

function App() {
  const imgReducer = (state, action) => {
    switch (action.type) {
      case 'STACK_IMAGES':
        return { ...state, images: state.images.concat(action.images) }
      case 'FETCHING_IMAGES':
        return { ...state, fetching: action.fetching }
      default:
        return state;
    }
  }

  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + 1 }
      default:
        return state;
    }
  }

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 })
  const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true, })

  let bottomBoundaryRef = useRef(null);
  useFetch(pager, imgDispatch);
  useLazyLoading('.card-img-top', imgData.images)
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  return (
    <div className="">
      <nav className="navbar bg-light">
        <div className="container">
          <a className="navbar-brand" href="/#">
            <h2>Boult Assignment</h2>
          </a>
        </div>
      </nav>

      <div id='images' className="container">
        <div className="row">
          {imgData.images.map((img, index) => {
            // console.log(img);
            let imageURL = img.urls.full;
            let profile_Name = img.user.username
            let portfolio_URL = img.user.portfolio_url;
            let profile_image = img.user.profile_image.large;
            let total_likes = img.user.total_likes;
            let total_photos = img.user.total_photos;
            const { alt_description } = img;
            return (
              <div key={index} className="card">
                <div className="card-body ">
                  <img
                    alt={alt_description}
                    data-src={imageURL}
                    className="card-img-top"
                    src={''}
                  />
                </div>               
                <div className="card-footer">  
                <img alt = {profile_Name} src={profile_image}/>              
                  <p className="card-text text-center text-capitalize text-primary">Profile Name: {profile_Name}</p>
                  <p className="card-text text-center text-capitalize text-primary">Portfolio: {portfolio_URL}</p> 
                  <span>Total Likes : {total_likes}</span> <br/>
                  <span>Total Photos : {total_photos}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {imgData.fetching && (
        <div className="text-center bg-secondary m-auto">
          <p className="m-0 text-white">Getting images</p>
        </div>
      )}
      <div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div>
    </div>
  );
}
export default App;
