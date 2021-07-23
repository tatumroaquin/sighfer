class Playfair {
   constructor(...args) {
      this.text = args[0];
      this.key = args[1];
      this.offset = 'a'.charCodeAt(0);
      this.matrix = [];
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

   generateMatrix() {
      let chunk = [];
      this.key = this.key.replace(/j/g,'i');
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
            if (this.key.includes(char) === false && char != 'j')
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

   //pt: at ta ck at da wn
   //ct: cr rc lm cr bl vb
   encrypt() {
      this.generateMatrix();
   }
}
let playfair = new Playfair();
