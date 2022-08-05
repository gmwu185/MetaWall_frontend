const isThrowError = ({ msgStr = '', isThrow = true }) => {
  /** 自定錯誤與中斷 JS 操作
   * 函式傳入物件做為預設值。
   * isThrow false 不中斷，可做為判斷條件錯誤，但 JS 可不中斷，做為提示使用
   * 函式 throw 中斷 JS 運作，錯誤統一傳到 try catch error 中
   */
  let error = new Error('發生錯誤：');
  // console.dir('error', error);
  error.message += `${msgStr}`;
  if (isThrow) throw error;
};

export { isThrowError };
