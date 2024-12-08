require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
console.log("API Key:", process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateSummary = async (req, res) => {
  try {
    const prompt = `${req.body.content}. Please provide a summary of the blog/article in HTML format, adhering to the following requirements:
Do not include <head> or <body> tags.
Use <div> and <p>  elements or ul-li or whatever you want for structure.
Incorporate Bootstrap classes for styling.
Omit the 'html' text from the start and any template literals.
The summary should consist of approximately one-third of the total word count of the original content.
Highlight important points by wrapping them in a span element with a Bootstrap class that sets the text color to orange (e.g., text-warning).
Ensure that the summary is clear and concise, effectively conveying the main ideas and key points of the article.`;

    // Set headers to indicate streaming response
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Transfer-Encoding", "chunked");

    // Use the generateContentStream method to get a continuous response
    const result = await model.generateContentStream(prompt);

    console.log("Starting content streaming...");

    // Stream content to the client as it is generated
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log("Streaming chunk:", chunkText);
      res.write(chunkText); // Continuously send the content to the client
    }

    res.end(); // Finish the response once all content is streamed
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).write("An error occurred while streaming text.");
    res.end();
  }
};

module.exports = {
  generateSummary,
};
