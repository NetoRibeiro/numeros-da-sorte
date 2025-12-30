/**
 * Calculate frequency of each number (1-60) from results
 * @param {Array} results - Array of lottery results
 * @returns {Object} Object with number frequencies {1: count, 2: count, ...}
 */
export function calculateFrequencies(results) {
  const frequency = {};

  // Initialize all numbers 1-60
  for (let i = 1; i <= 60; i++) {
    frequency[i] = 0;
  }

  // Count occurrences
  if (!results || !Array.isArray(results)) {
    return frequency;
  }

  results.forEach(result => {
    // Handle different API formats
    const dezenas = result.dezenas || result.listaDezenas || [];

    dezenas.forEach(d => {
      const num = parseInt(d);
      if (!isNaN(num) && num >= 1 && num <= 60) {
        frequency[num]++;
      }
    });
  });

  return frequency;
}

/**
 * Calculate hot numbers from recent drawings
 * @param {Array} results - Array of lottery results
 * @param {number} lastN - Number of recent drawings to analyze
 * @returns {Array} Array of hot numbers sorted by frequency
 */
export function calculateRecentHot(results, lastN = 100) {
  if (!results || !Array.isArray(results) || results.length === 0) {
    return [];
  }

  const recent = results.slice(-lastN);
  const frequency = calculateFrequencies(recent);

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([num]) => parseInt(num));
}

/**
 * Filter results for Mega da Virada (December 31st drawings)
 * @param {Array} results - Array of lottery results
 * @returns {Array} Filtered results from December 31st only
 */
export function filterViradaResults(results) {
  if (!results || !Array.isArray(results)) {
    return [];
  }

  return results.filter(r => {
    // Handle different date formats
    const dateStr = r.data || r.dataApuracao;
    if (!dateStr) return false;

    try {
      // Try parsing DD/MM/YYYY format (common in Brazilian APIs)
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        return month === 12 && day === 31;
      }

      // Try ISO date format
      const date = new Date(dateStr);
      return date.getMonth() === 11 && date.getDate() === 31;
    } catch (err) {
      return false;
    }
  });
}

/**
 * Get the most frequent numbers from a frequency object
 * @param {Object} frequency - Frequency object
 * @param {number} topN - Number of top results to return
 * @returns {Array} Array of numbers sorted by frequency
 */
export function getTopNumbers(frequency, topN = 10) {
  return Object.entries(frequency)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([num]) => parseInt(num));
}

/**
 * Get the least frequent numbers from a frequency object
 * @param {Object} frequency - Frequency object
 * @param {number} bottomN - Number of bottom results to return
 * @returns {Array} Array of numbers sorted by frequency (ascending)
 */
export function getBottomNumbers(frequency, bottomN = 5) {
  return Object.entries(frequency)
    .sort((a, b) => a[1] - b[1])
    .slice(0, bottomN)
    .map(([num]) => parseInt(num));
}

/**
 * Get statistics about the lottery data
 * @param {Array} results - Array of lottery results
 * @returns {Object} Statistics object
 */
export function getStatistics(results) {
  if (!results || !Array.isArray(results) || results.length === 0) {
    return {
      totalDrawings: 0,
      viradaDrawings: 0,
      oldestDrawing: null,
      newestDrawing: null
    };
  }

  const virada = filterViradaResults(results);
  const dates = results
    .map(r => {
      const dateStr = r.data || r.dataApuracao;
      if (!dateStr) return null;

      const parts = dateStr.split('/');
      if (parts.length === 3) {
        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
      }
      return new Date(dateStr);
    })
    .filter(d => d && !isNaN(d.getTime()));

  return {
    totalDrawings: results.length,
    viradaDrawings: virada.length,
    oldestDrawing: dates.length > 0 ? new Date(Math.min(...dates)) : null,
    newestDrawing: dates.length > 0 ? new Date(Math.max(...dates)) : null
  };
}
