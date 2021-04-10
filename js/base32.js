class Base32 {
   constructor(...args) {
      this.text = args[0];
      this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
   }

   setText(text) {
      this.text = text;
   }

   getText() {
      return this.text;
   }

   // this function is needed because bit-shifts greater than 32 is not allowed in javascript
   bitShift(number, shift) {
      return Math.floor(number * Math.pow(2, shift));
   }

   encode() {
      let result = "", padding = "", count = this.text.length % 5;

      if (count > 0) {
         while (count < 5) {
            count++;
            this.text += "\0";
         }
      }

      for (let i = 0; i < this.text.length; i += 5) {
         let num = this.bitShift(this.text.charCodeAt(i), 32) + 
                   (this.text.charCodeAt(i + 1) << 24) +
                   (this.text.charCodeAt(i + 2) << 16) +
                   (this.text.charCodeAt(i + 3) << 8) +
                   this.text.charCodeAt(i + 4); 

         num = [
            this.bitShift(num, -35) & 31,
            this.bitShift(num, -30) & 31,
            this.bitShift(num, -25) & 31,
            this.bitShift(num, -20) & 31,
            this.bitShift(num, -15) & 31,
            this.bitShift(num, -10) & 31,
            this.bitShift(num, -5) & 31,
            this.bitShift(num, 0) & 31
         ];

         result += 
            this.chars[num[0]] + this.chars[num[1]] + this.chars[num[2]] +
            this.chars[num[3]] + this.chars[num[4]] + this.chars[num[5]] +
            this.chars[num[6]] + this.chars[num[7]];
      }

      let segment = result.substr(result.length - 6, 6).replace(/[^A]/g, '');

      for(let i = 0; i < segment.length; i++) padding += "=";

      result = result.substr(0, result.length - segment.length) + padding;
      return result;
   }


   decode() {
      let keymap = {}, result = "";
      let padding = "", count = this.text % 5;

      for (let i = 0; i < this.chars.length; i++)
         keymap[ this.chars[i] ] = i;

      let segment = this.text.substr(this.text.length - 6, 6).replace(/[^=]/g, '');
      for (let i = 0; i < segment.length; i++)
         padding += 'A';

      this.setText(this.text.substr(0, this.text.length - padding.length) + padding);

      for (let i = 0; i < this.text.length; i += 8) {
         let num = 
            this.bitShift(keymap[this.text.charAt(i)], 35) +
            this.bitShift(keymap[this.text.charAt(i + 1)], 30) +
            this.bitShift(keymap[this.text.charAt(i + 2)], 25) +
            this.bitShift(keymap[this.text.charAt(i + 3)], 20) +
            this.bitShift(keymap[this.text.charAt(i + 4)], 15) +
            this.bitShift(keymap[this.text.charAt(i + 5)], 10) +
            this.bitShift(keymap[this.text.charAt(i + 6)], 5) +
            this.bitShift(keymap[this.text.charAt(i + 7)], 0);

         result += String.fromCharCode(
            this.bitShift(num, -32) & 255, 
            this.bitShift(num, -24) & 255, 
            this.bitShift(num, -16) & 255, 
            this.bitShift(num, -8) & 255, 
            this.bitShift(num, 0) & 255 
         );
      }

      // replace continuous occurrence of the \0 (zero pad) with nothing
      return result.replace(/\0+$/, '');
   }
}

let base32 = new Base32();
