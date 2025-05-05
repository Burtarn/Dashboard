import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../components/StatisticHandleTable/StatisticHandleTable.css';
import Spinner from '../../components/Spinner/Spinner';

const StatisticHandleTable = () => {
  const [statisticsData, setStatisticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL = 'http://localhost:3000/api/statistics';

  useEffect(() => {
    async function FetchStatistics() {
      try {
        const response = await axios.get(URL);
        setStatisticsData(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    FetchStatistics();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div>Error i hämtning av data!</div>;

  return (
    <div className="statistics-container fade-in">
      <h1 className="statistics-title">Statistik</h1>
      <div className="statistics-table-wrapper">
        <table className="statistics-table">
          <thead>
            <tr>
              <th>Månad</th>
              <th>Datum</th>
              <th>Sålda produkter</th>
              <th>Prognos</th>
              <th>Intäkter</th>
              <th>Indikator</th>
            </tr>
          </thead>
          <tbody>
            {statisticsData.map((statistic, index) => (
              <tr key={index}>
                <td>{statistic.month}</td>
                <td>{statistic.date}</td>
                <td>{statistic.productsSold}</td>
                <td>{statistic.estimated}</td>
                <td>{statistic.revenue}</td>
                <td className="indicator-cell">
                  <span
                    className={`indicator-dot ${
                      statistic.revenue > statistic.estimated ? 'green' : 'red'
                    }`}
                  >
                    <i
                      className={`fa ${
                        statistic.revenue > statistic.estimated
                          ? 'fa-check-circle'
                          : 'fa-times-circle'
                      }`}
                    ></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatisticHandleTable;
