/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import sendEmail from '../email/email-controller';
import cronValues from './values-cron';
import { CronSchedule } from './util';
import { getUserAndSchedulers } from '../../src/helpers/information-helper';
import getTemplateReminderUser from '../email/templates/reminderDay';
import { MomentTzString, SetZeroDate } from '../../src/util/date';

export async function SendEmailReminderDay() {
  const dateNow = MomentTzString(SetZeroDate());
  const users = await getUserAndSchedulers(dateNow);
  for (const user of users) {
    const templateEmail = getTemplateReminderUser({
      username: user.name.toLowerCase(),
      schedulers: user.schedulers,
    });
    setTimeout(() => {
      sendEmail({
        text: 'WTMI - Acompanhe sua agenda de hoje com a gente! 🤩',
        subject: 'WTMI - Acompanhe sua agenda de hoje com a gente! 🤩',
        to: [user.email],
        html: templateEmail,
      });
    }, 5000);
  }
}

export default CronSchedule(
  cronValues.EVERY_DAY_00_HOURS,
  SendEmailReminderDay,
);
