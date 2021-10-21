import React from 'react';
import { useSelector } from 'react-redux';
import Template from '../../components/template/template.component';

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return <Template />;
};

export default Dashboard;
