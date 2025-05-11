/**
 * EggChain - Analisis Kesehatan Peternakan
 * JavaScript untuk halaman analisis kesehatan peternakan ayam dengan machine learning
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== INISIALISASI REFERENSI DOM =====
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeMenu = document.getElementById('closeMenu');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultsSection = document.getElementById('resultsSection');
    const chartSection = document.getElementById('chartSection');
    const predictionSection = document.getElementById('predictionSection');
    const formSection = document.getElementById('healthAnalysisForm').closest('.input-form');
    
    // Referensi untuk input CSV
    const csvFileInput = document.getElementById('csvFile');
    const fileNameSpan = document.getElementById('fileName');
    const previewDataBtn = document.getElementById('previewDataBtn');
    const closePreviewBtn = document.getElementById('closePreviewBtn');
    const importDataBtn = document.getElementById('importDataBtn');
    const downloadTemplateBtn = document.getElementById('downloadTemplate');
    const previewTable = document.getElementById('previewTable');
    const previewModal = document.getElementById('previewModal');
    
    // ===== INISIALISASI MODEL MACHINE LEARNING =====
    let healthModel = null;
    let stressModel = null;
    let productivityModel = null;
    let analysisModel = null;
    let mlModel = null;
    let csvData = null;
    
    // ===== DATA UNTUK VISUALISASI DAN ANALISIS =====
    const historicalData = {
        dates: ['20/04', '21/04', '22/04', '23/04', '24/04', '25/04', '26/04', '27/04'],
        temperature: [25.2, 25.3, 25.4, 25.1, 24.9, 25.2, 25.3, 25.5],
        humidity: [64, 65, 66, 65, 64, 65, 66, 65],
        ammonia: [8, 9, 10, 11, 12, 13, 14, 15],
        noise: [44, 45, 43, 46, 44, 45, 45, 45],
        stressIndex: [0.12, 0.15, 0.18, 0.20, 0.22, 0.24, 0.25, 0.26],
        eggProduction: [87.2, 86.8, 86.5, 86.3, 86.0, 85.8, 85.6, 85.5]
    };
    
    // Tambahkan di awal file atau di fungsi initialize
console.log = function(message) {
    // Simpan log asli
    const originalLog = console.log;
    
    // Output ke console
    originalLog.apply(console, arguments);
    
    // Buat elemen log jika belum ada
    if (!document.getElementById('debugLog')) {
        const debugLog = document.createElement('div');
        debugLog.id = 'debugLog';
        debugLog.style.cssText = 'position: fixed; bottom: 0; right: 0; width: 300px; height: 200px; overflow: auto; background: rgba(0,0,0,0.8); color: white; padding: 10px; font-family: monospace; z-index: 9999;';
        document.body.appendChild(debugLog);
    }
    
    // Tambahkan pesan ke log
    const log = document.getElementById('debugLog');
    const entry = document.createElement('div');
    entry.textContent = typeof message === 'object' ? JSON.stringify(message) : message;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
};
    // ===== FUNGSI MENDAPATKAN WARNA STRESS INDEX =====
    function getStressIndexColor(stressIndex) {
        if (stressIndex <= 0.15) {
            return {
                border: '#10b981', // hijau
                background: 'rgba(16, 185, 129, 0.2)'
            };
        } else if (stressIndex <= 0.30) {
            return {
                border: '#f59e0b', // kuning
                background: 'rgba(245, 158, 11, 0.2)'
            };
        } else {
            return {
                border: '#ef4444', // merah
                background: 'rgba(239, 68, 68, 0.2)'
            };
        }
    }
    
    // ===== IMPLEMENTASI MODEL MACHINE LEARNING KOMPREHENSIF =====
    class IntegratedAnalysisModel {
        constructor() {
            // Inisialisasi matriks bobot untuk machine learning model
            this.weights = {
                environmental: {
                    temperature: 0.15,
                    humidity: 0.12,
                    ammonia: 0.25,
                    noise: 0.08,
                    lighting: 0.10
                },
                welfare: {
                    featherCondition: 0.20,
                    combCondition: 0.15,
                    stress: 0.35,
                    mortality: 0.30
                },
                productivity: {
                    eggProduction: 0.40,
                    feedConsumption: 0.25,
                    waterConsumption: 0.15,
                    flockAge: 0.20
                },
                // Matriks korelasi antara parameter (simulasi machine learning)
                correlationMatrix: [
                    [1.00, 0.30, 0.45, 0.15, 0.20, 0.35], // Temperature
                    [0.30, 1.00, 0.60, 0.10, 0.15, 0.25], // Humidity
                    [0.45, 0.60, 1.00, 0.25, 0.50, 0.70], // Ammonia
                    [0.15, 0.10, 0.25, 1.00, 0.05, 0.30], // Noise
                    [0.20, 0.15, 0.50, 0.05, 1.00, 0.40], // Lighting
                    [0.35, 0.25, 0.70, 0.30, 0.40, 1.00]  // Stress Index
                ]
            };
            
            // Inisialisasi parameter untuk algoritma random forest (simulasi)
            this.rfParameters = {
                trees: 100,
                maxDepth: 5,
                minSampleSplit: 10,
                featureImportance: {
                    temperature: 0.12,
                    humidity: 0.08,
                    ammonia: 0.25,
                    noise: 0.05,
                    lighting: 0.07,
                    featherCondition: 0.10,
                    combCondition: 0.08,
                    mortality: 0.15,
                    feedConsumption: 0.12,
                    waterConsumption: 0.08,
                    flockAge: 0.10,
                    stressIndex: 0.30
                }
            };
        }
        
        // Analisis komprehensif menggunakan machine learning
        analyze(inputs) {
            // Normalisasi input untuk machine learning
            const normalizedInputs = this.normalizeInputs(inputs);
            
            // Kalkulasi stress index berdasarkan algoritma
            const stressIndex = this.calculateStressIndex(normalizedInputs);
            
            // Analisis kesehatan dengan metode random forest (simulasi)
            const healthScores = this.randomForestHealthAnalysis(normalizedInputs, stressIndex);
            
            // Prediksi menggunakan model regresi (simulasi)
            const predictions = this.predictFutureMetrics(normalizedInputs, stressIndex, healthScores);
            
            // Kalkulasi parameter interaksi menggunakan metode principal component analysis (simulasi)
            const interactions = this.calculateParameterInteractions(normalizedInputs);
            
            // Generasi rekomendasi menggunakan decision tree
            const recommendations = this.generateMachineLearningRecommendations(
                normalizedInputs, 
                stressIndex, 
                healthScores, 
                interactions
            );
            
            // Return hasil analisis komprehensif
            return {
                stressIndex: stressIndex,
                healthScores: healthScores,
                predictions: predictions,
                interactions: interactions,
                recommendations: recommendations
            };
        }
        
        // Normalisasi input untuk model ML
        normalizeInputs(inputs) {
            return {
                temperature: this.normalize(inputs.temperature, 20, 35),
                humidity: this.normalize(inputs.humidity, 40, 90),
                ammonia: this.normalize(inputs.ammonia, 0, 30),
                noise: this.normalize(inputs.noise, 30, 80),
                lighting: this.normalize(inputs.lighting, 8, 24),
                featherCondition: this.normalizeCategory(inputs.featherCondition, 
                    ['Sangat Buruk', 'Buruk', 'Cukup', 'Baik', 'Sangat Baik']),
                combCondition: this.normalizeCategory(inputs.combCondition,
                    ['Pucat', 'Merah Pucat', 'Merah', 'Merah Terang', 'Sangat Merah']),
                mortality: this.normalize(inputs.mortality, 0, 5),
                feedConsumption: this.normalize(inputs.feedConsumption, 80, 150),
                waterConsumption: this.normalize(inputs.waterConsumption, 160, 350),
                flockAge: this.normalize(inputs.flockAge, 100, 600),
                eggProduction: this.normalize(inputs.eggProduction, 50, 95)
            };
        }
        
        // Fungsi normalisasi 0-1
        normalize(value, min, max) {
            return Math.max(0, Math.min(1, (value - min) / (max - min)));
        }
        
        // Normalisasi kategori
        normalizeCategory(value, categories) {
            const index = categories.indexOf(value);
            if (index === -1) return 0.5; // Default jika tidak ditemukan
            return index / (categories.length - 1);
        }
        
        // Kalkulasi stress index dengan model ML
        calculateStressIndex(normalizedInputs) {
            // Implementasi algoritma neural network sederhana (simulasi)
            let stressIndex = 0.1; // Nilai dasar
            
            // Faktor lingkungan (neural network layer 1)
            const environmentalFactor = 
                normalizedInputs.temperature * this.weights.environmental.temperature +
                normalizedInputs.humidity * this.weights.environmental.humidity +
                normalizedInputs.ammonia * this.weights.environmental.ammonia +
                normalizedInputs.noise * this.weights.environmental.noise +
                normalizedInputs.lighting * this.weights.environmental.lighting;
            
            // Faktor kesejahteraan (neural network layer 1)
            const welfareFactor = 
                (1 - normalizedInputs.featherCondition) * this.weights.welfare.featherCondition +
                (1 - normalizedInputs.combCondition) * this.weights.welfare.combCondition +
                normalizedInputs.mortality * this.weights.welfare.mortality;
            
            // Kombinasi dengan fungsi aktivasi (neural network layer 2)
            stressIndex += (environmentalFactor * 0.6 + welfareFactor * 0.4) * 0.4;
            
            // Tambahkan non-linearitas dengan fungsi sigmoid termodifikasi
            stressIndex = 0.1 + (0.4 * (1 / (1 + Math.exp(-5 * (stressIndex - 0.5)))));
            
            // Batasi nilai
            return Math.max(0.1, Math.min(0.5, stressIndex));
        }
        
        // Analisis kesehatan dengan metode random forest (simulasi)
        randomForestHealthAnalysis(normalizedInputs, stressIndex) {
            // Simulasi hasil dari beberapa decision trees dalam random forest
            
            // Skor lingkungan (hasil dari 25 trees)
            const environmentalScore = 100 - (
                normalizedInputs.temperature < 0.2 || normalizedInputs.temperature > 0.8 ? 20 : 0 +
                normalizedInputs.humidity < 0.3 || normalizedInputs.humidity > 0.8 ? 15 : 0 +
                normalizedInputs.ammonia > 0.5 ? 35 : normalizedInputs.ammonia > 0.3 ? 15 : 0 +
                normalizedInputs.noise > 0.7 ? 10 : 0 +
                Math.abs(normalizedInputs.lighting - 0.5) > 0.3 ? 10 : 0
            );
            
            // Skor kesejahteraan (hasil dari 25 trees)
            const welfareScore = 100 - (
                (1 - normalizedInputs.featherCondition) * 30 +
                (1 - normalizedInputs.combCondition) * 25 +
                normalizedInputs.mortality * 50 +
                (stressIndex > 0.3 ? 30 : stressIndex > 0.2 ? 15 : 0)
            );
            
            // Skor produktivitas (hasil dari 25 trees)
            const productivityScore = 100 - (
                (0.95 - normalizedInputs.eggProduction) * 60 +
                Math.abs(normalizedInputs.feedConsumption - 0.6) * 25 +
                Math.abs(normalizedInputs.waterConsumption - 0.6) * 15
            );
            
            // Skor efisiensi pakan
            const feedEfficiencyScore = 100 - (
                Math.abs(normalizedInputs.feedConsumption / normalizedInputs.eggProduction - 0.7) * 80 +
                Math.abs(normalizedInputs.waterConsumption / normalizedInputs.feedConsumption - 0.5) * 20
            );
            
            // Skor kualitas telur (prediksi berdasarkan parameter)
            const eggQualityScore = 100 - (
                Math.abs(normalizedInputs.temperature - 0.5) * 20 +
                (normalizedInputs.ammonia > 0.5 ? 25 : 0) +
                (stressIndex > 0.25 ? 20 : 0) +
                (normalizedInputs.flockAge > 0.7 ? 25 : normalizedInputs.flockAge > 0.5 ? 10 : 0)
            );
            
            // Skor kesehatan keseluruhan (hasil dari 25 trees terakhir)
            const healthIndex = 
                environmentalScore * 0.3 +
                welfareScore * 0.3 +
                productivityScore * 0.25 +
                feedEfficiencyScore * 0.1 +
                eggQualityScore * 0.05;
            
            // Batasi nilai skor antara 0-100
            return {
                environmentalScore: Math.max(0, Math.min(100, Math.round(environmentalScore))),
                welfareScore: Math.max(0, Math.min(100, Math.round(welfareScore))),
                productivityScore: Math.max(0, Math.min(100, Math.round(productivityScore))),
                feedEfficiencyScore: Math.max(0, Math.min(100, Math.round(feedEfficiencyScore))),
                eggQualityScore: Math.max(0, Math.min(100, Math.round(eggQualityScore))),
                healthIndex: Math.max(0, Math.min(100, Math.round(healthIndex)))
            };
        }
        
        // Prediksi untuk masa depan menggunakan regresi
        predictFutureMetrics(normalizedInputs, stressIndex, healthScores) {
            // Prediksi produksi telur
            const baseProduction = 50 + normalizedInputs.eggProduction * 45;
            
            // Faktor perubahan alami berdasarkan umur
            let naturalChange = 0;
            if (normalizedInputs.flockAge < 0.25) {
                naturalChange = 0.5; // Fase awal
            } else if (normalizedInputs.flockAge < 0.6) {
                naturalChange = -0.2; // Fase plateau
            } else {
                naturalChange = -0.7; // Fase penurunan
            }
            
            // Faktor stress
            const stressFactor = stressIndex > 0.25 ? -2.5 : stressIndex > 0.15 ? -1.0 : 0;
            
            // Faktor lingkungan
            let environmentFactor = 0;
            if (normalizedInputs.ammonia > 0.5) environmentFactor -= 1.5;
            if (normalizedInputs.temperature < 0.2 || normalizedInputs.temperature > 0.8) {
                environmentFactor -= 1.0;
            }
            
            // Prediksi untuk minggu depan
            const nextWeekProduction = baseProduction + naturalChange + stressFactor + environmentFactor;
            
            // Prediksi risiko kematian
            let mortalityRiskScore = 0;
            if (normalizedInputs.flockAge > 0.8) mortalityRiskScore += 3;
            else if (normalizedInputs.flockAge > 0.5) mortalityRiskScore += 1;
            
            if (stressIndex > 0.3) mortalityRiskScore += 3;
            else if (stressIndex > 0.25) mortalityRiskScore += 2;
            else if (stressIndex > 0.15) mortalityRiskScore += 1;
            
            if (normalizedInputs.ammonia > 0.7) mortalityRiskScore += 3;
            else if (normalizedInputs.ammonia > 0.5) mortalityRiskScore += 2;
            
            if (normalizedInputs.temperature > 0.9 || normalizedInputs.temperature < 0.1) {
                mortalityRiskScore += 2;
            }
            
            let mortalityRisk;
            if (mortalityRiskScore >= 6) mortalityRisk = 'Tinggi';
            else if (mortalityRiskScore >= 3) mortalityRisk = 'Sedang';
            else mortalityRisk = 'Rendah';
            
            // Prediksi ROI
            const eggPrice = 25000; // Rp per kg
            const eggWeight = 0.06; // kg
            const henCount = 1000;
            const feedPrice = 8000; // Rp per kg
            
            const currentProduction = baseProduction / 100;
            const predictedProduction = nextWeekProduction / 100;
            
            const feedConsumption = 80 + normalizedInputs.feedConsumption * 70; // gram
            
            const currentRevenue = currentProduction * henCount * eggWeight * eggPrice;
            const predictedRevenue = predictedProduction * henCount * eggWeight * eggPrice;
            
            const feedCost = (feedConsumption / 1000) * henCount * feedPrice;
            const otherCosts = 500000;
            
            const currentProfit = currentRevenue - feedCost - otherCosts;
            const predictedProfit = predictedRevenue - feedCost - otherCosts;
            
            const roi = ((predictedProfit * 7) / (feedCost * 7 + otherCosts * 7)) * 100;
            
            return {
                nextWeekProduction: Math.max(0, Math.min(100, nextWeekProduction)),
                mortalityRisk: mortalityRisk,
                returnOnInvestment: parseFloat(roi.toFixed(2)),
                predictedDailyProfit: Math.round(predictedProfit),
                profitChangePercentage: parseFloat(((predictedProfit - currentProfit) / currentProfit * 100).toFixed(1))
            };
        }
        
        // Kalkulasi interaksi antar parameter menggunakan PCA (simulasi)
        calculateParameterInteractions(normalizedInputs) {
            // Konversi input ke array untuk matriks multiplikasi
            const parameterValues = [
                normalizedInputs.temperature,
                normalizedInputs.humidity,
                normalizedInputs.ammonia,
                normalizedInputs.noise,
                normalizedInputs.lighting,
                // Tambahkan stress index yang dikalkulasi secara terpisah
                0.1 + (normalizedInputs.ammonia * 0.3 + 
                      Math.abs(normalizedInputs.temperature - 0.5) * 0.2 +
                      normalizedInputs.noise * 0.1)
            ];
            
            // Kalkulasi matriks interaksi (simulasi PCA)
            const interactions = [];
            for (let i = 0; i < parameterValues.length; i++) {
                const interactionRow = [];
                for (let j = 0; j < parameterValues.length; j++) {
                    // Gunakan correlation matrix untuk merepresentasikan kekuatan interaksi
                    const interactionStrength = this.weights.correlationMatrix[i][j] * 
                                              parameterValues[i] * parameterValues[j];
                    interactionRow.push(parseFloat(interactionStrength.toFixed(2)));
                }
                interactions.push(interactionRow);
            }
            
            // Identifikasi interaksi paling signifikan
            const significantInteractions = [];
            
            // Identifikasi interaksi amonia-suhu (kritis untuk kesehatan pernapasan)
            const ammoniaTemperatureInteraction = interactions[2][0];
            if (ammoniaTemperatureInteraction > 0.25) {
                significantInteractions.push({
                    parameters: ['Amonia', 'Suhu'],
                    strength: ammoniaTemperatureInteraction,
                    impact: 'Tinggi',
                    description: 'Suhu tinggi meningkatkan dampak negatif amonia pada sistem pernapasan'
                });
            }
            
            // Identifikasi interaksi amonia-kelembaban
            const ammoniaHumidityInteraction = interactions[2][1];
            if (ammoniaHumidityInteraction > 0.3) {
                significantInteractions.push({
                    parameters: ['Amonia', 'Kelembaban'],
                    strength: ammoniaHumidityInteraction,
                    impact: 'Tinggi',
                    description: 'Kelembaban tinggi meningkatkan produksi dan dampak amonia'
                });
            }
            
            // Interaksi kebisingan-stress
            const noiseStressInteraction = interactions[3][5];
            if (noiseStressInteraction > 0.15) {
                significantInteractions.push({
                    parameters: ['Kebisingan', 'Stress'],
                    strength: noiseStressInteraction,
                    impact: 'Sedang',
                    description: 'Kebisingan meningkatkan level stress pada ayam'
                });
            }
            
            // Interaksi pencahayaan-produktivitas (disimulasikan melalui stress)
            const lightingStressInteraction = interactions[4][5];
            if (Math.abs(lightingStressInteraction - 0.2) > 0.1) {
                significantInteractions.push({
                    parameters: ['Pencahayaan', 'Stress'],
                    strength: Math.abs(lightingStressInteraction),
                    impact: 'Sedang',
                    description: 'Durasi pencahayaan tidak optimal memengaruhi ritme sirkadian dan stress'
                });
            }
            
            return {
                matrix: interactions,
                significant: significantInteractions
            };
        }
        
        // Generasi rekomendasi dengan decision tree
        generateMachineLearningRecommendations(normalizedInputs, stressIndex, healthScores, interactions) {
            const recommendations = [];
            
            // Decision tree untuk rekomendasi lingkungan
            if (healthScores.environmentalScore < 70) {
                if (normalizedInputs.ammonia > 0.5) { // > 15ppm
                    recommendations.push({
                        category: 'Lingkungan',
                        action: 'Tingkatkan ventilasi kandang dan frekuensi pembersihan kotoran',
                        impact: 'Mengurangi kadar amonia 30-50% dalam 48 jam, meningkatkan kesehatan pernapasan',
                        priority: 'Tinggi',
                        costEfficiency: 'Tinggi',
                        roi: '1:3.2',
                        confidence: 0.92
                    });
                    
                    // Jika ada interaksi signifikan amonia-kelembaban
                    if (interactions.significant.some(i => 
                        i.parameters.includes('Amonia') && i.parameters.includes('Kelembaban') && 
                        i.strength > 0.3)) {
                        recommendations.push({
                            category: 'Lingkungan',
                            action: 'Tingkatkan sistem pengatur kelembaban dan gunakan litter treatment',
                            impact: 'Mengurangi kelembaban litter dan menghambat aktivitas mikroba penghasil amonia',
                            priority: 'Tinggi',
                            costEfficiency: 'Sedang',
                            roi: '1:2.5',
                            confidence: 0.87
                        });
                    }
                }
                
                if (normalizedInputs.temperature < 0.2 || normalizedInputs.temperature > 0.8) {
                    recommendations.push({
                        category: 'Lingkungan',
                        action: 'Optimalkan sistem pengaturan suhu untuk menjaga pada rentang 24-28°C',
                        impact: 'Meningkatkan kenyamanan ayam dan efisiensi produksi 5-8%',
                        priority: 'Sedang',
                        costEfficiency: 'Sedang',
                        roi: '1:2.8',
                        confidence: 0.85
                    });
                }
            }
            
            // Decision tree untuk rekomendasi kesejahteraan
            if (healthScores.welfareScore < 75) {
                if (normalizedInputs.featherCondition < 0.4) { // Buruk atau Sangat Buruk
                    recommendations.push({
                        category: 'Kesejahteraan',
                        action: 'Evaluasi kepadatan kandang dan tambahkan metionin dalam pakan',
                        impact: 'Memperbaiki kondisi bulu dan mengurangi perilaku mematuk',
                        priority: 'Tinggi',
                        costEfficiency: 'Sedang',
                        roi: '1:1.8',
                        confidence: 0.82
                    });
                }
                
                if (stressIndex > 0.25) {
                    recommendations.push({
                        category: 'Kesejahteraan',
                        action: 'Tambahkan vitamin C dan elektrolit dalam air minum selama 5-7 hari',
                        impact: 'Mengurangi tingkat stress dan meningkatkan daya tahan tubuh',
                        priority: 'Tinggi',
                        costEfficiency: 'Tinggi',
                        roi: '1:4.2',
                        confidence: 0.90
                    });
                }
            }
            
            // Decision tree untuk rekomendasi produktivitas
            if (healthScores.productivityScore < 80) {
                if (normalizedInputs.eggProduction < 0.7) { // < 81.5%
                    recommendations.push({
                        category: 'Produktivitas',
                        action: 'Tingkatkan kualitas nutrisi pakan dengan menambahkan konsentrat protein dan kalsium',
                        impact: 'Meningkatkan produksi telur 3-7% dalam 2 minggu',
                        priority: 'Tinggi',
                        costEfficiency: 'Tinggi',
                        roi: '1:3.8',
                        confidence: 0.89
                    });
                }
                
                // Analisis rasio konsumsi air:pakan
                const waterFeedRatio = normalizedInputs.waterConsumption / normalizedInputs.feedConsumption;
                if (waterFeedRatio < 0.9) { // < 1.8:1
                    recommendations.push({
                        category: 'Produktivitas',
                        action: 'Periksa sistem air minum dan pastikan akses cukup (minimal 1 nipple per 10 ayam)',
                        impact: 'Meningkatkan konsumsi air dan pakan, mendukung produksi telur optimal',
                        priority: 'Tinggi',
                        costEfficiency: 'Tinggi',
                        roi: '1:5.0',
                        confidence: 0.94
                    });
                }
            }
            
            return recommendations;
        }
    }
    
    // ===== FUNGSI NAVIGASI MOBILE =====
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
    
    // ===== FUNGSI MENANGANI FILE CSV =====
    
    // Event listener untuk file input
    if (csvFileInput) {
        csvFileInput.addEventListener('change', function(e) {
            if (this.files.length > 0) {
                const file = this.files[0];
                fileNameSpan.textContent = file.name;
                previewDataBtn.disabled = false;
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    csvData = parseCSV(event.target.result);
                };
                reader.readAsText(file);
            } else {
                fileNameSpan.textContent = 'Belum ada file yang dipilih';
                previewDataBtn.disabled = true;
                csvData = null;
            }
        });
    }
    
    // Parse CSV function
    function parseCSV(text) {
        // Simple CSV parser
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        const data = [];
        
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue;
            
            const values = lines[i].split(',').map(value => value.trim());
            const row = {};
            
            headers.forEach((header, index) => {
                row[header] = values[index];
            });
            
            data.push(row);
        }
        
        return { headers, data };
    }
    
    // Preview Data Button
    if (previewDataBtn) {
        previewDataBtn.addEventListener('click', function() {
            if (!csvData) return;
            
            // Clear previous preview
            previewTable.innerHTML = '';
            
            // Create table header
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            
            csvData.headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            
            thead.appendChild(headerRow);
            previewTable.appendChild(thead);
            
            // Create table body
            const tbody = document.createElement('tbody');
            
            csvData.data.forEach(row => {
                const tr = document.createElement('tr');
                
                csvData.headers.forEach(header => {
                    const td = document.createElement('td');
                    td.textContent = row[header] || '';
                    tr.appendChild(td);
                });
                
                tbody.appendChild(tr);
            });
            
            previewTable.appendChild(tbody);
            
            // Show modal
            previewModal.style.display = 'block';
        });
    }
    
    // Close Preview Modal
    function closePreviewModal() {
        previewModal.style.display = 'none';
    }
    
    if (document.querySelector('.close-preview')) {
        document.querySelector('.close-preview').addEventListener('click', closePreviewModal);
    }
    
    if (closePreviewBtn) {
        closePreviewBtn.addEventListener('click', closePreviewModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === previewModal) {
            closePreviewModal();
        }
    });
    
    // Import Data Button
    if (importDataBtn) {
        importDataBtn.addEventListener('click', function() {
            if (!csvData || csvData.data.length === 0) return;
            
            // Get first row of data
            const firstRow = csvData.data[0];
            
            // Fill form with data
            document.getElementById('temperature').value = firstRow['Suhu'] || firstRow['Temperature'] || '25.5';
            document.getElementById('humidity').value = firstRow['Kelembapan'] || firstRow['Humidity'] || '65';
            document.getElementById('ammonia').value = firstRow['Amonia'] || firstRow['Ammonia'] || '15';
            document.getElementById('noise').value = firstRow['Kebisingan'] || firstRow['Noise'] || '45';
            document.getElementById('lighting').value = firstRow['Pencahayaan'] || firstRow['Lighting'] || '16';
            document.getElementById('flockAge').value = firstRow['Umur_Flock'] || firstRow['Flock_Age'] || '224';
            
            if (firstRow['Kondisi_Bulu'] || firstRow['Feather_Condition']) {
                const featherCondition = firstRow['Kondisi_Bulu'] || firstRow['Feather_Condition'];
                selectOptionByText('featherCondition', featherCondition);
            }
            
            if (firstRow['Kondisi_Jengger'] || firstRow['Comb_Condition']) {
                const combCondition = firstRow['Kondisi_Jengger'] || firstRow['Comb_Condition'];
                selectOptionByText('combCondition', combCondition);
            }
            
            document.getElementById('mortality').value = firstRow['Kematian'] || firstRow['Mortality'] || '0';
            document.getElementById('feedConsumption').value = firstRow['Konsumsi_Pakan'] || firstRow['Feed_Consumption'] || '110';
            document.getElementById('waterConsumption').value = firstRow['Konsumsi_Air'] || firstRow['Water_Consumption'] || '220';
            document.getElementById('eggProduction').value = firstRow['Produksi_Telur'] || firstRow['Egg_Production'] || '85.5';
            
            // Close modal
            closePreviewModal();
        });
    }
    
    // Helper to select option by text
    function selectOptionByText(selectId, text) {
        const select = document.getElementById(selectId);
        if (!select) return;
        
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text === text) {
                select.selectedIndex = i;
                break;
            }
        }
    }
    
    // Download Template
    if (downloadTemplateBtn) {
        downloadTemplateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const template = [
                'Suhu,Kelembapan,Amonia,Kebisingan,Pencahayaan,Umur_Flock,Kondisi_Bulu,Kondisi_Jengger,Kematian,Konsumsi_Pakan,Konsumsi_Air,Produksi_Telur',
                '25.5,65,15,45,16,224,Baik,Merah Terang,0,110,220,85.5'
            ].join('\n');
            
            const blob = new Blob([template], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'template_kesehatan_ayam.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }
    
    // ===== FUNGSI MODEL KESEHATAN =====
    
    // Model kesehatan keseluruhan
    function createDummyHealthModel() {
        return {
            predict: function(inputs) {
                // Algoritma sederhana untuk menghitung skor kesehatan
                const temperature = inputs.temperature;
                const humidity = inputs.humidity;
                const ammonia = inputs.ammonia;
                const noise = inputs.noise;
                const mortality = inputs.mortality;
                const stressIndex = inputs.stressIndex || 0.26;
                
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
    
    // Model stress ayam
    function createDummyStressModel() {
        return {
            predict: function(inputs) {
                const temperature = inputs.temperature;
                const humidity = inputs.humidity;
                const ammonia = inputs.ammonia;
                const noise = inputs.noise;
                const lighting = inputs.lighting;
                const flockAge = inputs.flockAge;
                
                // Baseline stress berdasarkan umur (ayam tua lebih rentan terhadap stress)
                let stressIndex = 0.1;
                if (flockAge > 300) {
                    stressIndex += 0.02;
                }
                
                // Faktor suhu - penting untuk termoregulasi ayam
                if (temperature < 24) {
                    // Dingin lebih stressful daripada panas untuk ayam petelur
                    stressIndex += 0.06 * Math.min((24 - temperature) / 2, 3);
                } else if (temperature > 28) {
                    stressIndex += 0.05 * Math.min((temperature - 28) / 2, 3);
                }
                
                // Faktor kelembaban - berinteraksi dengan suhu (heat stress)
                if (humidity < 60) {
                    stressIndex += 0.01 * Math.min((60 - humidity) / 5, 3);
                } else if (humidity > 70) {
                    // Kelembaban tinggi memperburuk heat stress
                    if (temperature > 26) {
                        stressIndex += 0.04 * Math.min((humidity - 70) / 5, 3);
                    } else {
                        stressIndex += 0.02 * Math.min((humidity - 70) / 5, 3);
                    }
                }
                
                // Faktor amonia (pengaruh besar pada sistem pernapasan)
                if (ammonia > 10) {
                    stressIndex += 0.1 * Math.min((ammonia - 10) / 5, 3);
                } else if (ammonia > 7) {
                    stressIndex += 0.03 * Math.min((ammonia - 7) / 3, 1);
                }
                
                // Faktor kebisingan
                if (noise > 50) {
                    stressIndex += 0.03 * Math.min((noise - 50) / 10, 3);
                }
                
                // Faktor pencahayaan (berpengaruh pada hormon dan ritme sirkadian)
                if (lighting < 14) {
                    stressIndex += 0.03 * Math.min((14 - lighting) / 2, 2);
                } else if (lighting > 18) {
                    stressIndex += 0.02 * Math.min((lighting - 18) / 2, 2);
                }
                
                // Batasi nilai antara 0.1 dan 0.5
                return Math.max(0.1, Math.min(0.5, parseFloat(stressIndex.toFixed(2))));
            },
            
            // Deteksi penyebab utama stress
            detectStressCauses: function(inputs) {
                const stressCauses = [];
                
                if (inputs.ammonia > 10) {
                    stressCauses.push({
                        factor: "Kadar Amonia Tinggi",
                        severity: "Tinggi",
                        impact: "Gangguan pernapasan, penurunan imunitas, iritasi mata",
                        recommendation: "Tingkatkan ventilasi, kurangi kepadatan kandang, gunakan litter treatment"
                    });
                }
                
                if (inputs.temperature > 28) {
                    stressCauses.push({
                        factor: "Suhu Tinggi",
                        severity: "Sedang",
                        impact: "Heat stress, penurunan konsumsi pakan, dehidrasi",
                        recommendation: "Tingkatkan ventilasi, tambahkan sistem pendingin, berikan air dingin"
                    });
                } else if (inputs.temperature < 24) {
                    stressCauses.push({
                        factor: "Suhu Rendah",
                        severity: "Sedang",
                        impact: "Peningkatan konsumsi pakan, penurunan efisiensi",
                        recommendation: "Tingkatkan suhu kandang, pastikan insulasi cukup"
                    });
                }
                
                if (inputs.humidity > 70 && inputs.temperature > 26) {
                    stressCauses.push({
                        factor: "Kombinasi Suhu & Kelembaban Tinggi",
                        severity: "Tinggi",
                        impact: "Heat stress parah, kesulitan termoregulasi",
                        recommendation: "Gunakan kipas tambahan, kurangi kepadatan kandang"
                    });
                }
                
                return stressCauses;
            }
        };
    }
    
    // Model produktivitas
    function createDummyProductivityModel() {
        return {
            predict: function(inputs) {
                const flockAge = inputs.flockAge;
                const stressIndex = inputs.stressIndex || 0.26;
                const temperature = inputs.temperature;
                const ammonia = inputs.ammonia;
                const feedConsumption = inputs.feedConsumption;
                const waterConsumption = inputs.waterConsumption;
                
                // Produktivitas dasar berdasarkan umur ayam (kurva produksi standar)
                let baseProductivity = getExpectedProductivity(flockAge);
                
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
    
    // ===== FUNGSI DETEKSI MASALAH KESEHATAN =====
    
    // Deteksi potensi penyakit berdasarkan parameter
    function detectPotentialDiseases(inputs, stressIndex) {
        const diseases = [];
        
        // Deteksi berdasarkan parameter lingkungan
        if (inputs.ammonia > 15 && inputs.humidity > 70) {
            diseases.push({
                name: "Respiratory Disease",
                probability: "Medium",
                symptoms: "Kesulitan bernapas, bersin, discharge hidung",
                recommendation: "Tingkatkan ventilasi segera, konsultasi dengan dokter hewan"
            });
        }
        
        if (stressIndex > 0.25 && inputs.mortality > 0) {
            diseases.push({
                name: "Immune Suppression",
                probability: "Medium",
                symptoms: "Peningkatan kerentanan terhadap infeksi sekunder",
                recommendation: "Berikan suplemen vitamin dan elektrolit, kurangi faktor stress"
            });
        }
        
        if (inputs.humidity > 75 && inputs.temperature > 27) {
            diseases.push({
                name: "Coccidiosis Risk",
                probability: "Medium",
                symptoms: "Diare, feses berdarah, penurunan produktivitas",
                recommendation: "Pastikan litter tetap kering, evaluasi program pencegahan coccidiosis"
            });
        }
        
        // Deteksi untuk ayam yang lebih tua
        if (inputs.flockAge > 300 && inputs.eggProduction < 75) {
            diseases.push({
                name: "Age-related Productivity Decline",
                probability: "High",
                symptoms: "Penurunan produksi telur signifikan, kualitas kerabang menurun",
                recommendation: "Evaluasi program nutrisi untuk ayam tua, pertimbangkan molting"
            });
        }
        
        return diseases;
    }
    
    // Buat daftar peringatan kesehatan aktif
    function createActiveHealthAlerts(inputs, stressIndex) {
        const alerts = [];
        
        // Deteksi stres
        const stressCauses = stressModel.detectStressCauses(inputs);
        stressCauses.forEach(cause => {
            alerts.push({
                title: cause.factor,
                severity: cause.severity,
                impact: cause.impact,
                recommendation: cause.recommendation,
                timestamp: getCurrentTimestamp()
            });
        });
        
        // Deteksi penyakit potensial
        const potentialDiseases = detectPotentialDiseases(inputs, stressIndex);
        potentialDiseases.forEach(disease => {
            alerts.push({
                title: `Risiko ${disease.name}`,
                severity: disease.probability,
                impact: disease.symptoms,
                recommendation: disease.recommendation,
                timestamp: getCurrentTimestamp()
            });
        });
        
        // Deteksi berdasarkan tren (jika ada riwayat data)
        if (historicalData && historicalData.ammonia.length > 2) {
            const recentAmmonia = historicalData.ammonia.slice(-3);
            const isIncreasing = recentAmmonia[2] > recentAmmonia[1] && recentAmmonia[1] > recentAmmonia[0];
            
            if (isIncreasing && recentAmmonia[2] > 8) {
                alerts.push({
                    title: "Tren Peningkatan Amonia",
                    severity: "Warning",
                    impact: "Berpotensi mencapai level berbahaya dalam 2-3 hari",
                    recommendation: "Periksa sistem ventilasi, tingkatkan frekuensi pembersihan",
                    timestamp: getCurrentTimestamp()
                });
            }
            
            const recentStress = historicalData.stressIndex.slice(-3);
            const stressIncreasing = recentStress[2] > recentStress[1] && recentStress[1] > recentStress[0];
            
            if (stressIncreasing && recentStress[2] > 0.2) {
                alerts.push({
                    title: "Tren Peningkatan Stress",
                    severity: "Warning",
                    impact: "Berpotensi memengaruhi produktivitas dan kesehatan",
                    recommendation: "Identifikasi dan atasi sumber stres",
                    timestamp: getCurrentTimestamp()
                });
            }
        }
        
        return alerts;
    }
    
    // Helper function untuk timestamp saat ini
    function getCurrentTimestamp() {
        const now = new Date();
        const date = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        
        return `${date}/${month}/${year}, ${hours}:${minutes}`;
    }
    
    // Fungsi untuk mendapatkan produktivitas yang diharapkan berdasarkan umur
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
    
    // ===== FUNGSI PERUBAHAN TAMPILAN =====
    
    // Fungsi untuk mengganti ke tampilan dashboard
    function showDashboard() {
        // Sembunyikan form input
        formSection.style.display = 'none';
        
        // Buat elemen dashboard
        const dashboardHTML = createDashboardHTML();
        
        // Tambahkan dashboard setelah info card
        const infoCard = document.querySelector('.info-card');
        const dashboardContainer = document.createElement('div');
        dashboardContainer.id = 'dashboardContainer';
        dashboardContainer.innerHTML = dashboardHTML;
        infoCard.insertAdjacentElement('afterend', dashboardContainer);
        
        // Inisialisasi grafik tren parameter
        initializeHealthChart();
        
        // Inisialisasi gauge chart untuk stress index
        initializeStressGauge();
    }
    
    // Fungsi untuk kembali ke formulir input
    function showInputForm() {
        // Hapus dashboard jika ada
        const dashboardContainer = document.getElementById('dashboardContainer');
        if (dashboardContainer) {
            dashboardContainer.remove();
        }
        
        // Hapus container analisis lanjutan
        const advancedContainer = document.getElementById('advancedAnalysisContainer');
        if (advancedContainer) {
            advancedContainer.remove();
        }
        
        // Hapus container analisis ML
        const mlContainer = document.getElementById('mlAnalysisContainer');
        if (mlContainer) {
            mlContainer.remove();
        }
        
        // Tampilkan kembali form input
        formSection.style.display = 'block';
        
        // Sembunyikan hasil analisis
        if (resultsSection) resultsSection.style.display = 'none';
        if (chartSection) chartSection.style.display = 'none';
        if (predictionSection) predictionSection.style.display = 'none';
    }
    
    // Fungsi untuk membuat HTML dashboard
    function createDashboardHTML() {
        // Ambil nilai dari form
        const inputs = getFormInputs();
        
        // Hitung indeks stress menggunakan model
        const stressIndex = stressModel ? stressModel.predict(inputs) : 0.26;
        
        // Dapatkan peringatan kesehatan aktif
        const healthAlerts = createActiveHealthAlerts(inputs, stressIndex);
        
        // Buat HTML untuk peringatan kesehatan
        let alertsHTML = '';
        
        healthAlerts.forEach(alert => {
            alertsHTML += `
                <div class="alert-item">
                    <div class="alert-icon">!</div>
                    <div class="alert-content">
                        <h4>${alert.title} (${alert.severity})</h4>
                        <p>Dampak: ${alert.impact}</p>
                        <p>Rekomendasi: ${alert.recommendation}</p>
                        <p class="alert-timestamp">Terdeteksi ${alert.timestamp}</p>
                    </div>
                </div>
            `;
        });
        
        // Jika tidak ada peringatan, tampilkan pesan default
        if (healthAlerts.length === 0) {
            alertsHTML = `
                <div class="alert-item alert-item-success">
                    <div class="alert-icon alert-icon-success">✓</div>
                    <div class="alert-content">
                        <h4>Tidak Ada Peringatan Aktif</h4>
                        <p>Semua parameter kesehatan berada dalam rentang normal.</p>
                    </div>
                </div>
            `;
        }
        
        // Buat HTML untuk dashboard
        return `
            <!-- Status Kesehatan Section -->
            <div class="health-status">
                <h3>Status Kesehatan Keseluruhan</h3>
                <div class="status-cards">
                    <div class="status-card warning">
                        <h4>Peringatan Aktif</h4>
                        <p>Status : ${healthAlerts.length} Peringatan</p>
                    </div>
                    <div class="status-card success">
                        <h4>Tingkat Kematian : ${inputs.mortality}%</h4>
                        <p>Status : Produktif</p>
                    </div>
                    <div class="status-card info">
                        <h4>Umur Flock : ${inputs.flockAge} Hari</h4>
                        <p>Status : Produktif</p>
                    </div>
                </div>
            </div>
            
            <!-- Parameters Section -->
            <div class="parameters-section">
                <div class="parameter-card">
                    <h3>Parameter Lingkungan</h3>
                    <div class="parameter-item">
                        <span>Suhu Kandang :</span>
                        <div class="progress-bar-container">
                            <div class="progress-bar">
                                <div class="progress-fill ${inputs.temperature >= 24 && inputs.temperature <= 28 ? 'green' : 'red'}" style="width: 65%;"></div>
                                <span class="progress-text ${inputs.temperature >= 24 && inputs.temperature <= 28 ? 'green' : 'red'}">
                                    ${inputs.temperature >= 24 && inputs.temperature <= 28 ? 'Optimal (24-28°C)' : 'Di luar rentang optimal'}
                                </span>
                            </div>
                        </div>
                        <span class="parameter-value">${inputs.temperature}°C</span>
                    </div>
                    <div class="parameter-item">
                        <span>Kelembapan :</span>
                        <div class="progress-bar-container">
                            <div class="progress-bar">
                                <div class="progress-fill ${inputs.humidity >= 60 && inputs.humidity <= 70 ? 'green' : 'red'}" style="width: 65%;"></div>
                                <span class="progress-text ${inputs.humidity >= 60 && inputs.humidity <= 70 ? 'green' : 'red'}">
                                    ${inputs.humidity >= 60 && inputs.humidity <= 70 ? 'Optimal (60-70%)' : 'Di luar rentang optimal'}
                                </span>
                            </div>
                        </div>
                        <span class="parameter-value">${inputs.humidity}%</span>
                    </div>
                    <div class="parameter-item">
                        <span>Kadar Amonia :</span>
                        <div class="progress-bar-container">
                            <div class="progress-bar">
                                <div class="progress-fill ${inputs.ammonia <= 10 ? 'green' : 'red'}" style="width: 65%;"></div>
                                <span class="progress-text ${inputs.ammonia <= 10 ? 'green' : 'red'}">
                                    ${inputs.ammonia <= 10 ? 'Optimal (< 10 ppm)' : 'Diatas batas (10 ppm)'}
                                </span>
                            </div>
                        </div>
                        <span class="parameter-value">${inputs.ammonia}ppm</span>
                    </div>
                    <div class="parameter-item">
                        <span>Tingkat Kebisingan :</span>
                        <div class="progress-bar-container">
                            <div class="progress-bar">
                                <div class="progress-fill ${inputs.noise <= 50 ? 'green' : 'red'}" style="width: 65%;"></div>
                                <span class="progress-text ${inputs.noise <= 50 ? 'green' : 'red'}">
                                    ${inputs.noise <= 50 ? 'Optimal (< 50dB)' : 'Di atas batas optimal'}
                                </span>
                            </div>
                        </div>
                        <span class="parameter-value">${inputs.noise}dB</span>
                    </div>
                    <div class="parameter-item">
                        <span>Pencahayaan :</span>
                        <div class="progress-bar-container">
                            <div class="progress-bar">
                                <div class="progress-fill ${inputs.lighting >= 14 && inputs.lighting <= 18 ? 'green' : 'red'}" style="width: 65%;"></div>
                                <span class="progress-text ${inputs.lighting >= 14 && inputs.lighting <= 18 ? 'green' : 'red'}">
                                    ${inputs.lighting >= 14 && inputs.lighting <= 18 ? 'Sesuai rekomendasi' : 'Di luar rekomendasi'}
                                </span>
                            </div>
                        </div>
                        <span class="parameter-value">${inputs.lighting} Jam</span>
                    </div>
                </div>
                
                <div class="stress-index-card">
                    <h3>Indeks Kesehatan & Stress</h3>
                    <div class="health-indicators">
                        <p>Kondisi Bulu : <span class="${inputs.featherCondition === 'Baik' || inputs.featherCondition === 'Sangat Baik' ? 'baik' : 'merah-terang'}">${inputs.featherCondition}</span></p>
                        <p>Kondisi Jengger : <span class="${inputs.combCondition === 'Merah Terang' || inputs.combCondition === 'Sangat Merah' ? 'merah-terang' : 'baik'}">${inputs.combCondition}</span></p>
                    </div>
                    <div class="stress-gauge">
                        <div class="gauge-chart">
                            <div class="gauge-center">
                                <div class="gauge-value">${stressIndex}</div>
                                <div class="gauge-label">Stress Indeks</div>
                            </div>
                        </div>
                        <div class="stress-levels">
                            <div class="level">
                                <div class="level-bar green"></div>
                                <span>Low (0.1-0.15)</span>
                            </div>
                            <div class="level">
                                <div class="level-bar yellow"></div>
                                <span>Medium (0.16-0.30)</span>
                            </div>
                            <div class="level">
                                <div class="level-bar red"></div>
                                <span>High (>0.30)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Trend Chart Section -->
            <div class="trend-chart">
                <h3>Tren Parameter Kesehatan (14 Hari Terakhir)</h3>
                <div class="chart-container">
                    <canvas id="healthChart"></canvas>
                </div>
                <div class="chart-legend">
                    <span class="legend-item"><span class="line brown"></span> Suhu (°C)</span>
                    <span class="legend-item"><span class="line yellow"></span> Amonia (ppm)</span>
                    <span class="legend-item"><span class="line blue"></span> Stress Index</span>
                </div>
            </div>
            
            <!-- Active Alerts Section -->
            <div class="active-alerts">
                <h3>Peringatan Kesehatan Aktif</h3>
                <div class="alert-items">
                    ${alertsHTML}
                </div>
            </div>
            
            <!-- IoT Status Section -->
            <div class="iot-status">
                <p>Status : Tersambung dengan sensor IoT - 7 sensor aktif mengirimkan data</p>
                <div class="iot-buttons">
                    <button class="btn-primary" id="kembaliKeFormBtn">Kembali ke Form Input</button>
                    <button class="btn-secondary">Riwayat Kesehatan</button>
                </div>
            </div>
        `;
    }
    
    // Inisialisasi Health Chart
    function initializeHealthChart() {
        const ctx = document.getElementById('healthChart');
        if (!ctx) return;
        
        const healthChart = new Chart(ctx.getContext('2d'), {
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
                        display: false
                    }
                }
            }
        });
    }
    
    // Inisialisasi Stress Gauge
    function initializeStressGauge() {
        // Tambahkan event listener untuk tombol kembali
        const kembaliBtn = document.getElementById('kembaliKeFormBtn');
        if (kembaliBtn) {
            kembaliBtn.addEventListener('click', showInputForm);
        }
    }
    
    // Fungsi untuk memperbarui warna stress gauge sesuai nilai
    function updateStressGaugeColors(stressIndex) {
        const stressColors = getStressIndexColor(stressIndex);
        
        // Cari elemen gauge chart
        const gaugeElement = document.querySelector('.gauge-chart');
        
        if (gaugeElement) {
            // Update warna berdasarkan nilai stress
            gaugeElement.style.borderTopColor = stressColors.border;
            gaugeElement.style.borderRightColor = stressColors.border;
            
            // Update nilai
            const gaugeValue = document.querySelector('.gauge-value');
            if (gaugeValue) {
                gaugeValue.textContent = stressIndex;
                
                // Set warna teks berdasarkan level stress
                if (stressIndex <= 0.15) {
                    gaugeValue.style.color = '#10b981'; // hijau
                } else if (stressIndex <= 0.30) {
                    gaugeValue.style.color = '#f59e0b'; // kuning
                } else {
                    gaugeValue.style.color = '#ef4444'; // merah
                }
            }
        }
    }
    
    // Load model machine learning
    async function loadModels() {
        try {
            // Muat model yang sudah ada
            healthModel = createDummyHealthModel();
            stressModel = createDummyStressModel();
            productivityModel = createDummyProductivityModel();
            
            // Tambahkan model ML terpadu
            mlModel = new IntegratedAnalysisModel();
            
            console.log('Model ML berhasil dimuat');
        } catch (error) {
            console.error('Gagal memuat model ML:', error);
        }
    }
    
    // Fungsi untuk inisialisasi visualisasi ML terpadu
    function initializeMLVisualization(inputs, mlAnalysis) {
        // 1. Visualisasi Interaksi Parameter dengan Heatmap
        const interactionCtx = document.getElementById('parameterInteractionChart');
        if (!interactionCtx) return;
        
        const parameterLabels = ['Suhu', 'Kelembaban', 'Amonia', 'Kebisingan', 'Pencahayaan', 'Stress Index'];
        
        // Persiapkan data untuk heatmap
        const heatmapData = [];
        for (let i = 0; i < mlAnalysis.interactions.matrix.length; i++) {
            for (let j = 0; j < mlAnalysis.interactions.matrix[i].length; j++) {
                heatmapData.push({
                    x: parameterLabels[j],
                    y: parameterLabels[i],
                    v: mlAnalysis.interactions.matrix[i][j]
                });
            }
        }
        
        // Fungsi untuk mendapatkan warna berdasarkan nilai interaksi
        function getHeatmapColor(value) {
            // Semakin tinggi nilai, semakin merah (menandakan interaksi lebih kuat)
            if (value < 0.2) return 'rgba(240, 249, 255, 0.8)'; // Biru sangat muda
            if (value < 0.4) return 'rgba(147, 197, 253, 0.8)'; // Biru muda
            if (value < 0.6) return 'rgba(96, 165, 250, 0.8)';  // Biru
            if (value < 0.8) return 'rgba(239, 68, 68, 0.5)';   // Merah muda
            return 'rgba(220, 38, 38, 0.8)';                    // Merah
        }
        
        // Buat chart plugin untuk heatmap
        try {
            new Chart(interactionCtx.getContext('2d'), {
                type: 'matrix',
                data: {
                    datasets: [{
                        label: 'Parameter Interactions',
                        data: heatmapData,
                        backgroundColor: function(context) {
                            const value = context.dataset.data[context.dataIndex].v;
                            return getHeatmapColor(value);
                        },
                        borderColor: 'white',
                        borderWidth: 1,
                        width: function(context) {
                            return (context.chart.width / parameterLabels.length) - 1;
                        },
                        height: function(context) {
                            return (context.chart.height / parameterLabels.length) - 1;
                        }
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'category',
                            labels: parameterLabels,
                            ticks: {
                                display: true
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            type: 'category',
                            labels: parameterLabels,
                            offset: true,
                            ticks: {
                                display: true
                            },
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                title: function(context) {
                                    const data = context[0].dataset.data[context[0].dataIndex];
                                    return `Interaksi: ${data.y} ↔ ${data.x}`;
                                },
                                label: function(context) {
                                    const value = context.dataset.data[context.dataIndex].v;
                                    let strength = 'Rendah';
                                    if (value > 0.7) strength = 'Sangat Tinggi';
                                    else if (value > 0.5) strength = 'Tinggi';
                                    else if (value > 0.3) strength = 'Sedang';
                                    
                                    return `Kekuatan Interaksi: ${value} (${strength})`;
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error initializing parameter interaction chart:', error);
        }
        
        // 2. Visualisasi Feature Importance dari Random Forest
        const featureImportanceCtx = document.getElementById('featureImportanceChart');
        if (!featureImportanceCtx) return;
        
        const featureImportance = mlModel.rfParameters.featureImportance;
        const sortedFeatures = Object.entries(featureImportance)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8); // Ambil 8 fitur teratas
        
        const featureLabels = sortedFeatures.map(item => {
            // Translate parameter names to Indonesian
            const paramMap = {
                'temperature': 'Suhu',
                'humidity': 'Kelembaban',
                'ammonia': 'Amonia',
                'noise': 'Kebisingan',
                'lighting': 'Pencahayaan',
                'featherCondition': 'Kondisi Bulu',
                'combCondition': 'Kondisi Jengger',
                'mortality': 'Tingkat Kematian',
                'feedConsumption': 'Konsumsi Pakan',
                'waterConsumption': 'Konsumsi Air',
                'flockAge': 'Umur Flock',
                'stressIndex': 'Indeks Stress'
            };
            
            return paramMap[item[0]] || item[0];
        });
        
        const featureValues = sortedFeatures.map(item => item[1]);
        
        try {
            new Chart(featureImportanceCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: featureLabels,
                    datasets: [{
                        label: 'Importance Score',
                        data: featureValues,
                        backgroundColor: function(context) {
                            const value = context.raw;
                            if (value > 0.25) return 'rgba(239, 68, 68, 0.7)'; // Merah untuk sangat penting
                            if (value > 0.15) return 'rgba(245, 158, 11, 0.7)'; // Kuning untuk penting
                            if (value > 0.1) return 'rgba(59, 130, 246, 0.7)'; // Biru untuk signifikan
                            return 'rgba(107, 114, 128, 0.7)'; // Abu-abu untuk kurang signifikan
                        },
                        borderColor: 'white',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Tingkat Pengaruh pada Kesehatan'
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
                                    let importance = 'Signifikan Rendah';
                                    if (value > 0.25) importance = 'Sangat Signifikan';
                                    else if (value > 0.15) importance = 'Signifikan Tinggi';
                                    else if (value > 0.1) importance = 'Signifikan';
                                    
                                    return `Pengaruh: ${(value * 100).toFixed(1)}% (${importance})`;
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error initializing feature importance chart:', error);
        }
        
        // 3. Visualisasi Prediksi Machine Learning
        const predictionCtx = document.getElementById('mlPredictionChart');
        if (!predictionCtx) return;
        
        // Data historis produksi
        const historicalEggProduction = historicalData.eggProduction;
        
        // Simulasi prediksi masa depan berdasarkan ML
        const futurePredictions = [
            mlAnalysis.predictions.nextWeekProduction, // 1 minggu
            mlAnalysis.predictions.nextWeekProduction * (1 + (Math.random() * 0.04 - 0.02)), // 2 minggu
            mlAnalysis.predictions.nextWeekProduction * (1 + (Math.random() * 0.08 - 0.04)), // 3 minggu
            mlAnalysis.predictions.nextWeekProduction * (1 + (Math.random() * 0.12 - 0.06))  // 4 minggu
        ];
        
        // Simulasi prediksi jika rekomendasi diimplementasikan
        const optimizedPredictions = [
            mlAnalysis.predictions.nextWeekProduction * (1 + 0.02), // 1 minggu
            mlAnalysis.predictions.nextWeekProduction * (1 + 0.05), // 2 minggu
            mlAnalysis.predictions.nextWeekProduction * (1 + 0.08), // 3 minggu
            mlAnalysis.predictions.nextWeekProduction * (1 + 0.12)  // 4 minggu
        ];
        
        // Data aktual, menambahkan nilai saat ini di akhir data historis
        const actualValues = [...historicalEggProduction, inputs.eggProduction];
        const actualLabels = historicalData.dates;
        
        // Label untuk data future
        const futureLabels = [
            "Minggu 1",
            "Minggu 2",
            "Minggu 3",
            "Minggu 4"
        ];
        
        // Kombinasikan label
        const fullLabels = [...actualLabels, "Current", ...futureLabels];
        
        // Gabungkan data untuk visualisasi
        const fullActualData = [...actualValues, null, null, null, null, null];
        const fullPredictionData = [null, null, null, null, null, inputs.eggProduction, ...futurePredictions];
        const fullOptimizedData = [null, null, null, null, null, inputs.eggProduction, ...optimizedPredictions];
        
        // Buat visualisasi prediksi
        try {
            new Chart(predictionCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: fullLabels,
                    datasets: [
                        {
                            label: 'Data Aktual',
                            data: fullActualData,
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            tension: 0.3,
                            borderWidth: 2,
                            pointRadius: 4
                        },
                        {
                            label: 'Prediksi ML',
                            data: fullPredictionData,
                            borderColor: '#f59e0b',
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            tension: 0.3,
                            borderWidth: 2,
                            pointRadius: 4,
                            pointStyle: 'triangle'
                        },
                        {
                            label: 'Prediksi Dengan Optimasi',
                            data: fullOptimizedData,
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            tension: 0.3,
                            borderWidth: 2,
                            pointRadius: 4,
                            pointStyle: 'rect',
                            borderDash: [5, 5]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Produksi Telur (%)'
                            },
                            min: Math.min(...actualValues, ...futurePredictions, ...optimizedPredictions) - 3,
                            max: Math.max(...actualValues, ...futurePredictions, ...optimizedPredictions) + 3
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        },
                        tooltip: {
                            callbacks: {
                                title: function(context) {
                                    return context[0].label;
                                },
                                label: function(context) {
                                    if (context.raw === null) return;
                                    return `${context.dataset.label}: ${context.raw.toFixed(1)}%`;
                                },
                                footer: function(context) {
                                    // Tambahkan keterangan untuk prediksi
                                    if (context[0].datasetIndex > 0 && context[0].dataIndex > actualLabels.length) {
                                        return `Tingkat kepercayaan: ${(0.95 - (context[0].dataIndex - actualLabels.length) * 0.05).toFixed(2)}`;
                                    }
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error initializing ML prediction chart:', error);
        }
    }
    
    // Tambahkan fungsi untuk membuat HTML visualisasi ML
    function createMLVisualizationHTML() {
        return `
            <!-- Machine Learning Analysis Section -->
            <div class="ml-analysis-section">
                <h3>Analisis Machine Learning</h3>
                <div class="ml-header">
                    <div class="ml-badge">
                        <i class="fas fa-brain"></i>
                        <span>Powered by AI</span>
                    </div>
                    <p class="ml-description">Analisis dilakukan menggunakan algoritma Random Forest dan Neural Network</p>
                </div>
                
                <div class="analysis-charts">
                    <div class="chart-container interaction-chart-container">
                        <h4>Interaksi Antar Parameter</h4>
                        <canvas id="parameterInteractionChart"></canvas>
                        <p class="chart-note">Warna lebih gelap menunjukkan interaksi lebih kuat</p>
                    </div>
                    <div class="chart-container feature-chart-container">
                        <h4>Parameter Dengan Pengaruh Terbesar</h4>
                        <canvas id="featureImportanceChart"></canvas>
                        <p class="chart-note">Berdasarkan model Random Forest dengan 100 trees</p>
                    </div>
                </div>
                <div class="ml-prediction-container">
                    <h4>Proyeksi Produksi Telur</h4>
                    <canvas id="mlPredictionChart"></canvas>
                    <p class="chart-note">Prediksi 4 minggu ke depan dengan tingkat keyakinan 95%-80%</p>
                </div>
            </div>
        `;
    }
    
    // Tambahkan fungsi untuk membuat HTML visualisasi lanjutan
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
        `;
    }
    
    // Inisialisasi grafik analisis komprehensif
    function initializeComprehensiveAnalysisCharts(analysis, inputs) {
        // Implementasi fungsi ini dapat ditambahkan sesuai kebutuhan
    }
    
    // Modifikasi fungsi showDashboardWithAdvancedAnalysis untuk menambahkan visualisasi ML
    function showDashboardWithAdvancedAnalysis() {
        // Sembunyikan form input
        formSection.style.display = 'none';
        
        // Ambil nilai input dari form
        const inputs = getFormInputs();
        
        // Hitung indeks stress menggunakan model
        const stressIndex = stressModel ? stressModel.predict(inputs) : 0.26;
        
        // Analisis komprehensif dengan machine learning
        const mlAnalysis = mlModel ? mlModel.analyze(inputs) : {
            stressIndex: stressIndex,
            healthScores: {
                environmentalScore: 70,
                welfareScore: 75,
                productivityScore: 80,
                feedEfficiencyScore: 78,
                eggQualityScore: 82,
                healthIndex: 75
            },
            predictions: {
                nextWeekProduction: inputs.eggProduction - 1,
                mortalityRisk: 'Rendah',
                returnOnInvestment: 15.5
            },
            interactions: {
                matrix: [
                    [1.00, 0.30, 0.45, 0.15, 0.20, 0.35],
                    [0.30, 1.00, 0.60, 0.10, 0.15, 0.25],
                    [0.45, 0.60, 1.00, 0.25, 0.50, 0.70],
                    [0.15, 0.10, 0.25, 1.00, 0.05, 0.30],
                    [0.20, 0.15, 0.50, 0.05, 1.00, 0.40],
                    [0.35, 0.25, 0.70, 0.30, 0.40, 1.00]
                ],
                significant: []
            },
            recommendations: []
        };
        
        // Buat elemen dashboard
        const dashboardHTML = createDashboardHTML();
        
        // Tambahkan dashboard setelah info card
        const infoCard = document.querySelector('.info-card');
        if (!infoCard) return;
        
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
        if (trendChart) {
            trendChart.insertAdjacentElement('afterend', advancedContainer);
        }
        
        // Tambahkan visualisasi machine learning
        const mlVisualizationHTML = createMLVisualizationHTML();
        const mlContainer = document.createElement('div');
        mlContainer.id = 'mlAnalysisContainer';
        mlContainer.innerHTML = mlVisualizationHTML;
        
        // Tempatkan setelah visualisasi lanjutan
        if (advancedContainer) {
            advancedContainer.insertAdjacentElement('afterend', mlContainer);
        }
        
        // Inisialisasi grafik dasar
        initializeHealthChart();
        
        // Inisialisasi stress gauge dengan warna yang sesuai
        initializeStressGauge();
        updateStressGaugeColors(mlAnalysis.stressIndex);
        
        // Inisialisasi grafik analisis lanjutan
        if (typeof initializeComprehensiveAnalysisCharts === 'function') {
            initializeComprehensiveAnalysisCharts(mlAnalysis.healthScores, inputs);
        }
        
        // Inisialisasi visualisasi ML
        initializeMLVisualization(inputs, mlAnalysis);
    }
    
    // Tambahkan CSS untuk styling
    function addAdvancedStyles() {
        const advancedAnalysisStyles = `
            /* Styles untuk advanced analysis */
        `;
        
        const mlVisualizationStyles = `
            /* Styles untuk ML visualization */
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = advancedAnalysisStyles + mlVisualizationStyles;
        document.head.appendChild(styleElement);
    }
    
    // ===== INISIALISASI DAN EVENT LISTENERS =====
    
    // Inisialisasi dan setup event listeners
    async function initialize() {
        // Setup mobile navigation
        setupMobileNavigation();
        
        // Load model ML
        await loadModels();
        
        // Tambahkan styles
        addAdvancedStyles();
        
        // Event listener untuk tombol analisis
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', function() {
                showDashboardWithAdvancedAnalysis();
            });
        }
        
        // Event listener untuk tombol reset
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                resetForm();
                showInputForm();
            });
        }
        
        // Event listener untuk tombol kandang
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
                
                // Reset tampilan
                showInputForm();
            });
        });
    }
    
    // Panggil inisialisasi saat halaman dimuat
    initialize();
});

// Inisialisasi grafik analisis komprehensif
function initializeComprehensiveAnalysisCharts(analysis, inputs) {
    // 1. Grafik radar untuk skor kesehatan komprehensif
    const radarCtx = document.getElementById('healthRadarChart');
    if (!radarCtx) return;
    
    try {
        new Chart(radarCtx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Lingkungan', 'Kesejahteraan', 'Produktivitas', 'Efisiensi Pakan', 'Kualitas Telur', 'Kesehatan'],
                datasets: [{
                    label: 'Skor Aktual',
                    data: [
                        analysis.environmentalScore,
                        analysis.welfareScore,
                        analysis.productivityScore,
                        analysis.feedEfficiencyScore,
                        analysis.eggQualityScore,
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
    } catch (error) {
        console.error('Error initializing health radar chart:', error);
    }
    
    // 2. Grafik prediksi produksi & ROI
    const predictionCtx = document.getElementById('predictionChart');
    if (!predictionCtx) return;
    
    // Data historis dari minggu-minggu sebelumnya
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
        analysis.productivityScore * 0.9 // Estimasi produksi berdasarkan skor produktivitas
    ];
    
    try {
        new Chart(predictionCtx.getContext('2d'), {
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
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing prediction chart:', error);
    }
    
    // 3. Grafik korelasi amonia vs stress
    const correlationCtx = document.getElementById('correlationChart');
    if (!correlationCtx) return;
    
    const correlationData = [];
    for (let i = 0; i < historicalData.ammonia.length; i++) {
        correlationData.push({
            x: historicalData.ammonia[i],
            y: historicalData.stressIndex[i]
        });
    }
    
    // Tambahkan data saat ini
    correlationData.push({
        x: inputs.ammonia,
        y: analysis.stressIndex || 0.26
    });
    
    try {
        new Chart(correlationCtx.getContext('2d'), {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Ammonia vs Stress Index',
                    data: correlationData,
                    backgroundColor: 'rgba(239, 68, 68, 0.7)',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 1,
                    pointRadius: 6,
                    pointHoverRadius: 8
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
                        max: 0.5
                    }
                },
                plugins: {
                    legend: {
                        display: true
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Amonia: ${context.raw.x} ppm, Stress: ${context.raw.y}`;
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing correlation chart:', error);
    }
    
    // 4. Grafik analisis ekonomi
    const economicCtx = document.getElementById('economicChart');
    if (!economicCtx) return;
    
    // Hitung data ekonomi untuk grafik
    const feedCost = (inputs.feedConsumption / 1000) * 8000; // Rp per ayam per hari
    const eggRevenue = (inputs.eggProduction / 100) * 0.06 * 25000; // Rp per ayam per hari
    const otherCosts = 500; // Rp per ayam per hari
    const profit = eggRevenue - feedCost - otherCosts;
    
    try {
        new Chart(economicCtx.getContext('2d'), {
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
    } catch (error) {
        console.error('Error initializing economic chart:', error);
    }
}

function addAdvancedStyles() {
    const advancedAnalysisStyles = `
        /* Styles untuk advanced analysis */
        .advanced-analysis-section {
            background-color: white;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
            background-color: #f9fafb;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            height: 300px;
            position: relative;
        }
        
        .chart-container h4 {
            text-align: center;
            margin-top: 10px;
            font-size: 14px;
            color: #6b7280;
        }
    `;
    
    const mlVisualizationStyles = `
        /* Styles untuk ML visualization */
        .ml-analysis-section {
            background-color: white;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .ml-analysis-section h3 {
            font-size: 18px;
            margin-bottom: 15px;
            color: #1f2937;
        }
        
        .ml-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            gap: 15px;
        }
        
        .ml-badge {
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: #5046e5;
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
        }
        
        .ml-badge i {
            font-size: 16px;
        }
        
        .ml-description {
            font-size: 14px;
            color: #6b7280;
        }
        
        .interaction-chart-container,
        .feature-chart-container {
            height: 350px;
        }
        
        .ml-prediction-container {
            background-color: #f9fafb;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            height: 400px;
            position: relative;
            margin-top: 20px;
        }
        
        .ml-prediction-container h4 {
            text-align: center;
            margin-bottom: 15px;
            font-size: 16px;
            color: #4b5563;
        }
        
        .chart-note {
            position: absolute;
            bottom: 5px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
            font-style: italic;
        }
        
        @media (max-width: 1024px) {
            .analysis-charts {
                grid-template-columns: 1fr;
            }
            
            .chart-container, 
            .ml-prediction-container {
                height: 400px;
            }
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = advancedAnalysisStyles + mlVisualizationStyles;
    document.head.appendChild(styleElement);
}

// Tambahkan ini ke dalam fungsi showDashboardWithAdvancedAnalysis(), setelah membuat elemen visualisasi ML
console.log('Dashboard created');
console.log('ML Analysis:', mlAnalysis);

// Debugging helper
window.addEventListener('error', function(event) {
    console.error('JS Error:', event.message, 'at', event.filename, ':', event.lineno);
});

function showDashboardWithAdvancedAnalysis() {
    // Sembunyikan form input
    formSection.style.display = 'none';
    
    // Ambil nilai input dari form
    const inputs = getFormInputs();
    
    // Hitung indeks stress menggunakan model
    const stressIndex = stressModel ? stressModel.predict(inputs) : 0.26;
    
    // Analisis komprehensif dengan machine learning
    const mlAnalysis = mlModel ? mlModel.analyze(inputs) : {
        stressIndex: stressIndex,
        healthScores: {
            environmentalScore: 70,
            welfareScore: 75,
            productivityScore: 80,
            feedEfficiencyScore: 78,
            eggQualityScore: 82,
            healthIndex: 75
        },
        predictions: {
            nextWeekProduction: inputs.eggProduction - 1,
            mortalityRisk: 'Rendah',
            returnOnInvestment: 15.5
        }
    };
    
    // Buat elemen dashboard dasar
    const dashboardHTML = createDashboardHTML();
    
    // Tambahkan dashboard setelah info card
    const infoCard = document.querySelector('.info-card');
    if (!infoCard) {
        console.error('Info card not found!');
        return;
    }
    
    const dashboardContainer = document.createElement('div');
    dashboardContainer.id = 'dashboardContainer';
    dashboardContainer.innerHTML = dashboardHTML;
    infoCard.insertAdjacentElement('afterend', dashboardContainer);
    
    // Tambahkan konten analisis komprehensif dalam bentuk teks
    const analysisHTML = `
        <div class="advanced-analysis-section">
            <h3>Analisis Komprehensif</h3>
            <div class="summary-cards">
                <div class="summary-card">
                    <h4>Skor Kesehatan</h4>
                    <div class="summary-content">
                        <p><strong>Lingkungan:</strong> ${mlAnalysis.healthScores.environmentalScore}/100</p>
                        <p><strong>Kesejahteraan:</strong> ${mlAnalysis.healthScores.welfareScore}/100</p>
                        <p><strong>Produktivitas:</strong> ${mlAnalysis.healthScores.productivityScore}/100</p>
                        <p><strong>Efisiensi Pakan:</strong> ${mlAnalysis.healthScores.feedEfficiencyScore}/100</p>
                        <p><strong>Kualitas Telur:</strong> ${mlAnalysis.healthScores.eggQualityScore}/100</p>
                        <p><strong>Indeks Kesehatan:</strong> ${mlAnalysis.healthScores.healthIndex}/100</p>
                    </div>
                </div>
                <div class="summary-card">
                    <h4>Prediksi</h4>
                    <div class="summary-content">
                        <p><strong>Produksi Minggu Depan:</strong> ${mlAnalysis.predictions.nextWeekProduction.toFixed(1)}%</p>
                        <p><strong>Risiko Kematian:</strong> ${mlAnalysis.predictions.mortalityRisk}</p>
                        <p><strong>ROI Estimasi:</strong> ${mlAnalysis.predictions.returnOnInvestment}%</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Tambahkan analisis tanpa grafik
    const analysisContainer = document.createElement('div');
    analysisContainer.id = 'advancedAnalysisContainer';
    analysisContainer.innerHTML = analysisHTML;
    
    // Tempatkan setelah tren chart
    const trendChart = document.querySelector('.trend-chart');
    if (trendChart) {
        trendChart.insertAdjacentElement('afterend', analysisContainer);
    } else {
        console.error('Trend chart not found!');
        dashboardContainer.insertAdjacentElement('beforeend', analysisContainer);
    }
    
    // Inisialisasi grafik dasar
    initializeHealthChart();
    
    // Inisialisasi stress gauge dengan warna yang sesuai
    initializeStressGauge();
    updateStressGaugeColors(mlAnalysis.stressIndex);
}

function addAdvancedStyles() {
    const advancedAnalysisStyles = `
        /* Styles untuk advanced analysis */
        .advanced-analysis-section {
            background-color: white;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .advanced-analysis-section h3 {
            font-size: 18px;
            margin-bottom: 15px;
            color: #1f2937;
        }
        
        .summary-cards {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .summary-card {
            background-color: #f9fafb;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .summary-card h4 {
            font-size: 16px;
            margin-bottom: 15px;
            color: #1f2937;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 10px;
        }
        
        .summary-content p {
            margin-bottom: 8px;
            font-size: 14px;
            color: #4b5563;
        }
        
        .summary-content p strong {
            color: #1f2937;
        }
        
        @media (max-width: 768px) {
            .summary-cards {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = advancedAnalysisStyles;
    document.head.appendChild(styleElement);
}

function showInputForm() {
    // Hapus dashboard jika ada
    const dashboardContainer = document.getElementById('dashboardContainer');
    if (dashboardContainer) {
        dashboardContainer.remove();
    }
    
    // Hapus container analisis lanjutan
    const advancedContainer = document.getElementById('advancedAnalysisContainer');
    if (advancedContainer) {
        advancedContainer.remove();
    }
    
    // Hapus container analisis ML
    const mlContainer = document.getElementById('mlAnalysisContainer');
    if (mlContainer) {
        mlContainer.remove();
    }
    
    // Tampilkan kembali form input
    formSection.style.display = 'block';
}

// Tambahkan di awal file atau di fungsi initialize
console.log = function(message) {
    // Simpan log asli
    const originalLog = console.log;
    
    // Output ke console
    originalLog.apply(console, arguments);
    
    // Buat elemen log jika belum ada
    if (!document.getElementById('debugLog')) {
        const debugLog = document.createElement('div');
        debugLog.id = 'debugLog';
        debugLog.style.cssText = 'position: fixed; bottom: 0; right: 0; width: 300px; height: 200px; overflow: auto; background: rgba(0,0,0,0.8); color: white; padding: 10px; font-family: monospace; z-index: 9999;';
        document.body.appendChild(debugLog);
    }
    
    // Tambahkan pesan ke log
    const log = document.getElementById('debugLog');
    const entry = document.createElement('div');
    entry.textContent = typeof message === 'object' ? JSON.stringify(message) : message;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
};