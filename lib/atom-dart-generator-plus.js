'use babel';

import AtomDartGeneratorPlusView from './atom-dart-generator-plus-view';
import { CompositeDisposable } from 'atom';

export default {

  atomDartGeneratorPlusView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomDartGeneratorPlusView = new AtomDartGeneratorPlusView(state.atomDartGeneratorPlusViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomDartGeneratorPlusView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-dart-generator-plus:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomDartGeneratorPlusView.destroy();
  },

  serialize() {
    return {
      atomDartGeneratorPlusViewState: this.atomDartGeneratorPlusView.serialize()
    };
  },

  toggle() {
    console.log('AtomDartGeneratorPlus was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
