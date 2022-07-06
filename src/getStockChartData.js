// import moment from "moment";
import { API_KEY } from "./api-key";


async function getStockChartData(tickerSymbol) {
    let func = "TIME_SERIES_DAILY";
    let symbol = tickerSymbol.toUpperCase();
    let interval = "1min";
    let url = `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&interval=${interval}&apikey=${API_KEY}`;

    // let formattedDate = moment().subtract(0, 'days').format('YYYY-MM-DD').toString();

    try {
        const response = await fetch(url, {mode: 'cors'});
        const results = await response.json();
        // console.log(results);
        if (results["Error Message"]) {
            console.log(results["Error Message"]);
            symbol = '';
            let bodyText = 'Invalid request.';
            let footerText = 'Please try again.';
            let success = false;
            return [success, symbol, bodyText, footerText];

        } else if (results["Note"]) {
            console.log(results["Note"]);
            symbol = '';
            let bodyText = 'Call frequency exceeded';
            let footerText = 'Please wait 30s and try again.';
            let success = false;
            let coolDown = true;

            return [success, symbol, bodyText, footerText, coolDown];
        
        } else  {
    
            let isPositive = false;
            let lastRefreshed = results["Meta Data"]["3. Last Refreshed"];
            // TODO: Investigate the API object, sometimes lastRefreshed date includes a timestamp so must be sliced
            let closePrice = results["Time Series (Daily)"][lastRefreshed.slice(0,10)]["4. close"];
            let openPrice = results["Time Series (Daily)"][lastRefreshed.slice(0,10)]["1. open"];
            let percentChange = ((closePrice - openPrice)/openPrice * 100);
            if (percentChange > 0) {
                isPositive = true;
                percentChange = "+" + percentChange.toFixed(2).toString();
            } else {
             percentChange = percentChange.toFixed(2).toString();
            }
            
            closePrice = Number(closePrice).toFixed(2);

            // console.log(`Price: $${closePrice} (${percentChange}%)`);
            
            let bodyText = `$${closePrice} (${percentChange}%)`;
            let footerText = `Updated: ${lastRefreshed}`;
            let success = true;

            let labels = [];
            let data = [];
            for (const property in results["Time Series (Daily)"]) {
                labels.unshift(property);
                data.unshift(results["Time Series (Daily)"][property]["4. close"]);
            }
            // console.log(labels);
            // console.log(data);

            return [success, symbol, bodyText, footerText, labels, data, isPositive];
            
            
        }
        
        

    } catch(error) {
        console.log('Error! ' + error);
        symbol = '';
        let bodyText = 'Invalid request.';
        let footerText = 'Please try again.';
        let success = false;

        return [success, symbol, bodyText, footerText];
    }

}


export {getStockChartData}