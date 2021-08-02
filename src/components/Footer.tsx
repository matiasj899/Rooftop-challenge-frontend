import React from "react";
const date = new Date();
const fullYear = date.getFullYear();
console.log(fullYear);
const Footer = () => {
  return (
    <>
      <div id='footer'>
          <div className='footer-cn'>
          <div>
          <ul>
            <li>Trabajá con nosotros</li>
            <li>Términos y condiciones</li>
            <li>Ayuda</li>
            <li>Defensa del Consumidor</li>
          </ul>
        </div>
        <p>3050 Biscayne Blvd Suite 302</p>
        <p>Copyright © <span>{fullYear}</span> Rooftop Ecommerce</p>
      </div>
      </div>
        
    </>
  );
};

export default Footer;
