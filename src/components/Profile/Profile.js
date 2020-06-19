import React from 'react';
import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet,
      defaultProfile: 'http://tachyons.io/img/logo.jpg'
    }
  }

  onFormChange = (event) => {
    switch (event.target.name) {
      case 'user-name':
        this.setState({ name: event.target.value })
        break;
      case 'user-age':
        this.setState({ age: event.target.value })
        break;
      case 'user-pet':
        this.setState({ pet: event.target.value })
        break;
      default:
        return;
    }
  }

  onProfileUpdate = (data) => {
    fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token')
      },
      body: JSON.stringify({ formInput: data })
    }).then(res => {
      if (res.status === 200 || res.status === 304) {
        this.props.toggleModal();
        this.props.loadUser({ ...this.props.user, ...data });
      }
    })
  }

  componentDidMount = () => {
    setTimeout(() => {
      document.getElementById('avatar2').src = document.getElementById('avatar1').src;
      this.setState({
        defaultProfile: document.getElementById('avatar1').src
      })
    }, 50)
  }

  render() {
    const { toggleModal, user } = this.props;
    const { name, age, pet, defaultProfile } = this.state;
    return (
      <div
        className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-80">
            <img
              id="avatar2"
              onClick={toggleModal}
              src={defaultProfile}
              className="br-100 ba h3 w3 dib" alt="avatar" />
            <h1>{this.state.name}</h1>
            <h4>{`Image Submitted: ${user.entries}`}</h4>
            <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
            <hr />

            <label className="mt2 fw6" htmlFor="user-name">Name:</label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder={user.name}
              type="text"
              name="user-name"
              id="name"
            />

            <label className="mt2 fw6" htmlFor="user-age">Age:</label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder={user.age}
              type="text"
              name="user-age"
              id="age"
            />

            <label className="mt2 fw6" htmlFor="user-pet">Pet:</label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder={user.pet}
              type="text"
              name="user-pet"
              id="pet"
            />

            <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                onClick={() => this.onProfileUpdate({ name, age, pet })}>
                Save
              </button>
              <button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                onClick={toggleModal}>
                Cancel
              </button>
            </div>

          </main>
          <div
            className="modal-close"
            onClick={toggleModal}>&times;</div>
        </article>
      </div>
    )
  }
}

export default Profile;