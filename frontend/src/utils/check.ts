import { message} from 'antd';

export const checkStatus = (response) => {
    if (response.status == 401 && localStorage.permissions) {
      localStorage.permissions = "";
      message.info('请重新登录');
      location.reload()
    }
    return response
  }
  