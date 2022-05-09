import { html } from 'lit-html';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js'

import Component, { ComponentPayload } from '~/component';

// Component Declaration

type Components = 'CounterTag'

import Tag, { Modes as TagModes } from '~/components/common/tag'

// CONST 
const enum FLAGS {
  Russia,
  Finland,
  Japan,
}

// STYLES
import './styles.scss';

// STATIC

import UserImage from '~/assets/images/chars/shining/Portret.png'

import RUS from '~/assets/svg/flags/Country=RUS.svg?raw';
import FIN from '~/assets/svg/flags/Country=FIN.svg?raw';
import JAP from '~/assets/svg/flags/Country=JAP.svg?raw';

const Flags: Record<FLAGS, string> = {
  [FLAGS.Russia]: RUS,
  [FLAGS.Finland]: FIN,
  [FLAGS.Japan]: JAP,
}

// MODULE
export default class User extends Component<any,any,Components> {

  constructor(payload: ComponentPayload) { super(payload)

    this.registerComponent('CounterTag', Tag, {
      type: TagModes.Counter,
      value: '2 минуты',
    })

  }

  protected onMount(): void {
    
  }

  protected onUpdate(): void {    
  }

  render() {
    return html`
      <section class="panel-user-container">
        <header class=panel-user-info>
          ${ unsafeSVG(Flags[FLAGS.Russia]) }
          <h2>
            SCARLATUM
          </h2>
          <span class="panel-user-info-uid">
            ID: 000-000-0
          </span>
        </header>
        <div class="panel-user-navigation">
          <picture>
            <img src="${ UserImage }">
          </picture>
          <section class="panel-user-navigation-buttons">
            <button>Друзья</button>
            <button>Архив</button>
            <button>
              Депозит
              ${ this.components.get('CounterTag')?.render() }
            </button>
          </section>
        </div>
      </section>
    `
  }

}
