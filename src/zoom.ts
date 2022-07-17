import type { RecordType } from './utils';
import { getCenter, getDistance, createRecord } from './utils';

export interface ZoomInterface {
  element: HTMLElement;
  maxScale: number;
  minScale: number;
  record: RecordType;
}

class Zoom implements ZoomInterface {
  element: HTMLElement;
  maxScale: number;
  minScale: number;
  record: RecordType;

  constructor(props: Omit<ZoomInterface, 'record'>) {
    this.maxScale = props.maxScale;
    this.minScale = props.minScale;
    this.element = props.element;
    this.record = createRecord(this.element);
  }

  /**
   * 更新指针
   * @param e PointerEvent
   * @param type 'update' | 'delete'
   */
  updatePointer(e: PointerEvent, type: 'update' | 'delete') {
    const len = this.record.pointers.length;

    for (let i = 0; i < len; i++) {
      const { pointerId } = this.record.pointers[i] ?? {};

      if (pointerId && pointerId === e.pointerId) {
        if (type === 'update') {
          this.record.pointers[i] = e;
        } else if (type === 'delete') {
          this.record.pointers.splice(i, 1);
        }
      }
    }
  }

  /**
   * 指针按下时的处理
   * @param e PointerEvent
   * @returns void
   */
  handlePointerDown(e: PointerEvent): void {
    if (!this.element) {
      return;
    }

    this.record.pointers.push(e);
    const len = this.record.pointers.length;
    const { clientX: x1, clientY: y1 } = this.record.pointers[0];

    this.record.point1 = {
      x: x1,
      y: y1,
    };
    this.record.lastPoint1 = {
      x: x1,
      y: y1,
    };

    if (len === 1) {
      this.record.isPointerDown = true;
      this.element.setPointerCapture(e.pointerId);
      this.record.lastPointerMove = {
        x: x1,
        y: y1,
      };
    } else if (len === 2) {
      const { clientX: x2, clientY: y2 } = this.record.pointers[1];

      this.record.point2 = {
        x: x2,
        y: y2,
      };
      this.record.lastPoint2 = {
        x: x2,
        y: y2,
      };
      this.record.lastCenter = getCenter(
        this.record.point1,
        this.record.point2
      );
    }
  }

  /**
   * 指针移动时的处理
   * @param e PointerEvent
   * @returns void
   */
  handlePointerMove(e: PointerEvent): void {
    if (!this.element || !this.record.isPointerDown) {
      return;
    }

    this.updatePointer(e, 'update');
    const len = this.record.pointers.length;

    const current1 = {
      x: this.record.pointers[0].clientX,
      y: this.record.pointers[0].clientY,
    };
    if (len === 1) {
      // 单指拖动查看图片
      this.record.diff.x = current1.x - this.record.lastPointerMove.x;
      this.record.diff.y = current1.y - this.record.lastPointerMove.y;
      this.record.lastPointerMove = { x: current1.x, y: current1.y };
      this.record.singlePoint.x += this.record.diff.x;
      this.record.singlePoint.y += this.record.diff.y;
      this.element.style.transform =
        'translate3d(' +
        this.record.singlePoint.x +
        'px, ' +
        this.record.singlePoint.y +
        'px, 0) scale(' +
        this.record.scale +
        ')';
    } else if (len === 2) {
      const current2 = {
        x: this.record.pointers[1].clientX,
        y: this.record.pointers[1].clientY,
      };
      // 计算移动距离的比例判断放大还是缩小
      let ratio =
        getDistance(current1, current2) /
        getDistance(this.record.lastPoint1, this.record.lastPoint2);
      // 缩放比例
      const _scale = this.record.scale * ratio;

      if (_scale > this.maxScale) {
        ratio = 1;
        this.record.scale = this.maxScale;
      } else if (_scale < this.minScale) {
        ratio = 1;
        this.record.scale = this.minScale;
      } else {
        this.record.scale = _scale;
      }
      // 计算缩放后的中心点
      const center = getCenter(current1, current2);
      // 计算相对中心的偏移量
      const origin = {
        x: (ratio - 1) * this.record.elementSize.width * 0.5,
        y: (ratio - 1) * this.record.elementSize.height * 0.5,
      };

      this.record.singlePoint.x -=
        (ratio - 1) * (center.x - this.record.singlePoint.x) -
        origin.x -
        (center.x - this.record.lastCenter.x);
      this.record.singlePoint.y -=
        (ratio - 1) * (center.y - this.record.singlePoint.y) -
        origin.y -
        (center.y - this.record.lastCenter.y);
      // 修改元素的位置和缩放属性
      this.element.style.transform =
        'translate3d(' +
        this.record.singlePoint.x +
        'px, ' +
        this.record.singlePoint.y +
        'px, 0) scale(' +
        this.record.scale +
        ')';
      this.record.lastCenter = { x: center.x, y: center.y };
      this.record.lastPoint1 = { x: current1.x, y: current1.y };
      this.record.lastPoint2 = { x: current2.x, y: current2.y };
    }
    e.preventDefault();
  }

  /**
   * 指针抬起时的处理
   * @param e PointerEvent
   * @returns void
   */
  handlePointerUp(e: PointerEvent): void {
    if (!this.record.isPointerDown) {
      return;
    }

    this.updatePointer(e, 'delete');
    const len = this.record.pointers.length;

    if (len === 0) {
      this.record.isPointerDown = false;
    } else if (len === 1) {
      const { clientX, clientY } = this.record.pointers[0];

      this.record.point1 = {
        x: clientX,
        y: clientY,
      };
      this.record.lastPointerMove = {
        x: clientX,
        y: clientY,
      };
    }
  }

  /**
   * 指针结束时的处理
   * @returns void
   */
  handlePointerCancel(): void {
    this.record.isPointerDown = false;
    this.record.pointers.length = 0;
  }
}

export default Zoom;
