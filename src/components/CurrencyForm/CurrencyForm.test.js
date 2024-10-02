import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '@testing-library/react';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });

  it('should run action callback with proper data on form submit', () => {
    
    const testCases = [
        { amount: '100', from: 'PLN', to: 'USD' },
        { amount: '20', from: 'USD', to: 'PLN' },
        { amount: '200', from: 'PLN', to: 'USD' },
        { amount: '345', from: 'USD', to: 'PLN' },
  ];



    for(const testObj of testCases) {
        const action = jest.fn();
        render(<CurrencyForm action={action} />);
        const submitButton = screen.getByText('Convert');

        const textInput = screen.getByTestId('amount-input');
        const selectFrom = screen.getByTestId('from');
        const selectTo = screen.getByTestId('to');

        userEvent.type(textInput, testObj.amount);
        userEvent.selectOptions(selectFrom, testObj.from);
        userEvent.selectOptions(selectTo, testObj.to);
        userEvent.click(submitButton);
        
        expect(action).toHaveBeenCalledTimes(1);
        expect(action).toHaveBeenCalledWith({ amount: parseInt(testObj.amount), from: testObj.from, to: testObj.to });
        cleanup();
    }
  });
  

});