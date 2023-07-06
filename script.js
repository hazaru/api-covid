document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita o comportamento padrão do formulário
  
    var country = document.getElementById('country-input').value;
    var date = document.getElementById('date-input').value;
  
    var url = `https://api.covidtracking.com/v1/${country}/${date}.json`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayData(data);
        displayChart(data);
      })
      .catch(error => {
        console.log('Ocorreu um erro:', error);
      });
  });
  
  function displayData(data) {
    var resultContainer = document.getElementById('result-container');
  
    // Limpa o conteúdo anterior
    resultContainer.innerHTML = '';
  
    // Cria a tabela
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
  
    // Cria a linha de cabeçalho
    var headerRow = document.createElement('tr');
    var headers = ['Data', 'Casos Confirmados', 'Mortes', 'Recuperados'];
  
    headers.forEach(headerText => {
      var th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
  
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    // Cria a linha de dados
    var dataRow = document.createElement('tr');
  
    var dateCell = document.createElement('td');
    dateCell.textContent = data.date;
    dataRow.appendChild(dateCell);
  
    var positiveCell = document.createElement('td');
    positiveCell.textContent = data.positive;
    dataRow.appendChild(positiveCell);
  
    var deathCell = document.createElement('td');
    deathCell.textContent = data.death;
    dataRow.appendChild(deathCell);
  
    var recoveredCell = document.createElement('td');
    recoveredCell.textContent = data.recovered || 'N/A';
    dataRow.appendChild(recoveredCell);
  
    tbody.appendChild(dataRow);
    table.appendChild(tbody);
  
    resultContainer.appendChild(table);
    resultContainer.style.display = 'block';
  }
  
  function displayChart(data) {
    var chartContainer = document.createElement('div');
    chartContainer.classList.add('chart-container');
  
    var chartCanvas = document.createElement('canvas');
    chartContainer.appendChild(chartCanvas);
  
    document.getElementById('result-container').appendChild(chartContainer);
  
    var chartData = {
      labels: ['Casos Confirmados', 'Mortes', 'Recuperados'],
      datasets: [
        {
          label: 'COVID-19',
          backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(75, 192, 192, 0.5)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1,
          data: [data.positive, data.death, data.recovered || 0]
        }
     ]
    };
  
    var chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  
    new Chart(chartCanvas, {
      type: 'bar',
      data: chartData,
      options: chartOptions
    });
  }