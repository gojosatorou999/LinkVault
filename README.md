# LinkVault - MongoDB Bookmark Manager

LinkVault is a modern, high-performance bookmark management system built with Flask and MongoDB. It features a sleek glassmorphic UI, tag-based organization, and real-time interactions.
 
## 🚀 Features
- **Modern UI**: Dark-themed, responsive glassmorphic design.
- **Tag Management**: Organize your links with custom tags.
- **Instant Search**: Filter bookmarks by tags effortlessly.
- **MongoDB Backend**: Reliable and scalable NoSQL storage.

## 🛠️ Tech Stack
- **Backend**: Python, Flask, PyMongo
- **Database**: MongoDB
- **Frontend**: HTML5, Vanilla CSS3, JavaScript (ES6+)

## 📦 Project Structure
```text
.
├── app.py              # Flask server & API logic
├── requirements.txt    # Python dependencies
├── static/
│   ├── css/
│   │   └── style.css   # Premium styling
│   └── js/
│       └── main.js    # Frontend interactivity
└── templates/
    └── index.html      # Main dashboard
```

## ⚙️ Setup
1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   ```
2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Configure Environment**:
   Create a `.env` file or set the `MONGO_URI` environment variable if your MongoDB instance isn't local.
4. **Run the app**:
   ```bash
   python app.py
   ```

## 📜 License
MIT License
