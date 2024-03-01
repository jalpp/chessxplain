const handleGPTGame = async (game) => {
    const validInput = game.trim();
    if (validInput.length < 1 || !validInput.includes("https://lichess.org")) {
        return "Invalid Lichess game! Please enter a proper Lichess game URL!";
    }

    const url = `https://chessxplain.thexhosting.com/api/gamereview?gameurl=${encodeURIComponent(validInput)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Add CORS header
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.reply;
    } catch (error) {
        console.error(error);
    }
};

export default handleGPTGame;
