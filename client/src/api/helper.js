import axios from 'axios';
axios.defaults.baseURL =  "http://192.168.101.5:5000";
axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("authorization");
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


class Api {

  static get = async ({ url, data, headers }) => {
    try {
      const response = await axios({
        url:`${url}`,
        method: 'get',
        data,
        headers: headers || {
          'cache-control': 'no-cache',
        },
      });
      
      return response;
    } catch (error) {
      const { response: { status } } = error || { response: {} };
  
      if (status === 404) {
        return { errors: [ { name: 'server', message: 'Request validation error.' } ] };
      }
      if (status === 400) {
        return { errors: [ { name: 'server', message: 'Resources are not available' } ] };
      }
  
      return { errors: [ { name: 'server', message: 'There is some issue, Please try after some time' } ] };
    }
  };

  static post = async ({ url, data, headers }) => {
  try {
    const response = await axios({
      url:`${url}`,
      method: 'post',
      data,
      headers: headers || {
        'cache-control': 'no-cache',
      },
    });
    
    return response;
  } catch (error) {
    // console.log(error);
    const { response: { status } } = error || { response: {} };

    if (status === 404) {
      return { errors: [ { name: 'server', message: 'Request validation error.' } ] };
    }
    if (status === 400) {
      return { errors: [ { name: 'server', message: 'Resources are not available' } ] };
    }

    return { errors: [ { name: 'server', message: 'There is some issue, Please try after some time' } ] };
  }
};

static put = async ({ url, data, headers }) => {
    try {
      const response = await axios({
        url:`${url}`,
        method: 'put',
        data,
        headers: headers || {
          'cache-control': 'no-cache',
        },
      });
  
      return response;
    } catch (error) {
      const { response: { status } } = error || { response: {} };
  
      if (status === 404) {
        return { errors: [ { name: 'server', message: 'Request validation error.' } ] };
      }
      if (status === 400) {
        return { errors: [ { name: 'server', message: 'Resources are not available' } ] };
      }
  
      return { errors: [ { name: 'server', message: 'There is some issue, Please try after some time' } ] };
    }
};

static patch = async ({ url, data, headers }) => {
    try {
      const response = await axios({
        url:`${url}`,
        method: 'patch',
        data,
        headers: headers || {
          'cache-control': 'no-cache',
        },
      }); 

      return response;

    } catch (error) {
      const { response: { status } } = error || { response: {} };
  
      if (status === 404) {
        return { errors: [ { name: 'server', message: 'Request validation error.' } ] };
      }
      if (status === 400) {
        return { errors: [ { name: 'server', message: 'Resources are not available' } ] };
      }
  
      return { errors: [ { name: 'server', message: 'There is some issue, Please try after some time' } ] };
    }
};

static remove = async ({ url, data, headers }) => {
    try {
      const response = await axios({
        url:`${url}`,
        method: 'delete',
        data,
        headers: headers || {
          'cache-control': 'no-cache',
        },
      });
      // console.log(response);
      return response;
    } catch (error) {
      const { response: { status } } = error || { response: {} };
  
      if (status === 404) {
        return { errors: [ { name: 'server', message: 'Request validation error.' } ] };
      }
      if (status === 400) {
        return { errors: [ { name: 'server', message: 'Resources are not available' } ] };
      }
  
      return { errors: [ { name: 'server', message: 'There is some issue, Please try after some time' } ] };
    }
};

}
    
export default Api;
        
