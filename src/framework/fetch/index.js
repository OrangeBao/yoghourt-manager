import { message } from 'antd';
let host = '';
if (process.env.NODE_ENV === 'develop') {
  host = "http://localhost:3000";
}
export default (url, param) => {
  return fetch( host + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(param || {})
  }).then(response => {
    return response.json();
  }).then(data => {
    if (data.yogCode) {
      message.error('网络请求失败！' + JSON.stringify(data.yogMsg));
      console.error(JSON.stringify(data.yogMsg));
    } else {
      return data;
    }
  });
};