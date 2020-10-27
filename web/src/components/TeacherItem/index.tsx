import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface Teacher {
    avatar: string;
    bio: string;
    cost: number;
    id: number;
    name: string;
    subject: string;
    whatsapp: string;
};

interface TeacherListProps {
  teacherInfo: Teacher;
};

const TeacherItem: React.FC<TeacherListProps> = ( { teacherInfo } ) => {
  function createNewConnection() {
    api.post('connections', {
      user_id: teacherInfo.id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacherInfo.avatar} alt={teacherInfo.name}/>
        <div>
          <strong>{teacherInfo.name}</strong>
          <span>{teacherInfo.subject}</span>
        </div>
      </header>
      <p>
        {teacherInfo.bio}
      </p>
      <footer>
        <p>
          Price/hour
          <strong>U$ {teacherInfo.cost}</strong>
        </p>
        <a 
          target="_blank" 
          onClick={createNewConnection} 
          href={`https://wa.me/${teacherInfo.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp"/>
          Contact
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;