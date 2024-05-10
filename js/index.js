let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromDropdown = document.getElementById("from-currency-select");
const toDropdown = document.getElementById("to-currency-select");

// Criar a seleção de moedas

currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  fromDropdown.add(option);
});

currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  toDropdown.add(option);
});

fromDropdown.value = "USD";
toDropdown.value = "BRL";

let convertCurrency = () => {
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromDropdown.value;
  const toCurrency = toDropdown.value;

  if (amount.length != 0) {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmout = (amount / fromExchangeRate) * toExchangeRate;
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmout.toFixed(
          2
        )} ${toCurrency}`;
      });
  } else {
    alert("Não Esqueça de preencher o valor desejado");
  }
};

document
  .querySelector("#convert-btn")
  .addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);
