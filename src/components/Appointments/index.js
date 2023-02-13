// Write your code here
import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import './index.css'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', isStarFilterActive: false}

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isStarFilterActive} = this.state

    this.setState({isStarFilterActive: !isStarFilterActive})
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuid(),
      title1: title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isStarFilterActive} = this.state

    if (isStarFilterActive) {
      return appointmentList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {title, date, isStarFilterActive} = this.state
    const filterClassName = isStarFilterActive
      ? 'filter-filled'
      : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="container-1">
            <form className="form" onSubmit={this.onAddAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title" className="label">
                Title
              </label>
              <input
                type="text"
                className="input"
                placeholder="Title"
                onChange={this.onChangeTitleInput}
                id="title"
                value={title}
              />
              <label htmlFor="date" className="label">
                Date
              </label>
              <input
                type="date"
                className="input"
                onChange={this.onChangeDateInput}
                id="date"
                value={date}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="container-2">
            <h1 className="heading-2">Appointments</h1>
            <button
              type="button"
              onClick={this.onFilter}
              className={`filter-style ${filterClassName}`}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
