# MediMate - AI Health Assistant

## Features
- AI symptom checker with disease prediction
- **Location-aware doctor & hospital search** (GPS or IP fallback, Google Places ready)
- Book appointments
- Dashboard with health history
- Voice input for symptoms
- Responsive design with Tailwind CSS

## Location-Based Recommendations ✅
The app now detects your **real-time location** worldwide:
1. **Primary**: Browser GPS (high accuracy)
2. **Fallback**: IP geolocation (ipapi.co - free)
3. **Backend API**: Auto-detects IP if no GPS
4. **Real data**: Google Places API (add key for live nearby doctors/hospitals)

No more Noida hardcode - works anywhere!

## Setup
```bash
npm install
npm run dev
```

### Google API Keys (Recommended for real data)
1. Get **Google Places API key**: [Google Cloud Console](https://console.cloud.google.com/)
2. Enable **Places API**
3. Add to `.env.local`:
```
GOOGLE_PLACES_API_KEY=your_server_key_here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_embed_key_here  # Optional for dynamic maps
```

### Test Location Feature
1. Visit `/find-doctors`
2. Allow/deny GPS → See IP fallback + readable address (e.g., "Mumbai, Maharashtra, India, delhi, noida, greater noida, bihar")
3. Change specialty → Auto-search nearby
4. Symptom checker → Click doctor link → Location preserved

## Tech Stack
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React icons

## Pages
- `/` - Home
- `/login` - Login
- `/register` - Register
- `/dashboard` - Health history
- `/find-doctors` - **Nearby doctors (GPS/IP)**
- Symptom checker integrated everywhere

Run `npm run dev` and test `/find-doctors`!

