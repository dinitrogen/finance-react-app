async function getIndexData(tickerSymbol) {
    // Found this yahoo API here: https://opendata.stackexchange.com/questions/18081/free-rest-api-for-daily-end-of-day-sp-500-index
    // Note: the API would not allow direct CORS access, so I created a proxy heroku url to access it with. 
    // See this stackoverflow top answer, first bullet point, for details: https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
    const MY_API_KEY = 'QZ454EnDxr4VGVF9FJCuB5glf6B0LKrO5SASkBc3';
     let url = `https://nameless-refuge-90012.herokuapp.com/https://query2.finance.yahoo.com/v8/finance/chart/${tickerSymbol}`;
    // let url = `https://query2.finance.yahoo.com/v8/finance/chart/${tickerSymbol}`;
    // let url= `https://yfapi.net/v8/finance/chart/${tickerSymbol}`;
    try {
        const response = await fetch(url, {
            method: 'GET', 
            mode: 'cors', 
            headers: {
                'x-api-key': MY_API_KEY,
            } 
        });
        
        const results = await response.json();
        //console.log(results.chart.result[0].meta);
        
        let isPositive = false;

        let lastRefreshed = results.chart.result[0].meta.regularMarketTime;
        let currentDate = new Date(lastRefreshed * 1000);
        //console.log(currentDate.toLocaleString());
        let lastClosePrice = results.chart.result[0].meta.previousClose;
        let currentPrice = results.chart.result[0].meta.regularMarketPrice;
        let percentChange = ((currentPrice - lastClosePrice)/lastClosePrice * 100);
        if (percentChange > 0) {
            isPositive = true;
            percentChange = "+" + percentChange.toFixed(2).toString();
        } else {
            percentChange = percentChange.toFixed(2).toString();
        }
        
        currentPrice = Number(currentPrice).toFixed(2);

        // console.log(`Price: $${closePrice} (${percentChange}%)`);
        let symbol = results.chart.result[0].meta.symbol;
        let bodyText = `$${currentPrice} (${percentChange}%)`;
        let footerText = `Updated: ${currentDate.toLocaleDateString()}`;
        //console.log(footerText);
        let success = true;

        return [success, symbol, bodyText, footerText, isPositive];
        

    } catch(error) {
        console.log('Error! ' + error);
        let symbol = '';
        let bodyText = 'Invalid request.';
        let footerText = 'Please try again.';
        let success = false;

        return [success, symbol, bodyText, footerText];
    }

}


export {getIndexData}