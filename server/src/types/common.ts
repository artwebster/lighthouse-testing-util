export interface TestParamsReqBody {
	url: string;
	runs: number;
	desktop: boolean;
}

export interface FederatedCredential {
	user_id: number;
	provider: string;
	subject: string;
}

export interface GoogleUser {
	id: string;
	email: string;
	displayName: string;
	iat?: number; // issued at
	exp?: number; // expiration
}
