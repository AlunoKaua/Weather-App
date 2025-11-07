const chaveAPI = 'd3a689b8239004a78cb0892bb958e3bd'; 
const cidadeInput = document.getElementById('cidadeInput');
const buscarBtn = document.getElementById('buscarBtn');
const resultado = document.getElementById('resultado');

buscarBtn.addEventListener('click', () => {
    const cidade = cidadeInput.value.trim();
    if (!cidade) {
        alert('Por favor, digite uma cidade.');
        return;
    }
    buscarClima(cidade);
});

function buscarClima(cidade) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chaveAPI}&lang=pt_br&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                exibirClima(data);
            } else {
                resultado.innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            resultado.innerHTML = '<p>Erro ao buscar o clima.</p>';
        });
}

function exibirClima(data) {
    const nome = data.name;
    const temp = Math.round(data.main.temp);
    const descricao = data.weather[0].description;
    const sensacao = Math.round(data.main.feels_like);

    resultado.innerHTML = `
        <h2>${nome}</h2>
        <p><strong>Temperatura:</strong> ${temp} °C</p>
        <p><strong>Descrição:</strong> ${descricao}</p>
        <p><strong>Sensação Térmica:</strong> ${sensacao} °C</p>
    `;
}