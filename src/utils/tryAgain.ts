/**
 *
 * @param func 要重试的方法
 * @param msg 相关信息
 * @param time 重试次数
 * @param args 携带的参数
 */
const tryAgain = async (func, msg, time, ...args) => {
  try {
    return await func(...args);
  } catch (err) {
    console.log(msg + '失败');
    if (time > 0) {
      console.log(`${msg}第${time}次重试`);
      return await tryAgain(func, msg, --time, ...args);
    } else {
      console.log(`失败次数过多`, err);
    }
  }
};

export default tryAgain;
