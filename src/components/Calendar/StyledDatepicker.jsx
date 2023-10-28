import React, { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import DatePicker from "react-datepicker";
import { CalendarGlobalStyles, TitleWrapper } from "./StyledDatepicker.styled";
import "react-datepicker/dist/react-datepicker.css";
import sprite from '../../images/sprite.svg';

const StyledDatepicker = ({ minDate, maxDate, disabledDates, isBirthdayPicker }) => {
  const [selectedDate, setSelectedDate] = useState(Date.now());

  const CustomInput = ({ onClick }) => {
    return (
      <TitleWrapper>
        <div onClick={onClick}>
          {isBirthdayPicker
            ? format(selectedDate, "MM/yyyy")
            : format(selectedDate, "dd/MM/yyyy")}
          <svg width="24" height="24" className="react-datepicker__calendar-icon">
            <use href={sprite + (isBirthdayPicker ? '#icon-calendar-birthday' : '#icon-calendar')} />
          </svg>
        </div>

        {isBirthdayPicker ? null : (
          <div className="react-datepicker__navigation-title-day">
            <span onClick={handlePrevDay} className="react-datepicker__navigation-title-day--previous">
              <svg width="16" height="16" className="">
                <use href={sprite + '#icon-chevron-left'} />
              </svg>
            </span>
            <span onClick={handleNextDay} className="react-datepicker__navigation-title-day--next">
              <svg width="16" height="16" className="">
                <use href={sprite + '#icon-chevron-right'} />
              </svg>
            </span>
          </div>
        )}
      </TitleWrapper>
    );
  };

  const handlePrevDay = () => {
    const prevDay = subDays(selectedDate, 1);
    if (minDate && prevDay < minDate) {
      return;
    }
    setSelectedDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = addDays(selectedDate, 1);
    if (maxDate && nextDay > maxDate) {
      return;
    }
    setSelectedDate(nextDay);
  };

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          if (minDate && date < minDate) {
            return;
          }
          if (maxDate && date > maxDate) {
            return;
          }
          setSelectedDate(date);
        }}
        customInput={<CustomInput />}
        dateFormat={isBirthdayPicker ? "MM/yyyy" : "dd MM yyyy"}
        calendarStartDay={1}
        formatWeekDay={(day) => day.substr(0, 1)}
        excludeDates={disabledDates}
        showMonthYearDropdown={isBirthdayPicker}
      />
      <CalendarGlobalStyles />
    </>
  );
};

export default StyledDatepicker;
