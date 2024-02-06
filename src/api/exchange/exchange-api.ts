import { getUnixTimestamp } from "../../common/utils";
import { Fetcher } from "../fetcher";
import { IRatesResponse } from "./models/rates";
import {
  ICurrentRateResponse,
  ICachedRateInfo,
  ICurrentRate,
  convertCurrentRateResponse,
} from "./models/current-rate";

class ExchangeApi extends Fetcher {
  constructor() {
    super("https://api.apilayer.com/exchangerates_data", {
      redirect: "follow",
      headers: {
        apiKey: "LaFwyo7IDVtlCKAI4peYIhbYcJKmethw",
      },
    });
  }

  private CURRENT_RATE_CACHE_EXPIRATION_TIME = 3600;

  getRates(
    currencyFrom: string,
    currencyTo: string,
    dateStart: string,
    dateEnd: string,
  ): Promise<IRatesResponse> {
    const params = {
      base: currencyFrom,
      symbols: currencyTo,
      start_date: dateStart,
      end_date: dateEnd,
    };

    return this.get("/timeseries", { params });
  }

  getCurrentRate(
    currencyFrom: string,
    currencyTo: string,
    amount: number,
  ): Promise<ICurrentRate> {
    const currenciesCode = `${currencyFrom}${currencyTo}`;
    const cachedRateInfo = localStorage.getItem(currenciesCode);

    if (cachedRateInfo) {
      const rateInfo: ICachedRateInfo = JSON.parse(cachedRateInfo);
      const isUpToDate =
        getUnixTimestamp() - Number(rateInfo.timestamp) <
        this.CURRENT_RATE_CACHE_EXPIRATION_TIME;

      if (isUpToDate) {
        return Promise.resolve({
          rate: Number(rateInfo.rate),
          result: rateInfo.rate * amount,
        });
      }
    }

    const params = {
      from: currencyFrom,
      to: currencyTo,
      amount,
    };

    return this.get<ICurrentRateResponse>("/convert", { params })
      .then((response) => {
        localStorage.setItem(
          currenciesCode,
          JSON.stringify({
            rate: response.info.rate,
            timestamp: response.info.timestamp,
          }),
        );

        return response;
      })
      .then(convertCurrentRateResponse);
  }
}

export const exchangeApi = new ExchangeApi();
