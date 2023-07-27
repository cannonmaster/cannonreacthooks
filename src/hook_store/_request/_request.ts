import requestConfig from "@hook/requestConfig";
type ExtendedRequestOptions = RequestOptions & RequestInit;
interface RequestOptions {
  url?: string | URL;
  params?: Record<string, string | number>;
  data?: any;
  files?: File[] | undefined;
  isFormData?: boolean; // Flag to indicate if it's a form POST request
  timeout?: number; // Timeout duration in milliseconds
  offline?: boolean;
  onDataChunk?: (chunk: ReadableStreamReadResult<any>) => void;
  onBefore?: Array<(params: ExtendedRequestOptions) => any>;
  onSuccess?: Array<(data: any, params: ExtendedRequestOptions) => any>;
  onError?: (error: Error) => void;
  onFinally?: (params: ExtendedRequestOptions, data: any, error: any) => void;
  maxRetry?: number;
}
const kindOfObject = (value: any) => {
  if (Array.isArray(value)) {
    return false;
  } else if (value === null) {
    return false;
  } else {
    return typeof value === "object";
  }
};
interface ResponseData<T = any> {
  status: number;
  statusText: string;
  headers: Headers;
  data: T;
}

const kindOfString = (value: any) => {
  return typeof value === "string";
};

const delay = async (retryDelay: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, retryDelay);
  });
};

const calculateRetryDelay = (retryCount: number) => {
  const baseDelay = 500;
  const maxDelay = 5000;
  const delay = baseDelay * Math.pow(2, retryCount);
  return Math.min(delay, maxDelay);
};

const executeRequest = async (
  config: ExtendedRequestOptions,
  retry: number = 0
): Promise<any> => {
  const {
    method = "GET",
    url = "",
    params = {},
    body,
    cache,
    credentials,
    headers,
    integrity,
    keepalive,
    mode,
    redirect,
    referrer,
    referrerPolicy,
    signal,
    window,
    data,
    isFormData = false,
    timeout,
    offline,
    onDataChunk,
    maxRetry = 3,
    onBefore,
    onError,
    onSuccess,
    onFinally,
    //@ts-ignore
    ...rest
  } = config;

  const fetchImplementation = fetch;
  let processedResponse;
  let requestError;

  const {
    getCurrentCacheSize,
    getMaxCacheSize,
    getDefaultHeaders,
    getCacheTime,
    getOldestEntry,
    updateRequestCache,
    deleteRequestCache,
    baseUrl,
  } = requestConfig();
  let requestURL: URL;
  if (baseUrl()) {
    requestURL = new URL(url, baseUrl());
  } else {
    requestURL = new URL(url);
  }

  Object.keys(params).forEach((key) =>
    requestURL.searchParams.append(key, params[key].toString())
  );

  const requestOptions: RequestInit = {
    method,
    cache,
    credentials,
    integrity,
    keepalive,
    mode,
    redirect,
    referrer,
    referrerPolicy,
    window,
    headers, // Apply default headers
    body,
    signal,
  };

  const abortController = new AbortController();
  if (!signal) {
    requestOptions.signal = abortController.signal;
  }

  if (data) {
    if (data instanceof FormData) {
      requestOptions.body = data;
    } else {
      if (isFormData) {
        const formData = new FormData();

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const value = data[key];
            if (value instanceof File) {
              formData.append("file", value);
            } else if (value instanceof FileList) {
              for (let i = 0; i < value.length; i++) {
                const file = value[i];
                formData.append("file", file, file.name);
              }
            } else {
              formData.append(key, value);
            }
          }
        }
        requestOptions.body = formData;
      }

      if (!isFormData) {
        requestOptions.headers = {
          ...requestOptions.headers,
          "Content-Type": "application/json; charset=utf-8",
        };
        if (kindOfObject(data)) {
          requestOptions.body = JSON.stringify(data);
        }

        if (kindOfString(data)) {
          if (kindOfObject(JSON.parse(data))) requestOptions.body = data;

          if (!kindOfObject(JSON.parse(data)))
            throw new Error("invalid data format");
        }
      }
    }
  }
  requestOptions.headers = {
    ...getDefaultHeaders(),
    ...requestOptions.headers,
  };

  if (onBefore) {
    for (const beforeInterceptor of onBefore) {
      await beforeInterceptor(config);
    }
  }

  try {
    let response: Response;
    if (timeout) {
      const timeoutPromise = new Promise<Response>((_, reject) => {
        setTimeout(() => {
          abortController.abort();
          reject(new Error(`Request timed out after ${timeout}ms`));
        }, timeout);
      });

      const fetchPromise = fetchImplementation(requestURL.href, requestOptions);

      response = await Promise.race([timeoutPromise, fetchPromise]);
    } else {
      response = await fetchImplementation(requestURL.href, requestOptions);
    }

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    let responseData;

    if (response.body instanceof ReadableStream && onDataChunk) {
      // Create a reader for the streaming body
      const reader = response.body.getReader();
      const streamedData: any[] = [];
      // Define a function to process chunks of data as they arrive
      const processData = async (
        reader: ReadableStreamDefaultReader<any>,
        onDataChunk?: (chunk: any) => void
      ) => {
        while (true) {
          const trunk = await reader.read();
          const { done } = trunk;
          // Process the chunk of data (result.value) here if needed

          if (done) {
            break;
          }
          // streamedData.push(textDecoder.decode(value));

          if (onDataChunk) {
            streamedData.push(onDataChunk(trunk));
          }
        }
      };

      // Start processing the data from the streaming response
      await processData(reader, onDataChunk);
      responseData = streamedData as any;
      // responseData = streamedData.join("") as any as T;
    } else {
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = (await response.text()) as any;
      }
    }

    // processedResponse = responseData;
    processedResponse = {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: responseData,
    };

    // Apply response interceptors
    if (onSuccess) {
      for (const interceptor of onSuccess) {
        processedResponse = await interceptor(processedResponse, config);
      }
    }

    // if (offline && method === "GET") {
    //   this.storeLocalData(requestURL.href, processedResponse);
    // }

    if (method === "GET" && getMaxCacheSize() > 0) {
      if (getCurrentCacheSize() > getMaxCacheSize()) {
        const oldestEntry = getOldestEntry();
        if (oldestEntry) deleteRequestCache(oldestEntry);
      }
      const expiration = Date.now() + getCacheTime();
      updateRequestCache(requestURL.href, {
        data: processedResponse,
        expiresAt: expiration,
      });
    }

    return processedResponse;
  } catch (error: any) {
    if (retry < maxRetry) {
      const retryDelay = calculateRetryDelay(retry);
      await delay(retryDelay);
      return executeRequest(config, retry + 1);
    }
    requestError = error;
    if (onError) {
      requestError = await onError(error);
    }
    if (abortController) abortController.abort();

    throw new Error(
      `Request failed: ${error.message}, and the request was aborted`
    );
  } finally {
    if (onFinally) {
      await onFinally(config, processedResponse, requestError);
    }
  }
};
export type { ResponseData, ExtendedRequestOptions };
export default executeRequest;
