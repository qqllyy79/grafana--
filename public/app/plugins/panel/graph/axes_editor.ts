import { getValueFormats } from '@grafana/ui';

export class AxesEditorCtrl {
  panel: any;
  panelCtrl: any;
  unitFormats: any;
  logScales: any;
  xAxisModes: any;
  xAxisStatOptions: any;
  xNameSegment: any;

  /** @ngInject */
  constructor(private $scope: any) {
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.$scope.ctrl = this;

    this.unitFormats = getValueFormats();

    this.logScales = {
      linear: 1,
      'log (base 2)': 2,
      'log (base 10)': 10,
      'log (base 32)': 32,
      'log (base 1024)': 1024,
    };

    this.xAxisModes = {
      Time: 'time',
      Series: 'series',
      Histogram: 'histogram',
      // 'Data field': 'field',
    };

    this.xAxisStatOptions = [
      { text: 'Avg', value: 'avg' },
      { text: 'Min', value: 'min' },
      { text: 'Max', value: 'max' },
      { text: 'Total', value: 'total' },
      { text: 'Count', value: 'count' },
      { text: 'Current', value: 'current' },
    ];

    if (this.panel.xaxis.mode === 'custom') {
      if (!this.panel.xaxis.name) {
        this.panel.xaxis.name = 'specify field';
      }
    }
  }

  setUnitFormat(axis: { format: any }, subItem: { value: any }) {
    axis.format = subItem.value;
    this.panelCtrl.render();
  }

  render() {
    this.panelCtrl.render();
  }

  xAxisModeChanged() {
    this.panelCtrl.processor.setPanelDefaultsForNewXAxisMode();
    this.panelCtrl.onDataReceived(this.panelCtrl.dataList);
  }

  xAxisValueChanged() {
    this.panelCtrl.onDataReceived(this.panelCtrl.dataList);
  }
}

/** @ngInject */
export function axesEditorComponent() {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/app/plugins/panel/graph/axes_editor.html',
    controller: AxesEditorCtrl,
  };
}
