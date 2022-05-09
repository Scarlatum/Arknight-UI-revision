import { html } from 'lit-html';

import Component from '~/component';

import './styles.scss';

// ENUMS
export const enum Modes {
  Counter,
  Time,
}

// INTERFACES
interface Prop {
  type: Modes
  value: number | string
}

// MODULE
export default class Tag extends Component<any,Prop,null> {

  render() {
    return html`
      <span class="tag-container">
        ${ this.props?.value }
      </span>
    `
  }

}