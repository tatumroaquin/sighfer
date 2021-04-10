class Atbash {
   constructor() {
      this.text = "";
      this.upper = new RegExp(/[A-Z]/);
      this.lower = new RegExp(/[a-z]/);
      this.uoffset = 'A'.charCodeAt(0) + 'Z'.charCodeAt(0);
      this.loffset = 'a'.charCodeAt(0) + 'z'.charCodeAt(0);
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
            result = this.uoffset - char.charCodeAt(0)
         }
         else if( this.lower.test(char) ) {
            result = this.loffset - char.charCodeAt(0)
         } else {
            result = char.charCodeAt(0)
         }
         return String.fromCharCode(result)
      }
      ).join('')
   }
}

let atbash = new Atbash();
