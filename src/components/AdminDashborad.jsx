import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import AdminPostShipment from './AdminPostShipment';
import "../CSS/AdminDashboard.css";
import AdminProfile from './AdminProfile';
import ManageShipments from './ManageShipments';
import { Context } from './Context';
import AdminSignup from './AdminSignUp';
import { adminLogout } from '../Features/Slice';
import { useDispatch } from 'react-redux';


const AdminDashboard = () => {
  const { adminMenu, setAdminMenu, setAdminToken } = useContext(Context);
  const dispatch = useDispatch()
  const handleLogout = () => {
    Swal.fire({
      // title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
       dispatch(adminLogout()); // Perform the logout action
        Swal.fire(
          'Logged Out!',
          'You have been logged out.',
          'success'
        );
      }
    });
  };

  return (
    <div className='AdminDashboard'>
      <div className='AdminDashboardMenu'>
        <p className="AdminDashboardMenuP" style={{ color: "rgba(0,0,0,0.7", cursor: "none" }}>Hi, Admin Name </p>
        <p onClick={() => setAdminMenu(0)} className={adminMenu === 0 ? 'AdminDashboardMenuPActive' : 'AdminDashboardMenuP'}>Admin Info</p>
        <p onClick={() => setAdminMenu(1)} className={adminMenu === 1 ? 'AdminDashboardMenuPActive' : 'AdminDashboardMenuP'}>Post Shipment</p>
        <p onClick={() => setAdminMenu(2)} className={adminMenu === 2 ? 'AdminDashboardMenuPActive' : 'AdminDashboardMenuP'}>Manage Shipments</p>
        <p onClick={() => setAdminMenu(3)} className={adminMenu === 3 ? 'AdminDashboardMenuPActive' : 'AdminDashboardMenuP'}>Register an Admin</p>
        <p onClick={handleLogout} className='AdminDashboardMenuP'>Logout</p>
      </div>
      <div className='AdminDashboardContentWrap'>
        {adminMenu === 0 && <AdminProfile />}
        {adminMenu === 1 && <AdminPostShipment />}
        {adminMenu === 2 && <ManageShipments />}
        {adminMenu === 3 &&<AdminSignup/>}
      </div>
    </div>
  );
};

export default AdminDashboard;
