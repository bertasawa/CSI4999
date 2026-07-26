export async function getPrediction(teamOne, teamTwo) {
    const response = await fetch(
      `http://127.0.0.1:1234/predict/?name1=${encodeURIComponent(
        teamOne
      )}&name2=${encodeURIComponent(teamTwo)}`
    );
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend error ${response.status}: ${errorText}`);
    }
  
    return await response.json();
  }