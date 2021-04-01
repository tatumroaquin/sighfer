let rot13 = (...args) => {
   let text = args[0];

   let upper = new RegExp(/[A-Z]/);
   let lower = new RegExp(/[a-z]/);
   let uoffset = 'A'.charCodeAt(0);
   let loffset = 'a'.charCodeAt(0);

   return text.split('')
   .map( char => {
      let result = 0
      if( upper.test(char) ) {
         let pos = char.charCodeAt(0) - uoffset
         if( pos + 13 > 0 )
            result = ( pos + 13 ) % 26 + uoffset
         else
            result = (pos + 13 + 26) % 26 + uoffset
      }
      else if( lower.test(char) ) {
         let pos = char.charCodeAt(0) - loffset
         if( pos + 13 > 0 )
            result = (pos + 13) % 26 + loffset
         else
            result = (pos + 13 + 26) % 26 + loffset
      } else {
         result = char.charCodeAt(0)
      }
      return String.fromCharCode(result)
   }
   ).join('')
}
