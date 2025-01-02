const LOGIN_CREDENTIALS = {
    cpf: '08457245848',
    senha: 'Regina12@2024'
  };
  let isAuthenticated = false;
  
  function authenticateAdmin() {
        const login = document.getElementById('admin-login').value;
        const password = document.getElementById('admin-password').value;
      if (login === LOGIN_CREDENTIALS.cpf && password === LOGIN_CREDENTIALS.senha) {
          isAuthenticated = true;
           showAdminPanel();
      } else {
          alert('Credenciais inválidas!');
      }
      document.getElementById('admin-login').value = '';
      document.getElementById('admin-password').value = '';
    }