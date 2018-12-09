import { CurrencyMasterModule } from './currency-master.module';

describe('CurrencyMasterModule', () => {
  let currencyMasterModule: CurrencyMasterModule;

  beforeEach(() => {
    currencyMasterModule = new CurrencyMasterModule();
  });

  it('should create an instance', () => {
    expect(currencyMasterModule).toBeTruthy();
  });
});
