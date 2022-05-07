import { html, render as LitRender } from 'lit-html';

// COMPONENT
  import Component, { RenderFunction, ComponentHooks } from '~/component';

// STYLES
  import './assets/scss/common.scss';

// INTERFACES
  interface ApplicationState {
    counter: number
  }

// COMPONENTS
  type ComponentKeys = string;

// MODULE
  export class Instance extends Component<ApplicationState, null, ComponentKeys> {

    private static update: RenderFunction;

    constructor() {

      const hooks: Partial<ComponentHooks> = {
        onUpdate: Instance.updateRoot,
      }

      super({ hooks });

      Instance.update = () => this.render();

      const mutObserver = new MutationObserver(() => {
        this.mounthed.set(true); mutObserver.disconnect();
      })

      mutObserver.observe(document.body, { childList: true, attributes: false, subtree: false });

      Instance.updateRoot();

    }

    async onMount() {
    } 

    async onUpdate() {
    }  

    render() {
      return html`
        <div class="application" id="${ this.elementID }">
          Welcome
        </div>
      `
    }

    static updateRoot(): Promise<void> {
      return new Promise((res) => {
        LitRender(Instance.update(), document.body, {  }); res()
      })
    }

  }



// INIT INSTANCE
  export default new Instance();

