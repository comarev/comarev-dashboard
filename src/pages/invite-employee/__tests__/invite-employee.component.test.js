import wrapper from 'test/test-utils';
import InviteEmployee from '../invite-employee.component';

describe('<InviteEmployee />', () => {
  it('renders correctly', () => {
    const rendered = wrapper(InviteEmployee);
    expect(rendered.container).toMatchSnapshot();
  });
});
