const puppeteer = require('puppeteer');

async function scrapeSeasonSummary(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

// Select the 'Season Summary' heading
        const seasonSummary = await page.evaluate(() => {
            // Your script here. For example:
            const seasonSummaryHeading = document.querySelector('h2.league-pos');
            if (seasonSummaryHeading && seasonSummaryHeading.textContent.trim() === 'Season Summary') {
                // Use nextElementSibling to navigate to the next element in the DOM
                let nextElement = seasonSummaryHeading.nextElementSibling;

                // Loop until you find the table or run out of next siblings
                while (nextElement && !nextElement.querySelector('.table.table-bordered-results')) {
                    nextElement = nextElement.nextElementSibling;
                }

                // Check if the table is found within the current nextElement
                const nextTable = nextElement ? nextElement.querySelector('.table.table-bordered-results') : null;

                if (nextTable) {
                    const dateElement = nextTable.querySelector('thead tr.ss-subtitle th .ss-date');
                    const date = dateElement ? dateElement.textContent.trim() : 'Date not found';

                    // Extracting team names and goals
                    const matches = [];
                    const matchRows = nextTable.querySelectorAll('tbody tr');
                    matchRows.forEach(row => {
                        const teams = row.querySelectorAll('td.wide');
                        const goals = row.querySelectorAll('td.goals');

                        if (teams.length === 2 && goals.length >= 2) {
                            const match = {
                                date: date,
                                team1: teams[0].textContent.trim(),
                                team1Goals: goals[0].textContent.trim(),
                                team2: teams[1].textContent.trim(),
                                team2Goals: goals[1].textContent.trim()
                            };
                            matches.push(match);
                        }
                    });
                    return matches;

                } else {
                    return "Error 1"
                    console.log('Table with specified class not found after the heading');
                }
            } else {
                return "Error 2"
                console.log('Season Summary heading not found or text does not match');
            }

            return {}; // Return the data you want to extract
        });

        await browser.close();
        return seasonSummary;


    }

















function processToJSON(summaryText) {
    // This function should convert the summary text to a JSON object.
    // The implementation depends on the format of the text.
    // This is a placeholder function and needs to be implemented.
    return {};
}

// Replace the URL with the actual URL of the page you want to scrape
scrapeSeasonSummary('https://powerplay.co.uk/players/team/?id_team=213732')
    .then(data => console.log(data))
    .catch(error => console.error(error));
