// Analisis Kesehatan Peternakan - Machine Learning Integration
document.addEventListener('DOMContentLoaded', function() {
    // Referensi ke elemen DOM
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeMenu = document.getElementById('closeMenu');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultsSection = document.getElementById('resultsSection');
    const chartSection = document.getElementById('chartSection');
    const predictionSection = document.getElementById('predictionSection');
    
    // Inisialisasi model machine learning (TensorFlow.js)
    let healthModel = null;
    let stressModel = null;
    let productivityModel = null;
    
    // Data historis untuk grafik
    const historicalData = {
        dates: ['20/04', '21/04', '22/04', '23/04', '24/04', '25/04', '26/04', '27/04'],
        temperature: [25.2, 25.3, 25.4, 25.1, 24.9, 25.2, 25.3, 25.5],
        humidity: [64, 65, 66, 65, 64, 65, 66, 65],
        ammonia: [8, 9, 10, 11, 12, 13, 14, 15],
        noise: [44, 45, 43, 46, 44, 45, 45, 45],
        stressIndex: [0.12, 0.15, 0.18, 0.20, 0.22, 0.24, 0.25, 0.26],
        eggProduction: [87.2, 86.8, 86.5, 86.3, 86.0, 85.8, 85.6, 85.5]
    };
    
    // Fungsi-fungsi navigasi mobile
    function setupMobileNavigation() {
        // Buka sidebar
        hamburgerBtn.addEventListener('click', function() {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Tutup sidebar
        function closeSidebar() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        closeMenu.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
        
        // Tutup sidebar saat klik item menu (opsional)
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
            });
        });
    }
    
    // Load model machine learning menggunakan TensorFlow.js
    async function loadModels() {
        try {
            // Dalam implementasi sebenarnya, model akan dimuat dari server
            // Contoh: healthModel = await tf.loadLayersModel('URL_MODEL_KESEHATAN');
            
            // Untuk demo, kita buat model sederhana
            healthModel = createDummyHealthModel();
            stressModel = createDummyStressModel();
            productivityModel = createDummyProductivityModel();
            
            console.log('Model ML berhasil dimuat');
        } catch (error) {
            console.error('Gagal memuat model ML:', error);
        }
    }
    
    // Membuat model dummy untuk simulasi (simulasi TensorFlow.js)
    function createDummyHealthModel() {
        return {
            predict: function(inputs) {
                // Algoritma sederhana untuk menghitung skor kesehatan
                const temperature = inputs.temperature;
                const humidity = inputs.humidity;
                const ammonia = inputs.ammonia;
                const noise = inputs.noise;
                const mortality = inputs.mortality;
                const stressIndex = inputs.stressIndex;
                
                let score = 100;
                
                // Penalti untuk suhu di luar rentang optimal (24-28°C)
                if (temperature < 24 || temperature > 28) {
                    score -= 5 * Math.min(Math.abs(temperature - 26) / 2, 3);
                }
                
                // Penalti untuk kelembaban di luar rentang optimal (60-70%)
                if (humidity < 60 || humidity > 70) {
                    score -= 5 * Math.min(Math.abs(humidity - 65) / 5, 3);
                }
                
                // Penalti signifikan untuk amonia di atas ambang batas (10 ppm)
                if (ammonia > 10) {
                    score -= 15 * Math.min((ammonia - 10) / 5, 3);
                }
                
                // Penalti kecil untuk kebisingan di atas ambang batas (50 dB)
                if (noise > 50) {
                    score -= 5 * Math.min((noise - 50) / 10, 2);
                }
                
                // Penalti besar untuk kematian
                score -= mortality * 50;
                
                // Penalti untuk indeks stress di atas 0.15
                if (stressIndex > 0.15) {
                    score -= 20 * Math.min((stressIndex - 0.15) / 0.15, 3);
                }
                
                // Pastikan skor tidak kurang dari 0 atau lebih dari 100
                return Math.max(0, Math.min(100, Math.round(score)));
            }
        };
    }
    
    function createDummyStressModel() {
        return {
            predict: function(inputs) {
                const temperature = inputs.temperature;
                const humidity = inputs.humidity;
                const ammonia = inputs.ammonia;
                const noise = inputs.noise;
                const lighting = inputs.lighting;
                
                // Algoritma sederhana untuk menghitung indeks stress
                let stressIndex = 0.1; // Baseline stress
                
                // Faktor suhu
                if (temperature < 24 || temperature > 28) {
                    stressIndex += 0.05 * Math.min(Math.abs(temperature - 26) / 2, 3);
                }
                
                // Faktor kelembaban
                if (humidity < 60 || humidity > 70) {
                    stressIndex += 0.02 * Math.min(Math.abs(humidity - 65) / 5, 3);
                }
                
                // Faktor amonia (pengaruh besar)
                if (ammonia > 10) {
                    stressIndex += 0.1 * Math.min((ammonia - 10) / 5, 3);
                }
                
                // Faktor kebisingan
                if (noise > 50) {
                    stressIndex += 0.03 * Math.min((noise - 50) / 10, 3);
                }
                
                // Faktor pencahayaan yang tidak optimal (16 jam ideal)
                if (lighting < 14 || lighting > 18) {
                    stressIndex += 0.03 * Math.min(Math.abs(lighting - 16) / 2, 3);
                }
                
                // Tambahkan sedikit randomness untuk simulasi model ML nyata
                stressIndex += (Math.random() * 0.02 - 0.01);
                
                // Batasi nilai antara 0.1 dan 0.5
                return Math.max(0.1, Math.min(0.5, parseFloat(stressIndex.toFixed(2))));
            }
        };
    }
    
    function createDummyProductivityModel() {
        return {
            predict: function(inputs) {
                const flockAge = inputs.flockAge;
                const stressIndex = inputs.stressIndex;
                const temperature = inputs.temperature;
                const ammonia = inputs.ammonia;
                const feedConsumption = inputs.feedConsumption;
                const waterConsumption = inputs.waterConsumption;
                
                // Algoritma prediksi produktivitas
                // Produktivitas dasar berdasarkan umur ayam (kurva produksi standar)
                let baseProductivity = 0;
                
                // Kurva produksi telur berdasarkan umur (hari)
                if (flockAge < 140) {
                    baseProductivity = 50 + (flockAge - 120) * 2.5; // Fase awal produksi
                } else if (flockAge < 240) {
                    baseProductivity = 90 - (flockAge - 140) * 0.05; // Fase puncak produksi
                } else if (flockAge < 500) {
                    baseProductivity = 85 - (flockAge - 240) * 0.1; // Fase penurunan gradual
                } else {
                    baseProductivity = 60 - (flockAge - 500) * 0.15; // Fase akhir produksi
                }
                
                // Faktor stress (pengaruh besar)
                let stressFactor = 1.0;
                if (stressIndex > 0.15) {
                    stressFactor = 1.0 - ((stressIndex - 0.15) * 1.5);
                }
                
                // Faktor lingkungan
                let environmentFactor = 1.0;
                
                // Pengaruh suhu
                if (temperature < 24 || temperature > 28) {
                    environmentFactor -= 0.05 * Math.min(Math.abs(temperature - 26) / 2, 0.3);
                }
                
                // Pengaruh amonia
                if (ammonia > 10) {
                    environmentFactor -= 0.1 * Math.min((ammonia - 10) / 5, 0.3);
                }
                
                // Faktor nutrisi
                let nutritionFactor = 1.0;
                
                // Pengaruh konsumsi pakan (optimal: 110-115g)
                if (feedConsumption < 100 || feedConsumption > 120) {
                    nutritionFactor -= 0.05 * Math.min(Math.abs(feedConsumption - 110) / 10, 0.3);
                }
                
                // Pengaruh konsumsi air (optimal: 2x konsumsi pakan)
                const optimalWater = feedConsumption * 2;
                if (waterConsumption < optimalWater * 0.8 || waterConsumption > optimalWater * 1.2) {
                    nutritionFactor -= 0.05 * Math.min(Math.abs(waterConsumption - optimalWater) / (optimalWater * 0.2), 0.3);
                }
                
                // Hitung produktivitas aktual
                let productivity = baseProductivity * stressFactor * environmentFactor * nutritionFactor;
                
                // Tambahkan sedikit randomness untuk simulasi model ML nyata
                productivity += (Math.random() * 2 - 1);
                
                // Batasi nilai antara 0 dan 100
                return Math.max(0, Math.min(100, parseFloat(productivity.toFixed(1))));
            }
        };
    }
    
    // Fungsi untuk mengambil nilai input dari form
    function getFormInputs() {
        return {
            temperature: parseFloat(document.getElementById('temperature').value),
            humidity: parseFloat(document.getElementById('humidity').value),
            ammonia: parseFloat(document.getElementById('ammonia').value),
            noise: parseFloat(document.getElementById('noise').value),
            lighting: parseFloat(document.getElementById('lighting').value),
            flockAge: parseFloat(document.getElementById('flockAge').value),
            featherCondition: document.getElementById('featherCondition').value,
            combCondition: document.getElementById('combCondition').value,
            mortality: parseFloat(document.getElementById('mortality').value),
            feedConsumption: parseFloat(document.getElementById('feedConsumption').value),
            waterConsumption: parseFloat(document.getElementById('waterConsumption').value),
            eggProduction: parseFloat(document.getElementById('eggProduction').value)
        };
    }
    
    // Fungsi untuk mereset form ke nilai default
    function resetForm() {
        document.getElementById('temperature').value = '25.5';
        document.getElementById('humidity').value = '65';
        document.getElementById('ammonia').value = '15';
        document.getElementById('noise').value = '45';
        document.getElementById('lighting').value = '16';
        document.getElementById('flockAge').value = '224';
        document.getElementById('featherCondition').value = 'Baik';
        document.getElementById('combCondition').value = 'Merah Terang';
        document.getElementById('mortality').value = '0';
        document.getElementById('feedConsumption').value = '110';
        document.getElementById('waterConsumption').value = '220';
        document.getElementById('eggProduction').value = '85.5';
    }
    
    // Analisis kesehatan dan prediksi berdasarkan input
    function analyzeHealth() {
        // Ambil input dari form
        const inputs = getFormInputs();
        
        // Hitung indeks stress berdasarkan data input
        const calculatedStressIndex = stressModel.predict(inputs);
        
        // Update input dengan indeks stress yang dihitung
        inputs.stressIndex = calculatedStressIndex;
        
        // Hitung skor kesehatan menggunakan model
        const healthScore = healthModel.predict(inputs);
        
        // Prediksi produktivitas berdasarkan input (menggunakan data aktual sebagai pembanding)
        const predictedProductivity = productivityModel.predict(inputs);
        
        // Update hasil analisis di UI
        updateResults(healthScore, calculatedStressIndex, predictedProductivity, inputs);
        
        // Prediksi 7 hari ke depan
        predictFutureHealth(inputs);
        
        // Tampilkan charts
        updateCharts(inputs);
        
        // Tampilkan hasil
        resultsSection.style.display = 'block';
        chartSection.style.display = 'grid';
        predictionSection.style.display = 'block';
        
        // Scroll ke hasil
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update bagian hasil dengan data analisis
    function updateResults(healthScore, stressIndex, predictedProductivity, inputs) {
        // Tentukan kategori kesehatan berdasarkan skor
        let healthCategory = '';
        let healthStatusIcon = '';
        
        if (healthScore >= 85) {
            healthCategory = 'Sangat Baik';
            healthStatusIcon = 'status-healthy';
        } else if (healthScore >= 70) {
            healthCategory = 'Baik';
            healthStatusIcon = 'status-healthy';
        } else if (healthScore >= 60) {
            healthCategory = 'Sedang';
            healthStatusIcon = 'status-warning';
        } else {
            healthCategory = 'Perlu Perhatian';
            healthStatusIcon = 'status-danger';
        }
        
        // Tentukan kategori lingkungan
        let environmentScore = 100;
        let environmentCategory = '';
        let environmentStatusIcon = '';
        
        // Penalti untuk parameter lingkungan
        if (inputs.temperature < 24 || inputs.temperature > 28) {
            environmentScore -= 5;
        }
        if (inputs.humidity < 60 || inputs.humidity > 70) {
            environmentScore -= 5;
        }
        if (inputs.ammonia > 10) {
            environmentScore -= 20;
        }
        if (inputs.noise > 50) {
            environmentScore -= 5;
        }
        
        if (environmentScore >= 85) {
            environmentCategory = 'Optimal';
            environmentStatusIcon = 'status-healthy';
        } else if (environmentScore >= 70) {
            environmentCategory = 'Baik';
            environmentStatusIcon = 'status-healthy';
        } else if (environmentScore >= 60) {
            environmentCategory = 'Perlu Perhatian';
            environmentStatusIcon = 'status-warning';
        } else {
            environmentCategory = 'Bermasalah';
            environmentStatusIcon = 'status-danger';
        }
        
        // Tentukan kategori stress
        let stressCategory = '';
        let stressStatusIcon = '';
        
        if (stressIndex <= 0.15) {
            stressCategory = 'Rendah';
            stressStatusIcon = 'status-healthy';
        } else if (stressIndex <= 0.30) {
            stressCategory = 'Medium';
            stressStatusIcon = 'status-warning';
        } else {
            stressCategory = 'Tinggi';
            stressStatusIcon = 'status-danger';
        }
        
        // Tentukan kategori produktivitas
        let productivityCategory = '';
        let productivityStatusIcon = '';
        
        if (predictedProductivity >= 85) {
            productivityCategory = 'Sangat Baik';
            productivityStatusIcon = 'status-healthy';
        } else if (predictedProductivity >= 75) {
            productivityCategory = 'Baik';
            productivityStatusIcon = 'status-healthy';
        } else if (predictedProductivity >= 65) {
            productivityCategory = 'Cukup';
            productivityStatusIcon = 'status-warning';
        } else {
            productivityCategory = 'Kurang';
            productivityStatusIcon = 'status-danger';
        }
        
        // Hitung jumlah parameter yang menyimpang
        let deviationCount = 0;
        if (inputs.temperature < 24 || inputs.temperature > 28) deviationCount++;
        if (inputs.humidity < 60 || inputs.humidity > 70) deviationCount++;
        if (inputs.ammonia > 10) deviationCount++;
        if (inputs.noise > 50) deviationCount++;
        if (stressIndex > 0.15) deviationCount++;
        
        // Update UI untuk hasil kesehatan keseluruhan
        const healthResultsHTML = `
            <h4><span class="status-icon ${healthStatusIcon}"></span> Indeks Kesehatan Keseluruhan</h4>
            <div class="result-details">
                <p>Skor Kesehatan: <strong>${healthScore}/100</strong> (Kategori: <strong>${healthCategory}</strong>)</p>
                <p>Ayam dalam kondisi kesehatan ${healthCategory.toLowerCase()} dengan ${deviationCount} parameter yang perlu perhatian. ${deviationCount > 0 ? 'Terdapat parameter yang berada di luar range optimal.' : 'Semua parameter berada dalam range optimal.'}</p>
            </div>
            <div class="recommendation">
                <p><strong>Rekomendasi:</strong> ${getHealthRecommendation(healthScore, deviationCount, inputs)}</p>
            </div>
        `;
        
        // Update UI untuk kondisi lingkungan
        const environmentResultsHTML = `
            <h4><span class="status-icon ${environmentStatusIcon}"></span> Kondisi Lingkungan</h4>
            <div class="result-details">
                <p>Skor Lingkungan: <strong>${environmentScore}/100</strong> (Kategori: <strong>${environmentCategory}</strong>)</p>
                <p>${getEnvironmentSummary(inputs)}</p>
            </div>
            <div class="recommendation">
                <p><strong>Rekomendasi:</strong> ${getEnvironmentRecommendation(inputs)}</p>
            </div>
        `;
        
        // Update UI untuk indeks stress
        const stressResultsHTML = `
            <h4><span class="status-icon ${stressStatusIcon}"></span> Indeks Stress</h4>
            <div class="result-details">
                <p>Skor Stress: <strong>${stressIndex}</strong> (Kategori: <strong>${stressCategory}</strong>)</p>
                <p>${getStressSummary(stressIndex, inputs)}</p>
            </div>
            <div class="recommendation">
                <p><strong>Rekomendasi:</strong> ${getStressRecommendation(stressIndex, inputs)}</p>
            </div>
        `;
        
        // Update UI untuk produktivitas
        const productivityResultsHTML = `
            <h4><span class="status-icon ${productivityStatusIcon}"></span> Produktivitas</h4>
            <div class="result-details">
                <p>Skor Produktivitas: <strong>${predictedProductivity.toFixed(1)}/100</strong> (Kategori: <strong>${productivityCategory}</strong>)</p>
                <p>${getProductivitySummary(predictedProductivity, inputs)}</p>
            </div>
            <div class="recommendation">
                <p><strong>Rekomendasi:</strong> ${getProductivityRecommendation(predictedProductivity, inputs)}</p>
            </div>
        `;
        
        // Update konten hasil
        const resultCards = document.querySelectorAll('.result-card');
        resultCards[0].innerHTML = healthResultsHTML;
        resultCards[1].innerHTML = environmentResultsHTML;
        resultCards[2].innerHTML = stressResultsHTML;
        resultCards[3].innerHTML = productivityResultsHTML;
    }
    
    // Fungsi untuk prediksi kesehatan di masa depan
    function predictFutureHealth(currentInputs) {
        // Prediksi 7 hari ke depan jika kondisi saat ini dipertahankan
        // Klon input saat ini untuk dimodifikasi
        const futureInputs = {...currentInputs};
        
        // Simulasi perubahan parameter jika kondisi buruk dipertahankan
        if (currentInputs.ammonia > 10) {
            // Amonia cenderung meningkat jika tidak ditangani
            futureInputs.ammonia = Math.min(30, currentInputs.ammonia * 1.15);
        }
        
        // Stres cenderung meningkat jika parameter lingkungan tidak optimal
        const deviationCount = (currentInputs.temperature < 24 || currentInputs.temperature > 28) + 
                             (currentInputs.humidity < 60 || currentInputs.humidity > 70) + 
                             (currentInputs.ammonia > 10) + 
                             (currentInputs.noise > 50);
        
        if (deviationCount > 0) {
            futureInputs.stressIndex = Math.min(0.5, currentInputs.stressIndex * (1 + (0.05 * deviationCount)));
        }
        
        // Prediksi produktivitas masa depan
        const futureProductivity = productivityModel.predict(futureInputs);
        
        // Update UI untuk prediksi
        const futureProductivityDiff = futureProductivity - currentInputs.eggProduction;
        
        const predictionCards = document.querySelectorAll('#predictionSection .result-card');
        
        // Prediksi 7 hari ke depan
        predictionCards[0].innerHTML = `
            <h4><span class="status-icon ${futureProductivityDiff < -2 ? 'status-danger' : 'status-warning'}"></span> Prediksi 7 Hari Kedepan</h4>
            <div class="result-details">
                <p>Jika kondisi saat ini dipertahankan, indeks stress dapat meningkat hingga <strong>${futureInputs.stressIndex.toFixed(2)}</strong> dan produktivitas dapat ${futureProductivityDiff < 0 ? 'menurun' : 'meningkat'} hingga <strong>${futureProductivity.toFixed(1)}%</strong> dalam 7 hari ke depan.</p>
            </div>
            <div class="recommendation">
                <p><strong>Rekomendasi:</strong> ${getPredictionRecommendation(futureProductivityDiff, futureInputs, currentInputs)}</p>
            </div>
        `;
        
        // Simulasi potensi optimalisasi jika rekomendasi diikuti
        const optimizedInputs = {...currentInputs};
        
        // Perbaikan parameter buruk
        if (currentInputs.ammonia > 10) {
            optimizedInputs.ammonia = 8;
        }
        if (currentInputs.temperature < 24 || currentInputs.temperature > 28) {
            optimizedInputs.temperature = 26;
        }
        if (currentInputs.humidity < 60 || currentInputs.humidity > 70) {
            optimizedInputs.humidity = 65;
        }
        
        // Pengurangan indeks stress
        optimizedInputs.stressIndex = Math.max(0.12, currentInputs.stressIndex * 0.8);
        
        // Prediksi produktivitas optimal
        const optimizedProductivity = productivityModel.predict(optimizedInputs);
        
        // Potensi optimalisasi
        predictionCards[1].innerHTML = `
            <h4><span class="status-icon status-healthy"></span> Potensi Optimalisasi</h4>
            <div class="result-details">
                <p>Dengan perbaikan pada ${getOptimizationTargets(currentInputs)}, produktivitas dapat ditingkatkan hingga <strong>${optimizedProductivity.toFixed(1)}%</strong> dan skor kesehatan hingga <strong>${healthModel.predict(optimizedInputs)}/100</strong>.</p>
            </div>
            <div class="recommendation">
                <p><strong>Rekomendasi:</strong> ${getOptimizationRecommendation(currentInputs)}</p>
            </div>
        `;
    }
    
    // Inisialisasi grafik
    function updateCharts(inputs) {
        // Tambahkan data hari ini ke data historis
        const currentDate = new Date();
        const today = `${currentDate.getDate()}/${currentDate.getMonth() + 1}`;
        
        // Perbarui grafik parameter kesehatan
        const healthCtx = document.getElementById('healthTrendsChart').getContext('2d');
        const healthChart = new Chart(healthCtx, {
            type: 'line',
            data: {
                labels: historicalData.dates,
                datasets: [
                    {
                        label: 'Suhu (°C)',
                        data: historicalData.temperature,
                        borderColor: '#92400e',
                        tension: 0.3,
                        borderWidth: 2,
                        pointRadius: 3
                    },
                    {
                        label: 'Amonia (ppm)',
                        data: historicalData.ammonia,
                        borderColor: '#eab308',
                        tension: 0.3,
                        borderWidth: 2,
                        pointRadius: 3
                    },
                    {
                        label: 'Stress Index',
                        data: historicalData.stressIndex,
                        borderColor: '#3b82f6',
                        tension: 0.3,
                        borderWidth: 2,
                        pointRadius: 3,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }
        });
        
        // Grafik hubungan stress dan produktivitas
        const stressProductivityCtx = document.getElementById('stressProductivityChart').getContext('2d');
        const stressProductivityChart = new Chart(stressProductivityCtx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Data Historis',
                    data: historicalData.stressIndex.map((stress, i) => ({
                        x: stress,
                        y: historicalData.eggProduction[i]
                    })),
                    backgroundColor: '#3b82f6',
                    pointRadius: 5
                }, {
                    label: 'Nilai Saat Ini',
                    data: [{
                        x: inputs.stressIndex,
                        y: inputs.eggProduction
                    }],
                    backgroundColor: '#ef4444',
                    pointRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Indeks Stress'
                        },
                        min: 0.1,
                        max: 0.3
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Produksi Telur (%)'
                        },
                        min: 80,
                        max: 90
                    }
                },
                plugins: {
                    legend: {
                        display: true
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Stress: ${context.parsed.x}, Produksi: ${context.parsed.y}%`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Fungsi pembantu untuk rekomendasi
    function getHealthRecommendation(healthScore, deviationCount, inputs) {
        if (deviationCount === 0) {
            return "Pertahankan kondisi saat ini. Lakukan monitoring rutin dan pastikan semua parameter tetap dalam rentang optimal.";
        } else if (inputs.ammonia > 10) {
            return "Perhatikan parameter yang menyimpang dari nilai optimal, terutama kadar amonia dan indeks stress yang meningkat. Tindakan perbaikan segera diperlukan untuk mencegah penurunan produktivitas.";
        } else {
            return "Evaluasi parameter yang menyimpang dari nilai optimal. Lakukan perbaikan pada aspek lingkungan untuk meningkatkan kesehatan dan produktivitas.";
        }
    }
    
    function getEnvironmentSummary(inputs) {
        let issues = [];
        
        if (inputs.ammonia > 10) {
            issues.push(`kadar amonia ${inputs.ammonia} ppm melebihi batas aman (10 ppm)`);
        }
        
        if (inputs.temperature < 24 || inputs.temperature > 28) {
            issues.push(`suhu ${inputs.temperature}°C berada di luar rentang optimal (24-28°C)`);
        }
        
        if (inputs.humidity < 60 || inputs.humidity > 70) {
            issues.push(`kelembaban ${inputs.humidity}% berada di luar rentang optimal (60-70%)`);
        }
        
        if (inputs.noise > 50) {
            issues.push(`kebisingan ${inputs.noise} dB berada di luar rentang optimal (< 50 dB)`);
        }
        
        if (issues.length === 0) {
            return "Semua parameter lingkungan berada dalam rentang optimal.";
        } else {
            return `${issues.join(', ').charAt(0).toUpperCase() + issues.join(', ').slice(1)}. ${issues.length === 1 ? 'Parameter lain' : 'Parameter lainnya'} dalam rentang normal.`;
        }
    }
    
    function getEnvironmentRecommendation(inputs) {
        if (inputs.ammonia > 10) {
            return "Tingkatkan ventilasi kandang untuk mengurangi kadar amonia. Lakukan pembersihan lebih sering pada area kotoran ayam. Pertimbangkan penggunaan aditif pakan atau litter treatment untuk mengurangi produksi amonia.";
        } else if (inputs.temperature < 24 || inputs.temperature > 28) {
            return "Sesuaikan pengaturan suhu kandang agar tetap berada pada rentang 24-28°C. Pastikan sistem pemanas/pendingin berfungsi dengan baik dan distribusi suhu merata di seluruh kandang.";
        } else if (inputs.humidity < 60 || inputs.humidity > 70) {
            return "Atur kelembaban kandang agar berada pada rentang 60-70%. Gunakan sistem pengatur kelembaban atau pengelolaan ventilasi yang tepat sesuai dengan kondisi cuaca.";
        } else {
            return "Pertahankan kondisi lingkungan saat ini. Lakukan monitoring rutin untuk memastikan semua parameter tetap dalam rentang optimal.";
        }
    }
    
    function getStressSummary(stressIndex, inputs) {
        if (stressIndex <= 0.15) {
            return "Tingkat stress rendah. Ayam dalam kondisi nyaman dengan indikator fisik yang baik.";
        } else if (stressIndex <= 0.25) {
            return "Tingkat stress pada batas bawah kategori medium. Kondisi jengger menunjukkan sirkulasi darah yang baik namun ada tanda-tanda stress ringan.";
        } else if (stressIndex <= 0.30) {
            return "Tingkat stress pada batas atas kategori medium. Peningkatan kadar amonia dan faktor lingkungan lain berkontribusi pada stress.";
        } else {
            return "Tingkat stress tinggi. Perlu tindakan segera untuk mengidentifikasi dan mengatasi sumber stress.";
        }
    }
    
    function getStressRecommendation(stressIndex, inputs) {
        if (stressIndex <= 0.15) {
            return "Pertahankan kondisi nyaman saat ini. Pastikan ketersediaan pakan dan air minum yang cukup.";
        } else if (stressIndex <= 0.30) {
            let recommendation = "Periksa sumber stress seperti ";
            
            if (inputs.ammonia > 10) {
                recommendation += "kadar amonia yang tinggi, ";
            }
            
            if (inputs.temperature < 24 || inputs.temperature > 28) {
                recommendation += "suhu yang tidak optimal, ";
            }
            
            if (inputs.noise > 50) {
                recommendation += "kebisingan berlebih, ";
            }
            
            recommendation += "atau faktor lainnya. Pastikan ayam memiliki akses ke tempat berteduh dan area beraktivitas. Pertimbangkan tambahan vitamin dan elektrolit dalam air minum untuk mengurangi stress.";
            
            return recommendation;
        } else {
            return "Tindakan segera diperlukan untuk mengurangi stress. Atasi masalah lingkungan, terutama ventilasi dan amonia. Berikan suplemen anti-stress dan elektrolit dalam air minum. Konsultasikan dengan dokter hewan jika perlu.";
        }
    }
    
    function getProductivitySummary(productivity, inputs) {
        const expectedProductivity = getExpectedProductivity(inputs.flockAge);
        const diff = productivity - expectedProductivity;
        
        if (diff >= 5) {
            return `Produksi telur ${productivity.toFixed(1)}% berada jauh di atas standar untuk ayam petelur usia ${inputs.flockAge} hari. Konsumsi pakan dan air dalam rentang optimal.`;
        } else if (diff >= 0) {
            return `Produksi telur ${productivity.toFixed(1)}% berada pada atau sedikit di atas standar untuk ayam petelur usia ${inputs.flockAge} hari. Konsumsi pakan dan air dalam rentang normal.`;
        } else if (diff >= -5) {
            return `Produksi telur ${productivity.toFixed(1)}% berada sedikit di bawah standar untuk ayam petelur usia ${inputs.flockAge} hari. Perlu evaluasi faktor yang mempengaruhi produktivitas.`;
        } else {
            return `Produksi telur ${productivity.toFixed(1)}% berada jauh di bawah standar untuk ayam petelur usia ${inputs.flockAge} hari. Perlu evaluasi menyeluruh terhadap kesehatan dan manajemen.`;
        }
    }
    
    function getProductivityRecommendation(productivity, inputs) {
        const expectedProductivity = getExpectedProductivity(inputs.flockAge);
        const diff = productivity - expectedProductivity;
        
        if (diff >= 0) {
            return "Pertahankan kualitas pakan dan ketersediaan air. Pantau dengan cermat untuk memastikan produktivitas tetap tinggi. Lakukan penyesuaian pakan sesuai dengan kebutuhan nutrisi pada fase produksi ini.";
        } else if (diff >= -5) {
            return "Tingkatkan kualitas nutrisi pakan dengan memastikan kandungan protein dan kalsium yang cukup. Pastikan ayam mendapatkan cahaya yang cukup (16 jam per hari) dan air bersih ad libitum.";
        } else {
            return "Lakukan evaluasi menyeluruh terhadap nutrisi, kesehatan, dan manajemen. Periksa kemungkinan adanya penyakit subklinis atau parasit. Konsultasikan dengan ahli nutrisi atau dokter hewan untuk program perbaikan.";
        }
    }
    
    function getPredictionRecommendation(productivityDiff, futureInputs, currentInputs) {
        if (productivityDiff < -3) {
            return "Lakukan tindakan perbaikan untuk parameter kadar amonia dan stress segera. Model prediksi menunjukkan potensi kerugian produksi hingga " + Math.abs(productivityDiff.toFixed(1)) + "% jika tidak ditangani.";
        } else if (productivityDiff < 0) {
            return "Perbaiki parameter lingkungan yang tidak optimal, terutama kadar amonia dan ventilasi. Hal ini dapat mencegah penurunan produktivitas yang diprediksi.";
        } else {
            return "Pertahankan kondisi saat ini dan lakukan monitoring rutin. Prediksi menunjukkan produktivitas yang stabil atau meningkat.";
        }
    }
    
    function getOptimizationTargets(inputs) {
        let targets = [];
        
        if (inputs.ammonia > 10) {
            targets.push("ventilasi dan kontrol amonia");
        }
        
        if (inputs.temperature < 24 || inputs.temperature > 28) {
            targets.push("pengaturan suhu");
        }
        
        if (inputs.stressIndex > 0.15) {
            targets.push("manajemen stress");
        }
        
        if (targets.length === 0) {
            return "manajemen kesehatan umum";
        } else {
            return targets.join(", ");
        }
    }
    
    function getOptimizationRecommendation(inputs) {
        let recommendations = [];
        
        if (inputs.ammonia > 10) {
            recommendations.push("implementasikan program manajemen ventilasi yang lebih baik");
        }
        
        if (inputs.stressIndex > 0.15) {
            recommendations.push("penggunaan probiotik dalam pakan");
        }
        
        if (inputs.temperature < 24 || inputs.temperature > 28) {
            recommendations.push("optimalisasi sistem pengatur suhu");
        }
        
        if (recommendations.length === 0) {
            return "Pertahankan praktik manajemen saat ini dan lakukan pemantauan rutin untuk hasil optimal.";
        } else {
            return recommendations.join(" dan ") + " untuk hasil optimal. Estimasi ROI dari investasi perbaikan ini adalah 1:3.5 dalam 30 hari.";
        }
    }
    
    // Fungsi untuk mendapatkan produktivitas yang diharapkan berdasarkan umur ayam
    function getExpectedProductivity(flockAge) {
        if (flockAge < 140) {
            return 50 + (flockAge - 120) * 2.5; // Fase awal produksi
        } else if (flockAge < 240) {
            return 90 - (flockAge - 140) * 0.05; // Fase puncak produksi
        } else if (flockAge < 500) {
            return 85 - (flockAge - 240) * 0.1; // Fase penurunan gradual
        } else {
            return 60 - (flockAge - 500) * 0.15; // Fase akhir produksi
        }
    }
    
    // Inisialisasi dan event listeners
    async function initialize() {
        // Setup mobile navigation
        setupMobileNavigation();
        
        // Load model ML
        await loadModels();
        
        // Tambahkan event listener untuk tombol analisis
        analyzeBtn.addEventListener('click', analyzeHealth);
        
        // Tambahkan event listener untuk tombol reset
        resetBtn.addEventListener('click', function() {
            resetForm();
            resultsSection.style.display = 'none';
            chartSection.style.display = 'none';
            predictionSection.style.display = 'none';
        });
        
        // Tambahkan event listener untuk tombol kandang
        const coopButtons = document.querySelectorAll('.coop-btn');
        coopButtons.forEach(button => {
            button.addEventListener('click', function() {
                coopButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Simulasi perubahan data berdasarkan kandang yang dipilih
                if (this.textContent === 'COOP-B') {
                    document.getElementById('temperature').value = '26.2';
                    document.getElementById('humidity').value = '68';
                    document.getElementById('ammonia').value = '8';
                    document.getElementById('eggProduction').value = '87.3';
                } else if (this.textContent === 'COOP-C') {
                    document.getElementById('temperature').value = '24.8';
                    document.getElementById('humidity').value = '62';
                    document.getElementById('ammonia').value = '12';
                    document.getElementById('eggProduction').value = '82.7';
                } else {
                    // COOP-A (default)
                    resetForm();
                }
                
                // Reset hasil analisis
                resultsSection.style.display = 'none';
                chartSection.style.display = 'none';
                predictionSection.style.display = 'none';
            });
        });
    }
    
    // Panggil inisialisasi
    initialize();
});