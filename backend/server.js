/**
 * Backend Server for NichePilot
 * Provides API endpoints for growth plan data and comment suggestions
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Load niches data
const loadNichesData = () => {
  try {
    const dataPath = path.join(__dirname, 'data', 'niches.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading niches data:', error);
    return {};
  }
};

/**
 * POST /init-plan
 * Returns accounts and tweets for a given handle and niche
 */
app.post('/init-plan', (req, res) => {
  try {
    const { handle, niche } = req.body;

    if (!handle || !niche) {
      return res.status(400).json({ error: 'Handle and niche are required' });
    }

    const nichesData = loadNichesData();
    const nicheData = nichesData[niche.toLowerCase()];

    if (!nicheData) {
      return res.status(404).json({ error: `Niche "${niche}" not found` });
    }

    // Return accounts and tweets (limit to 20 accounts and 10 tweets)
    const accounts = (nicheData.accounts || []).slice(0, 20);
    const tweets = (nicheData.tweets || []).slice(0, 10);

    res.json({
      accounts,
      tweets,
    });
  } catch (error) {
    console.error('Error in /init-plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /suggest-comments
 * Returns GPT-generated comment suggestions for a tweet
 */
app.post('/suggest-comments', async (req, res) => {
  try {
    const { tweetText, niche } = req.body;

    if (!tweetText || !niche) {
      return res.status(400).json({ error: 'Tweet text and niche are required' });
    }

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Return mock suggestions if no API key
      console.warn('OPENAI_API_KEY not set, returning mock suggestions');
      return res.json({
        suggestions: [
          'Interesting perspective. How do you see this evolving in the next 6 months?',
          'This resonates. The key challenge I see is execution at scale.',
          'What metrics are you tracking to validate this approach?',
        ],
      });
    }

    // Call OpenAI API
    const prompt = `You are generating smart, high-signal comment suggestions for X (Twitter) users.

Rules:
- Be concise
- Be insightful, not generic
- No emojis
- No flattery
- Show founder/operator/product thinking
- Avoid cringe
- Avoid hype language
- 3 variations:
  1) Smart insight
  2) Short analytical take
  3) Founder POV question

Tweet:
${tweetText}

Niche:
${niche}

Return only a JSON array of strings.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates thoughtful Twitter comment suggestions. Always return valid JSON arrays.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error('Failed to get suggestions from OpenAI');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '[]';
    
    // Parse JSON from response
    let suggestions;
    try {
      suggestions = JSON.parse(content);
    } catch (e) {
      // If parsing fails, try to extract array from text
      const arrayMatch = content.match(/\[.*\]/s);
      if (arrayMatch) {
        suggestions = JSON.parse(arrayMatch[0]);
      } else {
        // Fallback to mock suggestions
        suggestions = [
          'Interesting perspective. How do you see this evolving?',
          'This resonates. The key challenge is execution at scale.',
          'What metrics are you tracking to validate this?',
        ];
      }
    }

    // Ensure we have exactly 3 suggestions
    if (!Array.isArray(suggestions) || suggestions.length === 0) {
      suggestions = [
        'Interesting perspective. How do you see this evolving?',
        'This resonates. The key challenge is execution at scale.',
        'What metrics are you tracking to validate this?',
      ];
    }

    res.json({
      suggestions: suggestions.slice(0, 3),
    });
  } catch (error) {
    console.error('Error in /suggest-comments:', error);
    // Return fallback suggestions on error
    res.json({
      suggestions: [
        'Interesting perspective. How do you see this evolving?',
        'This resonates. The key challenge is execution at scale.',
        'What metrics are you tracking to validate this?',
      ],
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`NichePilot backend server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

