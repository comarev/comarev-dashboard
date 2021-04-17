import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const wrapper = (children) => {
  const Children = children;

  return render(<Children />, { wrapper: BrowserRouter });
};

export default wrapper;
