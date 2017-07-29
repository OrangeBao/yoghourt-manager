const host = "http://localhost:3000";
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
    return data;
  });
};