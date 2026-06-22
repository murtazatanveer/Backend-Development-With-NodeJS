const fs = require("fs").promises; // Using promises version for async/await
const path = require("path");

// Configuration
const INPUT_FILE = path.join(__dirname, "data.txt");
const OUTPUT_FILE = path.join(__dirname, "summary.txt");

function analyzeText(text) {
  // Remove extra whitespace and split into words
  // Using /\s+/ to handle multiple spaces, newlines, tabs
  const words = text.trim().split(/\s+/);

  // Count total words
  const totalWords = words.length;

  // Count unique words (case-insensitive)
  const uniqueWords = new Set(
    words.map(
      (word) => word.toLowerCase().replace(/[^a-z]/g, ""), // Remove punctuation
    ),
  );

  // Remove empty strings from unique words
  uniqueWords.delete("");
  const uniqueWordCount = uniqueWords.size;

  // Count total characters (excluding whitespace)
  const charCount = text.replace(/\s/g, "").length;

  // Additional statistics
  const sentenceCount = text.split(/[.!?]+/).filter((s) => s.trim()).length;

  return {
    totalWords,
    uniqueWordCount,
    charCount,
    sentenceCount,
    uniqueWords: Array.from(uniqueWords), // For detailed analysis
  };
}

/**
 * Formats the analysis results for output
 * @param {Object} stats - Analysis results
 * @param {string} inputFile - Input file name
 * @returns {string} Formatted summary
 */
function formatSummary(stats, inputFile) {
  const timestamp = new Date().toLocaleString();

  return `
╔═══════════════════════════════════════════════════════════╗
║                  TEXT ANALYSIS SUMMARY                    ║
╚═══════════════════════════════════════════════════════════╝

📄 File Analyzed: ${path.basename(inputFile)}
📅 Analysis Date: ${timestamp}

════════════════════════════════════════════════════════════
📊 STATISTICS
════════════════════════════════════════════════════════════

📝 Total Words:         ${stats.totalWords}
🔄 Unique Words:        ${stats.uniqueWordCount}
📝 Characters (no spaces): ${stats.charCount}
📖 Sentences:           ${stats.sentenceCount}

════════════════════════════════════════════════════════════
🔍 UNIQUE WORDS (${stats.uniqueWordCount} total)
════════════════════════════════════════════════════════════

${stats.uniqueWords.join(", ")}

════════════════════════════════════════════════════════════
✅ Analysis completed successfully!
════════════════════════════════════════════════════════════
    `.trim();
}

/**
 * Main function to process the file
 */
async function processFile() {
  console.log("\n🔍 Starting Text Analysis Tool...\n");

  try {
    // Check if input file exists
    console.log(`📂 Reading file: ${INPUT_FILE}`);

    // Read the input file
    const data = await fs.readFile(INPUT_FILE, "utf8");
    console.log("✅ File read successfully");

    // Validate file content
    if (!data.trim()) {
      throw new Error("The file is empty. Please add some text.");
    }

    // Analyze the text
    console.log("📊 Analyzing text...");
    const stats = analyzeText(data);

    // Prepare summary content
    const summary = formatSummary(stats, INPUT_FILE);

    // Write to output file
    console.log(`💾 Writing results to: ${OUTPUT_FILE}`);
    await fs.writeFile(OUTPUT_FILE, summary, "utf8");
    console.log("✅ Summary written successfully");

    // Display summary in console
    console.log("\n" + "=".repeat(60));
    console.log("📊 ANALYSIS RESULTS");
    console.log("=".repeat(60));
    console.log(`
📝 Total Words:  ${stats.totalWords}
🔄 Unique Words: ${stats.uniqueWordCount}
📝 Characters:   ${stats.charCount} (no spaces)
📖 Sentences:    ${stats.sentenceCount}
`);
    console.log("=".repeat(60));
    console.log(`\n📄 Full summary saved to: ${OUTPUT_FILE}`);
    console.log("\n✨ Analysis complete!\n");
  } catch (error) {
    // Handle errors gracefully
    if (error.code === "ENOENT") {
      console.error("\n❌ Error: Input file not found!");
      console.error(`   Please create "${INPUT_FILE}" with some text.`);
      console.error("   Example:");
      console.error("   ----------------------------------------");
      console.error("   Node.js is a powerful JavaScript runtime.");
      console.error("   It allows developers to build scalable");
      console.error("   network applications.");
      console.error("   ----------------------------------------\n");
    } else {
      console.error(`\n❌ Error: ${error.message}\n`);
    }
    process.exit(1);
  }
}

// Run the program
processFile();
