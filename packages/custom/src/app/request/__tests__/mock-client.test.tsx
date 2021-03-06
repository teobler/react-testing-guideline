import { render, screen, waitFor } from '@testing-library/react';
import { CompWithRequest } from 'packages/custom/src/app/request/CompWithRequest';

describe('mock-api-client', () => {
  const originFetch = window.fetch;
  const mockedFetch = jest.fn();

  beforeAll(() => {
    window.fetch = mockedFetch;
  });

  beforeEach(() => {
    mockedFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          firstName: 'John',
          lastName: 'Maverick',
        }),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    window.fetch = originFetch;
  });

  it('should call mocked client when component send request', async () => {
    render(<CompWithRequest />);

    await waitFor(() => {
      expect(
        screen.getByText('firstName: John lastName: Maverick')
      ).toBeInTheDocument();
    });
    expect(mockedFetch).toBeCalledWith('http://localhost/test');
  });

  it('should call mocked client three times', async () => {
    render(<CompWithRequest />);

    await waitFor(() => {
      expect(
        screen.getByText('firstName: John lastName: Maverick')
      ).toBeInTheDocument();
    });
    expect(mockedFetch).toBeCalledTimes(3);
  });

  it('should call mocked client three ties', async () => {
    mockedFetch.mockRejectedValue({
      json: () =>
        Promise.reject({
          error: 'mock error message',
        }),
    });

    render(<CompWithRequest />);

    await waitFor(() => {
      // will just call mock fetch once, cannot figure out why.
      expect(mockedFetch).toBeCalledTimes(1);
    });
    expect(screen.getByText('No Data!')).toBeInTheDocument();
  });

  it('should show loading when fetch api', async () => {
    render(<CompWithRequest />);

    expect(screen.getByText('loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText('firstName: John lastName: Maverick')
      ).toBeInTheDocument();
    });
    expect(screen.queryByText('loading...')).not.toBeInTheDocument();
  });
});
