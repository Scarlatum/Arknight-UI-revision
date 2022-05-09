import { html } from 'lit-html';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js'

// COMPONENT
  import Component, { ComponentPayload } from '~/component';

// STATIC
  import AddSVG from '~/assets/svg/common/Type=Info.svg?raw'

// STYLES
  import './styles.scss';

// STATE
  interface State {
    sanity: number
  }

  const SANITY_POINT = 750

export default class Sanity extends Component<State,unknown,unknown> {

  constructor({ hooks }: ComponentPayload<State, unknown>) { 

    super({ hooks, state: {
      sanity: .75
    }});

  }

  protected onMount(): void {
  }

  protected onUpdate(): void {
  }

  private changeSanity(sign: number) {

    const { sanity } = this.state.get();

    if ( sign === 1 && sanity === 1 || sign === -1 && sanity === 0 ) return;

    const step: number = 0.05;

    if ( !sign ) {
      this.state.setKey('sanity', sanity ? 0 : 1)
    } else {
      this.state.setKey('sanity', parseFloat(Number(sanity + step * sign).toPrecision(3)) );
    }

  }

  render() {

    const { sanity } = this.state.get();

    return html`
      <header id="${ this.elementID }" class="sanity-container">
        <div class="sanity-progress" style="--w: ${ sanity }"></div>
        <div class="sanity-info">
          ${ unsafeSVG(AddSVG) }
          Рассудок: ${ SANITY_POINT } / ${ Math.floor(SANITY_POINT * sanity) }
          <button @click="${ () => this.changeSanity(1) }">inc</button>
          <button @click="${ () => this.changeSanity(-1) }">dec</button>
          <button @click="${ () => this.changeSanity(0) }">fill / dry</button>
        </div>
      </header>
    `
  }

}