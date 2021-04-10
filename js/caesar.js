class Caesar {
   constructor(...args) {
      this.text = args[0]
      this.key = parseInt(args[1]);

      this.upper = new RegExp(/[A-Z]/);
      this.lower = new RegExp(/[a-z]/);
      this.uoffset = 'A'.charCodeAt(0);
      this.loffset = 'a'.charCodeAt(0);
   }

   setText(text) {
      this.text = text;
   }

   getText() {
      return this.text;
   }

   setKey(key) {
      this.key = parseInt(key);
   }

   getKey() {
      return this.key;
   }

   encode() {

      return this.text.split('')
      .map( char => {
         let result = 0
         if( this.upper.test(char) ) {
            let pos = char.charCodeAt(0) - this.uoffset
            if( pos + this.key > 0 )
               result = ( pos + this.key ) % 26 + this.uoffset
            else
               result = (pos + this.key + 26) % 26 + this.uoffset
         }
         else if( this.lower.test(char) ) {
            let pos = char.charCodeAt(0) - this.loffset
            if( pos + this.key > 0 )
               result = (pos + this.key) % 26 + this.loffset
            else
               result = (pos + this.key + 26) % 26 + this.loffset
         } else {
            result = char.charCodeAt(0)
         }
         return String.fromCharCode(result)
      }
      ).join('')
   }
}

let caesar = new Caesar();
