import React from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { CategoryScale, Chart } from 'chart.js/auto';
import Barchart from './components/charts/Barchart';
import PieChart from './components/charts/Piechart';


const Dashboard = () => {
  Chart.register(CategoryScale)

  // Data Table Data
  const data = [
    {
      Name: 'John Doe',
      Age: 30,
      City: 'New York',
    },
    // Add more data rows as needed...
  ];

  const columns = [
    {
      Header: 'Name',
      accessor: 'Name',
    },
    {
      Header: 'Age',
      accessor: 'Age',
    },
    {
      Header: 'City',
      accessor: 'City',
    },
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav id="sidebar" className="bg-light">
        <div className="sidebar-header">
          <h3>Dashboard</h3>
        </div>
        <ul className="list-unstyled components">
          <li>
            <Link to="/dashboard">Dashboard Home</Link>
          </li>
          <li>
            <Link to="/pie-chart">Pie Chart</Link>
          </li>
          <li>
            <Link to="/bar-chart">Bar Chart</Link>
          </li>
        </ul>
      </nav>

      {/* Page Content */}
      <div id="content" className="p-4">
        <h1>Dashboard Content</h1>

        {/* Bar Chart */}
        <div className="mb-4">
          <Barchart />
          <PieChart />
        </div>

        {/* Data Table */}
        <div>
          <h2>Data Table</h2>
          <table {...getTableProps()} className="table table-bordered">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
