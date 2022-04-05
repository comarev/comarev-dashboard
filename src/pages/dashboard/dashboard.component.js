import React from 'react';
import RoleFilter from 'components/role-filter/role-filter.component';
import Template from 'components/template/template.component';
import CustomerDashboard from 'pages/dashboard/customer-dashboard.component';

const Dashboard = () => {
  return (
    <Template>
      <RoleFilter roles={['customer']}>
        <CustomerDashboard />
      </RoleFilter>
    </Template>
  );
};

export default Dashboard;
