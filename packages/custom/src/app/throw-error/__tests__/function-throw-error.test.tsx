import { throwError } from 'packages/custom/src/app/throw-error/function-throw-error';
import { render } from '@testing-library/react';
import { CompThrowError } from 'packages/custom/src/app/throw-error/CompThrowError';

describe('function-throw-error', () => {
  it('should throw error when call function', () => {
    // 1. toThrow is the alias of toThrowError
    // 2. param
    //     1. substring of thrown error message
    //     2. regex which matches the error message
    //     3. error instance itself
    //     4. class of error instance

    // substring
    expect(() => throwError()).toThrowError('');
    expect(() => throwError()).toThrowError('some');
    expect(() => throwError()).toThrowError('some error');

    // regex
    expect(() => throwError()).toThrowError(/some error/);

    // error instance itself
    expect(() => throwError()).toThrowError(new Error('some error'));

    // class of error instance
    expect(() => throwError()).toThrowError(Error);

    // alias
    expect(() => throwError()).toThrow('some error');
  });

  it('should throw error when render component', () => {
    // need to mock console.error to clear console
    // or there is a console error will shown in console
    const originConsoleError = window.console.error;
    window.console.error = jest.fn();

    expect(() => render(<CompThrowError />)).toThrow(new Error('some error'));

    window.console.error = originConsoleError;
  });
});
