class Playfair {
   constructor(...args) {
      this.text = args[0];
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

   cleanKey() {
      //replace "i" with "j"
      this.setKey(this.key.replace(/i/g,'j'));

      //remove duplicates
      let result = "";
      for (let i = 0; i < this.key.length; i++) {
         if (result.includes(this.key[i]) === false)
            result += this.key[i];
      }
      this.setKey(result);
      console.log(result);
   }

   cleanText() {
      this.setText(this.text.replace(/i/g,'j'));
   }

   splitPairs() {
      let result = "";
      for (let i = 0; i < this.text.length; i++) {
         if (this.text[i] === this.text[i+1])
            result += this.text[i] + 'x';
         else
            result += this.text[i];
      }
      this.setText(result);
   }

   evenPadding() {
      if (this.text.length % 2)
         this.setText(this.text + 'z');
   }

   genDigraph() {
      let result = [];

      if (this.text.length % 2 === 1) {
         this.setText(this.text + 'z');
      }

      for (let i = 0; i <= this.text.length - 2; i += 2) {
         let chunk = this.text[i] + this.text[i+1];

         if (this.text[i] === this.text[i+1])
            chunk = this.text[i] + 'x';

         result.push(chunk);
      }

      this.setDigraph(result);
   }

   genMatrix() {
      let chunk = [];
      this.setMatrix([]);
      this.cleanKey();

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
      let result = [];
      for (let i = 0; i < this.matrix.length; i++) {
         for (let j = 0; j < this.matrix[i].length; j++) {
            if (this.matrix[i][j] === c) {
               result.push(j, i);
            }
         }
      }
      return result;
   }

   getCharacter(x, y) {
      let result = this.matrix[y][x];
      return result;
   }

   //pt: at ta ck at da wn
   //ct: cr rc lm cr bl vb
   encode() {
      let result = "";

      // pre encryption operations, sanitize input text and key
      this.genMatrix();
      this.splitPairs();
      this.evenPadding();
      this.cleanText();
      this.genDigraph();

      for (let i = 0; i < this.digraph.length; i++) {
         let a = this.digraph[i][0];
         let b = this.digraph[i][1];
         let a_coord = this.findCoordinates(a);
         let b_coord = this.findCoordinates(b);

         if (a_coord[0] === b_coord[0])  { //same column case x = x
            let newA = this.getCharacter(a_coord[0], (a_coord[1] + 1) % 5)
            let newB = this.getCharacter(b_coord[0], (b_coord[1] + 1) % 5)
            result += newA + newB
         } 
         else if (a_coord[1] === b_coord[1]) { //same row case y = y
            let newA = this.getCharacter((a_coord[0] + 1) % 5, a_coord[1])
            let newB = this.getCharacter((b_coord[0] + 1) % 5, b_coord[1])
            result += newA + newB
         }
         else { // neither case true a.x = b.x, b.x = a.x
            let newA = this.getCharacter(b_coord[0], a_coord[1])
            let newB = this.getCharacter(a_coord[0], b_coord[1])
            result += newA + newB
         }
      }

      return result
   }
}
let playfair = new Playfair();
