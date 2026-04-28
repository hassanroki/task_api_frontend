# Logout - Quick Reference

## 🔗 Logout Flow

### Direct Path (Current Implementation)
```
Dashboard → Click "Logout" button → /logout page → Clear session → Show confirmation → Redirect
```

---

## 📂 Files

| File | Purpose | Lines |
|------|---------|-------|
| `Logout.vue` | Logout page component | 60 |
| `LogoutConfirmation.vue` | Confirmation modal (optional) | 70 |
| `logoutHelper.js` | Utilities for logout | 60 |
| `DashboardHeader.vue` | Updated with logout button | +15 |
| `router/index.js` | Added logout route | +5 |

---

## 🚀 Quick Start

### Click Logout Button
1. Go to Dashboard
2. Click red "Logout" button (top right)
3. Session cleared automatically
4. See logout confirmation page
5. Click "Sign In Again" to login

### Programmatic Usage
```javascript
import { performLogout } from '@/utils/logoutHelper'

await performLogout(router)
```

---

## 🛠️ Available Functions

```javascript
import {
  clearSessionData,        // Clear all session storage
  performLogout,          // Full logout flow
  isUserAuthenticated,    // Check if logged in
  getCurrentUser,         // Get user data
  getAuthToken            // Get token
} from '@/utils/logoutHelper'
```

---

## ✨ Features

✅ One-click logout from dashboard
✅ Automatic session data clearing
✅ Professional logout page
✅ Optional confirmation modal
✅ Redirect to login page
✅ Mobile responsive
✅ Smooth animations

---

## 📍 Component Locations

- **Logout Button:** Dashboard header (top right)
- **Logout Page:** Navigate to `/logout`
- **Logout Functions:** Import from `logoutHelper.js`
- **Confirmation Modal:** `LogoutConfirmation.vue` (optional)

---

## 🔐 What Gets Cleared

- `localStorage.token`
- `localStorage.user`
- `sessionStorage.token`
- `sessionStorage.user`
- Plus any other auth-related data

---

## 🎯 Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/logout` | Logout.vue | Display logout confirmation |

---

## 💡 Use Cases

**Use Direct Logout:**
- User clicks logout button
- Auto-logout on session timeout
- Manual logout from any page

**Use Confirmation Modal:**
- Add to any component
- Ask for confirmation before logout
- Better UX for important action

---

## 📝 Example: Add Logout to Any Page

```vue
<script setup>
import { performLogout } from '@/utils/logoutHelper'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <button @click="performLogout(router)">Logout</button>
</template>
```

---

## ✅ Status

✅ Logout page created
✅ Dashboard logout button added
✅ Session clearing implemented
✅ Router configured
✅ Utilities created
✅ Modal available (optional)
✅ Documentation complete

Ready to use! 🎉

