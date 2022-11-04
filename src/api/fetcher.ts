type ParamsType = Record<string, string | number | boolean>;
type RequestType = RequestInit & { params?: ParamsType }

export class Fetcher {
  constructor(
    public baseUrl: string,
    public defaultRequestOptions: RequestInit = {},
  ) {}

  private async request<TResponse>(url: string = '', options: RequestType = {}): Promise<TResponse> {
    const {
      headers = {},
      method = 'GET',
      params,
      ...restOptions
    } = options;

    const reqOptions: RequestInit = {
      method,
      headers: {
        ...this.defaultRequestOptions.headers,
        ...headers,
      },
      ...restOptions,
    };

    const queryParams = this.stringifyParams(params);
    const response = await fetch(`${this.baseUrl}${url}${queryParams}`, reqOptions);

    return this.handleResponse<TResponse>(response);
  }

  private async handleResponse<TResponse>(response: Response): Promise<TResponse> {
    const text = await response.text();
    const data = text && JSON.parse(text);
    
    if (!response.ok) {
      console.error('handleResponse error:', data || response);
      const error: string = (data?.error?.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  }

  public stringifyParams(data?: ParamsType): string {
    if (!data) return '';

    const params = Object
      .entries(data)
      .map(([param, value]) => `${param}=${value}`)
      .join('&');

    return `?${params}`;
  }

  public get<TResponse>(url: string, options: RequestType = {}): Promise<TResponse> {
    return this.request<TResponse>(url, { method: 'GET', ...options });
  }
}
