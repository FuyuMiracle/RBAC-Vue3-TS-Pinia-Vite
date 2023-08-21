import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; //持久化插件
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); //注册持久化插件

export function setupStore(app: any) {
	app.use(pinia);
}

export default pinia;
