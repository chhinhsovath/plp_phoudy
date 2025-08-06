import { IntentType, INTENT_TYPES } from '../config/gemini.constants';

interface IntentPattern {
  keywords: string[];
  weight: number;
  intent: IntentType;
}

export class IntentDetector {
  private static readonly patterns: IntentPattern[] = [
    // Student analysis patterns
    {
      keywords: [
        'សិស្សឈ្មោះ',
        'មានមុខវិជ្ជាអ្វីខ្លាំង',
        'អ្វីខ្សោយ',
        'ពូកែមុខវិជ្ជាអ្វី',
        'វិភាគសិស្ស',
        'សិស្សណា',
        'រៀនខ្សោយ',
        'រៀនលអ',
        'សិស្ស',
        'មានចំណុចខ្លាំង',
        'ចំណុចខ្សោយ',
        'តើសិស្ស',
        'ពូកែលើមុខវិជ្ជាអ្វី',
        'ពូកែលើ',
        'មុខវិជ្ជាអ្វី',
        'ខ្សោយលើមុខវិជ្ជាអ្វី',
        'ខ្សោយលើ',
        'តើ.*ពូកែលើ',
        'តើ.*ខ្សោយលើ',
        'student',
        'performance',
        'analysis',
        'which student',
        'strengths',
        'weaknesses',
      ],
      weight: 10,
      intent: INTENT_TYPES.STUDENT_ANALYSIS,
    },

    // Class summary patterns
    {
      keywords: [
        'របាយការណ៍',
        'សង្ខេប',
        'ទិន្នន័យ',
        'ថ្ងៃនេះ',
        'ខែនេះ',
        'ឆ្នាំនេះ',
        'ថ្នាក់',
        'report',
        'summary',
        'class',
        'today',
        'this month',
        'data',
      ],
      weight: 8,
      intent: INTENT_TYPES.CLASS_SUMMARY,
    },

    // Math performance patterns
    {
      keywords: [
        'គណិត',
        'គណិតវិទ្យា',
        'បូក',
        'ដក',
        'គុណ',
        'ចែក',
        'លេខ',
        'រៀនគណិត',
        'រៀនគណិតពូកែ',
        'គណិតពូកែ',
        'រៀនគណិតខ្សោយ',
        'គណិតខ្សោយ',
        'math',
        'mathematics',
        'arithmetic',
        'numbers',
      ],
      weight: 9,
      intent: INTENT_TYPES.MATH_PERFORMANCE,
    },

    // Khmer language patterns
    {
      keywords: ['ភាសាខ្មែរ', 'ខ្មែរ', 'អក្សរ', 'អាន', 'សរសេរ'],
      weight: 9,
      intent: INTENT_TYPES.KHMER_PERFORMANCE,
    },

    // Science patterns
    {
      keywords: [
        'វិទ្យាសាស្ត្រ',
        'វិទ្យា',
        'ធម្មជាតិ',
        'រូបវិទ្យា',
        'គីមីវិទ្យា',
      ],
      weight: 9,
      intent: INTENT_TYPES.SCIENCE_PERFORMANCE,
    },

    // Exercise analysis patterns
    {
      keywords: ['លំហាត់', 'ខុសច្រើន', 'ត្រូវច្រើន', 'ធ្វើលំហាត់', 'សំណួរ'],
      weight: 8,
      intent: INTENT_TYPES.EXERCISE_ANALYSIS,
    },

    // Teaching materials patterns
    {
      keywords: ['សម្ភារៈ', 'បង្រៀន', 'សកម្មភាព', 'មេរៀន', 'ឧបករណ៍'],
      weight: 7,
      intent: INTENT_TYPES.TEACHING_MATERIALS,
    },

    // Assessment patterns
    {
      keywords: ['វាយតម្លៃ', 'តេស្ត', 'ប្រឡង', 'ពិន្ទុ', 'ការធ្វើតេស្ត'],
      weight: 8,
      intent: INTENT_TYPES.ASSESSMENT,
    },

    // Ranking patterns
    {
      keywords: [
        'ពូកែបំផុត',
        'ខ្សោយបំផុត',
        'ប្រសើរជាងគេ',
        'ចំណាត់ថ្នាក់',
        'លំដាប់',
        'ខ្សោយជាងគេ',
        'រៀនខ្សោយ',
        'សិស្សណា',
        'អ្នកណា',
        'ខ្សោយ',
        'ពូកែ',
        'ពូកែជាងគេ',
        'តើសិស្សណា',
        'រៀនគណិតពូកែ',
        'រៀនគណិត',
        'រៀនគណិតខ្សោយ',
        'គណិតខ្សោយ',
        'ខ្សោយជាងគេ',
        'weakest',
        'strongest',
        'best',
        'worst',
        'ranking',
        'top',
        'bottom',
        'lowest',
        'highest',
      ],
      weight: 9,
      intent: INTENT_TYPES.STUDENT_RANKING,
    },

    // Subject activity patterns
    {
      keywords: ['មុខវិជ្ជាណា', 'ធ្វើច្រើន', 'ធ្វើតិច', 'សកម្ម', 'ចូលរួម'],
      weight: 7,
      intent: INTENT_TYPES.SUBJECT_ACTIVITY,
    },
  ];

  static detectIntent(message: string): IntentType {
    if (!message || typeof message !== 'string') {
      return INTENT_TYPES.GENERAL;
    }

    const lowerMessage = message.toLowerCase().trim();
    const scores = new Map<IntentType, number>();

    // Initialize scores
    for (const pattern of this.patterns) {
      scores.set(pattern.intent, 0);
    }

    // Calculate scores for each intent
    for (const pattern of this.patterns) {
      let matchCount = 0;

      for (const keyword of pattern.keywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
          matchCount++;
        }
      }

      if (matchCount > 0) {
        const score = (matchCount / pattern.keywords.length) * pattern.weight;
        scores.set(pattern.intent, (scores.get(pattern.intent) || 0) + score);
      }
    }

    // Find the highest scoring intent
    let maxScore = 0;
    let detectedIntent: IntentType = INTENT_TYPES.GENERAL;

    for (const [intent, score] of scores.entries()) {
      if (score > maxScore) {
        maxScore = score;
        detectedIntent = intent;
      }
      // Debug logging for specific question training
      if (lowerMessage.includes('សិស្សណារៀនគណិត')) {
        console.log(
          `Intent: ${intent}, Score: ${score}, Keywords matched for math ranking question`,
        );
      }
      if (lowerMessage.includes('ពូកែលើមុខវិជ្ជា')) {
        console.log(
          `Intent: ${intent}, Score: ${score}, Keywords matched for student subject strength question`,
        );
      }
      if (lowerMessage.includes('ខ្សោយលើមុខវិជ្ជា')) {
        console.log(
          `Intent: ${intent}, Score: ${score}, Keywords matched for student subject weakness question`,
        );
      }
    }

    // Return general if score is too low (less confident)
    if (maxScore < 1) {
      return INTENT_TYPES.GENERAL;
    }

    return detectedIntent;
  }

  /**
   * Get confidence score for detected intent
   */
  static getConfidenceScore(message: string, intent: IntentType): number {
    if (!message || intent === INTENT_TYPES.GENERAL) {
      return 0;
    }

    const pattern = this.patterns.find((p) => p.intent === intent);
    if (!pattern) {
      return 0;
    }

    const lowerMessage = message.toLowerCase();
    let matchCount = 0;

    for (const keyword of pattern.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        matchCount++;
      }
    }

    return (matchCount / pattern.keywords.length) * 100;
  }

  /**
   * Get alternative intents that might match
   */
  static getAlternativeIntents(
    message: string,
    limit: number = 3,
  ): Array<{ intent: IntentType; score: number }> {
    const lowerMessage = message.toLowerCase();
    const alternatives: Array<{ intent: IntentType; score: number }> = [];

    for (const pattern of this.patterns) {
      let matchCount = 0;

      for (const keyword of pattern.keywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
          matchCount++;
        }
      }

      if (matchCount > 0) {
        const score = (matchCount / pattern.keywords.length) * pattern.weight;
        alternatives.push({ intent: pattern.intent, score });
      }
    }

    return alternatives.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  /**
   * Check if message requires real data based on intent
   */
  static requiresRealData(intent: IntentType): boolean {
    const dataRequiredIntents: IntentType[] = [
      INTENT_TYPES.STUDENT_ANALYSIS,
      INTENT_TYPES.CLASS_SUMMARY,
      INTENT_TYPES.MATH_PERFORMANCE,
      INTENT_TYPES.KHMER_PERFORMANCE,
      INTENT_TYPES.SCIENCE_PERFORMANCE,
      INTENT_TYPES.EXERCISE_ANALYSIS,
      INTENT_TYPES.STUDENT_RANKING,
      INTENT_TYPES.SUBJECT_ACTIVITY,
    ];

    return dataRequiredIntents.includes(intent);
  }
}
