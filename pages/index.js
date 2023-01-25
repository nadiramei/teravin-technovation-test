import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Home() {
  var [data, setData] = useState([]);
  var [searchTerm, setSearchTerm] = useState('');
  var [filteredData, setFilteredData] = useState(data);
  
  var [sortOrder, setSortOrder] = useState('asc');
  var [sortColumn, setSortColumn] = useState(null);

  function handleSearchSubmit(event) {
    event.preventDefault();

    axios.post("http://localhost:3000/api/search", {
      searchTerm: searchTerm
    }).then((res) => {
      setFilteredData(res.data);
    })
  }


  const handleSort = (column) => {
      if (sortColumn === column) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
          setSortColumn(column);
          setSortOrder('asc');
      }
  };

  const sortedData = data.sort((a, b) => {
      if (sortOrder === 'asc') {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else {
          return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/form")
      .then((res) => {
        setData(res.data.result);
        setFilteredData(res.data.result);
      })
  }, []);
  return (
    <div>
      <Head>
        <title>User Form App</title>
        <meta name="description" content="user form app created for Teravin Technovation's developer test" />
      </Head>

      <main>
        {data.length > 0 ?
          <div>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
            <button onClick={handleSearchSubmit}>Search</button>
            <table>
              <thead>
                  <tr>
                    <th onClick={() => handleSort('name')}>
                      Name ⇵
                    </th>
                    <th onClick={() => handleSort('email')}>
                      Email ⇵
                    </th>
                  </tr>
              </thead>
              <tbody>
                  {filteredData.length > 0 && filteredData.map((row, index) => (
                      <tr key={index}>
                          <td>{row.name}</td>
                          <td>{row.email}</td>
                      </tr>
                  ))}
              </tbody>
            </table>
            {filteredData.length < 1 && <span>The data you're looking for does not exist<br/></span>}
            <button onClick={() => window.location.href = "http://localhost:3000/form"}>Add</button>
          </div>
          :
          <div className='center-text'>
            <p>There are currently no data. Create new data by clicking the ADD button below.</p>
            <button onClick={() => window.location.href = "http://localhost:3000/form"}>Add</button>
          </div>
        }
      </main>

    </div>
  )
}
