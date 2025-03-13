# mentora: AI-Powered Study Assistant 

## Table of Contents
- [Overview](#overview)
- [Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Integration](#api-integration)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)
- [License](#license)

## Demo



https://github.com/user-attachments/assets/1ea26947-1dca-408d-9741-b24c3429944a



## Overview

mentora is an intelligent study companion that leverages AI to transform the learning experience. It combines personalized study planning, resource curation, and interactive assistance to help students achieve their academic goals efficiently.

## Key Features

### 1. AI-Powered Study Planning 📚
- **Dynamic Plan Generation**
  - Subject-based customization
  - Exam date optimization
  - Weekly learning milestones
  - Daily task breakdown
- **Progress Tracking**
  - Visual progress indicators
  - Completion status
  - Adjustable schedules
  - Performance analytics

### 2. Smart Resource Curation 🔍
- **AI-Driven Content Discovery**
  - Tavily API integration for relevant search
  - Quality scoring algorithm
  - Content type diversity
- **Resource Types Support**
  - Video tutorials
  - Online courses
  - Documentation
  - Practice exercises
  - Academic papers
- **Smart Filtering**
  - Difficulty level categorization
  - Format-based organization
  - Topic relevance ranking

### 3. Interactive PDF Chat Assistant 📄
- **Document Analysis**
  - Upload and process PDF documents
  - AI-powered document comprehension
  - Contextual question answering
- **Smart Features**
  - Source page references
  - Relevant excerpt highlighting
  - Chat history persistence
  - Context-aware responses
- **PDF Viewer Integration**
  - Page navigation and tracking
  - Zoom and rotation controls
  - Fullscreen mode
  - Synchronized chat and document view

### 4. User Experience 🎯
- **Modern Interface**
  - Clean, responsive design
  - Toast notifications
  - Loading states
- **Navigation Features**
  - Pagination system

## Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS for utility-first styling
  - Shadcn UI for component library
- **State Management**: 
  - Zustand for global state
  - React Query for server state
- **Authentication**: NextAuth.js with JWT
- **PDF Processing**:
  - React-PDF for document viewing
  - PDF.js for text extraction
  - Custom chat interface

### Backend
- **Runtime**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **AI Services**:
  - Groq API for study plan generation and PDF analysis
  - HuggingFace for document embeddings
  - Tavily API for resource curation
- **Security**: 
  - JWT authentication
  - Rate limiting
  - Input validation

## Installation

1. Clone the repository:
```bash
git clone https://github.com/KartikLabhshetwar/mentora
cd mentora
```

2. Install dependencies for both frontend and backend:
```bash
npm install

cd server
npm install
```

3. Set up environment variables:

Create `.env.local` file with the following variables:

```env
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Database
MONGODB_URI=your-mongodb-uri

# AI Services
GROQ_API_KEY=your-groq-api-key
TAVILY_API_KEY=your-tavily-api-key
HUGGINGFACE_API_KEY=your-huggingface-api-key
```

Create `.env` file in server directory:

```env
PORT=5000
MONGODB_URI=your-mongodb-uri
GROQ_API_KEY=your-groq-api-key
TAVILY_API_KEY=your-tavily-api-key
HUGGINGFACE_API_KEY=your-huggingface-api-key
JWT_SECRET=your-jwt-secret
```

4. Start the development servers:

Frontend:
```bash
npm run dev
```

Backend:
```bash
cd server
npm run dev
```

## API Integration

### Groq API
Used for:
- Study plan generation
- Resource description enhancement
- Learning path recommendations

### Tavily API
Used for:
- Educational resource curation
- Content relevance scoring
- Resource metadata extraction

## Usage Guide

### Study Plan Generation
1. Navigate to the study plan section
2. Enter your subject and exam date
3. Click "Generate Plan"
4. View and customize your personalized study schedule

### Pomodoro Timer
1. A 25 minute timer work/break duration
2. Start your study session
3. Follow the timer prompts for breaks
4. View your session history and statistics
5. Adjust intervals based on productivity patterns

### Notes Management
1. Create new notes with rich text formatting
2. Organize notes by subjects/topics
3. Use the search function to find specific content
4. Export notes in various formats
5. Access your notes across devices

### PDF Chat Assistant
1. Upload your PDF document
2. Ask questions about the content
3. View source pages and relevant excerpts
4. Navigate through the document while chatting
5. Access chat history for previous conversations

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with 💡 by Kartik Labhshetwar
