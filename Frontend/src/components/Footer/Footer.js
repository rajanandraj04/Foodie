import React from "react";
import "./Footer.css";
 
const socialLinks = [
  {
    link: "https://www.instagram.com/",
    imgScr:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Instagram_logo.png/1024px-Instagram_logo.png",
  },
  {
    link: "https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F",
    imgScr:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Facebook_icon_%28black%29.svg/1200px-Facebook_icon_%28black%29.svg.png",
  },
  {
    link: "https://x.com/?lang=en&mx=2",
    imgScr:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCSiwb7ObaK-NIN20nhOk2WDKR7dRmyLlmQ&s",
  },
];
 
const myfuncone = () => console.log("clicked");
const myfunctwo = () => console.log("clicked");
const myfuncthree = () => console.log("clicked");
const myfuncfour = () => console.log("clicked");
 
function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-first">
          <div className="footer-title">
            <h2>Food Delivery App</h2>
          </div>
 
          <div className="footer-social-logo">
            {socialLinks.map((item, i) => (
              <div className="footer-social-logo-item" key={i}>
                <a href={item.link}>
                  <img src={item.imgScr} />
                </a>
              </div>
            ))}
          </div>
        </div>
 
        <div className="footer-second">
          <div className="footer-second-section-left">
            <div className="footer-second-content">
              <button className="footer-button" onClick={myfuncone}>
                About us!
              </button>
            </div>
            <div className="footer-second-content">
              <button className="footer-button" onClick={myfunctwo}>
                Get Help!
              </button>
            </div>
            <div className="footer-second-content">
              <button className="footer-button" onClick={myfuncthree}>
                Customer Login!
              </button>
            </div>
            <div className="footer-second-content">
              <button className="footer-button" onClick={myfuncfour}>
                Restuarant Login!
              </button>
            </div>
          </div>
 
          <div className="footer-second-section-right">
            <div className="footer-second-content">
              <button className="footer-button" onClick={myfuncone}>
                Legal!
              </button>
            </div>
            <div className="footer-second-content">
              <button className="footer-button" onClick={myfunctwo}>
                Privacy!
              </button>
            </div>
            <div className="footer-second-content">
              <button className="footer-button" onClick={myfuncthree}>
                Promotions!
              </button>
            </div>
            <div className="footer-second-content">
              <button className="footer-button" onClick={myfuncfour}>
                Terms and Condition!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default Footer;