import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, {
  retries: 1,
  retryDelay: (retryCount) => {        
    return retryCount * 3000;
  },
  shouldResetTimeout:true,
  retryCondition: (error)=>{        
    console.log(error.config)
    return (error.config.method === 'get' || error.config.method === 'post');
  }
})


//响应拦截
axios.interceptors.response.use(undefined, function(err) {
    var config = err.config;
    if(!config || !config.retry) return Promise.reject(err);
    
    config.__retryCount = config.__retryCount || 0;
    
    if(config.__retryCount >= config.retry) {
        return Promise.reject(err);
    }
    config.__retryCount += 1;
    
    //间隔重连
    var backoff = new Promise(function(resolve) {
      setTimeout(function() {
          resolve();
      }, config.retryDelay || 1);
    });
    
    return backoff.then(function() {
      return axios(config);
    });
});

export default axios;