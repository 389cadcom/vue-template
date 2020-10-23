import CryptoJS from 'crypto-js'
// import Hex from 'crypto-js/enc-hex'

var key = CryptoJS.enc.Hex.parse('c02b8c944d15483d9a7a1d3b5e47e390')
var iv  = CryptoJS.enc.Hex.parse('48f569b8d00a4899b74e82fba015d219')
export default {
  MD5: (str)=>{
    return CryptoJS.MD5(str).toString().toUpperCase()
    // return crypto.createHash("md5").update(str).digest("hex").toUpperCase();
  },
  /**
   * AES加密
   */
  encrypt: (data) => {
    var result = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return result.toString()                    //base64

    // return result.ciphertext.toString()      //十六进制
  },
  dectypt: (data) => {
    var result = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,                  //默认cbc模式
      padding: CryptoJS.pad.Pkcs7
    })

    return result.toString(CryptoJS.enc.Hex)
    
    // CryptoJS.enc.Utf8.stringify(str);
  },
  /**
   * js二进制类型: base64, blob, file, arraybuffer
   * 
   * atob(base64)   data:image/png;base64,
   * btoa(str)      
   * 
   * 1.file   --> base64        reader.readAsDataURL()
   * 2.file   --> arraybuffer   reader.readAsArrayBuffer()   blob.arraybuffer()
   * 3.buffer --> blob          new Blob([buf])              buf = Int8Array(6) [49, 50, 51, 52, 53, 54]
   * 4.base64 --> file
   * 
   * file = new File([buf], filename, {type:type})
   * var formdata = new FormData()
   * fd.append('file', file, 'image.png')
   */
  dataURIToBlob: (dataUrl) => {
    let type   = dataUrl.match(/data:([^;]+)/)[1]
    let base64 = dataURI.replace(/^[^,]+,/, '');
    let byte   = atob(base64)

    let ia = new Uint8Array(byte.length)
    for (let i = 0; i < byte.length; i++) {   //while(len--)
      ia[i] = byte.charCodeAt(i)
    }
    return new Blob([ia], {type: type})
  }
}