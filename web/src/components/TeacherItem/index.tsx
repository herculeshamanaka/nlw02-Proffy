import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars0.githubusercontent.com/u/33010639?s=460&u=ccd6bb4d3f9b97a423c7d47ac55a3798164ecc81&v=4" alt="Hercules Hamanaka"/>
        <div>
          <strong>Hercules Hamanaka</strong>
          <span>Quimica</span>
        </div>
      </header>
      <p>
        Entusiasta das melhores tecnologias de química avançada.
        <br /><br/>
        Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através da experiência.
      </p>
      <footer>
        <p>
          Price/hour
          <strong>U$ 20.00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp"/>
          Contact
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;