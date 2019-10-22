import Vue from 'vue';
import Axios from 'axios';
<%_ if (ui === 'element') { _%>
import { Message } from 'element-ui';
<%_ } else if (ui === 'vuetify') { _%>
import Snackbar from '../components/snackbar/index';
<%_ } _%>

Vue.prototype.$http = Axios;

const service = Vue.prototype.$http.create({
  headers: {
    'content-type': Vue.prototype.contentType || 'application/json;charset=utf-8',
  },
});

/* eslint-disable no-param-reassign */
service.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');

  if (token) {
    request.headers.Authorization = `${Vue.prototype.authType || 'Bearer'} ${token}`;
  }

  return request;
});

service.interceptors.response.use(response => response, (error) => {
  console.log('http error', error);
  return Promise.reject(error.status ? error : error.response || error);
});

function access(url, param, method, extraParameter = {}) {
  param = param || {};
  // if (window.location.search.indexOf('debug') > -1) {
  //   param.debug = true;
  // }

  let ret = null;
  const upperMethod = method.toUpperCase();

  /* eslint-disable no-underscore-dangle */
  const __randNum = Math.random();
  // console.log('>>>>extraParameter:', extraParameter);

  if (upperMethod === 'POST') {
    ret = service.post(url, param, { ...extraParameter, params: { __randNum } });
  } else if (upperMethod === 'PUT') {
    ret = service.put(url, param, { ...extraParameter, params: { __randNum } });
  } else if (upperMethod === 'DELETE') {
    ret = service.delete(url, { params: { ...param, __randNum } });
  } else {
    ret = service.get(url, { params: { ...param, __randNum } });
  }

  return ret.then((res) => {
    // Note:
    // When successful, the body data is returned;
    // when it fails, it returns res,
    // in order to ensure the same as the return value of the http request error.
    if (res.data && res.data.ok) {
      return res.data;
    }

    return Promise.reject(res);
  }, (res) => {
    // FIXME: This is not the best method.
    let errMsg = '';
    const { status } = res;

    if (status === 401) {
      errMsg = '您无权访问该页面';
    } else if (status === 403) {
      errMsg = '禁止访问';
    } else if (status === 404) {
      errMsg = '您访问的页面不存在了';
    } else if (status === 500) {
      errMsg = '服务器出了一点问题，请联系管理员';
    }

    if (errMsg) {
      <%_ if (ui === 'element') { _%>
      Message.error(errMsg);
      <%_ } else if (ui === 'vuetify') { _%>
      Snackbar.error(errMsg);
      <%_ } _%>
    }

    // Throw it again so you can handle it later.
    return Promise.reject(res);
  });
}

export default {
  get(url, param) {
    return access(url, param, 'get');
  },
  delete(url, param) {
    return access(url, param, 'delete');
  },
  post(url, param, extraParameter) {
    return access(url, param, 'post', extraParameter);
  },
  put(url, param, extraParameter) {
    return access(url, param, 'put', extraParameter);
  },
};
