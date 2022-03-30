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
});
