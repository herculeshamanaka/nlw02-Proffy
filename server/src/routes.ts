import express from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHoursToMinutes';

const routes = express.Router();

interface ScheduleItem {
  week_day: string;
  from: string;
  to: string;
}

routes.post('/classes', async (request, response) => {
  const {
    name, 
    avatar, 
    whatsapp, 
    bio, 
    subject, 
    cost, 
    schedule 
  } = request.body;

  const trx = await db.transaction();

  try {
    // Creating users
    const insertedUsersIds = await trx('users').insert({
      name,
      avatar,
      whatsapp,
      bio,
    });
  
    const user_id = insertedUsersIds[0];
    
    // Creating classes
    const insertedClassesIds = await trx('classes').insert({
      subject,
      cost,
      user_id,
    });
  
    const class_id = insertedClassesIds[0];
  
    const classSchedules = schedule.map((scheduleItem: ScheduleItem) => {
      return {
        class_id,
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to),
      }
    });
  
    await trx('class_schedules').insert(classSchedules);

    await trx.commit();

    return response.status(201).send();

  } catch (err) {

    await trx.rollback();
    
    return response.status(400).json({
      error: 'Unexpected error while creating a new class.'
    });

  }

  

  
  
  response.json().send();
});

export default routes;