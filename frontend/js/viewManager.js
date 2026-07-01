import { LessonStatsView } from "./lessonStatsView.js";
import { LessonTypeSelectionView } from "./lessonTypeSelectionView.js";
import { LessonView } from "./lessonView.js";

class ViewManager {
  constructor(props) {
    this.views = props.views ?? [];

    this.currentView = null;

    this.updateIndexes();
  }

  updateIndexes() {
    this.viewByPath = {};
    this.viewByName = {};

    for (let i = 0; i < this.views.length; ++i) {
      const view = this.views[i];
      this.viewByPath[view.path] = view;
      this.viewByName[view.name] = view;
    }
  }

  push(props = {}) {
    const { path, name, props: componentProps } = props;

    if (this.currentView) {
      this.currentView.component.unmount();
    }

    this.currentView = path !== undefined ? this.viewByPath[path] : this.viewByName[name];
    const { component: existingComponent, componentFactory } = this.currentView;

    if (existingComponent) {
      existingComponent.updateProps(componentProps);
    } else {
      this.currentView.component = componentFactory(componentProps);
      this.currentView.component.mount();
    }
  }
}

export const viewManager = new ViewManager({
  views: [
    {
      path: "/",
      name: "lesson-type-selection",
      componentFactory: (props) => new LessonTypeSelectionView(props),
    },
    {
      path: "/lesson",
      name: "lesson",
      componentFactory: (props) => new LessonView(props),
    },
    {
      path: "/lesson-stats",
      name: "lesson-stats",
      componentFactory: (props) => new LessonStatsView(props),
    },
  ],
});
