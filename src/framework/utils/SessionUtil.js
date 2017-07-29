if (!sessionStorage) {
  console.error('not support sessionStorage');
}

const sessionCache = sessionStorage || {};

export const saveLoginFlag = code => {
  if (!code) {
    sessionCache.loginFlag = false;
  } else {
    sessionCache.loginFlag = code;
  }
};

export const getLoginFlag = () => {
  return sessionCache.loginFlag;
};

