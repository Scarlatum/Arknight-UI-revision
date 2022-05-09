import { html } from 'lit-html';

// COMPONENT
  import Component, { ComponentPayload } from '~/component';

// STYLES
  import './styles.scss';

// BACKGROUNDS CODES
  const enum BG_CODES {
    WINTER = '001',
    MONTAINS = '002',
  }

// BACKGROUNDS
  import Winter   from '~/assets/images/bg/001.png';
  import Montains from '~/assets/images/bg/002.png';

// Components declaration
  type Components = 'Sanity' | 'CharWindow' | 'Panel';

// Components
  import Sanity     from '~/components/hero/sanity';
  import CharWindow from '~/components/hero/char';
  import Panel      from '~/components/hero/panel';

// INTERFACES

  export interface State {
  }

  export interface Props {
  }

export default class MainScene extends Component<State,Props,Components> {

  private static BACKGROUNDS: Record<BG_CODES, string> = {
    [ BG_CODES.WINTER ]   : Winter,
    [ BG_CODES.MONTAINS ] : Montains,
  }

  constructor({ hooks, props }: ComponentPayload<State, Props>) { super({ hooks, props });

    this.registerComponent('Sanity', Sanity);
    this.registerComponent('CharWindow', CharWindow);
    this.registerComponent('Panel', Panel)

  }

  protected onMount(): void {
  }

  protected onUpdate(): void {
    console.log('sdfsdfsdf')
  }

  render() {
    return html`
      <section id="${ this.elementID }" class="main-container">
        <img src="${ MainScene.BACKGROUNDS[BG_CODES.WINTER] }">
        ${ this.components.get('Sanity')?.render() }
        <div class="main-body">
          ${ this.components.get('CharWindow')?.render() }
          ${ this.components.get('Panel')?.render() }
        </div>
        <footer></footer>
      </section>
    `
  }

}