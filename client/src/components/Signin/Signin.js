import React from 'react';
import * as $ from 'axios';

class Signin extends React.Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onSigninClick = () => {
        console.log(this.state);
        // $.get('/api/users')
        // .then(res => {
        //   console.log(res.data);
        // });
        // const newUser = {
        //     email: this.state.email,
        //     password: this.state.password
        // }
        $.post('/api/signin', this.state)
            .then(res => {
                console.log(res.data);
                if (res.data._id) {
                    this.props.loadUser(res.data);
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email" id="email"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password" id="password"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSigninClick}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p
                                onClick={() => onRouteChange('register')}
                                className="f6 link dim black db pointer"
                            >Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;