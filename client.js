document.addEventListener('DOMContentLoaded', function() {
  // Loop through all the input boxes and add enter key press event listener.
  // After the message is entered, make the textbox blank again except username.
  let inputNodes = document.querySelectorAll('input[type="text"]');
  if (inputNodes.length) {
    inputNodes.forEach(elInput => {
      elInput.addEventListener('keypress', e => {
        // Enter key press.
        if (e.keyCode == 13) {
          let msg = elInput.value;
          switch(elInput.getAttribute('id')) {
            case 'public-text':
              sendMessage('public_msg', msg);
              elInput.value = '';
              break;

            case 'name-text':
			   localStorage.setItem(window.location.host+'_user2', document.getElementById('name-text').value);
              sendMessage('username', document.getElementById('name-text').value);
              break;

            case 'private-text':
              sendMessage('private_msg', msg);
              elInput.value = '';
              break;
			/*case 'pass':
              localStorage.setItem(window.location.host+'_pass', document.getElementById('pass').value);
			break;*/
          }
        }
      });
    });
  }

  // After clicking on any user, start private chat with him/her.
  document.body.addEventListener('click', e => {
    if (e.target &&
      e.target.tagName === 'A' &&
      e.target.closest('#user-list') !== null) {

      e.preventDefault();
      sendMessage('connect_private_chat', e.target.getAttribute('data-id'));
      return false;
    }
  });
});

connect();
