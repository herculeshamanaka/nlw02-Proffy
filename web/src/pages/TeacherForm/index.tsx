import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';


function TeacherForm() {
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: ''}
  ],);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: ''}
    ])
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="It's so amazing you want to teach." 
        description="The first step is to inform your data in the form below."
      />

      <main>
        <fieldset>
          <legend>Your data</legend>

          <Input name="name" label="Full Name" type="text" />
          <Input name="avatar" label="Avatar" type="text"/>
          <Input name="whatsapp" label="Whatsapp" type="text"/>
          <Textarea name="bio" label="Biografy" />
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
          />
          <Input name="cost" label="Cost per hour (in $USD)" type="number"/>

        </fieldset>

        <fieldset>
            <legend>Available Times
              <button type="button" onClick={addNewScheduleItem}>
                + New time
              </button>
            </legend>
            {scheduleItems.map(scheduleItem => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                <Select 
                  name="week_day" 
                  label="Week Day"
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
                <Input name="from" label="From" type="time" />
                <Input name="to" label="To" type="time" />
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
          <button type="button">
            Save data
          </button>
        </footer>
      </main>
    </div>
  )
}

export default TeacherForm;