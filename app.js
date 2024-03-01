const favoriteNum = '63';
const numbers = ['3', '67', '91']
const baseURL = "http://numbersapi.com";
const requests = new Array(4).fill(`${baseURL}/${favoriteNum}?json`);


async function fetchNumberFact() {
    const url = `${baseURL}/${favoriteNum}?json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchNumberFact();

async function fetchMultipleNumberFacts() {
    const url = `${baseURL}/${numbers.join(',')}?json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        Object.keys(data).forEach(key => {
            console.log(`${key}: ${data[key]}`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchMultipleNumberFacts();

async function fetchFacts() {
    try {
        const responses = await Promise.all(requests.map(request => fetch(request)));
        const dataPromises = responses.map(response => response.json());
        const facts = await Promise.all(dataPromises);

        facts.forEach((fact, index) => {
            console.log(`Fact ${index + 1}: ${fact.text}`);
        });
    } catch (error) {
        console.error('Error fetching number facts:', error);
    }
}

fetchFacts();