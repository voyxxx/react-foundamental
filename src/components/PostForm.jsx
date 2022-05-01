import React, {useRef, useState, useEffect} from 'react';
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton'

const PostForm = ({createPost, visible}) => {
  const [post, setPost] = useState({title: '', body: ''})
  const inputTitlePost = useRef(null)
  useEffect(() => {
    if (visible) inputTitlePost.current.focus()
  }, [visible]);

  const addNewPost = (event) => {
    event.preventDefault()
    const newPost = {...post, id: Date.now()}
    createPost(newPost)
    setPost({title:'', body: ''})
  }

  return (
      <form onSubmit={addNewPost}>
        <h3 style={{margin: '5px 0 10px'} }>Form for adding a post</h3>
        <MyInput
            type={'text'}
            value={post.title}
            onInput={(e)=>setPost({...post, title: e.target.value})}
            placeholder={'Post name'}
            name={'title'}
            ref={inputTitlePost}
        />
        <MyInput
            type={'text'}
            value={post.body}
            onInput={(e)=>setPost({...post, body: e.target.value})}
            placeholder={'Post'}
            name={'body'}
        />
        <MyButton>Create post</MyButton>
      </form>
  );
};

export default PostForm;