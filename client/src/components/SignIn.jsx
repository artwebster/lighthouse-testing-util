import { SignInPage } from '@toolpad/core/SignInPage';

function SignIn() {
	const providers = [
		{ id: 'github', name: 'GitHub' },
		{ id: 'google', name: 'Google' }
	];

	const signUserIn = async (provider) => {
        window.location.href = `/auth/${provider.id}`;

		const promise = new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 500);
		});
		return promise;
	};

	return (
		<div className="signin__wrapper">
			<SignInPage providers={providers} signIn={signUserIn}/>
		</div>
	);
}

export default SignIn;
