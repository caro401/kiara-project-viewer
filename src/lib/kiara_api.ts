import { KiaraAPI } from "./utils";

const apiClient = new KiaraAPI(import.meta.env.KIARA_SERVICE_ENDPOINT).context(
  "default"
);

export default apiClient;
