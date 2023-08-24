import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { CategoryScale, Chart } from 'chart.js/auto';
import Barchart from './components/charts/Barchart';
import PieChart from './components/charts/Piechart';

// Import React Bootstrap components and styles
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import '../../styles/dashboard.css';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

const Dashboard = () => {
  // Register CategoryScale
  Chart.register(CategoryScale);

  // State to manage sidebar collapse
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [menuCollapse, setMenuCollapse] = useState(false)
  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(prevState => !prevState);
  };

  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  // Sample data for the table
  const data = [
    {
      Name: 'John Doe',
      Age: 30,
      City: 'New York',
    },
    {
      Name: 'Jane Smith',
      Age: 25,
      City: 'Los Angeles',
    },
    {
      Name: 'Bob Johnson',
      Age: 35,
      City: 'Chicago',
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
    <Container fluid>
    <Row>
      {/* <Col id="sidebar" className={`bg-light ${isSidebarCollapsed ? 'toggled' : ''}`} md={3}> */}
        {/* <div className="sidebar-header">
          <h3>Dashboard</h3>
        </div> */}
        {/* <Nav className="flex-column">
          <Nav.Item>
            <Nav.Link as={Link} to="/dashboard">Dashboard Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/pie-chart">Pie Chart</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/bar-chart">Bar Chart</Nav.Link>
          </Nav.Item>
        </Nav> */}

      {/* </Col> */}
      <Sidebar >
  <Menu
    menuItemStyles={{
      button: {
        // the active class will be added automatically by react router
        // so we can use it to style the active menu item
        [`&.active`]: {
          backgroundColor: '#13395e',
          color: '#b6c8d9',
        },
      },
    }}
  >
    <MenuItem component={<Link to="/documentation" />}> Documentation</MenuItem>
    <MenuItem component={<Link to="/calendar" />}> Calendar</MenuItem>
    <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
  </Menu>
</Sidebar>
      <Col id="content" className={`p-4 ${isSidebarCollapsed ? 'toggled' : ''}`}>
        <Button className="btn btn-dark btn-toggle-sidebar d-md-none" onClick={toggleSidebar}>
          {/* Add an icon for the toggle button, e.g., a hamburger menu icon */}
          ☰
        </Button>
        <h1>Dashboard Content</h1>

        <Row>
          <Col md={6}>
            <div className="mb-4">
              <Barchart />
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-4">
              <PieChart />
            </div>
          </Col>
        </Row>

          {/* Data Table */}
          <Row>
            <Col>
              <h2>Data Table</h2>
              <table {...getTableProps} className="table table-bordered">
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps}>
                      {headerGroup.headers.map(column => (
                        <th key={column.id} {...column.getHeaderProps}>{column.render('Header')}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps}>
                  {rows.map(row => {
                    prepareRow(row);
                    return (
                      <tr key={row.id} {...row.getRowProps}>
                        {row.cells.map(cell => {
                          return (
                            <td {...cell.getCellProps}>{cell.render('Cell')}</td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
