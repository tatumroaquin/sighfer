class Hex {
   constructor(...args) {
      this.text = args[0];
      this.base = "0123456789abcdef";
   }

   getText() {
      return this.text;
   }

   setText(text) {
      this.text = text;
   }

   encode() {
      let arr = this.text.split('');
      let result = '';

      for (let i = 0; i < arr.length; i++) {
         if (i > 0 && i % 2 == 0)
            result += " ";

         result +=
            this.base[ arr[i].charCodeAt(0) >>> 4 % 15] + 
            this.base[ arr[i].charCodeAt(0) & 15 ];

      }
      return result;
   }

   decode() {
      let str = this.text.replace(/\s+/g, '');
      let result = '', keymap = {};

      for (let i = 0; i < this.base.length; i++)
         keymap[ this.base[i] ] = i;

      for (let i = 0; i < str.length; i += 2) {
         result += 
            String.fromCharCode ( 
               (keymap[ str[i] ] << 4) + 
               keymap[ str[i+1] ]
            );
      }
      return result;
   }
}

let hex = new Hex();
