var data = {
	dev: {
		baseApiUrl: "http://192.168.31.238/api/v1",
		wxAuthUrl: "http://192.168.31.134:8080/#/?openId=9527",
	},
	dev_com: {
		// baseApiUrl: "http://127.0.0.1:8888/tc_job",
		// fileBaseUrl: "http://127.0.0.1:8089/file",
		// wxAuthUrl: "http://127.0.0.1:8080/#/?openId=9527",
	},
	pro: {
		// baseApiUrl: "http://tczpwht.jiujuer.com",
		// fileBaseUrl: "http://tczpwht.jiujuer.com/file",
		// wxAuthUrl: "http://tczpwht.jiujuer.com/wx/wxAuth",
	}
};

var env = "dev";
// env = "dev_com";
// env = "pro";

var config = {
	successCode: "200",
	appName: "",
	...data[env],
};

export default config;