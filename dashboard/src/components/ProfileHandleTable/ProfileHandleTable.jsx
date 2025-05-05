import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import '../../components/ProfileHandleTable/ProfileHandleTable.css';

const ProfileHandleTable = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL = 'http://localhost:3000/api/profiles';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setData(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div><Spinner /></div>;
  }

  if (error) {
    return <div>Error i hämtning av data!</div>;
  }

  return (
    <div className="main-content">
      <div className="table-container fade-in">
        <h1 className="userTable-text">Usertable</h1>
        <div className="table-container">
          <table className="user-table fade-in">
            <thead>
              <tr>
                <th>Namn</th>
                <th>Användarnamn</th>
                <th>Startdatum</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.startDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfileHandleTable;
