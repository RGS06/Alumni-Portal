# 🎓 SMVITM Alumni Association Portal

<div align="center">

### _Reconnecting the Past, Empowering the Future._

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF0069?logo=framer)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A premium, full-stack web platform built for the **Shri Madhwa Vadiraja Institute of Technology & Management (SMVITM)** Alumni Association — fostering professional networking, mentorship, and collective institutional growth.

</div>

---

## ✨ Features

### 🌐 For Alumni & Students
| Feature | Description |
|---|---|
| **Alumni Directory** | Search and filter alumni worldwide by batch, branch, or location |
| **Community Forum** | Post, comment, like, and engage in threaded discussions |
| **Mentorship Program** | Connect current students with experienced alumni for career guidance |
| **Events** | Browse and stay updated on institutional and alumni events |
| **Yearbook** | Batch-wise digital yearbook with photos, quotes & batch stats |
| **Media Gallery** | Photo and video gallery from alumni events |
| **Giving & Contributions** | Contribute to scholarships, infrastructure, or specific causes |
| **Opportunities Board** | Browse and post internship, job, and research opportunities |
| **Contact** | Reach the alumni association directly |

### 🔐 Admin Panel
| Feature | Description |
|---|---|
| **Admin Dashboard** | Central overview with quick stats and management shortcuts |
| **Alumni Management** | View, search, and manage registered alumni profiles |
| **Forum Moderation** | Review and moderate community posts for compliance |
| **Yearbook Management** | Add, edit, and organize yearbook entries per batch |
| **Media Management** | Upload and manage photos/videos for the gallery |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **UI Library** | [React 18](https://react.dev/) |
| **Styling** | Vanilla CSS with custom design system (CSS variables, dark theme) |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database** | [Supabase](https://supabase.com/) (PostgreSQL) |
| **Auth** | Supabase Auth (Email/Password) |
| **Real-time** | Supabase Real-time Subscriptions |
| **File Exports** | [SheetJS (xlsx)](https://sheetjs.com/) |
| **Deployment** | [Vercel](https://vercel.com/) (Planned) |

---

## 📁 Project Structure

```
Alumni Portal/
├── app/                        # Next.js App Router pages
│   ├── page.jsx                # Homepage
│   ├── about/                  # About SMVITMAA page
│   ├── admin/                  # Admin panel (protected)
│   │   ├── page.jsx            # Admin dashboard
│   │   ├── alumni/             # Alumni management
│   │   ├── media/              # Media management
│   │   ├── moderation/         # Forum moderation
│   │   └── yearbook/           # Yearbook management
│   ├── community/              # Community forum
│   ├── complete-profile/       # Profile completion flow
│   ├── contact/                # Contact page
│   ├── dashboard/              # Logged-in user dashboard
│   ├── directory/              # Alumni directory
│   ├── events/                 # Events listing
│   ├── giving/                 # Giving & contributions
│   │   └── contribute/         # Contribution form
│   ├── login/                  # Login page
│   ├── media/                  # Media gallery
│   ├── mentorship/             # Mentorship program
│   ├── opportunities/          # Job/internship opportunities
│   ├── signup/                 # Registration page
│   └── yearbook/               # Digital yearbook (batch-wise)
├── components/                 # Reusable React components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── AuthContext.jsx         # Global auth state
│   ├── AdminRoute.jsx          # Admin-only route guard
│   ├── ProtectedRoute.jsx      # Auth-protected route guard
│   ├── AssociationLeadership.jsx
│   ├── AlumniGiving.jsx
│   ├── FeaturedAlumni.jsx
│   ├── Globe.jsx               # Animated globe (alumni worldwide)
│   ├── LatestUpdates.jsx
│   ├── MentorshipHighlight.jsx
│   ├── QuickAccess.jsx
│   └── TrustStrip.jsx
├── supabase/                   # Database schema SQL files
│   ├── admin_schema.sql
│   ├── forum_schema.sql
│   ├── yearbook_schema.sql
│   └── yearbook_entries_schema.sql
├── public/                     # Static assets
├── next.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+ LTS recommended)
- **npm** or **yarn**
- **Git**
- A **Supabase** project (free tier works)

### 1. Clone the Repository

```bash
git clone https://github.com/RGS06/Alumni-Portal.git
cd Alumni-Portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> You can find these in your Supabase project → **Settings → API**.

### 4. Set Up the Database

Run the SQL schema files in order in your Supabase **SQL Editor**:

```
supabase/admin_schema.sql
supabase/forum_schema.sql
supabase/yearbook_schema.sql
supabase/yearbook_entries_schema.sql
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Admin Access

Admin privileges are managed via the `admin_schema.sql` table. To grant a user admin rights, insert their Supabase `user_id` into the `admins` table directly in your Supabase dashboard.

---

## 🤝 Contributing

We welcome contributions from alumni and students!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 📬 Contact

**SMVITM Alumni Association**
📧 [webmaster@sode-edu.in](mailto:webmaster@sode-edu.in)
🌐 [sode-edu.in](https://sode-edu.in)
📘 [LinkedIn](https://www.linkedin.com/company/shri-madhwa-vadiraja-institute-of-technology-and-management/)
📷 [Instagram](https://www.instagram.com/smvitm.sode/)

---

<div align="center">
  Made with ❤️ by the SMVITM CSE Team
</div>
