let b64encode = (...args) =>
{
   let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
   let text = args[0];
   let result = "", padding = "", count = text.length % 3;
   
   // add zero pad to make the length of text a multiple of 3
   if (count > 0) {
      while (count < 3) {
         ++count;
         padding += '=';
         text += "\0";
      }
   }

   // increment over the input string in steps of 3
   for (let i = 0; i < text.length; i += 3) {
      
      // combine every 3 chars into a single 24-bit binary num using arithmetic shifting
      let num = (text.charCodeAt(i) << 16) + (text.charCodeAt(i + 1) << 8) + text.charCodeAt(i + 2);

      // split 24-bit num into 4 using binary extraction, using logical shift to preserve sign bit
      num = [ (num >>> 18) & 63, (num >>> 12) & 63, (num >>> 6) & 63, num & 63 ];

      // using the 6-bit nums as indices select a char from chars and concatenate
      result += chars[num[0]] + chars[num[1]] + chars[num[2]] + chars[num[3]];
   }

   result = result.substr(0, result.length - padding.length) + padding;
   return result;
}

let b64decode = (...args) =>
{
   let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
   let text = args[0], keymap = {};
   let result = "", padding = "", count = text.length % 3;

   // generate character map char:index
   for(let i = 0; i < chars.length; i++)
      keymap[ chars[i] ] = i;

   // remove any characters that is not in the base64 charset
   text = text.replace(new RegExp("[^a-zA-Z0-9+/=]", "g"), "");

   // create padding string based on the number of '=' characters in the string.
   if (text.charAt(text.length - 1) == '=')
      if (text.charAt(text.length - 2) == '=')
         padding = 'AA';
      else
         padding = 'A';
   else
      padding = "";

   // replace '=' with 'A' for zero in the padding string
   text = text.substr(0, text.length - padding.length) + padding;
   
   // increment over the input string in steps of 4
   for (let i = 0; i < text.length; i += 4) {

      // convert every 4 chars to a 24-bit num  and concatenate by arithmetic shift
      let num = (keymap[text.charAt(i)] << 18) + 
                (keymap[text.charAt(i+1)] << 12) +
                (keymap[text.charAt(i+2)] << 6) +
                keymap[text.charAt(i+3)];

      // split the 24-bit into 8-bit numbers using binary extraction 2^8 - 1 = 255
      result += String.fromCharCode( (num >>> 16) & 255, (num >>> 8) & 255, num & 255);
   }

   result = result.substr(0, result.length - padding.length);
   return result;
}
