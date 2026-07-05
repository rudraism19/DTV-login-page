import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Parse JSON bodies
app.use(express.json());

// Initialize Gemini Client lazily
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'MY_GEMINI_API_KEY') {
      throw new Error('GEMINI_API_KEY is not configured in environment variables.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 1. Secured server-side API route for Gemini Advisor
app.post('/api/gemini/advisor', async (req, res) => {
  try {
    const { prompt, studentProfile, chatHistory } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required.' });
      return;
    }

    // Attempt to initialize and get Gemini client
    let ai;
    try {
      ai = getGeminiClient();
    } catch (err: any) {
      console.warn('Gemini client initialization warning:', err.message);
      // Return a descriptive mock simulation helper if Gemini isn't configured yet
      res.json({
        text: `💡 **AI Simulation Core active:** I received your prompt: "${prompt}".\n\nTo unlock real-time Gemini LLM advice, please open the **Settings > Secrets** panel in the Google AI Studio build dashboard, and input a valid **GEMINI_API_KEY**.\n\nIn the meantime, based on your major in **${studentProfile?.fieldOfStudy || 'CS'}** and target career in **${studentProfile?.targetCareer || 'AI'}**, your skill levels are: ${studentProfile?.skills?.map((s: any) => `${s.name} (${s.level}%)`).join(', ') || 'N/A'}. Keep simulating synaptic studies to level up!`,
      });
      return;
    }

    // Dynamic System Instruction with Student Context
    const systemInstruction = `You are the Digital Twin AI Advisor, a quantum-brained study mentor for a student named ${studentProfile.fullName} majoring in ${studentProfile.fieldOfStudy} with a target career as a ${studentProfile.targetCareer}.

Their Digital Twin currently has the following parameters:
- Core Level: ${studentProfile.level}
- Completed Simulated Study: ${studentProfile.studyHours} hours
- Synaptic Skill Twin Competencies:
${studentProfile.skills.map((s: any) => `  * ${s.name}: ${s.level}% (${s.category})`).join('\n')}

Your responses should be encouraging, analytical, concise, and structured in clear Markdown format. You should:
1. Reference specific skills and values where appropriate to show you understand their profile.
2. Suggest concrete, step-by-step methods to improve their lower-rated skill attributes.
3. Be friendly and adopt the persona of an advanced, academic digital twin AI system.
`;

    // Construct chat history structured contents
    const contents = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      for (const msg of chatHistory) {
        contents.push({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.text }],
        });
      }
    }
    
    // Add the current prompt
    contents.push({
      role: 'user',
      parts: [{ text: prompt }],
    });

    // Invoke Gemini Content Generation API
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Error in /api/gemini/advisor:', error);
    res.status(500).json({ error: error.message || 'Failed to interface with Gemini Core.' });
  }
});

// 2. Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// 3. Setup Vite Middleware in Dev, Static serving in Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite developer mode middleware loaded.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static build serving from /dist.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Digital Twin Verse server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup failed:', err);
});
