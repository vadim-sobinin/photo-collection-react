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
    setIsLoading(true);
    fetch(
      // 'https://632620f270c3fa390f94c420.mockapi.io/vadim-sobinin/collections'
      `https://632620f270c3fa390f94c420.mockapi.io/vadim-sobinin/collections?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollection(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error in receiving data");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);





  return (
    <div className="App">
      <h1>My collection of photos</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, i) => (
              <li onClick={() => setCategoryId(i)} className={categoryId === i ? "active" : ""} key={obj.name}>{obj.name}</li>))
          }
        </ul>
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input" placeholder="Search by title" />
      </div>
      <div className="content">
        {isLoading ? <h2>Page is loading...</h2> : (

          collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase())
          ).map((obj, index) => (
            <Collection
              key={index}
              name={obj.name}
              images={obj.photos}
            />
          ))
        )}
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((_, i) => (<li onClick={() => setPage(i + 1)} className={page === i + 1 ? "active" : ""}>{i + 1}</li>))
        }
      </ul>
    </div>
  );
}

export default App;
