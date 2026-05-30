const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&price_change_percentage=24h";

const grid = document.getElementById("grid");

async function carregarMoedas() {
  try {
    const resposta = await fetch(API_URL);
    const moedas = await resposta.json();
    renderizar(moedas);
  } catch (erro) {
    grid.innerHTML =
      '<p class="status">Erro ao carregar os dados.</p>';
  }
}

function renderizar(moedas) {
  grid.innerHTML = "";

  moedas.forEach((moeda) => {
    const variacao = moeda.price_change_percentage_24h;
    const valor = variacao.toFixed(2);

    // Três estados: valorização, desvalorização ou sem alteração (manteve-se)
    let tom, seta;
    if (valor === "0.00") {
      tom = "neutral";
      seta = "—";
    } else if (variacao > 0) {
      tom = "up";
      seta = "▲";
    } else {
      tom = "down";
      seta = "▼";
    }

    const card = document.createElement("div");
    card.className = `card ${tom}`;

    card.innerHTML = `
      <div class="card-top">
        <img src="${moeda.image}" alt="${moeda.name}" />
        <div>
          <h2 class="card-name">${moeda.name}</h2>
          <span class="card-symbol">${moeda.symbol}</span>
        </div>
      </div>
      <p class="card-price">$${moeda.current_price.toLocaleString("en-US")}</p>
      <p class="card-change ${tom}">
        <span class="arrow ${tom}">${seta}</span> ${valor}% (24h)
      </p>
    `;

    grid.appendChild(card);
  });
}

carregarMoedas();
