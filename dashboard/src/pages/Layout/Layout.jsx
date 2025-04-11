
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import '../../components/Sidebar/Sidebar.css';

const Layout = () => {
  return (
    <div className="layout-with-sidebar">
      <Sidebar />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
