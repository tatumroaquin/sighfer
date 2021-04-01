let setTextArea = (cipher) => {
   let textarea, keyfield, result;

   textarea = document.getElementById('ui');
   keyfield = document.getElementById('key');

   result = cipher(textarea.value, keyfield);
   textarea.value = result;

}
