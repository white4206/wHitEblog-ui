import {defineStore} from "pinia";
import {ref} from "vue";

const useGlobalStore = defineStore("global", () => {
    const openDarkTheme = ref(false)
    return {
        openDarkTheme
    };
});
export default useGlobalStore;
