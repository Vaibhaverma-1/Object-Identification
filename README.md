# 🎯 Real-Time Object Identification using COCO-SSD

This project is a **real-time object detection web app** that utilizes **TensorFlow.js**, the **COCO-SSD model**, and a **live webcam feed** to detect and label everyday objects on the screen. Built using **TypeScript**, **React**, **Tailwind CSS**, and **Vite**, this responsive app runs entirely in the browser.

> 🟢 Live Demo: [https://object-identification-tawny.vercel.app/](https://object-identification-tawny.vercel.app/)

---

## 📷 Features

- 🎥 Real-time object detection from webcam
- 🧠 Uses TensorFlow.js and COCO-SSD model in-browser
- ✅ Accurate bounding boxes and labels
- 📊 Displays object confidence levels with progress charts
- 🌓 Supports dark and light modes
- ⚡ Deployed on [Vercel](https://vercel.com)

---

## 🚀 Tech Stack

| Technology     | Purpose                                |
|----------------|----------------------------------------|
| React + Vite   | Frontend framework                     |
| TypeScript     | Static typing                          |
| Tailwind CSS   | Styling & layout                       |
| Bootstrap      | UI structure                           |
| TensorFlow.js  | Machine learning in the browser        |
| COCO-SSD       | Pre-trained object detection model     |
| Webcam.js      | Webcam video streaming                 |
| Vercel         | ✅ Deployment & hosting                |

---

## 🧠 How It Works

1. **User grants webcam permission**
2. **Video stream** is captured using HTML5 video
3. **COCO-SSD model** runs inference on each frame
4. Detected objects are:
   - 🟩 Drawn on canvas with bounding boxes
   - 📌 Labeled with class and confidence
   - 📈 Rendered below via a probability chart

---

## 📁 Folder Structure

Object-Identification/
│
├── public/ # Static files
│ └── index.html
│
├── src/
│ ├── components/ # UI Components
│ │ ├── Display.tsx # Webcam + Detection canvas
│ │ ├── Information.tsx # Object label chart
│ │ └── Toggle.tsx # Dark/light toggle
│ │
│ ├── context/
│ │ └── WebcamContext.tsx # Global webcam stream provider
│ │
│ ├── App.tsx # Root component
│ └── main.tsx # Vite app entry point
│
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
├── postcss.config.js
└── README.md # ← You are here


---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/Vaibhaverma-1/Object-Identification.git
cd Object-Identification

# Install dependencies
npm install

# Start development server
npm run dev
```
# 🚀 Deployment
This project is deployed using Vercel.

To deploy your own:

bash
Copy
Edit
npm i -g vercel
vercel
It will prompt you to:

Choose or create a project

Confirm root directory (.)

Automatically build and deploy the app

Your project will be live at something like:

👉 https://object-identification-yourname.vercel.app

# 📌 TODO (Optional Enhancements)
Add audio feedback on detection

Export snapshots with bounding boxes

Add support for image upload detection

Allow switching models (e.g. YOLO, Mobilenet)

# 📄 License
This project is open-source under the MIT License.

# 👨‍💻 Author
Made with 💡 by Vaibhav Verma
Deployed on Vercel
