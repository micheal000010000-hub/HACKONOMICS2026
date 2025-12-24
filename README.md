# 🧠 Interactive Financial Literacy Simulator

> Learn finance by making decisions — not by memorizing definitions.

An **interactive, simulation-driven financial literacy platform** designed to help users understand real-world economic and financial concepts through hands-on decision-making scenarios.

This project explores how **technology, cryptography, and decentralized systems** can be used to explain *why* financial systems work the way they do — rather than just *how* to use them.

---

## 🚧 Project Status: Active Development

⚠️ **This project is currently under active development.**

- 🛠️ Ongoing implementation and iteration  
- 🏁 **Hackathon submission deadline:** **March 2026**
- ✨ Features, UI, and simulations are evolving continuously

The current version represents a **working prototype**, not the final product.

---

## 🎯 Motivation

Financial systems are often treated as opaque, intimidating, or purely theoretical.  
This project aims to:

- Bridge the gap between **theory and real-world application**
- Replace passive learning with **interactive simulations**
- Help users intuitively understand:
  - Transactions & authorization
  - Trust, verification, and ownership
  - Centralized vs decentralized systems

---

## 🧩 Core Concept

Instead of reading about finance, users **simulate real scenarios**, such as:

- Asset ownership and transfers  
- Transaction authorization  
- Risk and decision trade-offs  
- Trust models (institution-based vs protocol-based)

Each simulation is designed to **visualize what normally remains invisible** in traditional financial systems.

---

## 🔍 Key Features (Planned & In Progress)

- 🏠 **Interactive Simulations**
  - Real-world financial decision flows
  - Step-by-step transaction visualizations

- 🔐 **Cryptography Concepts**
  - Public & private keys
  - Hashing and immutability
  - Transaction verification

- ⛓️ **Blockchain Fundamentals**
  - Block creation & hashing
  - Proof of Work vs Proof of Stake (conceptual)
  - Smart contract logic (simplified)

- 🤖 **AI-Assisted Learning**
  - Context-aware chatbot for explanations
  - On-demand concept breakdowns
  - Simulation-based Q&A

- 🎨 **Modern UI/UX**
  - Dark / Light mode
  - Responsive design (desktop & mobile)
  - Clean, minimal, educational focus

---

## 🏗️ Tech Stack, Setup & Architecture

### Quick Start
- Node.js (18+ recommended)
- PostgreSQL (local or hosted)
- Run `npm install` inside `FRONTEND`, set `.env`, then `npm run dev` to start the app on port 5000 by default.

### Frontend
- React + TypeScript, Vite, Tailwind CSS
- UI primitives: Radix UI, Framer Motion, Recharts
- Client entry: `client/src` (pages in `client/src/pages`)

### Backend
- Node.js + Express (TypeScript)
- Bundled with `esbuild` for production
- Server entry: `server/index.ts`

### Database
- PostgreSQL with `drizzle-orm` (`drizzle-kit` for migrations)
- Main table: `newsletter_subscribers`

### AI & Email
- Optional: Google Gemini via `@google/generative-ai` (`GOOGLE_API_KEY`)
- Email sending via Gmail SMTP (`nodemailer`) when `SMTP_EMAIL` + `SMTP_PASSWORD` provided

---

## 🧪 Current Limitations

- Simulations are **conceptual**, not legally binding
- No real financial transactions
- Educational purpose only

❗ This platform **does not provide financial, legal, or investment advice**.

---

## ⚙️ Environment Variables

Create a `.env` file at the root of `FRONTEND/` with the following values (examples):

- `DATABASE_URL` (required): `postgres://user:pass@localhost:5432/trustblocks`
- `PORT` (optional): `5000`
- `NODE_ENV` (optional): `development` or `production`
- `GOOGLE_API_KEY` (optional): Gemini / Google Generative API key
- `SMTP_EMAIL` and `SMTP_PASSWORD` (optional): for sending subscription emails

> Notes:
> - `DATABASE_URL` is required for the server to start (the server will throw an error if missing).
> - The AI tutor will operate in fallback mode if `GOOGLE_API_KEY` is not set.

---

## 🗃️ Database & Migrations

- Engine: **PostgreSQL**
- ORM: **Drizzle ORM** (`drizzle-orm`) with `drizzle-kit` for migrations

Quick setup:

```bash
# start Postgres (use Docker or install locally)
# example (Docker):
# docker run --name trustblocks-db -e POSTGRES_PASSWORD=pass -e POSTGRES_USER=user -e POSTGRES_DB=trustblocks -p 5432:5432 -d postgres

# set DATABASE_URL in .env and then run:
npm run db:push
```

Main schema file: `shared/schema.ts` (table: `newsletter_subscribers`).

---

## 🔌 API Endpoints

- POST `/api/chat/send`
  - Request body: `{ message: string, history?: Array<{ role: string, content: string }> }`
  - Response: `{ message: string }` (AI tutor reply)
  - Notes: Uses Gemini if `GOOGLE_API_KEY` exists, otherwise returns a simulated reply.

- POST `/api/subscribe`
  - Request body: `{ email: string }`
  - Response: `201` on success, `409` if email already subscribed
  - Notes: Persists to `newsletter_subscribers` and attempts to send a welcome email via SMTP if credentials are set.

---

## 📄 Pages & Core Features

- `/` (Landing) — `client/src/pages/Landing.tsx`
  - Hero, feature cards, quick navigation, and the **AITutor** floating chat

- `/stimulation` — `client/src/pages/Stimulation.tsx`
  - Side-by-side **Traditional** vs **Blockchain** transaction workflow
  - `WorkflowDiagram` interactive steps and explanations

- `/crypto` — `client/src/pages/Crypto.tsx`
  - **Cryptography Playground**: key generation, SHA-256 hashing (Web Crypto), and message signing demo

- `/consensus` — `client/src/pages/Consensus.tsx`
  - **Consensus Visualizer** for Proof of Work and Proof of Stake simulations

- `client/src/components/features/AITutor.tsx`
  - Chat UI that calls `/api/chat/send` and persists chat in session storage for the current tab

- `client/src/components/layout/Footer.tsx`
  - Newsletter subscription UI that posts to `/api/subscribe`

---

## ✅ Common Developer Workflows

Start dev (hot reload for client + server):

```bash
cd FRONTEND
npm install
npm run dev
```

Build for production and run:

```bash
cd FRONTEND
npm run build
NODE_ENV=production npm start
```

Run DB migrations:

```bash
npm run db:push
```

---

## 🛠️ Troubleshooting

- Server fails to start complaining about `DATABASE_URL` — ensure you have a working Postgres instance and `DATABASE_URL` is set.
- `AITutor` returns a canned response — set `GOOGLE_API_KEY` to use Gemini for real AI replies.
- Email sending fails — make sure `SMTP_EMAIL` and `SMTP_PASSWORD` are set, and allow less-secure app access or use an app password depending on provider.

---



---

## 📅 Roadmap (High-Level)

- [ ] Improve simulation interactivity
- [ ] Add visual transaction flows
- [ ] Integrate AI chatbot more deeply
- [ ] Expand educational content
- [ ] Polish UI/UX for final submission

---

## 👤 Author

**Micheal Angelo**

- 📧 Email: *michealangelo000010000@gmail.com*  
- 🧑‍💻 GitHub: *https://github.com/micheal000010000-hub*  
- 🧠 LeetCode: *https://leetcode.com/u/micheal000010000/*  

---

## 🤝 Contributions & Feedback

This project is evolving.  
Feedback, ideas, and constructive discussion are welcome.

---

## 📜 License

MIT License

---

### ✨ Final Note

This project is an exploration — not a claim of authority.  
The goal is **clarity, intuition, and understanding**, not complexity for its own sake.
