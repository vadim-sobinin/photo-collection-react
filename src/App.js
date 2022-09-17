import React from 'react';
import './index.scss';
import {Collection} from './Collection'

let cats = [
  { "name": "All" },
  { "name": "Sea" },
  { "name": "Mountains" },
  { "name": "Architecture" },
  { "name": "Cities" }
];



function App() {

  const [collections, setCollection] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  const category = categoryId ? `category=${categoryId}` : "";

  React.useEffect(() => {
    //React.setIsLoading(true);
     fetch(
      // 'https://632620f270c3fa390f94c420.mockapi.io/collections'
      `https://632620f270c3fa390f94c420.mockapi.io/collections?page=${page}&limit=3&${category}`
     )
       .then((res) => res.json())
       .then((json) => {
         setCollection(json);
       })
       .catch((err) => {
         console.warn(err);
         alert("Error in receiving data");
       })
       //.finally(() => React.setIsLoading(false));
   }, [categoryId, page]);





  return (
    <div className="App">
      <h1>My collection of photos</h1>
      <div className="top">
        <ul className="tags">
          <li className="active">All</li>
          <li>Mountains</li>
          <li>Sea</li>
          <li>Architecture</li>
          <li>Cities</li>
        </ul>
        <input className="search-input" placeholder="Search by title" />
      </div>
      <div className="content">
        {
          collections.map((obj) => (
            <Collection
              name={obj.name}
              images={obj.photos}
            />
          ))
        }
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
