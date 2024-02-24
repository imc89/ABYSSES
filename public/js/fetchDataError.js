async function fetchData(url, timeoutMs) {
    const promises = [
      fetch(url).then(response => response.json()),
      new Promise((resolve, reject) => setTimeout(() => reject(new Error("Timeout")), timeoutMs)),
    ];
  
    try {
      const result = await Promise.race(promises);
      return result;
    } catch (error) {
      if (error.message === "Timeout") {
        console.log(`Agotado el tiempo de recuperación para:  ${url}. Probando una URL alternativa`);
        return await fetchData("https://raw.githubusercontent.com/imc89/ABYSSE/main/src/data/data.json", timeoutMs);
      } else {
        throw error; // Re-lanzar otros errores
      }
    }
  }