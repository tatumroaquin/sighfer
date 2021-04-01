let reversal = (...args) => {
   let cipher = args[0];

   return cipher.split('\n')
   .map
   (
      sentence => sentence.split(' ')
      .map( word => word.split('').reverse().join('') ).join(' ')
   ).join('\n')
}
