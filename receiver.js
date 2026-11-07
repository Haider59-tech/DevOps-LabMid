const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json({ limit: '50mb' }));

app.post('/report', (req, res) => {
    const reportData = req.body;
    
    // Automatically saves the JSON file to your computer
    fs.writeFileSync('test-report.json', JSON.stringify(reportData, null, 2));
    
    console.log("---------------------------------------------------");
    console.log(`[${new Date().toLocaleTimeString()}] New test report received from GitHub Actions!`);
    console.log("Saved locally as: test-report.json");
    console.log("Overall Status:", reportData.overallStatus);
    console.log("---------------------------------------------------");
    
    res.status(200).send("Report saved successfully to localhost");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Local receiver is running and listening on http://localhost:${PORT}`);
});