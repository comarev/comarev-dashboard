import React from 'react';
import RoleFilter from '../../components/role-filter/role-filter.component';
import Template from '../../components/template/template.component';
import CustomerDashboard from './customer-dashboard.component';

const Dashboard = () => {
  return (
    <Template>
      <FilterComponent roles={['customer']}>
        <CustomerDashboard />
      </FilterComponent>
    </Template>
  );
};

export default Dashboard;
