let output = (cipher, action) => {
   let textarea, keyfield, result;

   textarea = document.getElementById('ui');
   keyfield = document.getElementById('key');

   if (keyfield !== null)
   {
      cipher.setText(textarea.value);
      cipher.setKey(keyfield.value);
   } else {
      cipher.setText(textarea.value);
   }

   switch(action)
   {
      case "encode":
         result = cipher.encode();
         break;
      case "decode":
         result = cipher.decode();
         break;
   }

   textarea.value = result;
}
