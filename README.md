"Emotion Cam Insight App" is a real-time facial emotion detection system using computer vision. It captures live video through the webcam, detects facial features, and identifies human emotions using a deep learning model. This app is built using Python and Flask for the backend and JavaScript for handling webcam access on the frontend.

🧠 Key Features

- Real-time webcam capture via browser
- Face detection and landmark mapping using OpenCV and Mediapipe
- Emotion classification using a trained deep learning model (`model.h5`)
- Visual feedback on detected emotions
- Responsive UI with live emotion updates

🛠️ Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend : Python with Flask
- AI/ML: Keras, TensorFlow
- CV Tools: OpenCV, Mediapipe
- Model: model.h5 (CNN-based emotion classifier)
  

📁 Project Structure
emotion-cam-insight-app/
├── model/
│ └── model.h5 # Pre-trained emotion detection model
├── static/
│ ├── css/
│ │ └── style.css # Styling
│ └── js/
│ └── script.js # Webcam capture logic
├── templates/
│ └── index.html # Main frontend HTML
├── app.py # Flask server
├── requirements.txt # Python dependencies
└── README.md # Project documentation


## 🚀 How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/Taekalpana/emotion-cam-insight-app.git
   cd emotion-cam-insight-app
(Optional) Create a virtual environment

bash
Copy
Edit
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
Install dependencies

bash
Copy
Edit
pip install -r requirements.txt
Run the Flask application

bash
Copy
Edit
python app.py
Open the app in your browser

cpp
Copy
Edit
http://127.0.0.1:5000/


Supported Emotions
Happy
Sad
Angry
Surprise
Neutral
