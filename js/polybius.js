class Polybius {
   constructor() {
      this.text = "";
      this.matrix = [];
   }

   setText(text) {
      this.text = text;
   }

   getText() {
      return this.text;
   }

   setMatrix(matrix) {
      this.matrix = matrix;
   }

   getMatrix() {
      return this.matrix;
   }

   genMatrix() {
      this.setMatrix([])
      let chunk = [];
      let a = 'a'.charCodeAt(0);
      let z = 'z'.charCodeAt(0);

      for (let i = a; i <= z; i++) {
         let char = String.fromCharCode(i);
         if (chunk.length < 5) {
            if (char != 'i')
               chunk.push(char);
         } else {
            this.matrix.push(chunk);
            chunk = [];
            i--;
         }
      }
      this.matrix.push(chunk);
   }

   findCoordinates(char) {
      for (let y = 0; y < this.matrix.length; y++) {
         for (let x = 0; x < this.matrix[y].length; x++) {
            if (this.matrix[y][x] === char)
               return [x, y];
         }
      }
   }

   isAlpha(chr) {
      let regExp = new RegExp('^[A-Za-z]$', 'i');
      return regExp.test(chr)
   }

   encode() {
   }
}

let polybius = new Polybius();
