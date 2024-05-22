import { useState } from 'react'
import Title from '../Title'
import styles from './styles.module.css'
import Input from '../Input'

export default function Container(props) {
    const [password, setPassword] = useState("")
    const [copyText, setCopyText] = useState("Copy!")
    const [customSize, setCustomSize] = useState(10)
    const [showInput, setShowInput] = useState(false)
    const passwordSize = showInput ? customSize : 10

    function generatePassword() {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
        let password = "";
        for (let i = 0; i < passwordSize; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        setPassword(password);
        setCopyText("Copy!");
    }

    function handleCopyClick() {
        navigator.clipboard.writeText(password)
        setCopyText("Copied!")
    }

    return (
        <>
            <div className={styles.container}>
                <Title>
                    <span>{props.title}</span>
                </Title>
                <div>
                    <label htmlFor="showInput">Customize password size: </label>
                    <input
                        type="checkbox"
                        id="showInput"
                        value={showInput}
                        onChange={(() => setShowInput(show => !show))}
                    />
                </div>
                {showInput ? (
                    <div>
                        <label htmlFor="customSize">Password Size: </label>
                        <Input passwordSize={customSize} setPasswordSize={setCustomSize} />
                    </div>
                ) : null}
                <div>
                    <button
                        onClick={generatePassword}
                        className={styles.button}
                    >
                        Generate password with {passwordSize} characters!
                    </button>
                    <button
                        onClick={handleCopyClick}
                        className={styles.button}
                    >
                        {copyText}
                    </button>
                </div>
                <span className={styles.passwordField}>{password}</span>
            </div>

        </>
    )
}