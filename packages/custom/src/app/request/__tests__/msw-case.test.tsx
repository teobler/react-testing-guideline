import { setupServer } from 'msw/native';
import { rest } from 'msw';
import { render, screen, waitFor } from '@testing-library/react';
import { MswCase } from 'packages/custom/src/app/request/msw-case';

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
  });

  beforeEach(() => {
    requestBeCalledTimes = 0;
  });

  afterAll(() => {
    worker.close();
  });

  it('should call test api and handled by msw', async () => {
    render(<MswCase />);

    await waitFor(() => {
      expect(
        screen.getByText('firstName: John lastName: Maverick')
      ).toBeInTheDocument();
    });
  });

  it('should call test api three times', async () => {
    // more info here: https://github.com/mswjs/msw/issues/719
    worker.events.on('request:start', () => {
      requestBeCalledTimes++;
    });

    render(<MswCase />);

    // waiting for component render complete
    await waitFor(() => {
      expect(
        screen.getByText('firstName: John lastName: Maverick')
      ).toBeInTheDocument();
    });
    expect(requestBeCalledTimes).toBe(3);
  });
});
