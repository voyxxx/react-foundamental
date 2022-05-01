import React from 'react'
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
      <MyInput
        type={'text'}
        value={filter.query}
        onChange={(e)=>setFilter({...filter, query: e.target.value})}
        placeholder={'Поиск...'}
      />
      <MySelect
        value={filter.sort}
        onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
        defaultValue={'Coртировка по'}
        options={[
          {value: 'title',name: 'Сортировка по названию'},
          {value: 'body',name: 'Сортировка по описанию'}
        ]}
      />
    </div>
  );
};

export default PostFilter;