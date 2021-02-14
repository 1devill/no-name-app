import React, { FC, useState, FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Input from '../UI/Input';
import Button from '../UI/Button';
import Message from '../UI/Message';
import { sendPasswordResetEmail, setError, setSuccess } from '../../store/actions/auth.actions';
import { RootState } from '../../store';

const ForgotPassword: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { error, success } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        return () => {
            if (error) {
                dispatch(setError(''));
            }
            if (success) {
                dispatch(setSuccess(''));
            }
        }
    }, [error, dispatch, success]);

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await dispatch(sendPasswordResetEmail(email, 'Email sent'));
        setLoading(false);
    }

    return (
        <section className="section">
            <div className="container">
                <h2 className="has-text-centered is-size-2 mb-3">Reset password</h2>
                <form className='form' onSubmit={submitHandler}>
                    {error && <Message type='danger' msg={error} />}
                    {success && <Message type='success' msg={success} />}
                    <Input
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder='Email'
                        label='Email'
                    />
                    <Button
                        text={loading ? 'Loading' : 'Send password reset email'}
                        className='is-primary is-full-width mt-5'
                        disabled={loading}
                    />
                </form>
            </div>
        </section>
    );
}

export default ForgotPassword;