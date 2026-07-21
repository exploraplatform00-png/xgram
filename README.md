# 📸 XGram

> A full-featured Instagram clone built with React + Vite + Tailwind CSS

[![GitHub](https://img.shields.io/badge/GitHub-exploraplatform00--png%2Fxgram-black?logo=github)](https://github.com/exploraplatform00-png/xgram)

---

## ✨ Features

- **Feed** — Scrollable home feed with posts, likes, comments, saves
- **Stories** — 24-hour stories with progress bar viewer
- **Reels** — Vertical full-screen video reel feed
- **Explore** — Grid discovery with search and hashtag filtering
- **Profile** — Full profile page with highlights, grid tabs, follow/unfollow
- **Direct Messages** — 1:1 and group text conversations
- **Notifications** — Likes, comments, follows, mentions
- **Search** — Users and hashtags search
- **Create Post** — Drag & drop upload with caption, location, tags
- **Dark/Light Mode** — System-aware theme toggle
- **Admin Dashboard** — User management, content moderation, reports
- **Auth** — Login & Signup with session persistence

> ❌ **Calling features (audio/video) are intentionally NOT included.**

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| React Router v6 | Client-side routing |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| date-fns | Date formatting |

---

## 📁 Folder Structure

```
xgram/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/        # MainLayout (sidebar + mobile nav)
│   │   ├── feed/          # StoryBar, StoryViewer, PostCard
│   │   ├── common/        # CreatePostModal, SearchModal, SuggestedUsers
│   │   └── profile/       # Profile components
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   └── mockData.js    # All placeholder data (replace with API)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Explore.jsx
│   │   ├── Reels.jsx
│   │   ├── Messages.jsx
│   │   ├── Notifications.jsx
│   │   ├── Profile.jsx
│   │   ├── PostDetail.jsx
│   │   ├── Settings.jsx
│   │   ├── Admin.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/exploraplatform00-png/xgram.git
cd xgram

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

**Demo login:** `alex@xgram.com` / `password123`  
**Admin login:** `admin@xgram.com` / `admin123`

---

## 📝 Adding Your Own Content

All placeholder content lives in `src/data/mockData.js`. To add your own:

1. **Users** — Edit `mockUsers` array
2. **Posts** — Edit `mockPosts` array (replace `picsum.photos` URLs with real images)
3. **Stories** — Edit `mockStories` array
4. **Reels** — Edit `mockReels` array (add real video URLs)

To connect a real backend, replace the mock data imports in each page with API calls.

---

## 🌐 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.

---

## 📄 License

MIT © 2025 XGram
