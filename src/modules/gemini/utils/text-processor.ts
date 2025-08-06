import { GEMINI_CONFIG } from '../config/gemini.constants';

export class TextProcessor {
  /**
   * Replace Vietnamese words with Khmer equivalents
   */
  static replaceVietnameseWords(text: string): string {
    if (!text || typeof text !== 'string') {
      return '';
    }

    let processedText = text;

    for (const [vietnamese, khmer] of Object.entries(
      GEMINI_CONFIG.VIETNAMESE_REPLACEMENTS,
    )) {
      processedText = processedText.replace(
        new RegExp(vietnamese, 'gi'),
        khmer,
      );
    }

    return processedText;
  }

  /**
   * Optimize prompt length by removing excessive whitespace and redundant content
   */
  static optimizePrompt(prompt: string): string {
    if (!prompt || typeof prompt !== 'string') {
      return '';
    }

    return (
      prompt
        // Remove multiple consecutive newlines (keep max 2)
        .replace(/\n{3,}/g, '\n\n')
        // Remove multiple consecutive spaces
        .replace(/ {2,}/g, ' ')
        // Remove trailing whitespace from lines
        .replace(/[ \t]+$/gm, '')
        // Remove leading/trailing whitespace
        .trim()
    );
  }

  /**
   * Compress repetitive instructions to reduce token usage
   */
  static compressInstructions(instructions: string): string {
    if (!instructions) return '';

    // Common patterns that can be compressed
    const compressionRules = [
      // Replace repeated "សូម" patterns
      {
        pattern: /សូម([^។]+)។\s*សូម([^។]+)។/g,
        replacement: 'សូម$1 និង$2។',
      },
      // Compress enumerated lists
      {
        pattern: /(\d+)\.\s+([^។\n]+)។\s*(\d+)\.\s+([^។\n]+)។/g,
        replacement: '$1. $2; $3. $4។',
      },
      // Remove redundant phrases
      {
        pattern: /ជាភាសាខ្មែរ[។\s]*ជាភាសាខ្មែរ/g,
        replacement: 'ជាភាសាខ្មែរ',
      },
    ];

    let compressed = instructions;
    for (const rule of compressionRules) {
      compressed = compressed.replace(rule.pattern, rule.replacement);
    }

    return this.optimizePrompt(compressed);
  }

  /**
   * Truncate text to fit within token limits while preserving meaning
   */
  static truncateForTokenLimit(text: string, maxLength: number = 8000): string {
    if (!text || text.length <= maxLength) {
      return text;
    }

    // Try to find a good breaking point (sentence end)
    const truncated = text.substring(0, maxLength);
    const lastPeriod = truncated.lastIndexOf('។');
    const lastNewline = truncated.lastIndexOf('\n');

    // Use the better breaking point
    const breakPoint = Math.max(lastPeriod, lastNewline);

    if (breakPoint > maxLength * 0.8) {
      // If we can keep at least 80% of content
      return truncated.substring(0, breakPoint + 1);
    }

    return truncated + '...';
  }

  /**
   * Clean and normalize text for better processing
   */
  static normalizeText(text: string): string {
    if (!text) return '';

    return (
      text
        // Normalize Unicode characters
        .normalize('NFC')
        // Remove zero-width characters
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        // Normalize quotes
        .replace(/[""]/g, '"')
        .replace(/['']/g, "'")
        // Remove excessive punctuation
        .replace(/[។]{2,}/g, '។')
        .replace(/[!]{2,}/g, '!')
        .replace(/[?]{2,}/g, '?')
        // Clean up spacing
        .trim()
    );
  }

  /**
   * Extract key information from large data objects for prompt inclusion
   */
  static extractKeyInfo(data: any): string {
    if (!data) return 'មិនមានទិន្នន័យ';

    try {
      if (Array.isArray(data)) {
        const summary = {
          totalItems: data.length,
          sampleItems: data.slice(0, 3), // Take first 3 items as sample
        };
        return JSON.stringify(summary);
      }

      if (typeof data === 'object') {
        // Extract only essential fields
        const essential: any = {};

        // Common important fields
        const importantFields = [
          'id',
          'name',
          'title',
          'score',
          'average',
          'total',
          'count',
          'classId',
          'className',
          'totalStudents',
          'gradeLevel',
          'total_average_score',
          'total_time_spent',
        ];

        for (const field of importantFields) {
          if (data[field] !== undefined) {
            essential[field] = data[field];
          }
        }

        // Add analytics if present
        if (data.analytics) {
          essential.analytics = data.analytics;
        }

        // Add sample of students if present
        if (data.students && Array.isArray(data.students)) {
          essential.studentsCount = data.students.length;
          essential.sampleStudents = data.students.slice(0, 2);
        }

        return JSON.stringify(essential);
      }

      return String(data);
    } catch (error) {
      return 'ទិន្នន័យមិនអាចដំណើរការបាន';
    }
  }

  /**
   * Validate and clean SVG content in responses
   */
  static validateSVGContent(text: string): string {
    if (!text.includes('<svg')) {
      return text;
    }

    // Remove any markdown code blocks around SVG
    return text
      .replace(/```xml\s*(<svg[\s\S]*?<\/svg>)\s*```/g, '$1')
      .replace(/```svg\s*(<svg[\s\S]*?<\/svg>)\s*```/g, '$1')
      .replace(/```\s*(<svg[\s\S]*?<\/svg>)\s*```/g, '$1');
  }
}
