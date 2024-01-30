import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Coins.css"
import Swal from 'sweetalert2';

const Coins = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [Loading, setIsLoading] = useState(true)
    const [lazyLoading, setLazyLoading] = useState(false)
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (navigator.onLine === false) {
            Swal.fire({
                title:"Connection Error",
                text:"you're offline check your connection!!",
                color:"skyblue",
                icon:"info",
            })
        } 
    }, [navigator.onLine]);

    useEffect(() => {

        axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=${page}&sparkline=false`
        ).then((res) => {
            setData((prev) => {
                return [...prev, ...res.data];
            });
            setIsLoading(false)
            setLazyLoading(false)

        }).catch((err) => {
            console.log(err);
        })

    }, [page]);


    const handleScroll = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            setTimeout(() => {
                setPage((prev) => prev + 1)
            }, 700);
            setLazyLoading(true)
        }
    }
    useEffect(() => {

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)

    }, [])
    return (
        <>
            <section className='container'>
                <form>
                    <h1>
                        Search a currency
                    </h1>
                    <input type='search' placeholder='search coins' value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
                </form>
                <div className='header'>
                    <div className='left-header'>
                        <span>#</span>
                        <h4>coin</h4>
                    </div>
                    <div className='right-header'>
                        <h4>price</h4>
                        <h4>24h</h4>
                        <h4>24h volume</h4>
                        <h4 className='hide-mobile'>Mkt Cap</h4>
                    </div>
                </div>

                {
                    Loading ?
                        <div className='loading'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        :
                        data.filter((d) => {
                            return (
                                d.name.toLowerCase().includes(search.toLowerCase())
                            )
                        }).map((d, i) => {
                            return (
                                <Link className='link' to={`coin/${d.id}`} key={i}>
                                    <div className='box_coins' >
                                        <div className='left-box-coins'>
                                            <span>{d.market_cap_rank}</span>
                                            <img src={d.image} />
                                            <h4 className='name'>{d.name}</h4>
                                            <span className='hide-mobile'>{d.symbol}</span>
                                        </div>
                                        <div className='right-box-coins'>
                                            <h4>{d.current_price.toLocaleString()}</h4>
                                            <h4 style={{ color: d.market_cap_change_percentage_24h < 0 ? "red" : "green" }}>{d.market_cap_change_percentage_24h.toFixed(1)}%</h4>

                                            <h4>${d.total_volume.toLocaleString()}</h4>

                                            <h4 className='hide-mobile' style={{ marginLeft: '.6rem' }}>
                                                ${d.market_cap.toLocaleString()}
                                            </h4>

                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                }
                {
                    lazyLoading && (

                        <div className="lazyLoading">
                            <div></div>
                            <div></div>
                        </div>

                    )

                }

     <div style={{ color: "gray" }}>Get in touch  and connect with me  <a href='https://www.linkedin.com/in/celestin-peter/'> LinkedIn</a> </div>

            </section>
        </>);
}

export default Coins;