import { Button, Form, Input } from "antd";
import { FC, useState } from "react";
import { IUser } from "../models/IUser";
import { rules } from "../utils/rules";
import { userAPI } from "../service/UserService";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { authSlice } from "../store/auth/authSlice";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../utils/consts";
import { Link } from "react-router-dom";

const LoginForm: FC = () => {
    const [isLogining, setIsLogining] = useState<boolean>(false)
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const dispatch = useAppDispatch()
    const {userLogined} = authSlice.actions

    const {data: users, isLoading, error, refetch: refetchUsers} = userAPI.useFetchAllUserQuery(0)
    const [registerUser, {}] = userAPI.useRegisterUserMutation()

    const registerationUser = (regUser: IUser) => {
        let continueFunc = true;
        if (!isLoading && !error && users) {
            users.forEach(user => {
                if (user.username === regUser.username) {
                    if (user.username === regUser.username) {
                        continueFunc = false;
                        return;
                    }
                }    
            })
            if (continueFunc && regUser) {
                const newUserId = Math.random() * 1000000000
                regUser = {...regUser, id: newUserId}
                registerUser(regUser)
                refetchUsers()
                if (!isLoading && !error) {
                    dispatch(userLogined(regUser))
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', regUser.username)
                    localStorage.setItem('id', `${newUserId}`)
                } else if (error) {
                    return error
                }
            } else {
                alert("A user with this name already exists")
            }
        }
    }

    const loginUser = (logUser: IUser) => {
        let continueFunc = false
        if (!isLoading && !error && users ) {
            users.forEach(user => {
                if (user.username === logUser.username) {
                    if (user.password === logUser.password) {
                        continueFunc = true;
                        return;
                    }
                }
            })
            if (continueFunc && logUser) {
                dispatch(userLogined(logUser))
                let newUserId;
                users.forEach(user => {
                    console.log(user)
                    if(user.username === logUser.username) {
                        newUserId = user.id
                        console.log('1')
                    }
                })
                localStorage.setItem('auth', 'true')
                localStorage.setItem('username', logUser.username)
                console.log(newUserId)
                localStorage.setItem('id', `${newUserId}`)
            } else {
                alert("Not correct login or password")
            }
        } else if (error) {
            return error
        }
        
        
    }

    return ( 
        isLogining
        ?
        <Form
        onFinish={loginUser}>
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required("Please enter username")]}
            >
                <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required("Please enter password")]}
            >
                <Input value={pass} onChange={(e) => setPass(e.target.value)}/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 5, span: 16}}>
                <p>You not have account yet? <Link onClick={() => setIsLogining(false)} to={REGISTER_ROUTE}>Sign up</Link></p>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 9, span: 16}}>
                <Button type="primary" htmlType="submit">Sign in</Button>
            </Form.Item>
        </Form>
        :
        <Form
        onFinish={registerationUser}>
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required("Please enter username")]}
            >
                <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required("Please enter password")]}
            >
                <Input value={pass} onChange={(e) => setPass(e.target.value)}/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 7, span: 16}}>
                <p>Already have an account? <Link onClick={() => setIsLogining(true)} to={LOGIN_ROUTE}>Sign in</Link></p>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 6, span: 16}}>
                <Button type="primary" htmlType="submit">Sign up</Button>
            </Form.Item>
        </Form>
    )
}


    

export default LoginForm;