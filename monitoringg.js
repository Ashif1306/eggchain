// Tambahan untuk visualisasi dan analisis komprehensif

// Fungsi untuk membuat grafik analisis komprehensif
function initializeComprehensiveAnalysisCharts(analysis, inputs) {
    // 1. Grafik radar untuk skor kesehatan komprehensif
    const radarCtx = document.getElementById('healthRadarChart').getContext('2d');
    const radarChart = new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: ['Lingkungan', 'Kesejahteraan', 'Produktivitas', 'Efisiensi Pakan', 'Kualitas Telur', 'Kesehatan'],
            datasets: [{
                label: 'Skor Aktual',
                data: [
                    analysis.environmentalScore,
                    analysis.birdWelfareScore,
                    analysis.productivityScore,
                    calculateFeedEfficiencyScore(inputs),
                    calculateEggQualityScore(inputs),
                    analysis.healthIndex
                ],
                backgroundColor: 'rgba(80, 70, 229, 0.2)',
                borderColor: 'rgba(80, 70, 229, 1)',
                pointBackgroundColor: 'rgba(80, 70, 229, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(80, 70, 229, 1)'
            }, {
                label: 'Target Optimal',
                data: [90, 90, 90, 90, 90, 90],
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderColor: 'rgba(16, 185, 129, 0.8)',
                borderDash: [5, 5],
                pointBackgroundColor: 'rgba(16, 185, 129, 0.8)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(16, 185, 129, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '/100';
                        }
                    }
                }
            }
        }
    });
    
    // 2. Grafik prediksi produksi & ROI
    const predictionCtx = document.getElementById('predictionChart').getContext('2d');
    
    // Data historis diambil dari minggu-minggu sebelumnya 
    // (menggunakan data yang sudah ada + prediksi)
    const predictionLabels = ['3 Minggu Lalu', '2 Minggu Lalu', '1 Minggu Lalu', 'Saat Ini', 'Prediksi'];
    
    // Data historis (mengambil dari data yang telah ada)
    const historicalEggProduction = [];
    for (let i = historicalData.eggProduction.length - 3; i < historicalData.eggProduction.length; i++) {
        if (i >= 0) {
            historicalEggProduction.push(historicalData.eggProduction[i]);
        } else {
            // Data dummy jika tidak cukup data historis
            historicalEggProduction.push(inputs.eggProduction + (Math.random() * 2 - 1));
        }
    }
    
    // Tambahkan produksi saat ini dan prediksi
    const predictionData = [
        ...historicalEggProduction,
        inputs.eggProduction,
        analysis.predictions.nextWeekProduction
    ];
    
    const predictionChart = new Chart(predictionCtx, {
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
                    beginAtZero: false,
                    min: Math.min(...predictionData) - 5,
                    max: Math.max(...predictionData) + 5,
                    title: {
                        display: true,
                        text: 'Produksi Telur (%)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: inputs.eggProduction,
                            yMax: inputs.eggProduction,
                            borderColor: 'rgba(80, 70, 229, 0.5)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                content: 'Produksi Saat Ini',
                                enabled: true,
                                position: 'end'
                            }
                        }
                    }
                }
            }
        }
    });

    // 3. Grafik korelasi parameter lingkungan dengan produktivitas 
    // (scatter plot)
    const correlationCtx = document.getElementById('correlationChart').getContext('2d');
    
    // Buat data untuk scatter plot berdasarkan data historis
    const scatterData = [];
    for (let i = 0; i < historicalData.dates.length; i++) {
        // Korelasi amonia dengan stress index
        scatterData.push({
            x: historicalData.ammonia[i],
            y: historicalData.stressIndex[i]
        });
    }
    
    // Tambahkan data saat ini
    scatterData.push({
        x: inputs.ammonia,
        y: stressIndex
    });
    
    const correlationChart = new Chart(correlationCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Amonia vs Stress Index',
                data: scatterData,
                backgroundColor: function(context) {
                    const value = context.raw.y; // stress index
                    if (value < 0.15) return 'rgba(16, 185, 129, 0.7)';
                    if (value < 0.25) return 'rgba(234, 179, 8, 0.7)';
                    return 'rgba(239, 68, 68, 0.7)';
                },
                pointRadius: 8,
                pointHoverRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Kadar Amonia (ppm)'
                    },
                    min: 0,
                    max: Math.max(...historicalData.ammonia, inputs.ammonia) + 5
                },
                y: {
                    title: {
                        display: true,
                        text: 'Stress Index'
                    },
                    min: 0,
                    max: Math.max(...historicalData.stressIndex, stressIndex) + 0.1
                }
            },
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Amonia: ${context.raw.x}ppm, Stress: ${context.raw.y}`;
                        }
                    }
                }
            }
        }
    });
    
    // 4. Grafik profitabilitas dan ROI
    const economicCtx = document.getElementById('economicChart').getContext('2d');
    
    // Hitung data ekonomi untuk grafik
    const feedCost = (inputs.feedConsumption / 1000) * 8000; // Rp per ayam per hari
    const eggRevenue = (inputs.eggProduction / 100) * 0.06 * 25000; // Rp per ayam per hari
    const otherCosts = 500; // Rp per ayam per hari
    const profit = eggRevenue - feedCost - otherCosts;
    
    const economicChart = new Chart(economicCtx, {
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
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(234, 179, 8, 1)',
                    profit > 0 ? 'rgba(16, 185, 129, 1)' : 'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Rupiah'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return `Rp${Math.abs(value).toLocaleString('id-ID')} per ayam/hari`;
                        }
                    }
                }
            }
        }
    });
}

// Fungsi untuk menghitung skor efisiensi pakan
function calculateFeedEfficiencyScore(inputs) {
    const fcr = inputs.feedConsumption / (inputs.eggProduction * 0.01 * 60); // FCR = Feed/Egg Mass
    let score = 100;
    
    if (fcr > 2.5) {
        score = 50;
    } else if (fcr > 2.2) {
        score = 70;
    } else if (fcr > 2.0) {
        score = 80;
    } else if (fcr > 1.8) {
        score = 90;
    } else {
        score = 100;
    }
    
    // Penalti untuk rasio air/pakan yang tidak optimal (optimal = ~2)
    const waterToFeedRatio = inputs.waterConsumption / inputs.feedConsumption;
    if (waterToFeedRatio < 1.8 || waterToFeedRatio > 2.2) {
        score -= 10;
    }
    
    return Math.max(0, Math.min(100, score));
}

// Fungsi untuk mensimulasikan skor kualitas telur
function calculateEggQualityScore(inputs) {
    // Dalam implementasi nyata, ini akan menggunakan data kualitas telur yang sebenarnya
    
    // Kondisi yang memengaruhi kualitas telur
    let score = 90; // Skor dasar yang bagus
    
    // Penalti berdasarkan faktor lingkungan yang memengaruhi kualitas
    if (inputs.temperature > 30 || inputs.temperature < 23) {
        score -= 15; // Suhu ekstrem mempengaruhi kerabang dan kualitas albumen
    }
    
    // Amonia tinggi dapat memengaruhi kualitas telur
    if (inputs.ammonia > 15) {
        score -= 10;
    }
    
    // Umur flock memengaruhi kualitas telur (ayam tua menghasilkan telur dengan kualitas kerabang menurun)
    if (inputs.flockAge > 400) {
        score -= 15;
    } else if (inputs.flockAge > 300) {
        score -= 10;
    }
    
    // Stress memengaruhi kualitas internal telur
    const stressIndex = stressModel ? stressModel.predict(inputs) : 0.26;
    if (stressIndex > 0.3) {
        score -= 15;
    } else if (stressIndex > 0.2) {
        score -= 10;
    }
    
    return Math.max(0, Math.min(100, score));
}

// Tambahan elemen untuk visualisasi dalam fungsi createDashboardHTML
function addAdvancedVisualizationHTML() {
    return `
        <!-- Advanced Analysis Section -->
        <div class="advanced-analysis-section">
            <h3>Analisis Komprehensif</h3>
            <div class="analysis-charts">
                <div class="chart-container radar-chart-container">
                    <canvas id="healthRadarChart"></canvas>
                    <h4>Skor Kesehatan Multi-Aspek</h4>
                </div>
                <div class="chart-container prediction-chart-container">
                    <canvas id="predictionChart"></canvas>
                    <h4>Tren & Prediksi Produksi</h4>
                </div>
            </div>
            <div class="analysis-charts">
                <div class="chart-container correlation-chart-container">
                    <canvas id="correlationChart"></canvas>
                    <h4>Korelasi Amonia vs Stress</h4>
                </div>
                <div class="chart-container economic-chart-container">
                    <canvas id="economicChart"></canvas>
                    <h4>Analisis Ekonomi</h4>
                </div>
            </div>
        </div>
        
        <!-- Recommendations Section -->
        <div class="recommendations-section">
            <h3>Rekomendasi Berbasis AI</h3>
            <div class="recommendation-items">
                ${generateRecommendationsHTML(inputs)}
            </div>
        </div>
    `;
}

// Fungsi untuk menghasilkan HTML rekomendasi
function generateRecommendationsHTML(inputs) {
    // Analisis untuk rekomendasi
    const analysis = analysisModel ? analysisModel.analyze(inputs) : {
        environmentalScore: 70,
        birdWelfareScore: 75,
        productivityScore: 80,
        healthIndex: 75,
        predictions: {
            nextWeekProduction: inputs.eggProduction - 1,
            mortalityRisk: 'Rendah',
            returnOnInvestment: 15.5
        },
        recommendations: []
    };
    
    if (analysis.recommendations.length === 0) {
        // Tambahkan rekomendasi default
        if (inputs.ammonia > 10) {
            analysis.recommendations.push({
                category: 'Lingkungan',
                action: 'Tingkatkan ventilasi kandang untuk mengurangi kadar amonia',
                impact: 'Meningkatkan kesehatan pernapasan dan mengurangi stress',
                priority: 'Tinggi',
                costEfficiency: 'Tinggi'
            });
        }
        
        if (inputs.temperature < 24 || inputs.temperature > 28) {
            analysis.recommendations.push({
                category: 'Lingkungan', 
                action: 'Sesuaikan pengaturan suhu untuk mencapai 24-28°C',
                impact: 'Optimalisasi produksi dan kesehatan ayam',
                priority: 'Sedang',
                costEfficiency: 'Sedang'
            });
        }
    }
    
    // Buat HTML rekomendasi
    let recommendationsHTML = '';
    
    analysis.recommendations.forEach(recommendation => {
        const priorityClass = recommendation.priority.toLowerCase();
        recommendationsHTML += `
            <div class="recommendation-item">
                <div class="recommendation-header">
                    <div class="recommendation-category ${recommendation.category.toLowerCase()}">${recommendation.category}</div>
                    <h4>${recommendation.action}</h4>
                    <span class="priority-badge priority-${priorityClass}">${recommendation.priority}</span>
                </div>
                <div class="recommendation-details">
                    <p><strong>Dampak:</strong> ${recommendation.impact}</p>
                    <p><strong>Efisiensi Biaya:</strong> ${recommendation.costEfficiency}</p>
                </div>
            </div>
        `;
    });
    
    // Jika tidak ada rekomendasi, tampilkan pesan default
    if (analysis.recommendations.length === 0) {
        recommendationsHTML = `
            <div class="recommendation-item recommendation-success">
                <div class="recommendation-header">
                    <div class="recommendation-category optimal">Optimal</div>
                    <h4>Manajemen Sudah Baik</h4>
                    <span class="priority-badge priority-rendah">Info</span>
                </div>
                <div class="recommendation-details">
                    <p>Praktik manajemen saat ini sudah optimal. Pertahankan kondisi ini untuk produktivitas maksimal.</p>
                </div>
            </div>
        `;
    }
    
    return recommendationsHTML;
}

// Modifikasi fungsi showDashboard untuk menambahkan visualisasi lanjutan
function showDashboardWithAdvancedAnalysis() {
    // Sembunyikan form input
    formSection.style.display = 'none';
    
    // Ambil nilai input dari form
    const inputs = getFormInputs();
    
    // Ambil indeks stress
    const stressIndex = stressModel ? stressModel.predict(inputs) : 0.26;
    
    // Analisis komprehensif
    const analysis = analysisModel ? analysisModel.analyze(inputs) : {
        environmentalScore: 70,
        birdWelfareScore: 75,
        productivityScore: 80,
        healthIndex: 75,
        predictions: {
            nextWeekProduction: inputs.eggProduction - 1,
            mortalityRisk: 'Rendah',
            returnOnInvestment: 15.5
        },
        recommendations: []
    };
    
    // Buat elemen dashboard
    const dashboardHTML = createDashboardHTML();
    
    // Tambahkan dashboard setelah info card
    const infoCard = document.querySelector('.info-card');
    const dashboardContainer = document.createElement('div');
    dashboardContainer.id = 'dashboardContainer';
    dashboardContainer.innerHTML = dashboardHTML;
    infoCard.insertAdjacentElement('afterend', dashboardContainer);
    
    // Tambahkan visualisasi lanjutan
    const advancedVisualizationHTML = addAdvancedVisualizationHTML();
    const advancedContainer = document.createElement('div');
    advancedContainer.id = 'advancedAnalysisContainer';
    advancedContainer.innerHTML = advancedVisualizationHTML;
    
    // Tempatkan setelah tren chart
    const trendChart = document.querySelector('.trend-chart');
    trendChart.insertAdjacentElement('afterend', advancedContainer);
    
    // Inisialisasi grafik dasar
    initializeHealthChart();
    
    // Inisialisasi stress gauge
    initializeStressGauge();
    
    // Inisialisasi grafik analisis lanjutan
    initializeComprehensiveAnalysisCharts(analysis, inputs);
    
    // Tambahkan event listener untuk tombol kembali
    const kembaliBtn = document.getElementById('kembaliKeFormBtn');
    if (kembaliBtn) {
        kembaliBtn.addEventListener('click', showInputForm);
    }
}

// Ganti event listener pada tombol analisis untuk menggunakan fungsi baru
analyzeBtn.addEventListener('click', function() {
    showDashboardWithAdvancedAnalysis();
});

// Tambahkan CSS untuk tampilan baru
const advancedAnalysisStyles = `
    /* Skor Kesehatan Cards */
    .health-score-section {
        margin-bottom: 25px;
    }
    
    .health-score-section h3 {
        font-size: 18px;
        margin-bottom: 15px;
        color: #1f2937;
    }
    
    .score-cards {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
    }
    
    .score-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 15px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        height: 120px;
    }
    
    .score-value {
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 5px;
    }
    
    .score-label {
        font-size: 14px;
        color: #6b7280;
    }
    
    .score-card.excellent {
        background-color: #ecfdf5;
        color: #065f46;
    }
    
    .score-card.good {
        background-color: #f0f9ff;
        color: #0c4a6e;
    }
    
    .score-card.average {
        background-color: #fff8eb;
        color: #92400e;
    }
    
    .score-card.poor {
        background-color: #fef2f2;
        color: #991b1b;
    }
    
    /* Grafik Analisis */
    .advanced-analysis-section {
        margin-bottom: 25px;
    }
    
    .advanced-analysis-section h3 {
        font-size: 18px;
        margin-bottom: 15px;
        color: #1f2937;
    }
    
    .analysis-charts {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
    }
    
    .chart-container {
        background-color: white;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        height: 300px;
        position: relative;
    }
    
    .chart-container h4 {
        text-align: center;
        margin-top: 10px;
        font-size: 14px;
        color: #6b7280;
    }
    
    /* Rekomendasi */
    .recommendations-section {
        background-color: white;
        border-radius: 15px;
        padding: 25px;
        margin-bottom: 25px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .recommendations-section h3 {
        font-size: 18px;
        margin-bottom: 20px;
        color: #1f2937;
    }
    
    .recommendation-items {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }
    
    .recommendation-item {
        background-color: #f9fafb;
        border-radius: 10px;
        padding: 15px;
        border-left: 5px solid #5046e5;
    }
    
    .recommendation-item.recommendation-success {
        background-color: #ecfdf5;
        border-left-color: #10b981;
    }
    
    .recommendation-header {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        gap: 10px;
    }
    
    .recommendation-category {
        padding: 4px 8px;
        border-radius: 5px;
        font-size: 12px;
        font-weight: 600;
        color: white;
    }
    
    .recommendation-category.lingkungan {
        background-color: #5046e5;
    }
    
    .recommendation-category.kesejahteraan {
        background-color: #f59e0b;
    }
    
    .recommendation-category.produktivitas {
        background-color: #10b981;
    }
    
    .recommendation-category.kesehatan {
        background-color: #ef4444;
    }
    
    .recommendation-category.manajemen {
        background-color: #3b82f6;
    }
    
    .recommendation-category.optimal {
        background-color: #10b981;
    }
    
    .recommendation-header h4 {
        font-size: 14px;
        margin: 0;
        flex: 1;
    }
    
    .priority-badge {
        padding: 3px 8px;
        border-radius: 5px;
        font-size: 11px;
        font-weight: 600;
    }
    
    .priority-badge.priority-tinggi {
        background-color: #fee2e2;
        color: #b91c1c;
    }
    
    .priority-badge.priority-sangat {
        background-color: #fef2f2;
        color: #991b1b;
    }
    
    .priority-badge.priority-sedang {
        background-color: #fff8eb;
        color: #92400e;
    }
    
    .priority-badge.priority-rendah {
        background-color: #ecfdf5;
        color: #065f46;
    }
    
    .recommendation-details {
        font-size: 13px;
        color: #4b5563;
    }
    
    /* Responsive styles */
    @media (max-width: 1024px) {
        .score-cards {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .analysis-charts {
            grid-template-columns: 1fr;
        }
        
        .recommendation-items {
            grid-template-columns: 1fr;
        }
    }
`;

// Tambahkan style ke head dokumen
function addAdvancedStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = advancedAnalysisStyles;
    document.head.appendChild(styleElement);
}

// Panggil fungsi untuk menambahkan style saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    addAdvancedStyles();
});