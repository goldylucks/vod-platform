import React, { PropTypes } from 'react'
import CategoryList from './CategoryList'

function RecipeComponentDetailed(props) {
  return (
    <section className ='card-recipe-detailed'>
      <div className='recipe-video-preview-holder-detailed'>
        <img className='recipe-video-preview-detailed'
          src={
            `/public/img/recipes/${props.videoThumbnail}`
          }
        />
      </div>
      <div className='card-recipe-inner-detailed'>
        <h3> {props.title}</h3>
      </div>
      <div className='recipe-author-detailed'>
        <span className='recipe-author-name-detailed'>{props.author.name}</span>
        <img className='recipe-author-avatar-detailed round-img'
          src={
            `/public/img/recipes/${props.author.thumbnail}`
          }
        />
      </div>
      <div className='card-content-detailed'>
        <CategoryList {...props}/>
        <div className='recipe-description-detailed'>
          <h5>{props.description}</h5>
        </div>
      </div>
    </section>
  )
}

RecipeComponentDetailed.propTypes={
  videoThumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
  }),
  categories: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
}

export default RecipeComponentDetailed
