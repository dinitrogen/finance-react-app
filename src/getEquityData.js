// import moment from "moment";
import { API_KEY } from "./api-key";


async function getEquityData(tickerSymbol) {
    let func = "TIME_SERIES_DAILY";
    let symbol = tickerSymbol.toUpperCase();
    let interval = "1min";
    let url = `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&interval=${interval}&apikey=${API_KEY}`;

    // let formattedDate = moment().subtract(0, 'days').format('YYYY-MM-DD').toString();

    try {
        const response = await fetch(url, {mode: 'cors'});
        const results = await response.json();
        console.log(results);   
        let lastRefreshed = results["Meta Data"]["3. Last Refreshed"];
        let closePrice = results["Time Series (Daily)"][lastRefreshed]["4. close"];
        let openPrice = results["Time Series (Daily)"][lastRefreshed]["1. open"];
        let percentChange = ((closePrice - openPrice)/openPrice * 100);
        if (percentChange > 0) {
            percentChange = "+" + percentChange.toFixed(2).toString();
        } else {
            percentChange = percentChange.toFixed(2).toString();
        }
        

        console.log(results);
        
        closePrice = Number(closePrice).toFixed(2);

        console.log(`Price: $${closePrice} (${percentChange}%)`);
        
        let bodyText = `Price: $${closePrice} (${percentChange}%)`;
        let footerText = `Last refreshed: ${lastRefreshed}`;

        return [symbol, bodyText, footerText];

        // displayCard(symbol,`Price: $${closePrice} (${percentChange}%)`, clearListBoolean);
        

    } catch(error) {
        console.log('Error! ' + error);
        // displayCard('Invalid Request! Try again.')
        symbol = 'Error!';
        let bodyText = 'Invalid request.';
        let footerText = 'Please try again.';

        return [symbol, bodyText, footerText];
    }

}


export {getEquityData}