class Playfair {
   constructor(...args) {
      this.text = args[0];
      this.words = 0;
      this.key = args[1];
      this.offset = 'a'.charCodeAt(0);
      this.matrix = [];
      this.digraph = [];
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

   setMatrix(matrix) {
      this.matrix = matrix;
   }

   getMatrix() {
      return this.matrix;
   }

   setDigraph(digraph) {
      this.digraph = digraph;
   }

   getDigraph() {
      return this.digraph;
   }

   i_to_j(text) {
      return text.replace(/i/g,'j')
   }

   cleanKey() {
      //replace "i" with "j"
      this.setKey(this.i_to_j(this.key));

      //remove duplicate letters
      let result = "";
      for (let i = 0; i < this.key.length; i++) {
         if (result.includes(this.key[i]) === false)
            result += this.key[i];
      }
      this.setKey(result);
      console.log(result);
   }

   cleanText() {
      this.setText(this.i_to_j(this.text));
   }

   isPair(charA, charB) {
      return charA === charB;
   }

   // boolean return if character is alphabetical
   isAlpha(chr) {
      let regExp = new RegExp('^[A-Za-z]$', 'i');
      return regExp.test(chr)
   }

   // pairs are two consecutive le[tt]ers split them to 'le tx te rs'
   splitPairs() {
      let buffer = this.text.split('');

      //iterate only at multiples of two
      for (let i = 0; i < buffer.length; i += 2) {
         let charA = buffer[i]
         let charB = buffer[i+1]

         // both letters are alphabetical
         if (this.isAlpha(charA) && this.isAlpha(charB)) {
            if (this.isPair(charA, charB)) {
               buffer.splice(i+1, 0, 'x');
            }
         // if charA is a space/symbol/number
         } else if (!this.isAlpha(charA)) {
            charA = buffer[++i]; // pre-increment (i = 0; ++0; i = 1)
            charB = buffer[i+1];

            if (this.isPair(charA, charB)) {
               buffer.splice(i+1, 0, 'x');
            }
         // if charB is a space/symbol/number
         } else {
            charA = buffer[i++]; // post-increment (i = 0; 0++; i = 0)
            charB = buffer[i+1];

            if (this.isPair(charA, charB)) {
               buffer.splice(i+1, 0, 'x');
            }
         }
      }

      // letters = all letters no spaces/symbols/numbers
      let letters = buffer.join('').replace(/[^a-z]/ig,'');

      //if letters is odd add letter 'z'
      if (letters.length % 2) buffer.push('z');

      this.setText(buffer.join(''));
   }

   // split text into chunks of two, split pairs made the text even
   genDigraph() {
      let buffer = this.text.replace(/[^a-z]/ig,'').split('')
      let result = [];

      for (let i = 0; i < buffer.length; i += 2) {
         let chunk = buffer[i] + buffer[i+1];
         result.push(chunk);
      }

      this.setDigraph(result);
   }


   // key string is the top row of the matrix, if it exceeds 5 characters it continues below
   genMatrix() {
      let chunk = [];
      this.setMatrix([]);

      // 5x5 matrix chunking the key operation
      for (let i = 0; i < this.key.length; i++) {
         if (chunk.length < 5) {
            chunk.push(this.key[i]);
         } else {
            this.matrix.push(chunk);
            chunk = [];
            i--;
         }
      }

      // 5x5 insert missing characters from alphabet
      for (let i = 97; i <= 122; i++) {
         if (chunk.length < 5) {
            let char = String.fromCharCode(i);
            if (this.key.includes(char) === false && char != 'i')
               chunk.push(String.fromCharCode(i));
         } else {
            this.matrix.push(chunk);
            chunk = [];
            i--;
         }
      }
      if (chunk.length)
         this.matrix.push(chunk);
   }

   findCoordinates(c) {
      for (let y = 0; y < this.matrix.length; y++) {
         for (let x = 0; x < this.matrix[y].length; x++) {
            if (this.matrix[y][x] === c) {
               let result = [x, y];
               return result;
            }
         }
      }
   }

   getCharacter(x, y) {
      let result = this.matrix[y][x];
      return result;
   }

   //pt: at ta ck at da wn
   //ct: cr rc lm cr bl vb
   encode() {
      let result = [];

      // pre encryption operations, sanitize input text and key
      this.cleanKey();
      this.cleanText();
      this.genMatrix();
      this.splitPairs();
      this.genDigraph();

      for (let i = 0; i < this.digraph.length; i++) {
         let a = this.digraph[i][0];
         let b = this.digraph[i][1];
         let a_coord = this.findCoordinates(a);
         let b_coord = this.findCoordinates(b);

         //same column case swap x values (x = x)
         if (a_coord[0] === b_coord[0])  { 
            let newA = this.getCharacter(a_coord[0], (a_coord[1] + 1) % 5)
            let newB = this.getCharacter(b_coord[0], (b_coord[1] + 1) % 5)
            result.push(newA, newB);
         } 
         //same row case swap y values (y = y)
         else if (a_coord[1] === b_coord[1]) { 
            let newA = this.getCharacter((a_coord[0] + 1) % 5, a_coord[1])
            let newB = this.getCharacter((b_coord[0] + 1) % 5, b_coord[1])
            result.push(newA, newB);
         }
         // neither case true a.x = b.x, b.x = a.x
         else { 
            let newA = this.getCharacter(b_coord[0], a_coord[1])
            let newB = this.getCharacter(a_coord[0], b_coord[1])
            result.push(newA, newB);
         }
      }

      // insert space/numbers/symbols from the original text
      for (let i = 0; i < this.text.length; i++) {
         if (!this.isAlpha(this.text[i])) {
            result.splice(i, 0, this.text[i])
         }
      }
      return result.join('')
   }
}
let playfair = new Playfair();
