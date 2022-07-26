// count-bytes.js
/**
 *
 * @param {String} text バイト数をカウントしたいテキスト
 * @param {Number} num カウントしたい文字数をバイト数換算した時のインデックス
 * @returns
 */
export default function (text, num) {
  let length = 0;
  let targetIndex = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (
      (c >= 0x0 && c < 0x81) ||
      c === '0xf8f0' ||
      (c >= '0xff61' && c < '0xffa0') ||
      (c >= '0xf8f1' && c < '0xf8f4')
    ) {
      length += 1;
    } else {
      length += 2;
    }
    if (length > num) targetIndex = i;
  }
  return { length, targetIndex };
}
