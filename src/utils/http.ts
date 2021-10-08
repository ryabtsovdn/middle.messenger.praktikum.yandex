enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  headers?: Record<string, string | undefined>;
  data?: any;
  timeout?: number;
  responseType?: XMLHttpRequestResponseType;
  withCredentials?: boolean;
  signal?: AbortSignal;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export type Response<T = unknown> = {
  status: number;
  statusText: string;
  data: T;
};

const queryStringify = (obj: Record<string, any>) => {
  const keys = Object.keys(obj);
  if (!keys.length) return;

  return (
    '?' +
    keys
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&')
  );
};

const isObject = (data: any): boolean =>
  typeof data === 'object' && data !== null && !Array.isArray(data);

function createResponse<T>(xhr: XMLHttpRequest): Response<T> {
  return {
    status: xhr.status,
    statusText: xhr.statusText,
    data: xhr.response,
  };
}

export default class HTTPTransport {
  static BASE_URL = 'https://ya-praktikum.tech/api/v2';

  private _apiURL: string;

  constructor(pathname: string) {
    this._apiURL = HTTPTransport.BASE_URL + pathname;
  }

  get<DataType>(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<Response<DataType>> {
    if (options.data && isObject(options.data)) {
      url += queryStringify(options.data);
    }
    return this.request<DataType>(
      url,
      {...options, method: METHOD.GET},
      options.timeout
    );
  }

  post<DataType>(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<Response<DataType>> {
    return this.request<DataType>(
      url,
      {...options, method: METHOD.POST},
      options.timeout
    );
  }

  put<DataType>(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<Response<DataType>> {
    return this.request<DataType>(
      url,
      {...options, method: METHOD.PUT},
      options.timeout
    );
  }

  patch<DataType>(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<Response<DataType>> {
    return this.request<DataType>(
      url,
      {...options, method: METHOD.PATCH},
      options.timeout
    );
  }

  delete<DataType>(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<Response<DataType>> {
    return this.request<DataType>(
      url,
      {...options, method: METHOD.DELETE},
      options.timeout
    );
  }

  request<DataType>(
    url: string,
    options: Options = {method: METHOD.GET},
    timeout = 5000
  ): Promise<Response<DataType>> {
    const {
      method,
      data,
      headers = {},
      responseType = 'json',
      withCredentials = true,
    } = options;
    url = `${this._apiURL}${url}`;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      if (!('Content-Type' in headers)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      for (const [header, value] of Object.entries(headers)) {
        value && xhr.setRequestHeader(header, value);
      }

      xhr.withCredentials = withCredentials;
      xhr.responseType = responseType;

      xhr.onload = function () {
        if (xhr.status >= 400 && xhr.status <= 599) {
          reject(createResponse<DataType>(xhr));
        } else {
          resolve(createResponse<DataType>(xhr));
        }
      };

      function abort() {
        xhr.abort();
      }

      if (options.signal) {
        options.signal.addEventListener('abort', abort);

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            options.signal?.removeEventListener('abort', abort);
          }
        };
      }

      function handleError(): void {
        reject(createResponse<DataType>(xhr));
      }

      xhr.timeout = timeout;
      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.ontimeout = handleError;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        let _data = data;
        if (
          !('Content-Type' in headers) ||
          headers['Content-Type'] === 'application/json'
        ) {
          _data = JSON.stringify(data);
        }
        xhr.send(_data);
      }
    });
  }
}
