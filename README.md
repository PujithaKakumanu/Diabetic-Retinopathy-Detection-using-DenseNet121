# 🩺 DRD-121: Diabetic Retinopathy Detection Using DenseNet121

## 📌 Overview  

DRD-121 is a **Deep Learning-based Web Application** that detects **Diabetic Retinopathy (DR)** from retinal images.  

It helps in:  
✔ Early disease detection  
✔ Faster medical screening  
✔ Supporting healthcare professionals  


## 🚀 Demo  

<p align="center">
  <img src="assets/demo.gif" alt="Demo GIF" width="600"/>
</p>


## 🖥️ UI Preview  

<p align="center">
  <img src="assets/home.png" width="45%" />
  <img src="assets/result.png" width="45%" />
</p>

## 🎯 Features  
- Upload retinal image  
- Predict DR severity level  
- Simple web interface  
- Fast and accurate results  


## 🧠 Model Details  

- Model: **DenseNet121 (Transfer Learning)**  
- Input Size: **224 × 224**  
- Output: **5 Classes Classification**  

### 🏥 DR Severity Levels:
| Class | Description |
|------|------------|
| 0 | No DR |
| 1 | Mild |
| 2 | Moderate |
| 3 | Severe |
| 4 | Proliferative DR |


## ⚙️ Tech Stack  

| Category | Technology |
|---------|-----------|
| Backend | Flask |
| ML/DL | TensorFlow, Keras |
| Image Processing | OpenCV, PIL |
| Frontend | HTML, CSS |
| Deployment | Local / Cloud |


## 📂 Project Structure  

```
DRD-121/
│
└── Diabetic_Retinopathy_Detection/
    │
    ├── models/
    │   ├── __pycache__/
    │   ├── pretrained/
    │   │   ├── DenseNet-BC-121-32-no-top.h5   # Base DenseNet weights
    │   │   ├── model.h5                      # Trained DR model weights
    │   │   └── model.json                    # Model architecture (optional)
    │   └── model.py                          # Model building & preprocessing
    │
    ├── static/
    │   ├── Images/                           # UI images
    │   ├── main.css                          # Styling
    │   └── main.js                           # Frontend logic
    │
    ├── templates/
    │   ├── base.html                         # Base layout
    │   └── index.html                        # Main UI page
    │
    ├── app.py                                # Flask backend
    ├── utils.py                              # Image conversion utilities
    └── requirements.txt                      # Dependencies
```


## 🔄 Workflow  

```
User Upload Image → Preprocessing → Model Prediction → Result Display
```


## 🛠️ Installation  

```bash
git clone https://github.com/PujithaKakumanu/Diabetic-Retinopathy-Detection-using-DenseNet121.git
cd DRD-121
pip install -r requirements.txt
```

## ▶️ Run Locally  

```bash
python app.py
```

🔗 Open: http://localhost:5000  


## 📸 Input Requirements  

- Image Type: JPG / PNG  
- Retinal Fundus Image  

## 📊 Sample Output  

```
Result: Moderate DR  
Confidence: 0.87
```

## 🌟 Future Enhancements  

  🔹 Mobile App Integration  
  🔹 Cloud Deployment (AWS / Azure)  
  🔹 Real-time camera scanning   
  🔹 Explainable AI (Heatmaps)  


## 🏆 Achievements  

✔ Real-world healthcare problem solving  
✔ Deep learning implementation  
✔ Full-stack integration  


## 👩‍💻 Author  

**Pujitha Kakumanu**  


## 💡 Contribution  

Contributions are welcome!  
Feel free to fork, improve, and submit a Pull Request(PR)  





