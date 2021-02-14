import React, { FC, useState, FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Input from '../UI/Input';
import Button from '../UI/Button';
import Message from '../UI/Message';
import { signup, setError } from '../../store/actions/auth.actions';
import { RootState } from '../../store';

const SignUp: FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        return () => {
            if (error) {
                dispatch(setError(''));
            }
        }
    }, [error, dispatch]);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        dispatch(signup({ email, password, firstName }, () => setLoading(false) ));
    }

    return (
        <section className="section">
            <div className="container">
                <h2 className="has-text-centered is-size-2 mb-3">Sign up</h2>
                <form className='form' onSubmit={submitHandler}>
                    {error && <Message type='danger' msg={error} />}
                    <Input
                        name='firstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.currentTarget.value)}
                        placeholder='First Name'
                        label='First name'
                    />
                    <Input
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder='Email'
                        label='Email'
                    />
                    <Input
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        placeholder='Password'
                        label='Password'
                    />
                    <Button
                        text={loading ? 'Loading' : 'Sign Up'}
                        className='is-primary is-full-width mt-5'
                        disabled={loading}
                    />
                </form>
            </div>
        </section>
    );
}

export default SignUp;