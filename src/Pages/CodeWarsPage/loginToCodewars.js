const { Builder, By, Key } = require('selenium-webdriver');

let solutions = [ ];

// Usage:
const credentials = {
    username: "Saku-Hasu",
    password: "Se*1293#",
    email: "mjs.schemmer@gmail.com"
};

// https://www.codewars.com/users/Saku-Hasu/completed_solutions
const urls = {
    completedKatasUrl: `https://www.codewars.com/api/v1/users/${credentials.username}/code-challenges/completed`,
    kataInfoUrl: "https://www.codewars.com/api/v1/code-challenges/",
    mainFolderPath: "./Katas"
};

// Function to sign in to CodeWars
async function signIn(driver, credentials) {
    await driver.get('https://www.codewars.com/users/sign_in');
    await driver.findElement(By.id('user_email')).sendKeys(credentials.email);
    await driver.findElement(By.id('user_password')).sendKeys(credentials.password, Key.RETURN);
    await driver.wait(async () => {
        const url = await driver.getCurrentUrl();
        return url === 'https://www.codewars.com/dashboard';
    });
};

async function getNumberOfPagesAndKatas(url) {
    let jdata = await fetch(url);
    let data = await jdata.json();
    return {
        numberOfPages: data.totalPages,
        numberOfKatas: data.totalItems
    }
};

async function getKataObject(page) {
    let url = `${urls.completedKatasUrl}?page=${page}`;
    let jdata = await fetch(url);
    let data = await jdata.json();
    return data;
};

// Main scraping function
async function scrapeCodeWars(credentials) {
    let driver = await new Builder().forBrowser('chrome').build();
    let solutions = [];

    try {
        await signIn(driver, credentials);
        const { numberOfPages } = await getNumberOfPagesAndKatas(urls.completedKatasUrl);

        for (let i = 0; i < numberOfPages; i++) {
            const { data } = await getKataObject(i);
            for (const kata of data) {
                const { id, name, completedLanguages } = kata;
                const kataClass = await handleSolution(driver, completedLanguages, id, { id, name, solutions: [] });
                solutions.push(kataClass);
            }
        }
    } finally {
        await driver.quit();
        let newSolutions = JSON.parse(JSON.stringify(solutions));
        const fs = require("fs");
        fs.writeFileSync("kataSolutions.json", JSON.stringify(newSolutions), "utf-8");
    }
}

scrapeCodeWars(credentials);
