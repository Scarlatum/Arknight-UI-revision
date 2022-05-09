import { html } from 'lit-html';

import Component, { ComponentPayload } from '~/component';

import './styles.scss';

import SH from '~/assets/images/chars/shining/Original.png'

const enum CHARS {
  SHINING = 'shining'
}

interface State {
  char: CHARS,
  dialog: string,
}

const DIALOGS = [
  "If you want something moved, don't ask me. I'm not that brand of Forte.",
  "This is some insanely precise instrument... huh? What, familiar sight? Huhhh. Oh, right. If that Mayer person comes 'round, don't tell her I'm here.",
]

let TIMEOUT_ID: NodeJS.Timeout;

export default class CharWindow extends Component<State,unknown,unknown> {

  private static CHAT_IMG_RESOURSES: Record<CHARS, string> = {
    shining: SH
  }

  private static state: State = {
    char: CHARS.SHINING,
    dialog: String(),
  }

  constructor({ hooks, props }: ComponentPayload<State,any>) {

    super({ hooks, props, state: CharWindow.state });

  }

  private async animateDialog(): Promise<Animation> {

    return new Promise((resolve) => {

      const Animation = document.getElementById('CHAR_WINDOW_DIALOG')!.animate([
        { opacity: 0 }, 
        { opacity: 1 },
      ], {
        duration: 500,
        direction: 'reverse',
        easing: 'ease-in-out',
      })

      Animation.onfinish = () => {

        Animation.onfinish = null;
  
        Animation.playbackRate = -1;

        resolve(Animation)
  
      }

    })

  }

  private async changeDialog(str: string = String()) {

    clearTimeout(TIMEOUT_ID);

    const reverseAnimation = await this.animateDialog();

    this.state.setKey('dialog', str);

    reverseAnimation.play();

    TIMEOUT_ID = setTimeout(() => this.changeDialog(), 6000)

  }

  render() {

    const { char, dialog } = this.state.get();

    const randomIndex = Math.floor(DIALOGS.length * Math.random());

    console.log(randomIndex);

    return html`
      <div class="charWindow-container">
        <img src="${ CharWindow.CHAT_IMG_RESOURSES[char] }" @click="${ () => this.changeDialog(DIALOGS[randomIndex]) }">
        <span class="charWindow-dialog" id="CHAR_WINDOW_DIALOG">
          ${ dialog }
        </span>
        <span class="charWindow-operator">
          ${ char }
        </span>
      </div>
    `
  }

}