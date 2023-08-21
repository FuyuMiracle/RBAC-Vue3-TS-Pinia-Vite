import httpRequest from "@/api/request";

interface LoginInfo {
	username: string;
	password: string;
}
export const postLogin = (param: LoginInfo) => {
	return httpRequest({
		url: "/login",
		method: "post",
		data: param,
	});
};
