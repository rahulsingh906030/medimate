# User Registration Persistence Fix - JSON File Storage

## Status: 🚀 In Progress

### Step 1: ✅ Create app/api/auth/users.json
- Initial mock users array (2 users matching current).
- Ensures base data exists.

### Step 2: ✅ Update app/api/auth/users.ts
- Add fs helpers: readUsers(), writeUsers(users), getNextId().
- Remove static export, add type.
- Use relative path to users.json.

### Step 3: ✅ Refactor app/api/register/route.ts
- Remove globalThis + init logic.
- Use auth helpers: read → validate → append → write.
- ID from getNextId().
- fs.readFileSync/writeFileSync for sync ops.

### Step 4: [PENDING] Update app/api/login/route.ts
- Remove globalThis.
- Use readUsers() to find user.

### Step 5: [PENDING] Test
- npm run dev
- Register new user.
- Ctrl+C restart server.
- Login with new user → verify works.
- Check dashboard shows correct user.

**Next Action:** Implement Step 1.

**Commands to verify:**
```bash
npm run dev
# Test register/login before/after each step
```

