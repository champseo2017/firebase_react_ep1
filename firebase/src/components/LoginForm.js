import React,{useEffect} from 'react'
import {auth, firestore} from '../database/firebase'
import {useStateIfMounted} from 'use-state-if-mounted'

const LoginForm = () => {
    const [email, setEmail] = useStateIfMounted("")
    const [password, setPassword] = useStateIfMounted("")
    const [registerMode, setRegisterMode] = useStateIfMounted(false)
    const [message, setMessage] = useStateIfMounted("")
    const [user, setUser] = useStateIfMounted(null)
    const userRef = userRef(firestore.collection("users")).current
    const [loading, setLoading] = useStateIfMounted(false)
   

    useEffect(() => {
        const authUnsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setLoading(true);
            if(!!firebaseUser){
                userRef.doc(firebaseUser.uid).onSnapshot((doc) => {
                    if(doc.data()){
                        const userData = {
                            uid: doc.data().uid,
                            displayName: doc.data().displayName,
                            photoURL: doc.data().photoURL,
                            email: doc.data().email,
                            created: doc.data().created,
                            role: doc.data().role,
                        }
                        setUser(userData)
                        setLoading(false)
                    }
                    clearForm();
                })
            } else {
                setUser(null);
            }
        })
        return () => {
            authUnsubscribe();
        }
    }, [userRef])

    return (
        <div>
            
        </div>
    )
}

export default LoginForm