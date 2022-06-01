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

   findCharacter(x, y) {
      return this.matrix[y][x];
   }

   isAlpha(char) {
      let regExp = new RegExp('^[A-Za-z]$', 'i');
      return regExp.test(char)
   }

   isDigit(char) {
      let regExp = new RegExp('^[0-9]$', 'g');
      return regExp.test(char)
   }

   encode() {
      let buffer = this.text.split(' ');
      let result = buffer.map(word => {
         let cipher = '';
         for (let i = 0; i < word.length; i++) {
            if (this.isAlpha(word[i]) {
               let coord = this.findCoordinates(word[i]);
               cipher += coord[0] + 1;
               cipher += coord[1] + 1;
            } 
         }
         return cipher;
      })
      return result;
   }

   decode() {
      let buffer = this.text.split(' ');
      let result = buffer.map(cipher => {
         let word = '';
         for (let i = 0; i < cipher.length; i += 2) {
            if (this.isDigit(cipher[i]) {
               let x = parseInt(cipher[i]) - 1;
               let y = parseInt(cipher[i]) - 1;
               word += findCharacter(x, y);
            }
         }
         return word;
      }
      return result;
   }
}

let polybius = new Polybius();
