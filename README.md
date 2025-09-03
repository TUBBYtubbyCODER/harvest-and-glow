# JavaTRAX ☕📦

JavaTRAX is a full-stack order processing system built for a single user (the CEO of a small coffee roaster). It manages customer coffee orders, generates PDF invoices, tracks sales, and integrates with Google Sheets for customer and pricing references.

## 📁 Project Structure

```📁 JavaTRAX-3000/ (The Ranch Headquarters)
├── 🎨 frontend/             # React-based UI for order entry and review (The Pretty Face)
├── 🔧 backend/              # Node.js/Express server for PDF generation, DB access, Google Sheets integration (The Engine Room)
├── 🤝 shared/               # Shared utility modules - constants, schemas (The Family Recipes)
├── 🔐 .env                  # Environment config (Where we keep the secrets)
├── 📦 package.json          # Project-level scripts and dependencies (The Master Plan)
├── 📖 README.md             # You are HERE, sugar!
└── 🛠️  ...                  # Other config files - Dockerfile, .prettierrc, etc. (The Tool Shed)
```

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/JavaTRAX-3000.git
cd JavaTRAX-3000
```

### 2. Install Dependencies

Installs both frontend and backend packages.

```bash
npm install
# or, if using workspaces:
npm install --workspaces
```

### 3. Run in Development Mode

Runs both frontend and backend concurrently with hot reload.

```bash
npm run dev
```

> **Note**: This assumes you're using something like `concurrently` or `turbo` to orchestrate `frontend` and `backend`.

---

## 🪰 Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Starts both frontend and backend     |
| `npm run build` | Builds frontend and backend for prod |
| `npm run lint`  | Runs linters across all packages     |
| `npm run test`  | Runs tests across all packages       |

---

## 📦 Features

* 💼 **Invoice PDF Generation**
* 📈 **Customer Order History**
* 🧾 **Google Sheets Price Sync**
* �� **Coffee Sales Summary by Customer**
* 🔐 **Secure by Design** – Auth/Access control ready
* ⚙️ **Modular Architecture** – Easily expandable

---

## 📂 Data & Storage

* **Google Sheets** — Used as a source of truth for pricing and contacts
* **Internal Database** (e.g., SQLite, PostgreSQL) — Used to track orders and logs
* **PDFs** stored locally or pushed to cloud (depending on config)

---

## 🔒 Security

* Admin-only access (single user)
* Secure API keys via `.env`
* No public endpoints

---

## 🛠️ Stack

| Layer      | Tech                       |
| ---------- | -------------------------- |
| Frontend   | React + TailwindCSS        |
| Backend    | Node.js + Express          |
| PDF Gen    | `pdf-lib` / `puppeteer`    |
| Data Store | SQLite / PostgreSQL        |
| Auth       | Local JWT or session-based |
| Sheets API | Google Sheets API (OAuth2) |

---

## 📈 Roadmap

ALL I DO IS WIN WIN WIN NO MATTER WHAT!

---

## 👤 Author

TUBBY_tubby_CODER, all rights reserved. 
Developed in-house for a small-batch coffee roaster.

---

## 🧪 Dev Notes

* Use `.env.example` as a template
* Dev uses local SQLite for fast iteration
* All packages/scripts run from root for monorepo simplicity
