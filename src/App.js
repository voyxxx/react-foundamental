import React, {useContext, useState} from 'react'
import './styles/App.css'
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import {usePosts} from './components/hooks/usePosts';

function App() {
  const [posts, setPosts] = useState([
    {id:1, title:'Javascript', body:'Description9'},
    {id:2, title:'Python 434', body:'Description8'},
    {id:3, title:'Javascript 87', body:'Description1'},
  ])

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [visibleModal, setVisibleModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const addNewPost = (post) => {
    setPosts([...posts, post])
    setVisibleModal(false)
  }

  const removePost = (post) => {setPosts(posts.filter(p => p.id !== post.id)) }

  let isClickApp = {click: false}
  const DocClick = React.createContext(isClickApp)

  const UserProviderDomCLick = ({children}) => {
    return (
      <DocClick.Provider value={isClickApp}>
        {children}
      </DocClick.Provider>
    )
  }

  const appOnclick = (event) => {
    isClickApp.click = true
    // setTimeout(()=>{isClickApp.click = false}, 0)
  }

  return (
    // <UserProviderDomCLick>
      <div className="App" onClick={appOnclick}>
        <MyButton onClick={()=>setVisibleModal(true)}>Add post</MyButton>
        <MyModal
          visible={visibleModal}
          setVisible={setVisibleModal}
        >
          <PostForm visible={visibleModal} createPost={addNewPost}/>
        </MyModal>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter filter={filter} setFilter={setFilter} posts={posts}/>
        <PostList removePost={removePost} posts={sortedAndSearchedPosts} title={'Posts lists'}/>
      </div>
    // </UserProviderDomCLick>
  );
}

export default App;
