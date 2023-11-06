import React from 'react'
import HeaderLoginSignUp from '../component/HeaderLoginSignUp/HeaderLoginSignUp'

export default function LoginSignUpLayout({ component: Component ,text}) {
    return (
        <>
            <HeaderLoginSignUp text={text}/>
            <Component />
        </>
    )
}
