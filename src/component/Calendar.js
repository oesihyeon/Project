import React, { useState, useEffect } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import './Calendar.css';

import exerciseData from './exercises.json'; // exercises.json 파일 경로에 맞게 수정

const daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalCtrl, setModalCtrl] = useState(false);
  const [eventInput, setEventInput] = useState({ name: '', time: '', note: '' });
  const [eventIdCounter, setEventIdCounter] = useState(0);
  const [existingEvents, setExistingEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || {};
    setEvents(storedEvents);
    setEventIdCounter(Object.keys(storedEvents).reduce((maxId, dateKey) => {
      const eventsForDate = storedEvents[dateKey];
      if (Array.isArray(eventsForDate)) {
        return Math.max(maxId, ...eventsForDate.map(event => event.id));
      }
      return maxId;
    }, 0));
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const dateKey = `${year}-${month + 1}-${selectedDate.getDate()}`;
    setExistingEvents(events[dateKey] || []);
  }, [selectedDate, events]);

  useEffect(() => {
    const results = exerciseData.reduce((acc, category) => {
      const matchedExercises = category.exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return acc.concat(matchedExercises);
    }, []);
    setSearchResults(results);
  }, [searchQuery]);

  const handleAddEvent = () => {
    if (eventInput.name.trim() && eventInput.time.trim() && eventInput.note.trim()) {
      const dateKey = `${year}-${month + 1}-${selectedDate.getDate()}`;
      const newEvent = { id: eventIdCounter + 1, ...eventInput };
      const updatedEvents = {
        ...events,
        [dateKey]: events[dateKey] ? [...events[dateKey], newEvent] : [newEvent],
      };
      setEvents(updatedEvents);
      setEventIdCounter(eventIdCounter + 1);
      closeModal();
    }
  };

  const handleEditEvent = (eventId, newValues) => {
    const dateKey = `${year}-${month + 1}-${selectedDate.getDate()}`;
    const updatedEvents = {
      ...events,
      [dateKey]: events[dateKey].map(event => event.id === eventId ? { ...event, ...newValues } : event),
    };
    setEvents(updatedEvents);
  };

  const handleDeleteEvent = (eventId) => {
    const dateKey = `${year}-${month + 1}-${selectedDate.getDate()}`;
    const updatedEvents = {
      ...events,
      [dateKey]: events[dateKey].filter(event => event.id !== eventId),
    };
    setEvents(updatedEvents);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddExercise = (exercise) => {
    setSelectedExercise(exercise);
    setModalCtrl(true);
  };

  const handleModalAddEvent = () => {
    if (selectedExercise) {
      const dateKey = `${year}-${month + 1}-${selectedDate.getDate()}`;
      const newEvent = { id: eventIdCounter + 1, name: selectedExercise.name, time: eventInput.time, note: eventInput.note };
      const updatedEvents = {
        ...events,
        [dateKey]: events[dateKey] ? [...events[dateKey], newEvent] : [newEvent],
      };
      setEvents(updatedEvents);
      setEventIdCounter(eventIdCounter + 1);
      closeModal();
    } else {
      if (eventInput.name.trim() && eventInput.time.trim() && eventInput.note.trim()) {
        const dateKey = `${year}-${month + 1}-${selectedDate.getDate()}`;
        const newEvent = { id: eventIdCounter + 1, ...eventInput };
        const updatedEvents = {
          ...events,
          [dateKey]: events[dateKey] ? [...events[dateKey], newEvent] : [newEvent],
        };
        setEvents(updatedEvents);
        setEventIdCounter(eventIdCounter + 1);
        closeModal();
      }
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    openModal();
  };

  const openModal = () => {
    setModalCtrl(true);
  };

  const closeModal = () => {
    setModalCtrl(false);
    setEventInput({ name: '', time: '', note: '' });
    setSelectedExercise(null);
  };

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const calendarDays = [];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  for (let date = 1; date <= lastDateOfMonth; date++) {
    calendarDays.push(date);
  }

  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(null);
  }

  const headerDate = new Date(year, month).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

  return (
    <div className="main">
      <main className="calendar">
        <div className="header">
          <h3>{headerDate}</h3>
          <Link to="/">
            <TiArrowBack className="back-icon" />
          </Link>
        </div>
        <div className="daysArray">
          {daysArray.map((day, index) => (
            <div key={index} className="day">{day}</div>
          ))}
        </div>
        <div className="dates">
          {calendarDays.map((date, index) => {
            const isSelected = date && selectedDate.getDate() === date && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
            return (
              <div
                key={index}
                className={`date ${date ? (isSelected ? 'selected' : '') : 'empty'}`}
                onClick={() => date && handleDateClick(new Date(year, month, date))}
              >
                {date}
                {events[`${year}-${month + 1}-${date}`] && (
                  <div className="event-list">
                    {events[`${year}-${month + 1}-${date}`].map((event, i) => (
                      <div key={i} className="event">
                        <span>{event.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {modalCtrl && (
          <div className="modal">
            <div className="modal-content">
              <button className='exit_btn' onClick={closeModal}>x</button>
              <h2>{selectedDate.toDateString()}</h2>
              <div className="event-inputs">
                {selectedExercise ? (
                  <>
                    <h3>{selectedExercise.name}</h3>
                    <input
                      type="hidden"
                      name="name"
                      value={selectedExercise.name}
                      onChange={(e) => setEventInput(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </>
                ) : (
                  <label>
                    운동 이름:
                    <input
                      type="text"
                      name="name"
                      value={eventInput.name}
                      onChange={(e) => setEventInput(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <br />
                  </label>
                )}
                <label>
                  운동 시간:
                  <input
                    type="text"
                    name="time"
                    value={eventInput.time}
                    onChange={(e) => setEventInput(prev => ({ ...prev, time: e.target.value }))}
                  />
                  <br />
                </label>
                <label>
                  기타 메모:
                  <input
                    type="text"
                    name="note"
                    value={eventInput.note}
                    onChange={(e) => setEventInput(prev => ({ ...prev, note: e.target.value }))}
                  />
                </label>
                <br />
              </div>
              <button className='modal_btn' onClick={selectedExercise ? handleModalAddEvent : handleAddEvent}>기록하기</button>
              <div className="event-buttons">
                <h3>운동 목록</h3>
                {existingEvents.map((event, i) => (
                  <div key={i} className="event2">
                    <span className="modal_result">{event.name} - {event.time} - {event.note}</span>
                    <button className='modal_btn' onClick={() => {
                      const newName = prompt('Enter new name:', event.name);
                      const newTime = prompt('Enter new time:', event.time);
                      const newNote = prompt('Enter new note:', event.note);
                      handleEditEvent(event.id, { name: newName, time: newTime, note: newNote });
                    }}>Edit</button>
                    <button className='modal_btn' onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <aside className="search-section">
        <h3>운동 검색</h3>
        <input className="search-input"
          type="text"
          placeholder="운동 검색"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="accordion">
          {exerciseData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="category">
              <div className="category-header" onClick={() => toggleCategory(category.category)}>
                <h3>{category.category}</h3>
              </div>
              {activeCategory === category.category && (
                <div className="exercises">
                  {category.exercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} className="exercise" onClick={() => handleAddExercise(exercise)}>
                      <h4>{exercise.name}</h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default Calendar;
