// Получение контекста для рисования
let canvas = window.document.querySelector('canvas');
let context = canvas.getContext('2d');

// Функции
const createLineChart = (xData, yData) => {
  let data = {
    labels: xData,
    datasets: [{
      label: 'Global Price of Aluminium',
      data: yData,
      pointStyle: false, // точки
      fill: true, // заливка
      borderWidth: 2, // толщина линии 
    }]
  }
  let config = {
    type: 'line',
    data: data
  }
  let chart = new Chart(context, config);
}

// Получение данных с сервера
axios.get('https://www.alphavantage.co/query?function=ALUMINUM&interval=monthly&apikey=IEEEHD7YKVEDV9VJ')
  .then((response) => {
    let data = response.data.data;
    let xData = [];
    let yData = [];
    for (let i = data.length - 1; i > 0; i--) {

      if (data[i].value !== '.') {
        xData.push(data[i].date);
        yData.push(data[i].value);
      }
    }
    createLineChart(xData, yData);
  });