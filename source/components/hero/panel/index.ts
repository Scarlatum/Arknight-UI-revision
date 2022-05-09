import { html } from 'lit-html';

import Component, { ComponentPayload } from '~/component';

import './styles.scss';

// Declare components
type Components = 'User'

// Components
import User from './User'

export default class Panel extends Component<any,any,Components> {

  constructor(payload: ComponentPayload) { super(payload);

    this.registerComponent('User', User)

  }

  protected onMount(): void {
    
  }

  protected onUpdate(): void {    
  }

  render() {
    return html`
      <section class="panel-container">
        ${ this.components.get('User')?.render() }
      </section>
    `
  }

}