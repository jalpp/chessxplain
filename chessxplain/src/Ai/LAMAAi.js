const handleLama = async (fen) => {
    const url = `https://chessxplain.thexhosting.com/api/bard?fen=${encodeURIComponent(fen)}`;

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

export default handleLama;
