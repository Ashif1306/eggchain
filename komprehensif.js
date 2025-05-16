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

// Data dummy untuk visualisasi
window.addEventListener("load", function () {
  const radarCtx = document.getElementById("healthRadarChart").getContext("2d");
  new Chart(radarCtx, {
    type: "radar",
    data: {
      labels: ["Lingkungan", "Kesejahteraan", "Produktivitas", "Efisiensi Pakan", "Kualitas Telur", "Kesehatan"],
      datasets: [
        {
          label: "Skor Aktual",
          data: [70, 75, 80, 78, 82, 75],
          backgroundColor: "rgba(80, 70, 229, 0.2)",
          borderColor: "rgba(80, 70, 229, 1)",
          pointBackgroundColor: "rgba(80, 70, 229, 1)"
        },
        {
          label: "Target Optimal",
          data: [90, 90, 90, 90, 90, 90],
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          borderColor: "rgba(16, 185, 129, 0.8)",
          borderDash: [5, 5],
          pointBackgroundColor: "rgba(16, 185, 129, 0.8)"
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 100
        }
      },
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });

  const predictionCtx = document.getElementById("predictionChart").getContext("2d");
  new Chart(predictionCtx, {
    type: "line",
    data: {
      labels: ["3 Minggu Lalu", "2 Minggu Lalu", "1 Minggu Lalu", "Saat Ini", "Prediksi"],
      datasets: [
        {
          label: "Produksi Telur (%)",
          data: [87, 86, 85.6, 85.5, 83.4],
          borderColor: "#eab308",
          backgroundColor: "rgba(234, 179, 8, 0.1)",
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          min: 70,
          max: 100
        }
      }
    }
  });

  const correlationCtx = document.getElementById("correlationChart").getContext("2d");
  new Chart(correlationCtx, {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Amonia vs Stress",
          data: [
            { x: 8, y: 0.12 },
            { x: 10, y: 0.18 },
            { x: 12, y: 0.22 },
            { x: 14, y: 0.25 },
            { x: 15, y: 0.26 }
          ],
          backgroundColor: "rgba(239, 68, 68, 0.7)",
          borderColor: "rgba(239, 68, 68, 1)",
          pointRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Kadar Amonia (ppm)"
          }
        },
        y: {
          title: {
            display: true,
            text: "Indeks Stress"
          },
          min: 0,
          max: 0.5
        }
      }
    }
  });

  const economicCtx = document.getElementById("economicChart").getContext("2d");
  new Chart(economicCtx, {
    type: "bar",
    data: {
      labels: ["Pendapatan Telur", "Biaya Pakan", "Biaya Lainnya", "Profit"],
      datasets: [
        {
          label: "Rp per Ayam per Hari",
          data: [1500, -600, -500, 400],
          backgroundColor: [
            "rgba(16, 185, 129, 0.6)",
            "rgba(239, 68, 68, 0.6)",
            "rgba(234, 179, 8, 0.6)",
            "rgba(16, 185, 129, 0.6)"
          ],
          borderColor: [
            "rgba(16, 185, 129, 1)",
            "rgba(239, 68, 68, 1)",
            "rgba(234, 179, 8, 1)",
            "rgba(16, 185, 129, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          title: {
            display: true,
            text: "Rupiah"
          }
        }
      }
    }
  });
});
