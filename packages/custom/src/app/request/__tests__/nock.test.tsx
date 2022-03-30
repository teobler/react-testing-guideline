import nock from 'nock';
import { render, screen, waitFor } from '@testing-library/react';
import { CompWithRequest } from 'packages/custom/src/app/request/CompWithRequest';

describe('nock', () => {
  it('should call nock handler when send request by component', async () => {
    // your request must 100% match nock scope, then you test can pass
    const scope = nock('http://localhost').get('/test').times(3).reply(200, {
      firstName: 'John',
      lastName: 'Maverick',
    });

    render(<CompWithRequest />);

    await waitFor(() => {
      expect(
        screen.getByText('firstName: John lastName: Maverick')
      ).toBeInTheDocument();
    });
    expect(scope.isDone()).toBeTruthy();
  });
});
