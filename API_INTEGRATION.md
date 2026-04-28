# Task Dashboard - API Integration Guide

## Overview
The dashboard is now fully integrated with your Laravel API using `Route::apiResource('tasks', TaskController::class)`.

## Environment Setup

### 1. Create `.env.local` file (already created)
```
VITE_API_URL=https://task-backend.larasoftbd.com
```

## Database Schema Mapping

Your Laravel task table structure maps to Vue components as follows:

| Laravel Column | Vue Field | Type | Notes |
|---|---|---|---|
| `id` | `task.id` | integer | Unique identifier |
| `user_id` | (not displayed) | integer | Linked to authenticated user |
| `title` | `task.title` | string | Task name |
| `description` | `task.description` | text | Optional task details |
| `status` | `task.status` | enum | `pending`, `inprogress`, `done` |
| `task_type` | `task.task_type` | enum | `published` (public), `secret` (private) |
| `created_at` | `task.created_at` | timestamp | Creation date |
| `updated_at` | - | timestamp | Last modified date |

## Key Changes Made

### 1. Updated `useTasks` Composable
- **Added**: `fetchTasks()` - Fetches all tasks from `/api/tasks`
- **Added**: `loading` and `error` state tracking
- **Updated**: `addTask()`, `updateTask()`, `deleteTask()`, `toggleComplete()` - Now make API requests
- **Updated**: Computed properties to use `status` field instead of `completed`
  - `completedTasks` - filters where `status === 'done'`
  - `highPriorityTasks` - filters where `task_type === 'published'`

### 2. Updated Dashboard Component
- **Added**: `onMounted()` hook to fetch tasks on page load
- **Added**: Loading skeleton UI while fetching
- **Added**: Error message display
- **Removed**: Static task data

### 3. Updated TaskItem Component
- **Changed**: `task.completed` → `task.status`
- **Changed**: `priority` field removed (status-based colors now)
- **Changed**: `dueDate` → `created_at`
- **Added**: Task status badge showing `Pending`, `In Progress`, or `Done`
- **Added**: Task type badge showing `Secret` or `Published`
- **Added**: Helper functions:
  - `getStatusColor()` - Color for task status
  - `getTypeColor()` - Color for task type
  - `formatStatus()` - Readable status text
  - `formatTaskType()` - Readable type text
  - `formatDate()` - Date formatting

### 4. Updated TaskForm Component
- **Removed**: `dueDate`, `priority`, `category` fields
- **Added**: `status` select (Pending, In Progress, Done)
- **Added**: `task_type` select (Secret/Private, Published/Public)
- **Simplified**: Form now only has `title`, `description`, `status`, `task_type`

## API Endpoints Used

```
GET    /api/tasks              - Fetch all tasks
POST   /api/tasks              - Create new task
PUT    /api/tasks/{id}         - Update task
DELETE /api/tasks/{id}         - Delete task
```

## Authentication

The composable looks for an authentication token in `localStorage.authToken`. Make sure to set this after login:

```javascript
// After successful login, store the token:
localStorage.setItem('authToken', response.data.token)
```

## Request/Response Format

### Create/Update Request
```json
{
  "title": "Task Title",
  "description": "Task description",
  "status": "pending",
  "task_type": "secret"
}
```

### Success Response
```json
{
  "data": {
    "id": 1,
    "user_id": 1,
    "title": "Task Title",
    "description": "Task description",
    "status": "pending",
    "task_type": "secret",
    "created_at": "2026-04-28T10:00:00Z",
    "updated_at": "2026-04-28T10:00:00Z"
  }
}
```

## Starting the Dashboard

1. **Start Laravel Backend**
   ```bash
   php artisan serve
   ```

2. **Start Vue Frontend**
   ```bash
   npm run dev
   ```

3. **Access Dashboard**
   - Dashboard will auto-fetch tasks from the API on load
   - Tasks will be displayed with their status and type

## Troubleshooting

### Tasks not loading?
- Check if Laravel API is running on `https://task-backend.larasoftbd.com/`
- Check browser console for API errors
- Verify authentication token is stored in localStorage

### CORS errors?
- Add CORS middleware to Laravel:
  ```php
  // In config/cors.php
  'allowed_origins' => ['http://localhost:5173', 'http://localhost:5174'],
  ```

### Status/Type not showing?
- Verify API returns `status` and `task_type` fields
- Check that values are from the enum: `pending`, `inprogress`, `done`, `published`, `secret`

## File Changes Summary

- ✅ `src/composables/useTasks.js` - API integration
- ✅ `src/pages/Dashboard.vue` - Data fetching
- ✅ `src/components/Dashboard/TaskForm.vue` - New schema fields
- ✅ `src/components/Dashboard/TaskItem.vue` - Status/type display
- ✅ `.env.local` - API URL configuration
