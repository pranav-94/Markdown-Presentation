# 📝 Markdown Presentation Web App

A stripped-down PowerPoint-style web app for creating, editing, and presenting slides written in Markdown.

---

## 🚀 Features

- Navigate slides forward/backward like a presentation
- Live Markdown editing with preview
- Slide layouts (default, title, code)
- Highlight code blocks using `prismjs`
- Markdown parsed to AST and rendered using React components
- Hotkeys for slide navigation (← →)
- Presentation progress bar
- Mobile-friendly UI (layout-first, CSS-light)
- SQLite + Sequelize-based backend
- REST API for storing and retrieving slides
- TypeScript support for frontend and backend
- Unit test support ready (Jest or similar can be plugged in)

---

## 🧱 Architecture

**Tech Stack:**

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | React + TypeScript      |
| Backend    | Node.js + Express       |
| Database   | SQLite with Sequelize   |
| Markdown   | `remark`, `remark-parse`|
| UI Routing | React Router            |
| HTTP       | Axios                   |

**App Structure:**

```
markdown-presentation-app/
├── client/
│   ├── components/      # Editor, SlideViewer, etc.
│   ├── pages/           # AddSlide, EditSlide, PresentSlide, SlideList
│   ├── types/           # Shared TypeScript types
│   └── main.tsx         # App entrypoint
│
└── server/
    ├── models/          # Sequelize models (Slide)
    ├── routes/          # Express route handlers
    ├── database.ts      # SQLite and Sequelize setup
    └── index.ts         # Express server entrypoint
```

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/markdown-presentation-app.git
cd markdown-presentation-app
```

### 2. Setup Server

```bash
cd server
npm install
npm run dev
# Server will start on http://localhost:3000
```

### 3. Setup Client

```bash
cd client
npm install
npm run dev
# Client will start on http://localhost:5173
```

---

## 🧪 API Endpoints

| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| GET    | `/api/slides`         | Get all slides        |
| GET    | `/api/slides/:id`     | Get a specific slide  |
| POST   | `/api/slides`         | Add a new slide       |
| PUT    | `/api/slides/:id`     | Update a slide        |
| DELETE | `/api/slides/:id`     | Delete a slide        |

---

## 💡 Design Decisions

- **AST-based rendering**: Instead of rendering Markdown directly to HTML, the app parses Markdown into an Abstract Syntax Tree (AST) and renders each node as a React component. This provides flexibility and future extensibility.
- **Minimal CSS/No Frameworks**: No external CSS libraries like Tailwind or Bootstrap are used. All styling is basic or inline, keeping the design simple and easy to maintain.
- **Layout Support**: Allows different types of slides (e.g., title, code) with markdown-based content.

---

## 🎯 Future Improvements

- Export to PDF
- Add slide transitions/animations
- Speaker notes and presenter view
- Authentication and slide sharing
- Realtime collaboration (e.g., WebSocket sync)
- Dark mode

---

## 🧠 Learning Goals

This app demonstrates:

- Full-stack TypeScript with React and Express
- Markdown-to-AST parsing with `remark`
- State management using `useState`, `useEffect`, `useCallback`
- Custom rendering of AST nodes
- RESTful API usage with `axios`
- Scalable file and folder structure
- Keyboard navigation and progress tracking

---

## 🪪 License

MIT License © 2025