import { setupServer } from 'msw/native';
import { rest } from 'msw';
import { render, screen, waitFor } from '@testing-library/react';
import { CompWithRequest } from 'packages/custom/src/app/request/CompWithRequest';

describe('msw-case', () => {
  let requestBeCalledTimes = 0;
  const worker = setupServer(
    rest.get('/test', (req, res, ctx) =>
      res(
        ctx.json({
          firstName: 'John',
          lastName: 'Maverick',
        })
      )
    )
  );

  beforeAll(() => {
    worker.listen();
    // more info here: https://github.com/mswjs/msw/issues/719
    worker.events.on('request:start', () => {
      requestBeCalledTimes++;
    });
  });

  beforeEach(() => {
    requestBeCalledTimes = 0;
  });

  afterAll(() => {
    worker.close();
  });

  it('should call test api and handled by msw', async () => {
    render(<CompWithRequest />);

    await waitFor(() => {
      expect(
        screen.getByText('firstName: John lastName: Maverick')
      ).toBeInTheDocument();
    });
  });

  it('should call test api three times', async () => {
    render(<CompWithRequest />);

    // waiting for component render complete
    await waitFor(() => {
      expect(
        screen.getByText('firstName: John lastName: Maverick')
      ).toBeInTheDocument();
    });
    expect(requestBeCalledTimes).toBe(3);
  });

  it('should call test api failed', async () => {
    worker.use(
      rest.get('/test', (req, res, ctx) =>
        res(
          ctx.status(500),
          ctx.json({
            error: 'mock error message',
          })
        )
      )
    );

    render(<CompWithRequest />);

    await waitFor(() => {
      expect(requestBeCalledTimes).toBe(3);
    });
    expect(screen.getByText('No Data!')).toBeInTheDocument();
  });
});
