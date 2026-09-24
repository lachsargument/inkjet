// Lets tsgo-based lint type-check .vue imports; vue-tsc emits the real types.
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent;
  export default component;
}

declare module "*.css";
