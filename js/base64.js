class Base64 {
   constructor(...args) {
      this.text = args[0];
      this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
   }

   setText(text) {
      this.text = text;
   }

   getText() {
      return this.text;
   }

   encode() {
      let result = "", padding = "", count = this.text.length % 3;

      // add zero pad to make the length of text a multiple of 3
      if (count > 0) {
         while (count < 3) {
            ++count;
            padding += '=';
            this.text += "\0";
         }
      }
      // arithmetic shift left (num * 2^shift) combine 8-bit ASCII to 24-bit num
      for (let i = 0; i < this.text.length; i += 3) {
         let num = 
            (this.text.charCodeAt(i) << 16) + 
            (this.text.charCodeAt(i + 1) << 8) + 
            this.text.charCodeAt(i + 2);

         // separate 24-bit num to chunks of 6-bit num, using binary extraction
         num = [ 
            (num >>> 18) & 63, 
            (num >>> 12) & 63, 
            (num >>> 6) & 63, 
            num & 63 
         ];

         // use 6-bit num as an index to the chars array convert to base64
         result += 
            this.chars[num[0]] + 
            this.chars[num[1]] + 
            this.chars[num[2]] + 
            this.chars[num[3]];
      }
      result = result.substr(0, result.length - padding.length) + padding;
      return result;
   }

   decode() {
      let result = "", padding = "";
      let keymap = {}, count = this.text.length % 3;

      for(let i = 0; i < this.chars.length; i++)
         keymap[ this.chars[i] ] = i;

      // cleanup input data remove all chars not inside the base64 chars
      this.text = this.text.replace(new RegExp("[^a-zA-Z0-9+/=]", "g"), "");

      let segment = this.text.substr(this.text.length - 2, 2).replace(/[^=]/g, '');
      for (let i = 0; i < segment.length; i++)
         padding += "A";

      this.text = this.text.substr(0, this.text.length - padding.length) + padding;
      
      // increment by 4 chars, left shift combine back to 6-bit num to 24-bit
      for (let i = 0; i < this.text.length; i += 4) {

         let num = (keymap[this.text.charAt(i)] << 18) + 
                   (keymap[this.text.charAt(i + 1)] << 12) +
                   (keymap[this.text.charAt(i + 2)] << 6) +
                   keymap[this.text.charAt(i + 3)];

         // split 24-bit num back to ASCII 8-bit logical shift (always zeros)
         result += String.fromCharCode( 
            (num >>> 16) & 255, (num >>> 8) & 255, num & 255
         );
      }

      result = result.replace(/\0*$/, ''); //remove occurence of zero pad
      return result;

   }
}

let base64 = new Base64();
