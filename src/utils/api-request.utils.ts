type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
type RequestProgress = ProgressEvent | 'UNSENT' | 'OPENED' | 'HEADERS_RECEIVED' | 'LOADING' | 'DONE'

interface APIClient {
  get: (endpoint: string, onProgress?: (event: RequestProgress) => void) => Promise<any>;
  post: (endpoint: string, data: any, onProgress?: (event: RequestProgress) => void) => Promise<any>;
  patch: (endpoint: string, data: any, onProgress?: (event: RequestProgress) => void) => Promise<any>;
  delete: (endpoint: string, onProgress?: (event: RequestProgress) => void) => Promise<any>;
  upload: ( endpoint: string, file: File, onProgress?: (event: RequestProgress) => void ) => Promise<any>;
}

function isXML(data:any) {
  try {
    // Try parsing the data as XML
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'application/xml');

    // Check for parsing errors (DOMParser does not throw an error on invalid XML)
    const parseError = doc.querySelector('parsererror');
    if (parseError) {
      // If there's a parser error, it's not valid XML
      return false;
    }
    return true;  // It's valid XML
  } catch (e) {
    return false;  // Error means not valid XML
  }
}

export const  createAPIClient = (baseURL: string, timeout = 5000, debounceDelay = 300) : APIClient => {
  
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;  // Debounce timer stored in closure

  // Helper function to handle the request
  const request = (
    method: RequestMethod, 
    endpoint: string, 
    data: any = null, 
    onProgress?: (event: RequestProgress ) => void
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `${baseURL}${endpoint}`
      xhr.open(method, url , true);

      // Set the timeout
      xhr.timeout = timeout;

     
  

      xhr.onreadystatechange = ()=>{
        
        if ( onProgress ) {

          if( data instanceof FormData ) {
            xhr.upload.onprogress = onProgress;
          }else{
            (xhr.readyState === XMLHttpRequest.UNSENT) &&  onProgress('UNSENT');
            (xhr.readyState === XMLHttpRequest.OPENED) &&  onProgress('OPENED');
            (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) &&  onProgress('HEADERS_RECEIVED');
            (xhr.readyState === XMLHttpRequest.LOADING) &&  onProgress('LOADING');
            (xhr.readyState === XMLHttpRequest.DONE) &&  onProgress('DONE');
          }
        }
       
      }

      // Handle response
      xhr.onload = () => {
        
        if (xhr.status >= 200 && xhr.status < 300) {

          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error:any) {
            reject(new Error('Failed to parse JSON response'));
          }
        } else {

          const message = `Request ${method} ${url} failed with status ${xhr.status}`

          console.error(`Error ${method} ${url}:`,xhr.response)

          reject(new Error(message));

        }
      };

      // Handle errors
      xhr.onerror = () => {
        console.error("Network error occurred. API is not accessible.");
        reject(new Error("Could not connect to the server. Please check your internet connection."));
      };

      // Handle timeout
      xhr.ontimeout = () => {
        console.error("Request timed out. The server is taking too long to respond.");
        reject(new Error("The request timed out. Please try again later."));
      };


      // Set Content-Type for POST/PATCH

      try{

        if (data) {
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(data));
        } else {
          xhr.send();
        }

      }catch(error:any){

        console.error("Network error occurred. API is not accessible.");
        reject(new Error("Could not connect to the server. Please check your internet connection."));

      }

    });
  };

  // Debounce function to delay requests
  const debounceRequest = (
    method: RequestMethod,
    endpoint: string,
    data: any,
    onProgress?: (event: RequestProgress) => void
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer); // Cancel any previous timer
      }
      debounceTimer = setTimeout(() => {
        request(method, endpoint, data, onProgress)
          .then(resolve)
          .catch(reject);
      }, debounceDelay);
    });
  };

  // API methods (with debounce applied)
  const getRequest = (endpoint: string, onProgress?: (event: RequestProgress) => void): Promise<any> => {
    return debounceRequest('GET', endpoint, null, onProgress);
  };

  const postRequest = (endpoint: string, data: any, onProgress?: (event: RequestProgress) => void): Promise<any> => {
    return debounceRequest('POST', endpoint, data, onProgress);
  };

  const patchRequest = (endpoint: string, data: any, onProgress?: (event: RequestProgress) => void): Promise<any> => {
    return debounceRequest('PATCH', endpoint, data, onProgress);
  };

  const deleteRequest = (endpoint: string, onProgress?: (event: RequestProgress) => void): Promise<any> => {
    return debounceRequest('DELETE', endpoint, null, onProgress);
  };


  const uploadRequest = ( endpoint: string, file: File, onProgress?: (event: RequestProgress) => void): Promise<any> => {
    // Create FormData and append the file
    const formData = new FormData();
    formData.append('file', file);
    return debounceRequest('POST', endpoint, formData , onProgress);
  };

  return {
    get: getRequest,
    post: postRequest,
    patch: patchRequest,
    delete: deleteRequest,
    upload: uploadRequest
  };
}
