import Vue from "vue";
import App from "./App.vue";
import Handsontable from 'handsontable';
import { HotTable } from '@handsontable/vue';

console.log(`Handsontable: v${Handsontable.version} (${Handsontable.buildDate}) Wrapper: v${HotTable.version} Vue: v${Vue.version}`);

Vue.config.silent = true;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
