export interface ICurrentRateResponse {
  success: boolean;
  query: {
    from: string;
    to: string;
    amount: number;
  },
  info: {
    timestamp: number;
    rate: number;
  };
  date: string; // yyyy-mm-dd
  result: number;
}

export interface ICachedRateInfo {
  rate: number;
  timestamp: string;
}

export interface ICurrentRate {
  result: number;
  rate: number;
}

export function convertCurrentRateResponse(response: ICurrentRateResponse): ICurrentRate {
  return {
    result: response.result,
    rate: response.info.rate,
  }
}
