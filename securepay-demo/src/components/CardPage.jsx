// src/components/CardPage.jsx
import React from 'react';
import './CardPage.css';

const CardPage = () => {
  return (
    <section className="card-page">
      <div className="card-info">
        <h3 className="title">Add Card to Wallet</h3>
        <label >Card Number</label>
        <input type="text" placeholder="Enter Card Number" />
        <label>Card Holder Name</label>
        <input type="text" placeholder="Enter Card Holder Name" />
        <label>Expire Date</label>
        <input type="text" placeholder="MM/YY" />
        <div class="cvv-container">
  <label>CVV</label>
  <input type="text" placeholder="Enter CVV" />
  <span class="info-icon">?</span>
  <div class="tooltip">The CVV is a 3-digit code found on the back of your card.</div>
</div>
<button onClick={() => {alert('Card added to wallet successfully!'); }}>Add to Wallet</button>

      </div>
      
      <div className="card">
        {/* Front View of the Card */}
        <div className="view front">
          <h3 className="debit">Debit Card</h3>
          <h3 className="bank">CitiZens Bank</h3>
          <img
            src="https://img.icons8.com/plasticine/2x/sim-card-chip.png"
            className="chip"
            alt="Chip"
          />
          <h3 className="number">xxxx xxxx xxxx 1122</h3>
          <h5 className="valid">
            <span>Valid Thru</span>
            <span>09/29</span>
          </h5>
          <h5 className="cardHolder">James Mathis</h5>
        </div>
        
        {/* Back View of the Card */}
        <div className="view back">
          <div className="blackbar"></div>
          <div className="cvvtext">
            <h5>Authorized Signature - Not Valid Unless Signed</h5>
            <div className="whiteBar"></div>
            <div className="cvv">929</div>
          </div>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
            dolore iste officia natus, voluptatibus deserunt, est numquam
            reprehenderit aliquam sint fugit recusandae fugiat doloremque facilis
            aspernatur nulla delectus.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CardPage;
