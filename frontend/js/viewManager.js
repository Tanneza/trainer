export class ViewManager {
  constructor(props) {
    this.currentView = null;
  }

  switch(view) {
    if (this.currentView) {
      this.currentView.hide();
    }

    this.currentView = view;
    this.currentView.show();
  }
}
