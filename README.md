# BJJ Game Mapper

A web-based Brazilian Jiu-Jitsu game mind mapping application that allows users to visualize and organize their grappling game as an interactive decision tree.

![BJJ Game Mapper Screenshot](https://github.com/user-attachments/assets/b495354a-3b29-47f7-b208-87c8fda4d72a)

## Features

### 🥋 Position-Based Node System
- Create nodes representing BJJ positions (Guard, Mount, Side Control, Back Control, etc.)
- Visual node-based interface using React Flow
- Drag-and-drop functionality for positioning nodes
- Long-press canvas to create new position nodes with suggestion dropdown
- 11 default BJJ positions included to get you started

### 🔄 Position Transitions
- Connect positions with edges/arrows showing transitions
- Bidirectional connections (e.g., Guard → Mount, Mount → Guard escape)
- Visual flow showing the decision tree structure
- Add technique names to transitions
- Delete connections easily

### 🏷️ Tagging System
- Tag positions and transitions with categories:
  - **Sweep** (Blue) - techniques to reverse position
  - **Submission** (Red) - finishing techniques
  - **Pass** (Green) - guard passing techniques
  - **Escape** (Yellow) - defensive techniques
  - **Transition** (Purple) - positional changes
- Color-coded tags for easy visual identification
- Filter/search by tags

### 💾 Data Persistence
- Automatic local storage save
- JSON export/import functionality for backup and sharing
- Clear all data option

### 📱 Mobile Responsive
- Mobile-first responsive design
- Touch-friendly controls
- Works on tablets and phones

## Technology Stack

- **React 19** with **TypeScript** for type safety
- **Vite** for fast development and building
- **React Flow** for the mind map visualization
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Local Storage** for data persistence

## Installation

1. Clone the repository:
```bash
git clone https://github.com/chadtoney/bjj-game-mapper.git
cd bjj-game-mapper
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Deployment

### Deploy to Azure (Recommended)

Deploy this app to Azure Static Web Apps for **free** hosting with global CDN, automatic SSL, and CI/CD!

**Quick Start** (10 minutes):
1. Sign up for [Azure Free Account](https://azure.microsoft.com/free/)
2. Create a Static Web App in Azure Portal
3. Connect to this GitHub repository
4. Azure automatically deploys your app!

📖 **Detailed Guides**:
- [Quick Start Guide](docs/AZURE_QUICK_START.md) - Get deployed in 10 minutes
- [Full Deployment Guide](docs/AZURE_DEPLOYMENT_GUIDE.md) - Step-by-step instructions
- [Architecture Overview](docs/AZURE_ARCHITECTURE.md) - Technical architecture details
- [Cost Estimation](docs/AZURE_COST_ESTIMATION.md) - Pricing breakdown ($0/month for 5-100 users!)

**What You Get**:
- ✅ Free hosting for 5-100+ users
- ✅ Global CDN with SSL certificate
- ✅ Auto-deploy on git push
- ✅ Staging environments for PRs
- ✅ Custom domain support

**Cost**: $0/month on Free Tier (perfect for beta testing)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:
```bash
npm run preview
```

## How to Use

### Creating Positions
1. **Long-press** (press and hold) anywhere on the canvas to add a new position
2. Enter a name or pick from the suggestion dropdown of common BJJ positions
3. The position will appear as a node on the canvas

### Editing Positions
1. **Click** on a position node to select it
2. The sidebar will show the position editor
3. Edit the position name, description, and notes
4. Add tags to categorize the position
5. Click "Save Changes" to update

### Creating Transitions
1. **Drag** from the bottom handle of a source position
2. **Drop** on the top handle of a target position
3. A connection will be created between the positions

### Editing Transitions
1. **Click** on a transition edge to select it
2. The sidebar will show the transition editor
3. Add a technique name (e.g., "Hip Escape", "Scissor Sweep")
4. Add tags to categorize the transition
5. Add notes for additional details
6. Click "Save Changes" to update

### Filtering by Tags
1. Click on tag buttons in the "Filter by Tags" section
2. Positions and transitions with selected tags will be highlighted
3. Click "Clear" to remove all filters

### Managing Your Game Map
- **Export**: Click the "📥 Export" button to download your game map as a JSON file
- **Import**: Click the "📤 Import" button to load a previously exported game map
- **Clear All**: Click the "🗑️ Clear All" button to reset and start fresh

### Canvas Controls
- **Zoom In/Out**: Use the +/- buttons or mouse wheel
- **Fit View**: Click the fit view button to center all positions
- **Pan**: Click and drag the canvas background
- **Mini-map**: Use the mini-map in the bottom-right for navigation

## Default Positions

The application comes with 11 common BJJ positions:
- Standing
- Closed Guard
- Open Guard
- Half Guard
- Side Control (Top)
- Side Control (Bottom)
- Mount (Top)
- Mount (Bottom)
- Back Control
- Knee on Belly
- Turtle

You can customize these positions or delete them and create your own game map from scratch.

## Development

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run build
```

## Project Structure

```
bjj-game-mapper/
├── src/
│   ├── components/
│   │   ├── MindMap/
│   │   │   ├── MindMap.tsx          # Main canvas component
│   │   │   ├── PositionNode.tsx     # Custom node component
│   │   │   └── TransitionEdge.tsx   # Custom edge component
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx          # Sidebar container
│   │   │   ├── PositionList.tsx     # Position list
│   │   │   ├── TagFilter.tsx        # Tag filter
│   │   │   ├── NodeEditor.tsx       # Position editor
│   │   │   └── EdgeEditor.tsx       # Transition editor
│   │   └── Controls/
│   │       └── ExportImport.tsx     # Export/Import controls
│   ├── store/
│   │   └── useGameStore.ts          # Zustand store
│   ├── types/
│   │   └── index.ts                 # TypeScript types
│   ├── utils/
│   │   ├── storage.ts               # Local storage helpers
│   │   └── defaultPositions.ts      # Starter positions
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Future Enhancements

Potential features for future versions:
- User authentication
- Cloud sync
- Sharing game maps with others
- Video/image attachments to techniques
- React Native mobile app
- Success rate tracking
- Training log integration

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Built with [React Flow](https://reactflow.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- State management with [Zustand](https://github.com/pmndrs/zustand)
