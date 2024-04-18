import React, { useState, useEffect } from 'react';
import axios from 'axios';

const List = (props) => (
    <div className='photo-container'>
        <div className='photo'>
            <img src={props.src} alt={props.alt} width="200"></img>
        </div>
        <div className='comments-section'>
            <div>
                <h4>Bids</h4>
                <ul>
                <li><strong>{props.user}:</strong> ${props.bid}</li>
                </ul>
            </div>
        </div>
        <div className='addbid'>
            <form class="comment-form">
                <input type="text" placeholder="Your name" 
                    onChange={(e) => setOnChangeUser(e.target.value)}></input>
                <input type="number" placeholder="Add a higher bid"
                    onChange={(e) => setOnChangeBid(e.target.value)}></input>
                <button type="submit" onClick={() => {
                    props.addBid(props.addBid)}}>Submit Your Higher Bid</button>
         </form>
        </div>
    </div>
)

export default function ArtsList() {
    const[arts, setArtList]= useState([]);
    const[user, setOnChangeUser] = useState(``);
    const[bid, setOnChangeBid] = useState(``);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/arts')
            .then((response) => {
                setArtList(response.data)
                console.log(setArtList);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const addBid = (user, bid) => {
        const newBid = {bids:{user: user, bid: bid}}

        axios
        .post('http://localhost:5000/api/art', newBid)
        .then((res) => console.log('Added'))
        .then(window.location = '/')
    }

    return(
        <div className='photo-gallery'>
            {arts.map((art) => {
                return (
                    <List
                        artName = {art.artName}
                        serial = {art.serial}
                        src = {art.src}
                        alt = {art.alt}
                        user = {art.bids[0].user}
                        bid = {art.bids[0].bid}
                        addBid = {addBid}
                    />
                )
            })}
        </div>
    )

}


{/* <div class="photo-gallery">
<div class="photo-container">
    <div class="photo">
        <img src="https://images.metmuseum.org/CRDImages/ep/original/DT1946.jpg" alt="" width="200">
    </div>
    <div class="comments-section">
        <div>
            <h4>Bids</h4>
            <ul>
                <li><strong>User1:</strong> $100</li>
            </ul>
        </div>
    </div>
    <div class="addbid">
        <form class="comment-form">
            <input type="text" placeholder="Your name">
            <input type="number" placeholder="Add a higher bid"></textarea>
            <button type="submit">Submit Your Higher Bid</button>
        </form>
    </div>
</div> */}