enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  headers?: Record<string, string>;
  data?: any;
  timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

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

export class HTTPTransport {
  get(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<XMLHttpRequest> {
    if (options.data && isObject(options.data)) {
      url += queryStringify(options.data);
    }
    return this.request(url, {...options, method: METHOD.GET}, options.timeout);
  }

  post(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<XMLHttpRequest> {
    return this.request(
      url,
      {...options, method: METHOD.POST},
      options.timeout
    );
  }

  put(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.PUT}, options.timeout);
  }

  patch(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<XMLHttpRequest> {
    return this.request(
      url,
      {...options, method: METHOD.PATCH},
      options.timeout
    );
  }

  delete(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<XMLHttpRequest> {
    return this.request(
      url,
      {...options, method: METHOD.DELETE},
      options.timeout
    );
  }

  request(
    url: string,
    options: Options = {method: METHOD.GET},
    timeout = 5000
  ): Promise<XMLHttpRequest> {
    const {method, data, headers = {}} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      for (const [header, value] of Object.entries(headers)) {
        xhr.setRequestHeader(header, value);
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
