# Render pe Deploy karne ka Guide

## ⚠️ Important — Pehle padho

Aapki app ka **backend already Lovable Cloud (Supabase) pe host hai** — database, auth, sab kuch wahin chalega. Render pe sirf **frontend (static site)** deploy hoga, jo Supabase se directly connect karega.

Ye setup free tier pe kaam karega.

---

## Steps

### 1. GitHub pe code push karo
Lovable → Plus (+) menu → GitHub → Connect project → Create Repository.

### 2. Render pe account banao
https://render.com pe signup karo (free).

### 3. New Static Site banao
- Dashboard → **New +** → **Static Site**
- GitHub repo select karo
- Render `render.yaml` file automatically detect kar lega ✅

### 4. Environment Variables add karo
Render dashboard me 2 variables set karo (values `.env` file se lo):

| Key | Value |
|---|---|
| `VITE_SUPABASE_URL` | (aapke `.env` se copy karo) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | (aapke `.env` se copy karo) |

### 5. Deploy click karo
Render build karega (~3-5 min) aur live URL degi jaise: `sanjeevani-clinic.onrender.com`

---

## Custom Domain
Render dashboard → Settings → Custom Domain → domain add karo → DNS records update karo.

---

## Note
- **Server functions** (TanStack `createServerFn`) static site pe kaam nahi karenge. Agar koi server-side logic chahiye future me, toh Lovable Cloud pe hi rakhna padega ya alag Node service Render pe banani padegi.
- Aapki current app mostly Supabase calls karti hai directly frontend se — toh static deploy fine hai.
