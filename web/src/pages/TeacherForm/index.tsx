import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';


function TeacherForm() {
  const navHistory = useHistory();

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: ''}
  ],);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: ''}
    ]);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Class data inserted!');
      navHistory.push('/');
    }).catch(() => {
      alert('Error while inserting class data.');
    });

  }

  function setScheduleItemValue(position: number, field: string, value:string) {
    const newScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }      

      return scheduleItem;
    });

    setScheduleItems(newScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="It's so amazing you want to teach." 
        description="The first step is to inform your data in the form below."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Your data</legend>

            <Input 
              name="name" 
              label="Full Name" 
              type="text"
              value={ name }
              onChange={ (event) => { setName(event.target.value) } }
            />

            <Input 
              name="avatar" 
              label="Avatar" 
              type="text"
              value={ avatar }
              onChange={ (event) => { setAvatar(event.target.value) } }
            />
            
            <Input 
              name="whatsapp" 
              label="Whatsapp" 
              type="text"
              value={ whatsapp }
              onChange={ (event) => { setWhatsapp(event.target.value) } }
            />
            
            <Textarea 
              name="bio" 
              label="Biografy" 
              value={ bio }
              onChange={ (event) => { setBio(event.target.value) } }
            />
          </fieldset>

          <fieldset>
            <legend>Class Info</legend>

            <Select 
              name="subject" 
              label="Subject"
              options={[
                { value: 'Arts', label: 'Arts'},
                { value: 'Geografy', label: 'Geografy'},
                { value: 'Math', label: 'Math'},
                { value: 'Physics', label: 'Physics'}
              ]}
              value={ subject }
              onChange={ (event) => { setSubject(event.target.value) } }
            />
            
            <Input 
              name="cost" 
              label="Cost per hour (in $USD)" 
              type="number"
              value={ cost }
              onChange={ (event) => { setCost(event.target.value) } }
            />

          </fieldset>

          <fieldset>
              <legend>Available Times
                <button type="button" onClick={addNewScheduleItem}>
                  + New time
                </button>
              </legend>
              {scheduleItems.map((scheduleItem, index) => {
                return (
                  <div key={scheduleItem.week_day} className="schedule-item">
                  <Select 
                    name="week_day" 
                    label="Week Day"
                    value={scheduleItem.week_day}
                    options={[
                      { value: '0', label: 'Sunday'},
                      { value: '1', label: 'Monday'},
                      { value: '2', label: 'Tuesday'},
                      { value: '3', label: 'Wednesday'},
                      { value: '4', label: 'Thursday'},
                      { value: '5', label: 'Friday'},
                      { value: '6', label: 'Saturday'}
                    ]}
                    onChange={ (event) => setScheduleItemValue(index, 'week_day', event.target.value) }
                  />
                  
                  <Input 
                    name="from" 
                    label="From" 
                    value={scheduleItem.from}
                    type="time" 
                    onChange={ (event) => setScheduleItemValue(index, 'from', event.target.value) }
                  />

                  <Input 
                    name="to" 
                    label="To"
                    value={scheduleItem.to}
                    type="time"
                    onChange={ (event) => setScheduleItemValue(index, 'to', event.target.value) }
                  />
                </div>
    
                );
              })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Important Warning"/>
              Important! <br />
              Fill out all the fields.
            </p>
            <button type="submit">
              Save data
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;