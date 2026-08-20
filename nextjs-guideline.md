# Next.js - Development Guidelines

## **1. High-Level Principles**

- **App Router only** (Next.js 15+)
- **Feature-driven architecture**
- **Strict separation of UI, domain logic, and data contracts**
- **Predictable structure across all features**

---

## **2. Project Tree (Refined)**

```
project/
├── app/                         # Next.js App Router (Routes & Layouts)
│   ├── (auth)/                  # Authentication routes (login, signup)
│   ├── (panel)/                 # Protected creator panel
│   │   ├── (dashboard)/         # Dashboard views
│   │   │   ├── page.tsx         # Fetches data from Service
│   │   │   └── loading.tsx      # Skeleton UI
│   │   ├── (content)/           # Content management views
│   │   ├── (finance)/           # Earnings & payouts
│   │   └── (platform)/          # Platform tools & settings
│   ├── globals.css              # Global Tailwind styles
│   └── layout.tsx               # Root layout (providers only)
│
├── components/                  # Reusable & cross-feature UI
│   ├── ui/                      # Atomic UI (shadcn/ui)
│   ├── layout/                  # Sidebar, navbar, shell
│   ├── data-table/              # Generic data-table system
│   ├── modal-provider.tsx       # Global modal provider
│   └── table/                   # Generic table building blocks
│       ├── list.tsx             # Reusable listing wrapper
│       ├── columns.tsx          # Column definitions (no business logic)
│       └── create.tsx           # Generic create-form layout
│
├── features/                    # Domain-driven feature modules
│   ├── content/
│   │   ├── components/          # Feature-specific UI (client allowed)
│   │   │   ├── list.tsx
│   │   │   ├── columns.tsx
│   │   │   └── create.tsx
│   │   ├── content.service.ts   # API / server communication
│   │   ├── model.ts             # Domain model definitions
│   │   └── schema.ts            # Zod schemas (validation)
│   │
│   ├── finance/
│   │   ├── components/
│   │   ├── finance.service.ts
│   │   ├── model.ts
│   │   └── schema.ts
│   │
│   └── user/
│       ├── components/
│       ├── user.service.ts
│       ├── model.ts
│       └── schema.ts
│
├── hooks/                       # Shared React hooks
│   ├── use-data-table.ts
│   ├── use-modal.ts
│   └── use-mobile.ts
│
├── lib/                         # Core utilities & infrastructure
│   ├── api.service.ts           # Base API handler
│   ├── axios.ts                 # Axios instance & interceptors
│   ├── cookie.ts                # Cookie helpers
│   ├── format.ts                # Date / currency formatters
│   └── utils.ts                 # General utilities
│
├── types/                       # Global TypeScript types (cross-feature only)
│   ├── data.ts
│   └── data-table.ts
│
├── lang/                        # i18n resources
│   ├── en.json
│   └── hi.json
│
├── .agent                       # Engineering governance rules
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## **3. Feature Folder Contract (Mandatory)**

Every feature **must** follow this internal structure:

```
features/[feature-name]/
├── components/        # Feature UI only (Client Components allowed)
│   ├── list.tsx       # Listing view (tables, grids)
│   ├── columns.tsx    # Table column definitions
│   └── create.tsx     # Create / edit UI
├── [feature].service.ts  # API calls & server actions
├── model.ts           # Domain models (pure TypeScript)
└──  schema.ts          # Zod schemas for validation
```

### **Rules**

- **No API calls inside components**
- **No Zod schemas inside components**
- **No business logic in columns.tsx**

---

## **4. File Responsibility Definitions**

### **model.ts**

- Defines **domain entities** and **DTOs**
- No framework imports

```tsx
export type ContentItem = {
  id: string
  title: string
  status: 'draft' | 'published'
}
```

### **[feature].service.ts**

- Handles API calls / server actions
- Maps API response → model
- No UI imports

```tsx
import BaseService from "@/lib/api.service";

class ProfileService extends BaseService {
  constructor() {
    super("users");
  }

  async getProfile() {
    return await this.get("me/profile");
  }
}  
```

### **schema.ts**

- Zod schemas only
- Shared between server & client

---

## **5. Client vs Server Rules**

- use client allowed **only** inside:
    - features/**/components
    - components/ui

❌ Forbidden

- use client in app/layout.tsx and page.tsx
- use client in service or model files

---

## **6. Naming Conventions**

- **Folders & files**: kebab-case
- **Components**: PascalCase
- **Services**: [feature].service.ts
- **Schemas**: schema.ts
- **Models**: model.ts

---

## **7. Governance via**

## **.agent**

## **(Mandatory)**

The .agent file enforces:

- Feature-based architecture
- Client component boundaries
- Naming conventions
- AI usage policy (Gemini / Antigravity only)
- TypeScript strict mode

Any deviation requires architectural approval.

[GOVERNANCE.md](http://governance.md/)

```markdown
---
trigger: always_on
---

# AGENT GOVERNANCE & SAFETY PROTOCOLS

## 1. DATA SAFETY (NON-DESTRUCTIVE POLICY)
* **PROHIBITION:** You are strictly FORBIDDEN from deleting any files unless the user explicitly uses the word "delete" or "remove" in the prompt for that specific file.
* **REFACTORING:** When refactoring, you must comment out old code rather than deleting it, unless the file size becomes unmanageable.
* **BACKUP:** If a major change is required, suggest creating a backup of the file (e.g., `filename.bak`) before proceeding.

## 2. SCOPE CONTAINMENT (TASK ISOLATION)
* **STRICT FOCUS:** You may only create or modify code that is a direct dependency of the provided task.
* **NO "CLEAN UP":** Do not fix "unrelated bugs," "formatting issues," or "optimizations" in files that are not central to the user's current request.
* **CONTEXT BOUNDARY:** If a task requires changing a shared utility (like a global Helper or Theme file), you must ASK for permission before modifying it, as this may break other modules.[GOVERNANCE.md](http://governance.md/)
```

---

## **8. Code Review Checklist**

Before merge:

- ✅ Feature folder contract followed
- ✅ No business logic in UI files
- ✅ Service + model + schema separation
- ✅ No unreviewed AI-generated files
- ✅ ESLint & TypeScript clean

---