// 判断是否为JSON
export function isJSON(str: any) {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj == 'object' && obj || obj === null || typeof obj === 'number') {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
  return false
}
export function getLocale() {
  interface ExtendNavigator extends Navigator {
    systemLanguage?: string;
    browserLanguage?: string;
  }

  let n: ExtendNavigator = navigator;

  const browserLanguage: string =
    n?.systemLanguage || n?.language || n?.browserLanguage || "en";
  const lang: { [key: string]: string } = {
    "en-US": "en",
    "zh-CN": "zh-cn",
    "zh-TW": "zh-cn",
  };
  return lang[browserLanguage] || "en";
}