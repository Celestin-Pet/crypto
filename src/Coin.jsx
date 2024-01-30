import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Coin.css"
import "./Coins.css"
import axios from "axios";
import DOMPurify from "dompurify";
const Coin = () => {
    const { coinId } = useParams()
    const [coin, setCoin] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const url = `https://api.coingecko.com/api/v3/coins/${coinId}`

        axios.get(url).then((res) => {
            setCoin(res.data)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err);
        })

    }, []);
    return (
        <>

            {
                isLoading ?
                    <div className='loading'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    :
                    <div className="container_coin">
                        <h1 className="coin_name">{coin.name}</h1>

                        <div className="price">
                            <div>
                                <span className="rank"><span style={{ color: "lightblue" }}>Rank</span> #{coin.market_cap_rank}</span>
                                <img alt="coin" src={coin.image.small} />
                                <h3>{coin.name}</h3>
                                <h4>({coin.symbol.toUpperCase()}/USD)</h4>
                            </div>
                            <h2>${coin.market_data.current_price.usd.toLocaleString()}</h2>
                        </div>
                        <div className="changePrice">
                            <span className="dailyPrice">1h</span>
                            <span className="dailyPrice">24h</span>
                            <span className="dailyPrice">7d</span>
                            <span className="dailyPrice">14d</span>
                            <span className="dailyPrice">30d</span>
                            <span className="dailyPrice">1y</span>

                            <span style={{ color: coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1) > 0 ? 'green' : "red" }}>{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%
                            </span>

                            <span style={{ color: coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1) > 0 ? 'green' : "red" }}>{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%
                            </span>

                            <span style={{ color: coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1) > 0 ? 'green' : "red" }}>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%
                            </span>

                            <span style={{ color: coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1) > 0 ? 'green' : "red" }}>{coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%
                            </span>

                            <span style={{ color: coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1) > 0 ? 'green' : "red" }}>{coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%
                            </span>

                            <span style={{ color: coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1) > 0 ? 'green' : "red" }}>{coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%
                            </span>


                        </div>

                        <div className="more_details">
                            <div className="inside_more_details">
                                <span>24 hour low </span>
                                ${coin.market_data.low_24h.usd.toLocaleString()}
                            </div>
                            <div className="inside_more_details">
                                <span>market cap </span>
                                ${coin.market_data.market_cap.usd.toLocaleString()}
                            </div>
                            <div className="inside_more_details">
                                <span>24 hour high </span>
                                ${coin.market_data.high_24h.usd.toLocaleString()}
                            </div>
                            <div className="inside_more_details">
                                <span>circulating supply </span>
                                {coin.market_data.circulating_supply.toLocaleString()}
                            </div>
                        </div>

                        <div className="about">
                            <h3>
                                About
                            </h3>
                            <p dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(coin.description.en)
                            }}>
                            </p>
                        </div>

                    </div>
            }
        </>
    );
}

export default Coin;