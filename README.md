# NichePilot

A Chrome Extension that helps you grow your X (Twitter) account in your chosen niche. NichePilot provides personalized account recommendations, tweet suggestions, and GPT-powered comment ideas—all without requiring login or automation.

## Features

- **Niche Selection**: Choose from 7 pre-configured niches (b2b ai, indie saas, product, design, startup founders, growth, femtech)
- **Account Recommendations**: Get 20 curated accounts to follow in your niche
- **Tweet Suggestions**: Discover 10 relevant tweets to engage with
- **AI Comment Suggestions**: Get GPT-generated comment ideas for tweets
- **Daily Growth Tasks**: Track your daily growth ritual (follow 5, comment 5, post 1)
- **No Login Required**: Works entirely with manual handle input
- **No Automation**: All actions are manual—the extension only suggests

## Architecture

### Chrome Extension (Manifest v3)
- `manifest.json`: Extension configuration
- `background.js`: Service worker for message handling
- `contentScript.js`: Injects sidebar into x.com pages
- `sidebar/`: React application built with Vite

### Backend Server
- Node.js/Express server with two endpoints:
  - `POST /init-plan`: Returns accounts and tweets for a niche
  - `POST /suggest-comments`: Returns GPT-generated comment suggestions

## Setup Instructions

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables (Optional)

Create a `.env` file in the `backend` directory:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and add your OpenAI API key (optional—if not set, mock suggestions will be used):

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

### 3. Start Backend Server

```bash
cd backend
npm start
```

The server will run on `http://localhost:3000`

### 4. Build React Sidebar

```bash
cd extension/sidebar
npm install
npm run build
```

This will create a `sidebar-dist` folder in the `extension` directory.

### 5. Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `extension` folder from this project
5. The extension should now be loaded

### 6. Use the Extension

1. Navigate to `https://x.com` (or `https://twitter.com`)
2. You should see the NichePilot sidebar on the right side
3. Enter your handle (e.g., `@yourhandle`)
4. Select a niche from the dropdown
5. Click "Generate Growth Plan"
6. Explore accounts, tweets, and comment suggestions!

## Project Structure

```
nichepilot/
├── extension/
│   ├── manifest.json
│   ├── background.js
│   ├── contentScript.js
│   ├── popup.html
│   ├── sidebar/
│   │   ├── src/
│   │   │   ├── App.jsx
│   │   │   ├── main.jsx
│   │   │   ├── App.css
│   │   │   ├── styles.css
│   │   │   └── components/
│   │   │       ├── SetupSection.jsx
│   │   │       ├── AccountsSection.jsx
│   │   │       ├── TweetsSection.jsx
│   │   │       └── DailyTasksSection.jsx
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.js
│   └── sidebar-dist/          # Generated after build
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── data/
│       └── niches.json
└── README.md
```

## Development

### Backend Development

```bash
cd backend
npm run dev  # Uses node --watch for auto-reload
```

### Sidebar Development

```bash
cd extension/sidebar
npm run dev  # Starts Vite dev server (for testing outside extension)
npm run build  # Builds for production
```

### Rebuilding After Changes

After making changes to the sidebar:
1. Run `npm run build` in `extension/sidebar`
2. Reload the extension in Chrome (`chrome://extensions/` → click reload)

## API Endpoints

### POST /init-plan

Returns accounts and tweets for a given handle and niche.

**Request:**
```json
{
  "handle": "@yourhandle",
  "niche": "b2b ai"
}
```

**Response:**
```json
{
  "accounts": [
    {
      "handle": "@user1",
      "bio": "User bio..."
    }
  ],
  "tweets": [
    {
      "url": "https://x.com/user/status/123",
      "text": "Tweet text..."
    }
  ]
}
```

### POST /suggest-comments

Returns GPT-generated comment suggestions for a tweet.

**Request:**
```json
{
  "tweetText": "Tweet text here...",
  "niche": "b2b ai"
}
```

**Response:**
```json
{
  "suggestions": [
    "Smart insight comment...",
    "Short analytical take...",
    "Founder POV question..."
  ]
}
```

## Data Storage

The extension uses Chrome's `chrome.storage.local` API to store:
- User handle
- Selected niche
- Daily task completion status

All data is stored locally in the browser—no external database required.

## Notes

- The extension never posts, clicks, or automates anything on X
- All actions are manual—users must click "Open Profile" or "Open Tweet" themselves
- The sidebar is injected as an iframe to isolate it from X's page context
- Mock data is used if OpenAI API key is not configured
- The extension works on both `x.com` and `twitter.com`

## Troubleshooting

**Sidebar doesn't appear:**
- Make sure you've built the sidebar (`npm run build` in `extension/sidebar`)
- Check that `sidebar-dist` folder exists in the `extension` directory
- Reload the extension in Chrome
- Check browser console for errors

**Backend not responding:**
- Make sure the backend server is running (`npm start` in `backend`)
- Check that the server is running on `http://localhost:3000`
- Verify CORS is enabled (it should be by default)

**Comment suggestions not working:**
- If you haven't set `OPENAI_API_KEY`, mock suggestions will be used
- Check backend console for errors
- Verify the API key is correct if using OpenAI

## License

MIT

