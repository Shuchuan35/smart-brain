import React from 'react';
import * as $ from 'axios';

class Register extends React.Component {
    state = {
        email: '',
        password: '',
        name: ''
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onRegisterClick = e => {
        e.preventDefault();
        console.log(e.target.checkValidity());
        if (!e.target.checkValidity()) {
            return;
        }
        $.post('/api/register', this.state)
            .then(res => {
                // console.log(res);
                if (res.data._id) { 
                    this.props.loadUser(res.data);
                    this.props.onRouteChange('home');
                }
            })
            .catch(error => console.log(error));
    }
    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure" onSubmit={this.onRegisterClick}>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name*</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name" id="name"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email*</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email" id="email"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password*</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password" id="password"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}

export default Register;