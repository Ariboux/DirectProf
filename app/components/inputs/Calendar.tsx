'use client';

import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DarkCalendar.css';
import { useTheme } from 'next-themes';

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange
}) => {
    const { theme } = useTheme();
    const oneYearFromNow: Date = new Date();
    const calendarStyle = theme === 'dark' ? 'react-calendar/dist/Calendar.css' : './DarkCalendar.css';

    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    return (
        <>
        <link rel="stylesheet" href={calendarStyle} />
        <Calendar
          onChange={(date) => onChange(date as Date)}
          value={value}
          defaultValue={oneYearFromNow}
          showNeighboringMonth={true}
          minDate={new Date()}
          maxDate={oneYearFromNow}
          
          />
          </>
      );
} 
export default DatePicker;