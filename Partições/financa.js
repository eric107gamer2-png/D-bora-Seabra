// 1. Importa as ferramentas (Note que adicionei o initializeApp aqui)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// 2. Sua configuração (Idêntica ao seu print)
const firebaseConfig = {
  apiKey: "AIzaSyBNkwzgGdD-MNvkHMVCCN2K8eYZ27QXSvG",
  authDomain: "transparencia-6bd79.firebaseapp.com",
  projectId: "transparencia-6bd79",
  storageBucket: "transparencia-6bd79.firebasestorage.app",
  messagingSenderId: "462833144279",
  appId: "1:462833144279:web:6ee3e5dccd1cfcc6e3b92",
  measurementId: "G-X4KQKHMV0T"
};

// 3. Inicializa o Firebase e o Banco de Dados
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Função para buscar os dados e criar os cards
async function carregarCards() {
    // Atenção: usei "Transparencia" com T maiúsculo porque foi assim que você criou no site!
    const querySnapshot = await getDocs(collection(db, "Transparencia"));
    const container = document.getElementById("cards-container");

    if (!container) {
        console.error("Erro: Não achei o ID 'cards-container' no seu HTML!");
        return;
    }

    container.innerHTML = ""; // Limpa o container antes de carregar

    querySnapshot.forEach((doc) => {
    const dados = doc.data();
    
    // Criando o HTML do card principal (Evento)
    container.innerHTML += `
        <div class="card-evento">
            <div class="topo-evento">
                <small>${dados.Categoria}</small>
                <h3>${dados.Titulo}</h3>
                <p>${dados.Descricao}</p>
            </div>
            
            <div class="grid-turmas-interna">
                <div class="mini-card"><span>1001</span><strong>${dados.v1001 || 'R$ 0'}</strong></div>
                <div class="mini-card"><span>1002</span><strong>${dados.v1002 || 'R$ 0'}</strong></div>
                <div class="mini-card"><span>2001</span><strong>${dados.v2001 || 'R$ 0'}</strong></div>
                <div class="mini-card"><span>2002</span><strong>${dados.v2002 || 'R$ 0'}</strong></div>
                <div class="mini-card"><span>2003</span><strong>${dados.v2003 || 'R$ 0'}</strong></div>
                <div class="mini-card"><span>3001</span><strong>${dados.v3001 || 'R$ 0'}</strong></div>
                <div class="mini-card"><span>3002</span><strong>${dados.v3002 || 'R$ 0'}</strong></div>
                <div class="mini-card"><span>3003</span><strong>${dados.v3003 || 'R$ 0'}</strong></div>
            </div>

            <div class="rodape-evento">
                <strong>Total do Evento: ${dados.Valor}</strong>
            </div>
        </div>
    `;
});
}

// Executa a função
carregarCards();