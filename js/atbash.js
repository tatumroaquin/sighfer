let atbash = (...args) => {
   let text = args[0];

   let upper = new RegExp(/[A-Z]/);
   let lower = new RegExp(/[a-z]/);
   let uoffset = 'A'.charCodeAt(0) + 'Z'.charCodeAt(0);
   let loffset = 'a'.charCodeAt(0) + 'z'.charCodeAt(0);

   return text.split('')
   .map( char => {
      let result = 0
      if( upper.test(char) ) {
         result = uoffset - char.charCodeAt(0)
      }
      else if( lower.test(char) ) {
         result = loffset - char.charCodeAt(0)
      } else {
         result = char.charCodeAt(0)
      }
      return String.fromCharCode(result)
   }
   ).join('')
}
