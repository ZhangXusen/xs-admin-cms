let BASE_URL = "";
if (import.meta.env.PROD) {
  BASE_URL = "http://152.136.185.210:4000";
} else {
  BASE_URL = "http://152.136.185.210:5000";
}

export { BASE_URL };
export const TIME_OUT = 5000;
