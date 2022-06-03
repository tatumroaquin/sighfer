class Autokey {
   constructor(...args) {
      this.text = args[0];
      this.key = args[1];
      this.offset = 'a'.charCodeAt(0);
   }

   setText(text) {
      this.text = text;
   }

   getText() {
      return this.text;
   }

   setKey(key) {
      this.key = key;
   }

   getKey() {
      return this.key;
   }

   cleanKey() {
      let result = this.key.replace(/[^a-z]/ig, '');
      this.setKey(result);
   }

   genKey() {
      this.setKey(this.key + this.text);
      this.cleanKey();
   }

   encode() {
      this.genKey()
      let result = "";

      for (let i = 0, j = 0; i < this.text.length; i++, j++) {
         let p = this.text.substr(i, 1).toLowerCase().charCodeAt(0) - this.offset;
         let k = this.key.substr(j, 1).toLowerCase().charCodeAt(0) - this.offset;

         if (this.text.substr(i, 1).match(/[a-z]/g) ) {
            result += String.fromCharCode( ((p+k) % 26) + this.offset)
         } else if (this.text.substr(i, 1).match(/[A-Z]/g) ) {
            result += String.fromCharCode( ((p+k) % 26) + this.offset).toUpperCase()
         } else {
            result += String.fromCharCode(p + this.offset);
            --j;
         }
      }
      return result;
   }

   decode() {
      this.cleanKey();
      let result = "", p = '';

      for(let i = 0, j = 0; i < this.text.length; i++, j++) {
         let c = this.text.substr(i, 1).toLowerCase().charCodeAt(0) - this.offset;
         let k = this.key.substr(j, 1).toLowerCase().charCodeAt(0) - this.offset;
         // if lower case
         if (this.text.substr(i, 1).match(/[a-z]/g)) {
            if( (c - k) > 0 ) {
               p = String.fromCharCode( (c - k) % 26 + this.offset);
               this.setKey(this.key + p);
               result += p;
            } else {
               p = String.fromCharCode( (c - k + 26) % 26 + this.offset);
               this.setKey(this.key + p);
               result += p;
            }
         // if upper case
         } else if (this.text.substr(i, 1).match(/[A-Z]/g)) {
            if( (c - k) > 0 ) {
               p = String.fromCharCode( (c - k) % 26 + this.offset).toUpperCase();
               this.setKey(this.key + p);
               result += p;
            } else {
               p = String.fromCharCode( (c - k + 26) % 26 + this.offset).toUpperCase();
               this.setKey(this.key + p);
               result += p;
            }
         } else {
            result += String.fromCharCode(c + this.offset);
            --j;
         }
      }

      return result;
   }
}
let autokey = new Autokey();
