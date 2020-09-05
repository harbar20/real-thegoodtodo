import {useRouter} from 'next/router'
import {useEffect} from 'react'
import FirebaseAuth from "../components/FirebaseAuth";
import {useUser} from '../utils/auth/useUser';

const Auth = () => {
	const {user} = useUser();
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push('/form')
		}
	})
	
	return (
		<div>
			<p>Sign in</p>
			<div>
				<FirebaseAuth />
			</div>
		</div>
	);
};

export default Auth;
