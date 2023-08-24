import * as moment from 'moment';

export default function getCurrentTime() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}
