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

  it('should console error when nock return error', async () => {
    const scope = nock('http://localhost').get('/test').times(3).reply(500, {
      error: 'mock error message',
    });

    render(<CompWithRequest />);

    await waitFor(() => {
      expect(scope.isDone()).toBeTruthy();
    });
    expect(screen.getByText('No Data!')).toBeInTheDocument();
  });

  it('should show loading when fetch api', async () => {
    const scope = nock('http://localhost')
      .get('/test')
      .delay(200)
      .times(3)
      .reply(200, {
        firstName: 'John',
        lastName: 'Maverick',
      });

    render(<CompWithRequest />);

    expect(screen.getByText('loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText('firstName: John lastName: Maverick')
      ).toBeInTheDocument();
    });
    expect(screen.queryByText('loading...')).not.toBeInTheDocument();
    expect(scope.isDone()).toBeTruthy();
  });
});
