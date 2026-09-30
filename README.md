# Task API Frontend

Vue 3 + Tailwind CSS দিয়ে তৈরি Task Management frontend। এটি [task_api_backend](https://github.com/hassanroki/task_api_backend) (Laravel + Sanctum API) এর সাথে কাজ করে।

---

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Technology](#technology)
4. [GitHub থেকে Download ও Run করা](#github-থেকে-download-ও-run-করা)
5. [Backend এর সাথে Connect করা](#backend-এর-সাথে-connect-করা)
6. [Pages ও Routes](#pages-ও-routes)
7. [Authentication কিভাবে কাজ করে](#authentication-কিভাবে-কাজ-করে)
8. [Available Scripts](#available-scripts)
9. [Production Build ও Deploy](#production-build-ও-deploy)
10. [Common Problems](#common-problems)

---

## Features

- Landing, Features, Pricing, Contact page
- Public Task list ও Task detail দেখা
- Register / Login / Logout
- Login করা user এর জন্য Dashboard (protected route)
- Route Guard: login ছাড়া `/dashboard` এ যাওয়া যায় না, login থাকলে `/login` ও `/register` এ যাওয়া যায় না
- Tailwind CSS 4 দিয়ে responsive design

---

## Requirements

| Software    | Version                                                                           |
| ----------- | --------------------------------------------------------------------------------- |
| Node.js     | `^20.19.0` অথবা `>=22.12.0`                                                       |
| npm         | Node.js এর সাথে আসে (`10+` recommended)                                           |
| Git         | latest                                                                            |
| Backend API | [task_api_backend](https://github.com/hassanroki/task_api_backend) চালু থাকতে হবে |

Node version দেখতে:

```bash
node -v
```

---

## Technology

| Technology             | Version                           |
| ---------------------- | --------------------------------- |
| Vue                    | `^3.5.32`                         |
| Vue Router             | `^5.0.6`                          |
| Axios                  | `^1.15.2`                         |
| Vite                   | `^8.0.8`                          |
| @vitejs/plugin-vue     | `^6.0.6`                          |
| Tailwind CSS           | `^4.2.4` (`@tailwindcss/postcss`) |
| PostCSS + Autoprefixer | `^8.5.10` / `^10.5.0`             |
| Vue DevTools Plugin    | `vite-plugin-vue-devtools ^8.1.1` |

Path alias: `@` = `src/` (যেমন `@/pages/Login.vue`)

---

## GitHub থেকে Download ও Run করা

### Step 1: Repository clone করো

```bash
git clone https://github.com/hassanroki/task_api_frontend.git
cd task_api_frontend
```

### Step 2: Dependencies install করো

```bash
npm install
```

### Step 3: Backend চালু করো

Frontend চালানোর আগে backend চালু থাকতে হবে। Backend এর setup [এখানে](https://github.com/hassanroki/task_api_backend) দেখো। সংক্ষেপে:

```bash
cd task_api_backend
php artisan serve
```

Backend চলবে: `http://127.0.0.1:8000`

### Step 4: API URL ঠিক করো

নিচের [Backend এর সাথে Connect করা](#backend-এর-সাথে-connect-করা) section অনুযায়ী API base URL সেট করো।

### Step 5: Development server চালু করো

```bash
npm run dev
```

Browser এ খোলো: `http://localhost:5173`

---

## Backend এর সাথে Connect করা

Axios instance এ backend এর base URL দিতে হবে (যেমন `src/api/axios.js` বা যেখানে তোমার axios setup আছে):

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// প্রতিটি request এ token যোগ করা
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### (Optional) `.env` দিয়ে URL রাখা

Project root এ `.env` file বানাও:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Axios এ ব্যবহার:

```js
baseURL: import.meta.env.VITE_API_BASE_URL,
```

> Vite এ `.env` এর variable অবশ্যই `VITE_` দিয়ে শুরু হতে হবে। `.env` পরিবর্তন করলে `npm run dev` আবার চালাতে হবে।

### Backend এ CORS

Frontend `http://localhost:5173` এ চলে, তাই backend এর `config/cors.php` তে এটি allow করতে হবে:

```php
'allowed_origins' => ['http://localhost:5173'],
```

তারপর backend এ:

```bash
php artisan config:clear
```

---

## Pages ও Routes

| Route              | Page              | Access         |
| ------------------ | ----------------- | -------------- |
| `/`                | Landing           | Public         |
| `/features`        | Features          | Public         |
| `/pricing`         | Pricing           | Public         |
| `/contact`         | Contact           | Public         |
| `/tasks`           | Tasks (task list) | Public         |
| `/task-detail/:id` | TaskDetail        | Public         |
| `/login`           | Login             | Guest only     |
| `/register`        | Register          | Guest only     |
| `/dashboard`       | Dashboard         | Login required |
| `/logout`          | Logout            | Public         |
| অন্য যেকোনো URL    | `/` এ redirect    | -              |

Page files থাকে `src/pages/` folder এ।

---

## Authentication কিভাবে কাজ করে

1. User **Login** করলে backend থেকে Sanctum token আসে।
2. Token `localStorage` এ `token` নামে save হয়।
3. প্রতিটি API request এ `Authorization: Bearer <token>` header যায়।
4. **Route Guard** (`src/router/index.js`) প্রতিটি navigation এ token চেক করে:
   - `meta.requiresAuth` route এ token না থাকলে → `/login`
   - `meta.guest` route এ token থাকলে → `/dashboard`
5. **Logout** এ backend এ `/logout` call হয় এবং `localStorage` থেকে token মুছে ফেলা হয়।

```js
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) return next("/login");
  if (to.meta.guest && token) return next("/dashboard");

  next();
});
```

---

## Available Scripts

| Command           | কাজ                                     |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Development server চালু (hot reload সহ) |
| `npm run build`   | Production build (`dist/` folder এ)     |
| `npm run preview` | Production build local এ preview        |

---

## Production Build ও Deploy

```bash
npm run build
```

`dist/` folder টি যেকোনো static hosting এ (Netlify, Vercel, cPanel ইত্যাদি) upload করা যাবে।

**Deploy এর আগে:**

- API base URL production backend এর URL এ বদলাও (`VITE_API_BASE_URL`)।
- Backend এর CORS এ frontend এর production domain যোগ করো।

**SPA refresh সমস্যা:** Vue Router `createWebHistory` ব্যবহার করে, তাই `/dashboard` এ refresh দিলে 404 আসতে পারে। Hosting এ সব request `index.html` এ redirect করতে হবে।

- **Netlify:** `public/_redirects` file এ `/* /index.html 200`
- **Apache (cPanel):** `.htaccess` এ:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Common Problems

| সমস্যা                                   | সমাধান                                                                                                            |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `npm install` এ engine/Node error        | Node version `20.19+` বা `22.12+` কিনা দেখো                                                                       |
| CORS error                               | Backend এর `allowed_origins` এ `http://localhost:5173` দাও, তারপর `php artisan config:clear`                      |
| Network Error / `ERR_CONNECTION_REFUSED` | Backend চালু আছে কিনা (`php artisan serve`) এবং base URL ঠিক আছে কিনা দেখো                                        |
| `401 Unauthenticated`                    | Login করে token save হয়েছে কিনা দেখো (Browser DevTools → Application → Local Storage)                            |
| Login করার পরেও `/login` এ ফিরে যাচ্ছে   | Token `localStorage` এ `token` নামেই save হচ্ছে কিনা দেখো                                                         |
| Tailwind class কাজ করছে না               | CSS entry file এ `@import "tailwindcss";` আছে কিনা এবং `postcss.config.js` এ `@tailwindcss/postcss` আছে কিনা দেখো |
| `.env` এর পরিবর্তন কাজ করছে না           | Dev server বন্ধ করে আবার `npm run dev` চালাও                                                                      |
| Production এ refresh দিলে 404            | [Deploy](#production-build-ও-deploy) section এর SPA redirect যোগ করো                                              |

---

## Related

- Backend repo: [task_api_backend](https://github.com/hassanroki/task_api_backend)

## Author

**Hassan** — [GitHub](https://github.com/hassanroki)

## License

MIT
