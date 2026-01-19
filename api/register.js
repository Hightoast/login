export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ status: "error", msg: "Method not allowed" });
    }

    try {
        const response = await fetch(
            "https://hightoast-login.ct.ws/register.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(req.body)
            }
        );

        const text = await response.text();

        // Forward PHP response
        res.status(200).send(text);
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: "Proxy failed",
            error: err.message
        });
    }
}
