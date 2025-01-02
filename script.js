  let clients = [];
    let currentId = 1;
const DB = {
  clientes: JSON.parse(localStorage.getItem('clientes')) || [],
  processos: JSON.parse(localStorage.getItem('processos')) || [],
  honorarios: JSON.parse(localStorage.getItem('honorarios')) || [],
  salvarClientes() {
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
  },
  salvarProcessos() {
    localStorage.setItem('processos', JSON.stringify(this.processos));
  },
  salvarHonorarios() {
    localStorage.setItem('honorarios', JSON.stringify(this.honorarios));
  }
};
const LOGIN_CREDENTIALS = {
  cpf: '08457245848',
  senha: 'Regina12@2024'
};
let isAuthenticated = false;
    document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.main-content').style.display = 'none';
});
        // Função para exibir conteúdo dinâmico
        function showContent(section) {
            if (section !== 'admin') {
                 document.querySelector('.main-content').style.display = 'none';
            }
            const content = {
                about: `
                    <h2>Sobre Nós</h2>
                    <p>O escritório Gomberg&Associados tem uma longa história de sucesso na advocacia...</p>
                `,
                services: `
                    <h2>Áreas de Atuação</h2>
                    <ul>
                        <li>Direito Civil</li>
                        <li>Direito Trabalhista</li>
                        <li>Direito Empresarial</li>
                    </ul>
                `,
                team: `
                    <h2>Nossa Equipe</h2>
                    <div>
                        <h3>Drº. Luiz Roberto Ribeiro Gomberg</h3>
                        <p>OAB/SP - 477.614</p>
                    </div>
                `,
                consult: `
                    <h2>Agende uma Consulta</h2>
                    <p>Entre em contato para agendar sua consulta através de nossos canais:</p>
                    <p>Email: <a href="mailto:gombergeassociados@gmail.com">gombergeassociados@gmail.com</a></p>
                    <p>WhatsApp: <a href="https://wa.me/5511973383818" target="_blank">(11) 9.7338-3818</a></p>
                `
            };

            const dynamicContent = document.getElementById('dynamic-content');
            dynamicContent.innerHTML = content[section] || '<p>Seção não encontrada.</p>';
            addBackButton();
             // Remove o texto da página principal ao navegar para outra seção
            const welcomeMessage = document.getElementById('welcome-message');
            if(welcomeMessage){
                welcomeMessage.style.display = 'none';
            }
        }

         function goBack() {
            document.querySelector('.main-content').style.display = 'none';
            const dynamicContent = document.getElementById('dynamic-content');
            dynamicContent.innerHTML = '';
            //mostra a mensagem de boas vindas quando retorna para a página inicial
             const welcomeMessage = document.getElementById('welcome-message');
              if(welcomeMessage){
                welcomeMessage.style.display = 'block';
            }

        }
          function showAdminLogin() {
             document.querySelector('.main-content').style.display = 'block';
                const dynamicContent = document.getElementById('dynamic-content');
             dynamicContent.innerHTML = `
                <div class="admin-container">
                    <h2>Área Administrativa</h2>
                     <form id="loginForm">
                    <input type="text" id="admin-login" placeholder="Login" style="padding: 10px; width: 80%; margin-bottom: 10px;"><br>
                    <input type="password" id="admin-password" placeholder="Senha" style="padding: 10px; width: 80%; margin-bottom: 10px;"><br>
                    <button type="submit" onclick="authenticateAdmin()" class="admin-button">Entrar</button>
                    <button onclick="goBack()" class="admin-button">Voltar</button>
                     </form>
                </div>
            `;
                // Remove o texto da página principal ao navegar para outra seção
            const welcomeMessage = document.getElementById('welcome-message');
            if(welcomeMessage){
                welcomeMessage.style.display = 'none';
            }
        }
        // Função para exibir contatos
        function showContact() {
             document.querySelector('.main-content').style.display = 'none';
            const dynamicContent = document.getElementById('dynamic-content');
            dynamicContent.innerHTML = `
                <h2>Nossos Contatos</h2>
                <p>WhatsApp: <a href="https://wa.me/5511973383818" target="_blank">(11) 9.7338-3818</a></p>
                <p>Email: <a href="mailto:gombergeassociados@gmail.com">gombergeassociados@gmail.com</a></p>
            `;
            addBackButton();
             // Remove o texto da página principal ao navegar para outra seção
             const welcomeMessage = document.getElementById('welcome-message');
            if(welcomeMessage){
                welcomeMessage.style.display = 'none';
            }
        }

         // Função para adicionar botão "Voltar"
        function addBackButton() {
            const dynamicContent = document.getElementById('dynamic-content');
            dynamicContent.innerHTML += `<button onclick="goBack()" style="padding: 10px 20px; margin-top: 20px;">Voltar</button>`;
        }
     function authenticateAdmin(){};
     function logoutAdmin(){};
     function saveNote(){};
     function viewNotes(){};
      function changeTab(){};
        function editClient(){};
        function addClient(){};
       function atualizarSelectClientes(){};
     function renderProcessTable(){};
     function deleteProcesso(){};
     function atualizarTabelaClientes(){};
     function adicionarCliente(){};
     function atualizarCliente(){};
      function removerCliente(){};