
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Root from './pages/Root'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import ProfileManagement from './components/ProfileManagement'
import UserManagement from './components/UserManagement'
import AdminDashboard from './components/AdminDashboard'
import Reports from './components/Reports'
import ViewUser from './components/ViewUser'
import VendorManagement from './components/VendorManagement'
import ViewVendor from './components/ViewVendor'
function App() {
  const routes = createBrowserRouter([
    { path: '/', element: <Root />, children: [
      {path: '/', element: <Login />},
    ]},
    {
      path: '/dashboard', element: <Dashboard />, children: [
        { path: '', element: <AdminDashboard />},
        { path: 'profile-management', element: <ProfileManagement />},
        { path: 'user-management', element: <UserManagement />},
        { path: 'view-user', element: <ViewUser />},
        { path: 'vendor-management', element: <VendorManagement />},
        { path: 'view-vendor', element: <ViewVendor />},
        { path: 'reports', element: <Reports />}
      ]
    },
  ])

  return (
    <RouterProvider router={routes} />
  )
}

export default App
