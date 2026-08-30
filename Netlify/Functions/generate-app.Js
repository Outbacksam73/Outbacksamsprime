exports.handler = async function(event, context) {
    // Enable CORS for cross-origin requests
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    // Respond to HTTP preflight check
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const data = JSON.parse(event.body || '{}');
        const { appName, appPrompt, userEmail } = data;

        if (!appName || !appPrompt) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing appName or appPrompt parameters.' })
            };
        }

        // Return successfully to front-end handoff pipeline
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                status: 'success',
                message: 'App build job received by Netlify Function backend.',
                appName: appName,
                userEmail: userEmail,
                deployUrl: 'https://outbacksams.com'
            })
        };

    } catch (err) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal Server Error: ' + err.message })
        };
    }
};
