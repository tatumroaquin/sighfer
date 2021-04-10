class Rot13 {
   constructor(text) {
      this.text = text;
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

   encode() {
      return this.text.split('')
      .map( char => {
         let result = 0
         if( this.upper.test(char) ) {
            let pos = char.charCodeAt(0) - this.uoffset
            if( pos + 13 > 0 )
               result = ( pos + 13 ) % 26 + this.uoffset
            else
               result = (pos + 13 + 26) % 26 + this.uoffset
         }
         else if( this.lower.test(char) ) {
            let pos = char.charCodeAt(0) - this.loffset
            if( pos + 13 > 0 )
               result = (pos + 13) % 26 + this.loffset
            else
               result = (pos + 13 + 26) % 26 + this.loffset
         } else {
            result = char.charCodeAt(0)
         }
         return String.fromCharCode(result)
      }
      ).join('')
   }

}

let rot13 = new Rot13();
