import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Root from './pages/Root';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import ProfileManagement from './components/ProfileManagement';
import UserManagement from './components/UserManagement';
import AdminDashboard from './components/AdminDashboard';
import Reports from './components/Reports';
import ViewUser from './components/ViewUser';
import VendorManagement from './components/VendorManagement';
import ViewVendor from './components/ViewVendor';
import Delivery from './components/delivery';
import DeliveryPartnerDetails from './components/deliveryPartnerDetails';
import DeliveryPartnerOrderDetails from './components/deliveryPartnerOrderDetails';
import ViewDeliveryPartner from './components/viewDeliveryPartner';

function App() {
  const isUserLoggedIn = localStorage.getItem('token');

  const routes = createBrowserRouter([
    { 
      path: '/', 
      element: isUserLoggedIn ? <Navigate to="/dashboard" replace /> : <Root />, 
      children: [
        { path: '/', element: isUserLoggedIn ? <Navigate to="/dashboard" replace /> : <Login /> },
      ]
    },
    {
      path: '/dashboard', 
      element: isUserLoggedIn ? <Dashboard /> : <Navigate to="/" replace />, 
      children: [
        { path: '', element: <AdminDashboard /> },
        { path: 'profile-management', element: <ProfileManagement /> },
        { path: 'user-management', element: <UserManagement /> },
        { path: 'view-user', element: <ViewUser /> },
        { path: 'vendor-management', element: <VendorManagement /> },
        { path: 'view-vendor', element: <ViewVendor /> },
        { path: 'reports', element: <Reports /> },
        { path: 'delivery-partner-management', element: <Delivery /> },
        { path: 'delivery-partner-details', element: <ViewDeliveryPartner /> },
        { path: 'view-delivery-partner', element: <DeliveryPartnerDetails /> },
        { path: 'view-delivery-partner-order-details', element: <DeliveryPartnerOrderDetails /> }
      ]
    },
  ]);

  return (
    <RouterProvider router={routes} />
  );
}

export default App;
