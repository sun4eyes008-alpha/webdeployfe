// Helper to find actual error line by searching for patterns
const findErrorLineInContent = (content, errorMessage) => {
  const lines = content.split('\n');
  
  // Pattern 1: Unclosed strings - look for lines with odd number of quotes
  if (errorMessage.includes('Unexpected') || errorMessage.includes('Invalid')) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Count quotes that are not escaped
      const quoteMatches = line.match(/(?<!\\)"/g);
      const quoteCount = quoteMatches ? quoteMatches.length : 0;
      // If inside flowchartData and odd number of quotes
      if (quoteCount % 2 !== 0 && line.includes(':')) {
        return i + 1;
      }
    }
  }
  
  // Pattern 2: Adjacent strings "text1""text2"
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/\"[^\"]*\"[^\s,+:}\]]/)) {
      return i + 1;
    }
  }
  
  // Pattern 3: Backtick errors
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/[^]*[^\s,+:}\]]/)) {
      return i + 1;
    }
  }
  
  return null;
};
