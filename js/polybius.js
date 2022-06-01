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

   encode() {
   }
}

let polybius = new Polybius();
