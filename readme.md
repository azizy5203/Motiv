# 🧭 Motiv — Project Management Platform

Motiv is a full-stack project management platform designed to help teams organize, collaborate, and track work efficiently.  
This monorepo contains both the **frontend** (React) and **backend** (NestJS) apps, managed via **npm workspaces** for shared types and contracts.

---

## 🚀 Tech Stack

**Frontend:** React, TypeScript, Vite, React Hook Form, Shadcn UI, Tailwind CSS  
**Backend:** NestJS, TypeScript, PostgreSQL, Prisma  
**Shared:** Zod (for schema validation), Shared DTOs and Types  
**Tooling:** npm Workspaces, ESLint, Prettier

---

## 🧩 Monorepo Structure

```
motiv/
│
├── apps/
│   ├── motiv-frontend/     # React + Vite frontend
│   └── motiv-backend/      # NestJS backend
│
├── packages/
│   └── shared/             # Shared types, DTOs, validation schemas
│
├── package.json            # Root workspace configuration
├── tsconfig.json           # Shared TypeScript configuration
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/motiv.git
cd motiv
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run backend
```bash
npm run dev -w apps/motiv-backend
```

### 4. Run frontend
```bash
npm run dev -w apps/motiv-frontend
```

The backend typically runs on **http://localhost:3000**,  
and the frontend on **http://localhost:5173**.

---

## 🧠 Shared Package

The `packages/shared` folder contains:
- **TypeScript interfaces** for API responses and requests  
- **Zod schemas** for type-safe validation on both backend and frontend  
- **Utility functions** shared across both apps  

You can import shared modules like:
```ts
import { UserDTO } from "@motiv/shared";
```

---

## 🧪 Development Tips

- Keep shared logic in `packages/shared`
- Use absolute imports via `paths` in `tsconfig.json`
- Run `npm run lint` before pushing changes
- Keep `.env` files out of version control (see `.env.example`)

---

## 📦 Deployment

Both apps can be deployed separately or together:
- **Frontend:** Vercel, Netlify, or any static host
- **Backend:** Render, Railway, or any Node hosting provider

---

## 📄 License

MIT License © 2025 Motiv Team

---

## 🧑‍💻 Author

- **Youssuf Abdulaziz** — Solo Developer / Monorepo Architect  
