// Simulated API call — replace this with a real endpoint
export async function getRecommendations(profile) {
    // In a real app, you'd POST to a server or OpenAI API
    console.log("Sending profile to recommendation engine:", profile);
  
    // Simulated response
    return [
      { title: "Full-Stack Web Dev", description: "Learn HTML, CSS, JS, React, and Node.js." },
      { title: "Interview Prep", description: "Ace your tech interviews with mock problems and tips." },
      { title: "Portfolio Projects", description: "Hands-on projects to build a strong resume." }
    ];
  }
  