import React from 'react';
import PostItem from './PostItem';
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, title, removePost}) => {
  if (posts.length === 0) return (<h2 style={{textAlign: 'center'}}>Posts undefined</h2>)
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>{title}</h1>
      <TransitionGroup>
        {posts.map((post, idx) =>
          <CSSTransition
            key={post.id}
            classNames='post'
            timeout={500}
          >
            <PostItem removePost={removePost} number={idx + 1} post={post}/>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default PostList;