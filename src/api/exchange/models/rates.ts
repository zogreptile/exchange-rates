export type RateDate = string;
export type RateValue = Record<string, number>;
export type Rates = Record<RateDate, RateValue>;

export interface IRatesResponse {
  success: boolean;
  timeseries: boolean;
  start_date: string; // yyyy-mm-dd
  end_date: string; // yyyy-mm-dd
  base: string;
  rates: Rates;
};
