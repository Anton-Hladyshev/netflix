import { useState } from 'react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <form>
            <input onChange={handleEmailChange} name="email" />
            <input onChange={handlePasswordChange} name="password" type="password" />
            <button type="submit">Valider</button>
        </form>
    );
}

export default LoginForm;