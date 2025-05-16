// EggChain - Halaman Analisis Komprehensif (HTML + CSS + JS dalam satu file)

// Tambahkan struktur HTML langsung ke body
document.body.innerHTML = `
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      margin: 0;
      padding: 20px;
      background: #f3f4f6;
    }
    .advanced-analysis-section {
      background-color: white;
      border-radius: 15px;
      padding: 25px;
      margin-bottom: 25px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    .analysis-charts {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }
    .chart-container {
      background-color: #f9fafb;
      border-radius: 15px;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      height: 350px;
      position: relative;
    }
    .chart-container h4 {
      text-align: center;
      font-size: 14px;
      color: #4b5563;
      margin-top: 10px;
    }
    canvas {
      width: 100% !important;
      height: 250px !important;
    }
    @media (max-width: 768px) {
      .analysis-charts {
        grid-template-columns: 1fr;
      }
    }
  </style>

  <section class="advanced-analysis-section">
    <h3>Analisis Komprehensif</h3>
    <div class="analysis-charts">
      <div class="chart-container">
        <canvas id="healthRadarChart"></canvas>
        <h4>Skor Kesehatan Multi-Aspek</h4>
      </div>
      <div class="chart-container">
        <canvas id="predictionChart"></canvas>
        <h4>Tren & Prediksi Produksi</h4>
      </div>
    </div>
    <div class="analysis-charts">
      <div class="chart-container">
        <canvas id="correlationChart"></canvas>
        <h4>Korelasi Amonia vs Stress</h4>
      </div>
      <div class="chart-container">
        <canvas id="economicChart"></canvas>
        <h4>Analisis Ekonomi</h4>
      </div>
    </div>
  </section>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
`;

// Data simulasi input pengguna dan hasil analisis
const inputs = {
  temperature: 25.5,
  humidity: 65,
  ammonia: 15,
  feedConsumption: 110,
  waterConsumption: 220,
  eggProduction: 85.5,
  flockAge: 224
};

const analysis = {
  environmentalScore: 70,
  birdWelfareScore: 75,
  productivityScore: 80,
  healthIndex: 78,
  predictions: {
    nextWeekProduction: 82.1
  }
};

const historicalData = {
  eggProduction: [87.5, 86.2, 85.8, 85.5],
  ammonia: [8, 10, 12, 15],
  stressIndex: [0.12, 0.18, 0.22, 0.26]
};

function renderComprehensiveAnalysisCharts() {
  // Radar Chart
  new Chart(document.getElementById('healthRadarChart').getContext('2d'), {
    type: 'radar',
    data: {
      labels: ['Lingkungan', 'Kesejahteraan', 'Produktivitas', 'Efisiensi Pakan', 'Kualitas Telur', 'Kesehatan'],
      datasets: [{
        label: 'Skor Aktual',
        data: [analysis.environmentalScore, analysis.birdWelfareScore, analysis.productivityScore, 78, 82, analysis.healthIndex],
        backgroundColor: 'rgba(80, 70, 229, 0.2)',
        borderColor: 'rgba(80, 70, 229, 1)',
        pointBackgroundColor: 'rgba(80, 70, 229, 1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    }
  });

  // Line Chart for Prediction
  new Chart(document.getElementById('predictionChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: ['3 Minggu Lalu', '2 Minggu Lalu', '1 Minggu Lalu', 'Saat Ini', 'Prediksi'],
      datasets: [{
        label: 'Produksi Telur (%)',
        data: [...historicalData.eggProduction, inputs.eggProduction, analysis.predictions.nextWeekProduction],
        borderColor: '#eab308',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });

  // Scatter Chart for Correlation
  const scatterData = historicalData.ammonia.map((x, i) => ({ x, y: historicalData.stressIndex[i] }));
  scatterData.push({ x: inputs.ammonia, y: 0.26 });

  new Chart(document.getElementById('correlationChart').getContext('2d'), {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Amonia vs Stress Index',
        data: scatterData,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        pointRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Amonia (ppm)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Stress Index'
          },
          min: 0,
          max: 0.5
        }
      }
    }
  });

  // Bar Chart for Economics
  const feedCost = (inputs.feedConsumption / 1000) * 8000;
  const eggRevenue = (inputs.eggProduction / 100) * 0.06 * 25000;
  const otherCosts = 500;
  const profit = eggRevenue - feedCost - otherCosts;

  new Chart(document.getElementById('economicChart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['Pendapatan Telur', 'Biaya Pakan', 'Biaya Lainnya', 'Profit'],
      datasets: [{
        label: 'Rp per Ayam per Hari',
        data: [eggRevenue, -feedCost, -otherCosts, profit],
        backgroundColor: [
          'rgba(16, 185, 129, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(234, 179, 8, 0.6)',
          profit > 0 ? 'rgba(16, 185, 129, 0.6)' : 'rgba(239, 68, 68, 0.6)'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Rupiah'
          }
        }
      }
    }
  });
}

// Jalankan render saat halaman siap
document.addEventListener('DOMContentLoaded', function () {
  renderComprehensiveAnalysisCharts();
});

// EggChain - Tambahan Visualisasi Analisis Komprehensif

function initializeComprehensiveAnalysisCharts(analysis, inputs) {
  const radarCtx = document.getElementById('healthRadarChart')?.getContext('2d');
  const predictionCtx = document.getElementById('predictionChart')?.getContext('2d');
  const correlationCtx = document.getElementById('correlationChart')?.getContext('2d');
  const economicCtx = document.getElementById('economicChart')?.getContext('2d');
  
  if (!radarCtx || !predictionCtx || !correlationCtx || !economicCtx) return;

  new Chart(radarCtx, {
    type: 'radar',
    data: {
      labels: ['Lingkungan', 'Kesejahteraan', 'Produktivitas', 'Efisiensi Pakan', 'Kualitas Telur', 'Kesehatan'],
      datasets: [{
        label: 'Skor Aktual',
        data: [
          analysis.environmentalScore,
          analysis.birdWelfareScore,
          analysis.productivityScore,
          analysis.feedEfficiencyScore,
          analysis.eggQualityScore,
          analysis.healthIndex
        ],
        backgroundColor: 'rgba(80, 70, 229, 0.2)',
        borderColor: 'rgba(80, 70, 229, 1)',
        pointBackgroundColor: 'rgba(80, 70, 229, 1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    }
  });

  const predictionLabels = ['3 Minggu Lalu', '2 Minggu Lalu', '1 Minggu Lalu', 'Saat Ini', 'Prediksi'];
  const predictionData = [...analysis.historicalEggProduction, inputs.eggProduction, analysis.predictions.nextWeekProduction];

  new Chart(predictionCtx, {
    type: 'line',
    data: {
      labels: predictionLabels,
      datasets: [{
        label: 'Produksi Telur (%)',
        data: predictionData,
        borderColor: '#eab308',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });

  const scatterData = analysis.historicalAmmonia.map((x, i) => ({ x, y: analysis.historicalStress[i] }));
  scatterData.push({ x: inputs.ammonia, y: analysis.stressIndex });

  new Chart(correlationCtx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Amonia vs Stress Index',
        data: scatterData,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        pointRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Amonia (ppm)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Stress Index'
          },
          min: 0,
          max: 0.5
        }
      }
    }
  });

  const feedCost = (inputs.feedConsumption / 1000) * 8000;
  const eggRevenue = (inputs.eggProduction / 100) * 0.06 * 25000;
  const otherCosts = 500;
  const profit = eggRevenue - feedCost - otherCosts;

  new Chart(economicCtx, {
    type: 'bar',
    data: {
      labels: ['Pendapatan Telur', 'Biaya Pakan', 'Biaya Lainnya', 'Profit'],
      datasets: [{
        label: 'Rp per Ayam per Hari',
        data: [eggRevenue, -feedCost, -otherCosts, profit],
        backgroundColor: [
          'rgba(16, 185, 129, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(234, 179, 8, 0.6)',
          profit > 0 ? 'rgba(16, 185, 129, 0.6)' : 'rgba(239, 68, 68, 0.6)'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Rupiah'
          }
        }
      }
    }
  });
} // End of function
