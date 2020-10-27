import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';


function TeacherList() {
  const [teachersList, setTeachersList] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();
    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    setTeachersList(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="These are the available proffys.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select 
            name="subject" 
            label="Subject"
            value={subject}
            onChange={ (e) => { setSubject(e.target.value) } }
            options={[
              { value: 'Arts', label: 'Arts'},
              { value: 'Geografy', label: 'Geografy'},
              { value: 'Math', label: 'Math'},
              { value: 'Physics', label: 'Physics'}
            ]}
          />

          <Select 
            name="week_day" 
            label="Week Day"
            value={week_day}
            onChange={ (e) => { setWeekDay(e.target.value) } }
            options={[
              { value: '0', label: 'Sunday'},
              { value: '1', label: 'Monday'},
              { value: '2', label: 'Tuesday'},
              { value: '3', label: 'Wednesday'},
              { value: '4', label: 'Thursday'},
              { value: '5', label: 'Friday'},
              { value: '6', label: 'Saturday'}
            ]}
          />

          <Input 
            name="time" 
            label="Time" 
            type="time"
            value={time}
            onChange={ (e) => { setTime(e.target.value) } }
          />   

          <button type="submit">
            Seach
          </button>
        </form>
      </PageHeader>

      <main>
        {teachersList.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacherInfo={teacher}></TeacherItem>;
        })}
      </main>
    </div>
  )
}

export default TeacherList;