import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { convertUSDToPLN } from './../../utils/convertUSDToPLN';
import { convertPLNToUSD } from './../../utils/convertPLNToUSD';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';

  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from='PLN' to='USD' amount={5} />);
      });

    it('should render correct conversion', () => {
        const testCases = [
            { amount: 100, from: 'PLN', to: 'USD' },
            { amount: 20, from: 'USD', to: 'PLN' },
            { amount: 200, from: 'PLN', to: 'USD' },
            { amount: 345, from: 'USD', to: 'PLN' },
            { amount: 345, from: 'PLN', to: 'PLN' },
            { amount: 345, from: 'USD', to: 'USD' },
            { amount: -1, from: 'PLN', to: 'USD' },

      ];
      
      for(const testObj of testCases) {
        
        render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
        const conversedAmount = testObj.from === testObj.to ? formatAmountInCurrency(testObj.amount,testObj.from): testObj.to === 'PLN' ? convertUSDToPLN(testObj.amount) : convertPLNToUSD(testObj.amount)
        const fromAmmountFormatted = formatAmountInCurrency(testObj.amount,testObj.from);

        const div = screen.getByTestId('divBox');
        expect(div).toHaveTextContent(testObj.amount < 0 ? "Wrong value…" : `${fromAmmountFormatted} = ${conversedAmount}`);
        cleanup();
      }
    })
});