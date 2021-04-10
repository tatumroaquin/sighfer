class Reversal {
   constructor(...args) {
      this.text = args[0]
   }

   setText(text) {
      this.text = text;
   }

   getText() {
      return this.text;
   }

   encode() {
      return this.text.split('\n')
      .map
      (
         sentence => sentence.split(' ')
         .map( word => word.split('').reverse().join('') ).join(' ')
      ).join('\n')
   }
}

let reversal = new Reversal();
