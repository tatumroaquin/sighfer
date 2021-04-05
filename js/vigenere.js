let vigenereEncode = (...args) => {
   let text = args[0], key = args[1].value;
   let offset = 'a'.charCodeAt(0);
   let result = "";

   for(let i = 0, j = 0; i < text.length; i++, j++) {
      let p = text.substr(i, 1).toLowerCase().charCodeAt(0) - offset;
      let k = key.substr(j % key.length, 1).toLowerCase().charCodeAt(0) - offset;

      if( text.substr(i, 1).match(/[a-zA-Z]/g) ) {
         result += String.fromCharCode( ((p+k) % 26) + offset)
      } else {
         result += String.fromCharCode(p + offset);
         --j;
      }
   }

   return result;
}

let vigenereDecode = (...args) => {
   let text = args[0], key = args[1].value;
   let offset = 'a'.charCodeAt(0);
   let result = "";

   for(let i = 0, j = 0; i < text.length; i++, j++) {
      let c = text.substr(i, 1).toLowerCase().charCodeAt(0) - offset;
      let k = key.substr(j % key.length, 1).toLowerCase().charCodeAt(0) - offset;

      if( text.substr(i, 1).match(/[a-zA-Z]/g) ) {
         if( (c - k) > 0 )
            result += String.fromCharCode( (c - k) % 26 + offset);
         else
            result += String.fromCharCode( (c - k + 26) % 26 + offset);
      } else {
         result += String.fromCharCode(c + offset);
         --j;
      }
   }

   return result;
}
