     document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.main-content').style.display = 'none';
});
         function showAdminPanel() {
           if (!isAuthenticated) return;
          document.querySelector('.main-content').style.display = 'block';
          const dynamicContent = document.getElementById('dynamic-content');
          dynamicContent.innerHTML = `
            <div class="admin-container">
              <h2>Painel Administrativo</h2>
              <textarea id="note-content" placeholder="Escreva sua nota aqui..." style="width: 80%; height: 100px; margin-bottom: 10px;"></textarea><br>
              <button onclick="saveNote()" class="admin-button">Salvar Nota</button>
              <button onclick="viewNotes()" class="admin-button">Visualizar Notas</button>
				<button class="admin-logout" onclick="logoutAdmin()">Sair</button>
				
                <div id="notes-display" style="margin-top: 20px;"></div>
            </div>
            
            <div class="admin-container">
				<h2>Cadastro de Clientes</h2>
				<form id="clientForm" class="admin-form">
					<input type="text" id="nome" placeholder="Nome" required>
					<input type="text" id="rg" placeholder="RG" required>
					<input type="text" id="cpf" placeholder="CPF/CNPJ" required>
					<input type="email" id="email" placeholder="E-mail" required>
					<input type="tel" id="telefone" placeholder="Telefone" required>
					<button type="button" onclick="addClient()" class="admin-button">Cadastrar Cliente</button>
				</form>

				<h3>Clientes Cadastrados</h3>
				<table id="clientTable" class="admin-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Nome</th>
							<th>RG</th>
							<th>CPF/CNPJ</th>
							<th>E-mail</th>
							<th>Telefone</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
             <div class="admin-container">
                <h2>Cadastro de Processo</h2>
                <form id="processoForm" class="admin-form">
                    <div class="form-group">
                        <label>Cliente:</label>
                        <select id="clienteProcesso" required></select>
                    </div>
                    <div class="form-group">
                        <label>Número do Processo:</label>
                        <input type="text" id="numeroProcesso" required>
                    </div>
                    <div class="form-group">
                        <label>Tipo:</label>
                        <select id="tipoProcesso" required>
                            <option value="administrativo">Administrativo</option>
                            <option value="civil">Direito Civil</option>
                            <option value="criminal">Direito Criminal</option>
                            <option value="militar">Direito Militar</option>
                            <option value="trabalhista">Trabalhista</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Status:</label>
                        <select id="statusProcesso" required>
                            <option value="pendente">Pendente</option>
                            <option value="andamento">Em Andamento</option>
                            <option value="concluido">Concluído</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Descrição:</label>
                        <textarea id="descricaoProcesso" rows="4"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Histórico do Caso:</label>
                        <textarea id="historicoCaso" rows="6"></textarea>
                    </div>
                   <button type="submit" onclick="addProcesso()" class="admin-button">Cadastrar Processo</button>
                </form>

                <h3>Processos Cadastrados</h3>
                <table id="processTable" class="admin-table">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Número</th>
                            <th>Tipo</th>
                            <th>Status</th>
                            <th>Descrição</th>
                            <th>Histórico</th>
                             <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            
           `;
             // Remove o texto da página principal ao navegar para outra seção
          const welcomeMessage = document.getElementById('welcome-message');
          if(welcomeMessage){
                welcomeMessage.style.display = 'none';
          }
                atualizarSelectClientes();
              renderTable();
               renderProcessTable();

        }
        function logoutAdmin() {
         isAuthenticated = false;
        document.querySelector('.main-content').style.display = 'none';
         showAdminLogin();
         }
        function saveNote() {
            const noteContent = document.getElementById('note-content').value;
            if (noteContent.trim()) {
                const noteKey = `note-${Date.now()}`;
                localStorage.setItem(noteKey, noteContent);
                alert('Nota salva com sucesso!');
                document.getElementById('note-content').value = '';
            } else {
                alert('O campo de nota está vazio.');
            }
        }

        function viewNotes() {
            const notesDisplay = document.getElementById('notes-display');
            notesDisplay.innerHTML = '<h3>Notas Salvas:</h3>';
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('note-')) {
                    notesDisplay.innerHTML += `
                        <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc;">
                            <p>${localStorage.getItem(key)}</p>
                            <button onclick="deleteNote('${key}')" style="padding: 5px 10px;">Excluir</button>
                        </div>
                    `;
                }
            });
        }
  function atualizarSelectClientes() {
    const select = document.getElementById('clienteProcesso');
    if (select) {
      select.innerHTML = '<option value="">Selecione um cliente</option>';
        DB.clientes.forEach((cliente, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = cliente.nome;
        select.appendChild(option);
      });
    }
  }
 function renderProcessTable() {
            const tbody = document.querySelector('#processTable tbody');
            tbody.innerHTML = '';
             DB.processos.forEach((processo, index) => {
              const cliente = DB.clientes[processo.clienteIndex];
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${cliente.nome}</td>
                    <td>${processo.numero}</td>
                    <td>${processo.tipo}</td>
                    <td class="status-${processo.status}">${processo.status}</td>
                    <td>${processo.descricao}</td>
                     <td>${processo.historico}</td>
                    <td>
                        <button onclick="deleteProcesso(${index})" class="admin-button">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
         function deleteProcesso(index) {
             DB.processos.splice(index, 1);
           DB.salvarProcessos();
           renderProcessTable();
        }