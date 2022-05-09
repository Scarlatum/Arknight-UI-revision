import { html, render as LitRender } from 'lit-html';

// COMPONENT
  import Component, { RenderFunction, ComponentHooks } from '~/component';

// STYLES
  import './assets/scss/common.scss';

// COMPONENTS DECLARATION
  type Components = 'HeroScene';

  // ! Только для отладки макета.
  // @ts-ignore
  import Mockup from '~/assets/Application-original.png'

// SCENE
  import HeroScene from '~/layouts/hero'

// MODULE
  export class Instance extends Component<any, null, Components> {

    private static update: RenderFunction;

    constructor() {

      const hooks: Partial<ComponentHooks> = {
        onUpdate: Instance.updateRoot,
      }

      super({ hooks });

      Instance.update = () => this.render();

      this.registerComponent('HeroScene', HeroScene)

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
      
      // <img src="${ Mockup }" style="opacity: 1; position: absolute; z-index: -1">

      return html`
        <div class="application" id="${ this.elementID }">
          ${ this.components.get('HeroScene')?.render() }
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

